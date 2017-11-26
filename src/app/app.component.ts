import { Component } from '@angular/core';
import {trigger, transition, style, animate, state} from '@angular/animations';

@Component({
  selector: 'smmm-root',
  animations: [
    trigger(
      'slide',
      [
        transition(
        ':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', 'opacity': 1}))
        ]
      ),
      transition(
        ':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('500ms', style({transform: 'translateX(100%)', 'opacity': 0})),         
        ]
      )]
    ),
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
    ),
    trigger(
      'fade-fast',
      [
        transition(
        ':enter', [
          style({ opacity: 0}),
          animate('100ms', style({'opacity': 1}))
        ]
      ),
      transition(
        ':leave', [
          style({ 'opacity': 1}),
          animate('100ms', style({ 'opacity': 0})),         
        ]
      )]
    )
  ],
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

  onProPlayerSelected(inf) {
    this.secondUserInfo = inf;
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