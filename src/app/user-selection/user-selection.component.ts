import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'smmm-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.scss']
})
export class UserSelectionComponent implements OnInit {
  apikey: number = 0;
  constructor() { }

  ngOnInit() {
  }
  
}
