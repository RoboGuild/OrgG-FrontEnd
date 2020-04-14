import { Component, OnInit } from '@angular/core';
import { Router             } from '@angular/router';
import { PositionService   } from '../position.service';
import { Position          } from '../position';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

   // subscriptions
  /*[1]*/ getPositionSub: any;

  // data
  positions: Position[] = [];

  // error state
  loadingError: boolean = false;

  // material
  columnsToDisplay = ['title', 'description', 'salary' ];

  constructor(
    private m: PositionService,
    private rt: Router,
    ) { }

  routeToPosition(pid: string) {
    this.rt.navigate(['/position', pid]);
  }  

  ngOnInit() {
     // [1.] subscribe to getPositions()
    this.getPositionSub = this.m.getPositions().subscribe((pos) => {
      this.positions = pos;        
    });
  } // end of onInit


  ngOnDestroy() {
    if (this.getPositionSub) {
      this.getPositionSub.unsubscribe();
    }
  } // end of onDestroy

}
