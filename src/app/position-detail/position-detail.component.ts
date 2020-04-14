import { Component, OnInit } from '@angular/core';
import { NgForm          } from '@angular/forms';
import { Position        } from '../position';
import { PositionService } from '../position.service';
import { ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-position-detail',
  templateUrl: './position-detail.component.html',
  styleUrls: ['./position-detail.component.css']
})
export class PositionDetailComponent implements OnInit {

  // subscriptions
  /*[1]*/ paramSub: any; // for routing
  /*[2]*/ positionSub: any;
  /*[3]*/ savePositionSub: any;

  // data
  pid: string;
  position: Position;

  // error state
  successMessage: boolean = false;
  failMessage: boolean = false;

  constructor(
    private pos_m: PositionService,
    private rm: ActivatedRoute,
    ) { }

  ngOnInit() {


    // [1.] subscribe to [pid] parameter
    this.paramSub = this.rm.params.subscribe((params) => {
      this.pid = params['pid'];
    }); // end of subscribe

    // [2.] subscribe to getPosition(id)
    this.positionSub = this.pos_m.getPosition(this.pid).subscribe((pos) => {
      this.position = pos[0]; 
    }); // end of subcribe

  } // end of onInit

  onSubmit(fp: NgForm) {
    console.log(this.position);
    // [4.] subscribe to savePosition(position)
    this.savePositionSub = this.pos_m.savePosition(this.position).subscribe(() => {
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
    if (this.positionSub) {
      this.positionSub.unsubscribe();
    }
    if (this.savePositionSub) {
      this.savePositionSub.unsubscribe();
    }

  } // end of onDestroy

}
