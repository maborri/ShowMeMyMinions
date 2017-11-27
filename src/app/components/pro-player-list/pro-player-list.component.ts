import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetUserIdService } from '../../services/get-user-id.service';

@Component({
  selector: 'smmm-pro-player-list',
  templateUrl: './pro-player-list.component.html',
  styleUrls: ['./pro-player-list.component.scss']
})
export class ProPlayerListComponent implements OnInit {

  constructor(private getUserIdService: GetUserIdService) { }

  @Output() gotProPlayer: EventEmitter<any> = new EventEmitter<any>();
  gotValidInfo = false;
  inf;
  proPlayers = [
    { sum: 'hide on bush', reg: 'kr', label: 'Faker (MID)'},
    { sum: 'aphromoo', reg: 'na1', label: 'Aphromoo (Support)'},
    { sum: 'Polish Wonderb0y', reg: 'eun1', label: 'Jankos (Jungle)'},
    { sum: 'Anivia Kid', reg: 'eun1', label: 'Froggen (MID)'},
    { sum: 'FZ3R0', reg: 'na1', label: 'Wildturtle (ADC)'},
    { sum: 'Sorry', reg: 'kr', label: 'Ssumday (TOP)'},
    { sum: 'TSM ZV3N', reg: 'eun1', label: 'Zven (ADC)'},
  ];
  ngOnInit() {
  }

  findProPlayerMatches(reg, sum) {
    this.getUserIdService.getUserId(reg, sum )
      .subscribe(
        (res: any) => {
          this.inf = res.info;
          this.inf.profileIconId = `http://ddragon.leagueoflegends.com/cdn/${res.severVer}/img/profileicon/${this.inf.profileIconId}.png`
          this.inf.region = reg;
          this.gotValidInfo = true;
          console.log(this.inf);
          this.gotProPlayer.emit(this.inf);
        },
        err => {
          console.error('Observer got an error: ' + JSON.stringify(err.message));
        }
      );
  }
}
