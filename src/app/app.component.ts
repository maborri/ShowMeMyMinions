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
  
  onUserSelected(data) {
    console.log("en user selected:", data);
    this.userInfo = data;
  }

  onMatchesFound(matches) {
    this.userMatches = matches;
  }

  onSecondUserSelected(data) {
    console.log("en secondUserInfo selected:", data);
    this.secondUserInfo = data;
  }

  onSecondMatchesFound(matches) {
    this.secondUserMatches = matches;
  }

  
}