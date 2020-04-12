import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { SignalRService } from '../services/signal-r.service';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.less']
})
export class CreateSessionComponent implements OnInit {
  nick = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  constructor(private signalR: SignalRService, private router: Router, private session: SessionService) { }

  ngOnInit(): void {
    this.signalR.createConnection('manage-session', 'manage-session');
    this.signalR.registerHandler('manage-session', 'SessionStarted', this.sessionStarted.bind(this));
  }

  getErrorMessage() {
    if (this.nick.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.nick.hasError('maxlength')) {
      return 'Nick can have maximum 10 characters.';
    }

    return '';
  }

  createSession(){
    this.signalR.sendRequest('manage-session', 'CreateSession', this.nick.value);
  }

  sessionStarted(sessionId){
    this.session.initialize(sessionId, this.nick.value);
    this.router.navigate(['/', 'session']);
  }

}
