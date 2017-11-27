import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {trigger, transition, style, animate, state} from '@angular/animations';

@Component({
  selector: 'smmm-result-display',
  animations: [
    trigger(
      'fade',
      [
        transition(
        ':enter', [
          style({ opacity: 0}),
          animate('5000ms', style({'opacity': 1}))
        ]
      ),
      transition(
        ':leave', [
          style({ 'opacity': 1}),
          animate('5000ms', style({ 'opacity': 0})),         
        ]
      )]
    )
  ],
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.scss']
})
export class ResultDisplayComponent implements OnInit {
  @Input() results;
  @Output() resetSecondUserMatches: EventEmitter<String> = new EventEmitter<String>();
  constructor() { }

  ngOnInit() {
  }

  findAnotherRival() {
    this.resetSecondUserMatches.emit("reset users");
  }
}
