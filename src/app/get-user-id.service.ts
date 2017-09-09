import { Injectable } from '@angular/core';

@Injectable()
export class GetUserIdService {

  constructor() { }
  
  getUserId(): string {
    return '213231';
  }
}
