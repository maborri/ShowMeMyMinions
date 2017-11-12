import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'smmm-compare-table',
  templateUrl: './compare-table.component.html',
  styleUrls: ['./compare-table.component.scss']
})
export class CompareTableComponent implements OnInit {
  @Input() userMatches;
  @Input() contenderMatchInfo;
  results = [];
  points = [];
  showFinalResults = false;
  finalScore = 0;
  hideDiv = false;
  constructor() { }

  ngOnInit() {
   
  }

  calculateResults() {
      this.results.push(this.contenderMatchInfo.agregatedInfo.kills - this.userMatches.agregatedInfo.kills);
      this.points.push(this.results[0] * 10);
      this.results.push(this.contenderMatchInfo.agregatedInfo.deaths - this.userMatches.agregatedInfo.deaths);
      this.points.push(this.results[1] * (-10));
      this.results.push(this.contenderMatchInfo.agregatedInfo.assists - this.userMatches.agregatedInfo.assists);
      this.points.push(this.results[2] * 10);
      this.results.push(this.contenderMatchInfo.agregatedInfo.doubleKills - this.userMatches.agregatedInfo.doubleKills);
      this.points.push(this.results[3] * 50);
      this.results.push(this.contenderMatchInfo.agregatedInfo.tripleKills - this.userMatches.agregatedInfo.tripleKills);
      this.points.push(this.results[4] * 75);
      this.results.push(this.contenderMatchInfo.agregatedInfo.quadraKills - this.userMatches.agregatedInfo.quadraKills);
      this.points.push(this.results[5] * 100);
      this.results.push(this.contenderMatchInfo.agregatedInfo.pentaKills - this.userMatches.agregatedInfo.pentaKills);
      this.points.push(this.results[6] * 150);
      this.results.push(this.contenderMatchInfo.agregatedInfo.goldEarned - this.userMatches.agregatedInfo.goldEarned);
      this.points.push(this.results[7] / 100);
      this.results.push(this.contenderMatchInfo.agregatedInfo.totalDamageDealtToChampions - this.userMatches.agregatedInfo.totalDamageDealtToChampions);
      this.points.push(this.results[8] / 100);
      this.results.push(this.contenderMatchInfo.agregatedInfo.totalMinionsKilled - this.userMatches.agregatedInfo.totalMinionsKilled);
      this.points.push(this.results[9]);
      this.results.push(this.contenderMatchInfo.agregatedInfo.neutralMinionsKilled - this.userMatches.agregatedInfo.neutralMinionsKilled);
      this.points.push(this.results[10]);

      for(var value of this.points) {
        this.finalScore += value;
      }
  }

  showResults() {
    this.showFinalResults = true;
  }
  findAnotherRival() {
    this.contenderMatchInfo = null;
    this.hideDiv = true;
  }
}
