import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-user-element',
  templateUrl: './user-element.component.html',
  styleUrls: ['./user-element.component.less']
})
export class UserElementComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit(): void {
  }

}
