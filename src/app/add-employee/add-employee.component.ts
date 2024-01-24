import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee/employee.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  detailForm!: FormGroup;

  errorMessageTimeParadox: string | undefined;

  employee: any;

  groupList: string[] = [
    "Frontend", "UI/UX", "Backend", "DevOps", "Tester", "Project Manager", "Copywritter", "Trainer", "Finance", "Administration"
  ];

  constructor(private formBuilder: FormBuilder, private router: Router, private employeeService: EmployeeService
    ) {
      this.detailForm = this.createForm();
    }

    createForm() {
      return this.formBuilder.group({
        username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        firstName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        lastName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        birthDate: [null, Validators.compose([Validators.required])],
        basicSalary: [null, Validators.compose([Validators.required, Validators.min(1_000_000), Validators.max(50_000_000)])],
        status: [0, Validators.required],
        group: [null, Validators.required],
        description: ['', Validators.required, Validators.minLength(10), Validators.maxLength(2000)]
      });
    }

    onSubmit() {
      let dateNow = new Date();
      const value = this.detailForm.getRawValue();
      let convertedBirthDate = new Date(value.birthDate);
      if(convertedBirthDate.getFullYear() >= dateNow.getFullYear()) {
        this.errorMessageTimeParadox = 'Can not set birth date value more than or equal as today.';
        this.router.navigateByUrl('/employee/insert');
      } else {
        this.errorMessageTimeParadox = undefined;
        this.employeeService.postEmployee(JSON.stringify(value));
  
        setTimeout(() => {
          this.router.navigateByUrl('/employee').then(() => location.reload());
        }, 300);
      }
    }
}
