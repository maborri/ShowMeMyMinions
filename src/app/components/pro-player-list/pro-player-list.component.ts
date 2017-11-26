import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetUserIdService } from '../../services/get-user-id.service';

@Component({
  selector: 'smmm-pro-player-list',
  templateUrl: './pro-player-list.component.html',
  styleUrls: ['./pro-player-list.component.scss']
})
export class ProPlayerListComponent implements OnInit {

  constructor(private getUserIdService: GetUserIdService) { }
  @Output() gotProPlayer;
  inf;
  gotValidInfo = false;
  proPlayers = [
    { sum: 'hide on bush', reg: 'kr', label: 'Faker (MID)'},
    { sum: '삼성갤럭시CoreJJ', reg: 'kr', label: 'CoreJJ (Support)'}
  ];
  ngOnInit() {
  }

  findProPlayerMatches(sum, reg) {
    // this.getUserIdService.getUserId(sum, reg)
    //   .subscribe(
    //     res => {
    //       this.inf = res;
    //       this.inf.profileIconId = `http://ddragon.leagueoflegends.com/cdn/7.20.2/img/profileicon/${this.inf.profileIconId}.png`
    //       this.inf.region = reg;
    //       this.gotValidInfo = true;
    //       console.log(this.inf);
    //       this.gotProPlayer.emit(this.inf);
    //     },
    //     err => {
    //       console.error('Observer got an error: ' + JSON.stringify(err.message));
    //     }
    //   );
  }
}
