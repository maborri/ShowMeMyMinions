import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
@Injectable()
export class GetUserIdService {

  constructor(private http: Http) { }
  
  getUserId() {
    return this.http.get("http://localhost:3000/getUserId")
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
