import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'smmm-compare-table',
  templateUrl: './compare-table.component.html',
  styleUrls: ['./compare-table.component.scss']
})
export class CompareTableComponent implements OnInit {
  @Input() matchInfo;
  @Input() contenderMatchInfo;
  results = [];
  points = [];
  showFinalResults = false;
  finalScore = 0;

  constructor() { }

  ngOnInit() {
    console.log("oninit!!", this.contenderMatchInfo);
    var hasInfo = this.contenderMatchInfo != undefined;
    console.log("hasInfo:", hasInfo);
    if(this.contenderMatchInfo) {
      this.calculateResults();
      console.log("this.results:",this.results);
    }
  }

  calculateResults() {
      this.results.push(this.contenderMatchInfo.agregatedInfo.kills - this.matchInfo.agregatedInfo.kills);
      this.points.push(this.results[0] * 10);
      this.results.push(this.contenderMatchInfo.agregatedInfo.deaths - this.matchInfo.agregatedInfo.deaths);
      this.points.push(this.results[1] * (-10));
      this.results.push(this.contenderMatchInfo.agregatedInfo.assists - this.matchInfo.agregatedInfo.assists);
      this.points.push(this.results[2] * 10);
      this.results.push(this.contenderMatchInfo.agregatedInfo.doubleKills - this.matchInfo.agregatedInfo.doubleKills);
      this.points.push(this.results[3] * 50);
      this.results.push(this.contenderMatchInfo.agregatedInfo.tripleKills - this.matchInfo.agregatedInfo.tripleKills);
      this.points.push(this.results[4] * 75);
      this.results.push(this.contenderMatchInfo.agregatedInfo.quadraKills - this.matchInfo.agregatedInfo.quadraKills);
      this.points.push(this.results[5] * 100);
      this.results.push(this.contenderMatchInfo.agregatedInfo.pentaKills - this.matchInfo.agregatedInfo.pentaKills);
      this.points.push(this.results[6] * 150);
      this.results.push(this.contenderMatchInfo.agregatedInfo.goldEarned - this.matchInfo.agregatedInfo.goldEarned);
      this.points.push(this.results[7] / 100);
      this.results.push(this.contenderMatchInfo.agregatedInfo.totalDamageDealtToChampions - this.matchInfo.agregatedInfo.totalDamageDealtToChampions);
      this.points.push(this.results[8] / 100);
      this.results.push(this.contenderMatchInfo.agregatedInfo.totalMinionsKilled - this.matchInfo.agregatedInfo.totalMinionsKilled);
      this.points.push(this.results[9]);
      this.results.push(this.contenderMatchInfo.agregatedInfo.neutralMinionsKilled - this.matchInfo.agregatedInfo.neutralMinionsKilled);
      this.points.push(this.results[10]);

      for(var value of this.points) {
        this.finalScore += value;
      }
  }

  showResults() {
    this.showFinalResults = true;

  }
}
