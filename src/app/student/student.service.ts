import { Injectable } from "@angular/core";
import { IStudent } from "./student";

@Injectable({
    providedIn: 'root'
})
export class StudentService{
    constructor(){}

    createStudent(student: IStudent): IStudent[]{
        
        const students =this.getStudentRecords();
        if(students != null && students.length <=0){
          const currStudentRollno = students.length + 1;
          student.rollno = currStudentRollno;
          students.push(student);
          localStorage.setItem('students', JSON.stringify(students));
        }
        else{
          const currStudentRollno = 1;
          student.rollno = currStudentRollno;
          const studentArr = [];
          studentArr.push(student);
          localStorage.setItem('students', JSON.stringify(studentArr));
        }
        //Refresh Student List
        window.alert('Student Added successfully');
        const studentRecord = this.getStudentRecords();
        return studentRecord;
      }

    getStudentRecords(): IStudent[] {
        let students;
        const studentList = localStorage.getItem('students');
        if(studentList != null){
          students = JSON.parse(studentList);   
        }
        else{
          students = {} as IStudent[];
        }
        return students;
      }
      deleteRecord(rollno: any, studentlist: IStudent[]){
        const students = this.getStudentRecords();
        students.splice(students.findIndex((stu) => stu.rollno == rollno),1);
        localStorage.setItem('students', JSON.stringify(students));
        studentlist = this.getStudentRecords();
        return studentlist;
      }
      
      updateStudentRecord(student: IStudent): IStudent[]{
        const students = this.getStudentRecords();
        students.splice(students.findIndex((stu) => stu.rollno == student.rollno),1);
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));   
        return this.getStudentRecords();
      }

      getStudentRecord(rollno: any): IStudent {          
        const students = this.getStudentRecords();
        let selectedstudent = students.find(s => s.rollno == rollno);
        const student = {
            rollno: selectedstudent?.rollno,    
            studentName: selectedstudent?.studentName,
            course: selectedstudent?.course,
            marks: selectedstudent?.marks,
            email: selectedstudent?.email,
            phone: selectedstudent?.phone,
            gender: selectedstudent?.gender,
            evs: selectedstudent?.evs,
            physicalEducation: selectedstudent?.physicalEducation,
            informationPratices: selectedstudent?.informationPratices,
            editMode: true,
            additional: true,
          };

        return student;
      }
}