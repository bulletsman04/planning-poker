import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.less']
})
export class CreateSessionComponent implements OnInit {
  nick = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.nick.hasError('required')) {
      return 'You must enter a value';
    }

    return this.nick.hasError('email') ? 'Not a valid email' : '';
  }

}
