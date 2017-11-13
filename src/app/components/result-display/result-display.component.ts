import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'smmm-result-display',
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
