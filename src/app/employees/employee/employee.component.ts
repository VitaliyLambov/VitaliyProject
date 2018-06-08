import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../shared/employee.service'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetFrom();
  }

  onSubmit(form : NgForm) {
    if(form.value.$key == null)
      this.employeeService.insertEmployee(form.value);
    else
      this.employeeService.updateEmployee(form.value);
    this.resetFrom(form);
  }

  resetFrom(form? : NgForm){
    if(form != null)
      form.reset();
    this.employeeService.selectedEmployee = {
      $key : null,
      name : '',
      position : '',
      office : '',
      salary : 0
    }
  }

  onDelete(form : NgForm){
    if(confirm('Are you sure to delete this record?')==true)
    {
      this.employeeService.deleteEmployee(form.value.$key);
      this.resetFrom(form);
    }
  }
}