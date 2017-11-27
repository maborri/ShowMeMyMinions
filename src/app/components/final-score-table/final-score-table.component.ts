import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {trigger, transition, style, animate, state} from '@angular/animations';

@Component({
  selector: 'smmm-final-score-table',
  animations: [
    trigger(
      'fade',
      [
        transition(
        ':enter', [
          style({ opacity: 0}),
          animate('500ms', style({'opacity': 1}))
        ]
      ),
      transition(
        ':leave', [
          style({ 'opacity': 1}),
          animate('500ms', style({ 'opacity': 0})),         
        ]
      )]
    )
  ],
  templateUrl: './final-score-table.component.html',
  styleUrls: ['./final-score-table.component.scss']
})
export class FinalScoreTableComponent implements OnInit {
  @Input() userMatches;
  @Input() secondUserMatches;
  @Output() sendFinalScore: EventEmitter<any> = new EventEmitter<any>();
  results = [];
  points = [];
  finalScore = 0;
  showPoints: boolean;

  constructor() { }

  ngOnInit() {
    this.calculateResults();
  }
  
  calculateResults() {
    this.results.push(this.userMatches.agregatedInfo.kills - this.secondUserMatches.agregatedInfo.kills);
    this.points.push(this.results[0] * 10);
    this.results.push(this.userMatches.agregatedInfo.deaths - this.secondUserMatches.agregatedInfo.deaths);
    this.points.push(this.results[1] * (-10));
    this.results.push(this.userMatches.agregatedInfo.assists - this.secondUserMatches.agregatedInfo.assists);
    this.points.push(this.results[2] * 10);
    this.results.push(this.userMatches.agregatedInfo.doubleKills - this.secondUserMatches.agregatedInfo.doubleKills);
    this.points.push(this.results[3] * 20);
    this.results.push(this.userMatches.agregatedInfo.tripleKills - this.secondUserMatches.agregatedInfo.tripleKills);
    this.points.push(this.results[4] * 30);
    this.results.push(this.userMatches.agregatedInfo.quadraKills - this.secondUserMatches.agregatedInfo.quadraKills);
    this.points.push(this.results[5] * 40);
    this.results.push(this.userMatches.agregatedInfo.pentaKills - this.secondUserMatches.agregatedInfo.pentaKills);
    this.points.push(this.results[6] * 50);
    this.results.push(this.userMatches.agregatedInfo.goldEarned - this.secondUserMatches.agregatedInfo.goldEarned);
    this.points.push(this.results[7] / 200);
    this.results.push(this.userMatches.agregatedInfo.totalDamageDealtToChampions - this.secondUserMatches.agregatedInfo.totalDamageDealtToChampions);
    this.points.push(this.results[8] / 200);
    this.results.push(this.userMatches.agregatedInfo.totalMinionsKilled - this.secondUserMatches.agregatedInfo.totalMinionsKilled);
    this.points.push(this.results[9] / 4);
    this.results.push(this.userMatches.agregatedInfo.neutralMinionsKilled - this.secondUserMatches.agregatedInfo.neutralMinionsKilled);
    this.points.push(this.results[10] / 2);

    for(var value of this.points) {
      this.finalScore += value;
    }
  }

  showResults() {
    let winner = this.finalScore > 0 ? this.userMatches.agregatedInfo.summName : this.secondUserMatches.agregatedInfo.summName;
    let won = this.finalScore > 0;
    this.finalScore = Math.abs(this.finalScore);
    this.sendFinalScore.emit({ finalScore: this.finalScore, winner: winner, won: won });
    this.showPoints = true;
  }

  calculateResult(value) {
    if(value == 0)
      return 'Tie';
    else if(value < 0)
      return 'Lose';
    else
      return 'Win';
  }
}
