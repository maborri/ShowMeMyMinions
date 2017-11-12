import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetUserIdService } from '../../services/get-user-id.service';


@Component({
  selector: 'smmm-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.scss']
})
export class UserSelectionComponent implements OnInit {
  @Output() userUpdated: EventEmitter<any> = new EventEmitter<any>();
  summInfo = {
    summonerName: '',
    region: ''
  }
  getUserError: string;
  info: any;
  gotValidInfo = false;

  constructor(private getUserIdService: GetUserIdService) { }

  ngOnInit() {
  }

  getMatchList(): void {
    this.getUserIdService.getUserId(this.summInfo.region, this.summInfo.summonerName)
      .subscribe(
        res => {
          this.info = res;
          this.info.profileIconId = `http://ddragon.leagueoflegends.com/cdn/7.20.2/img/profileicon/${this.info.profileIconId}.png`
          this.info.region = this.summInfo.region;
          this.gotValidInfo = true;
          console.log(this.info);
          this.userUpdated.emit(this.info);
        },
        err => {
          console.error('Observer got an error: ' + JSON.stringify(err.message));
          this.getUserError = JSON.stringify(err.message);
        }
      );
    }
  }

