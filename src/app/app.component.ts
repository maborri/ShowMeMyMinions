import { Component } from '@angular/core';

@Component({
  selector: 'smmm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smmm';
  userInfo;
  secondUserInfo;
  userMatches;
  secondUserMatches;
  finalScore;
  results;

  onUserSelected(data) {
    this.userInfo = data;
  }

  onMatchesFound(matches) {
    this.userMatches = matches;
    this.secondUserMatches = null;
    this.secondUserInfo = null;
  }

  onSecondUserSelected(data) {
    this.secondUserInfo = data;
  }

  onSecondMatchesFound(matches) {
    this.secondUserMatches = matches;
  }

  onResetMatches(event) {
    this.secondUserMatches = null;
    this.secondUserInfo = null;
    this.results = null;
  }
  
  onShowResult(results) {
    console.log("on show result:", results)
    this.results = results
  }
}