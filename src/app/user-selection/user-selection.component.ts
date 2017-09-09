import { Component, OnInit, Input } from '@angular/core';
import { GetUserIdService } from '../get-user-id.service';

@Component({
  selector: 'smmm-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.scss']
})
export class UserSelectionComponent implements OnInit {
  apikey: number = 0;
  summonerName: string = '';
  region: string = '';
  
  constructor(private _GetUserIdService: GetUserIdService) { }

  ngOnInit() {
    console.log(this._GetUserIdService.getUserId())
  }

  getMatchList(): void {
    console.log(`summoner name: ${this.summonerName}  region: ${this.region}`)
  }
}
