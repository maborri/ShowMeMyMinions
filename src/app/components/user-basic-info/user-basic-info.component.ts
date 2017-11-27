import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetMatchHistoryService } from '../../services/get-match-history.service';

@Component({
  selector: 'smmm-user-basic-info',
  templateUrl: './user-basic-info.component.html',
  styleUrls: ['./user-basic-info.component.scss']
})
export class UserBasicInfoComponent implements OnInit {
  @Input() userInfo: any;
  @Input() firstBasicInfo;
  @Output() matchesFound: EventEmitter<any> = new EventEmitter<any>();
  getUserError: string;

  constructor(private getMatchHistoryService: GetMatchHistoryService) { }

  ngOnInit() {

  }

  getMatchHistory(): void {
    this.getMatchHistoryService.getMatchHistory(this.userInfo.region, this.userInfo.accountId, this.userInfo.name)
      .subscribe(
        res => {
          console.log('matchInfo: ', res);
          this.matchesFound.emit(res);
        },
        err => {
          console.error('Observer got an error: ' + JSON.stringify(err.message));
          this.getUserError = JSON.stringify(err.message);
        }
      );
    }
}
