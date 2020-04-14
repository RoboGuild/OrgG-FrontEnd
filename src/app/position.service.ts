import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position   } from './position';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private url: string = 'https://assignment-1-web422.herokuapp.com';

  constructor(private http: HttpClient) { }

  getPositions(): Observable <Position[]> {
    return this.http.get <Position[]> (`${this.url}/positions`);     
  }

  savePosition(position : Position) : Observable <any> {
    return this.http.put <any> (`${this.url}/position/` + position._id, position); 
  }

  // returns an array but with ONE matching Position
  getPosition(pid: string) : Observable <Position[]> {
    return this.http.get <Position[]> (`${this.url}/position/` + pid);
  }

} // end of service
