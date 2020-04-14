import { Component, OnInit } from '@angular/core';
import { Router            } from '@angular/router';
import { EmployeeService   } from '../employee.service';
import { Employee          } from '../employee';
import { Sort              } from '@angular/material/sort';
import * as _ from 'lodash';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  // subscriptions
  /*[1]*/ getEmployeesSub: any;
  
  // data
  employees: Employee[] = [];
  filtered: Employee[] = [];
  final: any = [];
  curChunk: number = 1;
  sizeChunk: number = 10;
  numEmployees: number = 0;

  // error state
  loadingError: boolean = false;
  loading: boolean = false;

  // material
  columnsToDisplay: string[] = ['FullName', 'AddressStreet', 'PositionName', 'PhoneNum', 'HireDate' ];

  constructor(
    private m: EmployeeService,
    private rt: Router,
    ) { }
   
  routeToEmployeeDetails(id: string) {
    this.rt.navigate(['/employee', id]);
  }
    
  

  sortData(sort: Sort) {
    const data = this.employees.slice();
    if (!sort.active || sort.direction === '') {
      this.filtered = data;
      return;
    }

    this.filtered = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'FullName': return compare(a.FirstName, b.FirstName, isAsc);
        case 'AddressStreet': return compare(a.AddressStreet, b.AddressStreet, isAsc);
        case 'PhoneNum': return compare(a.PhoneNum, b.PhoneNum, isAsc);
        case 'HireDate': return compare(a.HireDate, b.HireDate, isAsc);
        default: return 0;
      }
    });
    this.showFinal(this.filtered);
}

applyFilter(filterValue: string) {
  this.filtered = _.filter(this.employees, (emp) => {
    let pattern = new RegExp(filterValue, 'i');
    return (
        pattern.test(emp.FirstName) || pattern.test(emp.LastName)  || pattern.test(emp.Position.PositionName)
    );        
  });
  this.curChunk = 1;
  this.numEmployees = this.filtered.length;
  this.showFinal(this.filtered);

}

pageChanged(event: any) {
  // going forward
  if (event.pageIndex > (this.curChunk - 1)) {
    this.curChunk++;     
  // going backward  
  } else if (event.pageIndex < (this.curChunk - 1)) {
    this.curChunk--;
  } else {
    // this.curChunk => event.pageIndex;
  }  
  this.sizeChunk = event.pageSize;    
  this.showFinal(this.filtered);    
  console.log(event);
}

showFinal(list: Employee[]) {
  let arry = _.chunk(list, this.sizeChunk);
  console.log("chunked employees: ");
  console.log(arry);
  console.log("Now Serving: ")
  console.log(this.curChunk - 1);
  this.final = _.cloneDeep(arry[this.curChunk - 1]);
}




  ngOnInit() {

    // [1.] subscribe to getEmployees()   
    this.getEmployeesSub = this.m.getEmployees().subscribe((employees) => {
      this.employees = employees;
      this.filtered = employees;   
      this.numEmployees = employees.length;
      this.showFinal(this.filtered); 
      },
      (error) => {
        if (error) {
        this.loadingError = true;
        console.log(error);
        }
      });   
  } // end of onInit

  ngOnDestroy() {
    if (this.getEmployeesSub) {
      this.getEmployeesSub.unsubscribe();
    }
  } // end of onDestroy

} // end of Component

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
