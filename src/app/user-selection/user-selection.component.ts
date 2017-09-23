import { Component, OnInit, Input } from '@angular/core';
import { GetUserIdService } from '../services/get-user-id.service';

@Component({
  selector: 'smmm-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.scss']
})
export class UserSelectionComponent implements OnInit {
  apikey: number = 0;
  summonerName: string = '';
  region: string = '';
  id;

  constructor(private getUserIdService: GetUserIdService) { }

  ngOnInit() {
  }

  getMatchList(): void {
    this.getUserIdService.getUserId().subscribe(data => this.id = data);
    console.log(this.id);
  }
}
