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
  private data;
  constructor(private getUserIdService: GetUserIdService) { }

  ngOnInit() {
  }

  getMatchList(): void {
    var data = this.getUserIdService.getUserId(this.region, this.summonerName)
    .subscribe(
      res => {
      console.log(res);
      this.data = res[1];
      console.log(this.data);
    },
      err => console.error('Observer got an error: ' + err)
    );
  }
}