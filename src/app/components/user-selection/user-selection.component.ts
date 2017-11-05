import { Component, OnInit, Input } from '@angular/core';
import { GetUserIdService } from '../../services/get-user-id.service';

@Component({
  selector: 'smmm-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.scss']
})
export class UserSelectionComponent implements OnInit {
  @Input() contenderMatchInfo;
  summonerName = '';
  region = '';
  getUserError: string;
  userInfo: any;
  gotValidInfo = false;

  constructor(private getUserIdService: GetUserIdService) { }

  ngOnInit() {
  }

  getMatchList(): void {
    this.getUserIdService.getUserId(this.region, this.summonerName)
      .subscribe(
        res => {
          this.userInfo = res;
          this.userInfo.profileIconId = `http://ddragon.leagueoflegends.com/cdn/7.20.2/img/profileicon/${this.userInfo.profileIconId}.png`
          this.gotValidInfo = true;
          console.log(this.userInfo);
        },
        err => {
          console.error('Observer got an error: ' + JSON.stringify(err.message));
          this.getUserError = JSON.stringify(err.message);
        }
      );
    }
  }

