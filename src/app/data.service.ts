import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
  useValue: null
})
export class DataService {

  constructor(private url: string, private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url);
  }

  getById(id: string | number) {
    return this.http.get(`${this.url}?username=${id}`)
  }

  create(body: any) {
    return this.http.post(this.url, body);
  }
}
