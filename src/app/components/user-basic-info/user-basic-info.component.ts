import { Component, OnInit, Input } from '@angular/core';
import { GetMatchHistoryService } from '../../services/get-match-history.service';

@Component({
  selector: 'smmm-user-basic-info',
  templateUrl: './user-basic-info.component.html',
  styleUrls: ['./user-basic-info.component.scss']
})
export class UserBasicInfoComponent implements OnInit {
  @Input() summonerInfo: any = null;
  @Input() region: string;
  getUserError: string;
  matchInfo: any;

  constructor(private getMatchHistoryService: GetMatchHistoryService) { }

  ngOnInit() {
  }

  getMatchHistory(): void {
    this.getMatchHistoryService.getMatchHistory(this.region, this.summonerInfo.accountId, this.summonerInfo.name)
      .subscribe(
        res => { 
          this.matchInfo = JSON.stringify(res);
          console.log(JSON.stringify(this.matchInfo));
        },
        err => {
          console.error('Observer got an error: ' + JSON.stringify(err.message));
          this.getUserError = JSON.stringify(err.message);
        }
      );
    }
}
