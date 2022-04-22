import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'student', component: StudentComponent},
      {path: 'student/:rollno', component: StudentComponent},
      {path: '', redirectTo: 'student', pathMatch: 'full'},
      {path: '**', redirectTo: 'student', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [StudentComponent]
})
export class AppModule { }
