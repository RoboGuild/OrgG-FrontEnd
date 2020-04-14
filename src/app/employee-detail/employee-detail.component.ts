import { Component, OnInit } from '@angular/core';
import { EmployeeRaw     } from '../employee-raw';
import { Position        } from '../position';
import { EmployeeService } from '../employee.service';
import { PositionService } from '../position.service';
import { ActivatedRoute  } from '@angular/router';
import { NgForm          } from '@angular/forms';
import  * as _ from 'lodash';


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  // subscriptions
  /*[1]*/ paramSub: any; // for routing
  /*[2]*/ employeeSub: any;
  /*[3]*/ getPositionsSub: any;
  /*[4]*/ saveEmployeeSub: any;
  
  // data
  id: string;
  hireDate: string;
  employee: EmployeeRaw;
  positions: Position[];
  
  // error state
  successMessage: boolean = false;
  failMessage: boolean = false;

  constructor(
    private emp_m: EmployeeService,
    private pos_m: PositionService,
    private rm: ActivatedRoute,
  ) { }

  ngOnInit() {  

    // [1.] subscribe to [id] parameter
    this.paramSub = this.rm.params.subscribe((params) => {
      this.id = params['id'];
    }); // end of subscription


    // [2.] subscribe to getEmployee(id)
    this.employeeSub = this.emp_m.getEmployee(this.id).subscribe((emp) => {
      this.employee = emp[0];
      this.hireDate = _.cloneDeep(this.employee.HireDate);
    }); // end of subscribe

   

    // [3.] subscribe to getPositions() 
    this.getPositionsSub = this.pos_m.getPositions().subscribe((pos) => {
        this.positions = pos;
    }); // end of subscription
  } // end of onInit


  onSubmit(f: NgForm) {


    // [4.] subscribe to saveEmployee(employee)
    this.saveEmployeeSub = this.emp_m.saveEmployee(this.employee).subscribe(() => {
        this.successMessage = true;
        setTimeout(() => {
          this.successMessage = false;
        }, 2500);
    },   
    (err: any) => {
      if (err) {
        this.failMessage = true; 
      }
      setTimeout(() => {
        this.failMessage = false;
      }, 2500);
    }); // end of subscription 

  } // end of onSubmit

ngOnDestroy() {
  if (this.paramSub) {
    this.paramSub.unsubscribe();
  }
  if (this.employeeSub) {
    this.employeeSub.unsubscribe();
  }
  if (this.saveEmployeeSub) {
    this.saveEmployeeSub.unsubscribe();
  }
  if (this.getPositionsSub) {
    this.getPositionsSub.unsubscribe();
  }
}  


} // end of EmployeeDetail
