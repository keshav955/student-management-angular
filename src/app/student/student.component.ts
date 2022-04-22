import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IStudent } from './student';
import { StudentService } from './student.service';

@Component({
  selector: 'sm-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
 
  title = 'Student Management';
  student: IStudent ;
  students: IStudent [];
  form= new FormGroup({});

  constructor(private fb: FormBuilder,
              private studentService: StudentService) {
    //this.route.queryParams.subscribe(param =>{

    //})
    this.student = {
      rollno: -1,
      studentName: "",
      course: "",
      marks: undefined,
      email: "",
      phone:"",
      gender:"",
      physicalEducation: false,
      evs: false,
      informationPratices: false,
      editMode: false, 
      additional: true
    }
    this.students = [];
    this.form = this.fb.group({  
      studentName: ['', [Validators.required ,Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]],
      course: ['', [Validators.required ]], 
      marks: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(100)]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone: ['', [ Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(10), Validators.maxLength(10)]],
      gender:['', [Validators.required]],
      physicalEducation: [''], 
      evs:[''], 
      informationPratices: [''], 
      checkbox: new FormControl(false)
    })

   }

  ngOnInit(): void {
    const studentRecord = this.studentService.getStudentRecords();
    if(studentRecord != null){
      this.students = studentRecord;
    }
    this.student.editMode = false;
    
  }

  addStudent(studentForm: any): void{
    if(!(this.student.physicalEducation || this.student.evs || this.student.informationPratices)){
      this.student.additional = false
      return
    }
    else{
      this.student.additional = true
    }   
    const studentRecord = this.studentService.createStudent(this.student);   
    if(studentRecord != null){
      this.students = studentRecord;
    }   
    this.form.reset();
  }

  getStudent(rollno: any): void {
    this.student = this.studentService.getStudentRecord(rollno);
  }

  updateStudent(): void{
    if(!(this.student.physicalEducation || this.student.evs || this.student.informationPratices)){
      this.student.additional = false
      return
    }
    else{
      this.student.additional = true
    }
    
    this.students = this.studentService.updateStudentRecord(this.student);   
    window.alert('Record Updated successfully');
    this.form.reset();
    this.student.editMode = false;
  }

  deleteStudent(rollno: any){
    this.students= this.studentService.deleteRecord(rollno,this.students);
  }

  AddMode(){
    this.form.reset();
    this.student.editMode = false;
  }

  get email() {
    return this.form.get('email');
  }
  get studentName() {
    return this.form.get('studentName');
  } 
  get course() {
    return this.form.get('course');
  } 
  get gender() {
    return this.form.get('gender');
  } 
  get marks() {
    return this.form.get('marks');
  } 
  get phone() {
    return this.form.get('phone');
  }     

}
