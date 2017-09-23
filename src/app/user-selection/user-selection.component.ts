import { Component, OnInit, Input } from '@angular/core';
import { GetUserIdService } from '../services/get-user-id.service';

@Component({
  selector: 'smmm-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.scss']
})
export class UserSelectionComponent implements OnInit {
  private summonerName: string = '';
  private region: string = '';
  private id: number;
  constructor(private getUserIdService: GetUserIdService) { }

  ngOnInit() {
  }

  getMatchList(): void {
    this.getUserIdService.getUserId(this.region, this.summonerName).subscribe(res => {
      this.id = res[1];
      console.log('ID: ', this.id);
    });
  }
}