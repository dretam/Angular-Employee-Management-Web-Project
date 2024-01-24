import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee/employee.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../employee/employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employeedetail',
  templateUrl: './employeedetail.component.html',
  styleUrl: './employeedetail.component.css'
})
export class EmployeedetailComponent implements OnInit {
  employee: any;

  constructor(private activeRoute: ActivatedRoute, private employeeService: EmployeeService,
    ) {}
  
  ngOnInit(): void {
    let username = this.activeRoute.snapshot.paramMap.get('username');
    this.getUserProfile(username);
  }

  getUserProfile(id: any) {
    this.employeeService.getById(id).subscribe({
      next: (response: any) => {
        this.employee = response[0];
      },
      error: error => {
        console.log(error);
      }
    });
  }

  // getEmployeeDetail(id: any) {
  //   const storedEmployees = localStorage.getItem("employees");
	// 	const employeeList = (storedEmployees ? JSON.parse(storedEmployees) : []);
  //   for (let index = 0; index < employeeList.length; index++) {
  //     const employee = employeeList[index];
  //     if (employee.username === id) {
  //       console.log(employee);
  //       this.employee = employee;
  //     } else {
  //       console.log(`Employee with username '${id}' not found.`);
  //     }
  //   }
  // }
}
