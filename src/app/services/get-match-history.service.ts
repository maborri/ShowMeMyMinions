import 'rxjs/add/operator/map';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

@Injectable()
export class GetMatchHistoryService {
  url: string;

  constructor(private http: HttpClient) { }
  
  getMatchHistory(region, id) {
    this.url = `http://localhost:8081/getLastMatches/${region}/${id}`;
    console.log(this.url);
    return this.http.get(this.url);  
  }

}
