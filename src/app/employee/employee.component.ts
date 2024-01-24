import { Component, Directive, EventEmitter, Input, OnInit, Output, PipeTransform, QueryList, ViewChildren } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable, map, pipe, startWith } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})

export class EmployeeComponent {
	employees$: Observable<Employee[]>;
	total$: Observable<number>;

	statusOnClick: string = '';

  	@ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

	constructor(public employeeService: EmployeeService) {
		this.employees$ = employeeService.employees$;
		this.total$ = employeeService.total$;
	}

	onClickEditButton() {
		this.statusOnClick = 'edit';
	}

	onClickDeleteButton() {
		this.statusOnClick = 'delete';
	}

	onClickCloseButton() {
		this.statusOnClick = 'none';
	}

  	onSort({ column, direction }: SortEvent) {
		// resetting other headers
		this.headers.forEach((header) => {
			if (header.sortable !== column) {
				header.direction = '';
			}
		});

		this.employeeService.sortColumn = column;
		this.employeeService.sortDirection = direction;
	}
}