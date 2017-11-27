import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetUserIdService } from '../../services/get-user-id.service';


@Component({
  selector: 'smmm-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.scss']
})
export class UserSelectionComponent implements OnInit {
  @Output() userUpdated: EventEmitter<any> = new EventEmitter<any>();
  @Input() firstPicker;
  summInfo = {
    summonerName: '',
    region: ''
  }
  getUserError: string;
  inf: any;
  gotValidInfo = false;

  constructor(private getUserIdService: GetUserIdService) { }

  ngOnInit() {
  }

  getMatchList(): void {
    this.getUserIdService.getUserId(this.summInfo.region, this.summInfo.summonerName)
      .subscribe(
        (res:any) => {
          if(res.info) {
            this.inf = res.info;
            this.inf.profileIconId = `http://ddragon.leagueoflegends.com/cdn/${res.severVer}/img/profileicon/${this.inf.profileIconId}.png`
            this.inf.region = this.summInfo.region;
            this.gotValidInfo = true;
            console.log(this.inf); 
            this.userUpdated.emit(this.inf);
            this.getUserError = "";
          }
          else
            this.getUserError = "Can't find any match for the given information";
        },
        err => {
          console.error('Observer got an error: ' + JSON.stringify(err.message));
          this.getUserError = "Can't find any match for the given information";
        }
      );
    }
  }

