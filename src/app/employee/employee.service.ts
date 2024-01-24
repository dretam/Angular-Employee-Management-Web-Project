import { Injectable, PipeTransform } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee.model';
import { BehaviorSubject, Observable, Subject, debounceTime, delay, of, switchMap, tap } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { SortColumn, SortDirection } from './sortable.directive';

interface SearchResult {
	employees: Employee[];
	total: number;
}

interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}

const compare = (v1: any, v2: any) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(employees: Employee[], column: SortColumn, direction: string): Employee[] {
	if (direction === '' || column === '') {
		return employees;
	} else {
		return [...employees].sort((a, b) => {
			const res = compare(a[column], b[column]);
			return direction === 'asc' ? res : -res;
		});
	}
}

function matches(employee: Employee, term: string, pipe: PipeTransform) {
	return (
		(employee.firstName + ' ' + employee.lastName).toLowerCase().includes(term.toLowerCase()) ||
    employee.username.toLowerCase().includes(term.toLowerCase())
	);
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends DataService {
	postList: any[] = [];

    private _loading$ = new BehaviorSubject<boolean>(true);
	private _search$ = new Subject<void>();
	private _employees$ = new BehaviorSubject<Employee[]>([]);
	private _total$ = new BehaviorSubject<number>(0);

  employeeList: Employee[] = [];

  private _state: State = {
		page: 1,
		pageSize: 10,
		searchTerm: '',
		sortColumn: '',
		sortDirection: '',
	};

  constructor(private pipe: DecimalPipe, http: HttpClient) {
	  super('http://localhost:3000/employee', http);
    this.getAllEmployees();
    this._search$
			.pipe(
				tap(() => this._loading$.next(true)),
				debounceTime(200),
				switchMap(() => this._search()),
				delay(200),
				tap(() => this._loading$.next(false)),
			)
			.subscribe((result) => {
				this._employees$.next(result.employees);
				this._total$.next(result.total);
			});

		this._search$.next();
  	}

  	get employees$() {
		return this._employees$.asObservable();
	}
	get total$() {
		return this._total$.asObservable();
	}
	get loading$() {
		return this._loading$.asObservable();
	}
	get page() {
		return this._state.page;
	}
	get pageSize() {
		return this._state.pageSize;
	}
	get searchTerm() {
		return this._state.searchTerm;
	}

  	set page(page: number) {
		this._set({ page });
	}
	set pageSize(pageSize: number) {
		this._set({ pageSize });
	}
	set searchTerm(searchTerm: string) {
		this._set({ searchTerm });
	}
	set sortColumn(sortColumn: SortColumn) {
		this._set({ sortColumn });
	}
	set sortDirection(sortDirection: SortDirection) {
		this._set({ sortDirection });
	}

  private _set(patch: Partial<State>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}

  getAllEmployees() {
    this.getAll().subscribe({
      next: (response: any) => {
		this.employeeList = response;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  postEmployee(body: any) {
	this.create(body).subscribe({
		next: (response: any) => {
			let addDataPost = {
				...body
			};
			this.postList = response;
		},
		error: error => {
			console.log(error);
		}
	});
  }

  private _search(): Observable<SearchResult> {
		const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

		// 1. sort
		let employees = sort(this.employeeList, sortColumn, sortDirection);

		// 2. filter
		employees = employees.filter((employee) => matches(employee, searchTerm, this.pipe));
		const total = employees.length;

		// 3. paginate
		employees = employees.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
		return of({ employees, total });
	}
}
