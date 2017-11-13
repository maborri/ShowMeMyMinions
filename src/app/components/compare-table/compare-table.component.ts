import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'smmm-compare-table',
  templateUrl: './compare-table.component.html',
  styleUrls: ['./compare-table.component.scss']
})
export class CompareTableComponent implements OnInit {
  @Input() userMatches;
  constructor() { }

  ngOnInit() {
   
  }

}
