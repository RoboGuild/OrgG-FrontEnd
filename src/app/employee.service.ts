import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee   } from './employee';
import { EmployeeRaw} from './employee-raw';

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  private url: string = "https://teams-new-api.herokuapp.com";

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.url}/employees`);
  }

  saveEmployee(employee: EmployeeRaw): Observable<any> {
    return this.http.put<any>(`${this.url}/employee/` + employee._id, employee);
  }

  getEmployee(id: string): Observable<EmployeeRaw> {
    return this.http.get<EmployeeRaw>(`${this.url}/employee-raw/` + id);
  }
} // end of service
