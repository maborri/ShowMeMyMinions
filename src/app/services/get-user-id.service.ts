import 'rxjs/add/operator/map';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

@Injectable()
export class GetUserIdService {
  private url: string;

  constructor(private http: HttpClient) { }
  
  getUserId(region, summonerName) {
    this.url = `http://localhost:8081/getUserId/${region}/${summonerName}`;
    console.log(this.url);
   // return this.http.get(this.url).map(data => _.values(data));
   return this.http.get(this.url).map(data => _.map(data, 'accountId'));
  }
}
