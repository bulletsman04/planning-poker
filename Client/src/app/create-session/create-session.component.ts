import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { SignalRService } from '../services/signal-r.service';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.less']
})
export class CreateSessionComponent implements OnInit {
  nick = new FormControl('', [Validators.required]);

  constructor(private signalR: SignalRService) { }

  ngOnInit(): void {
    this.signalR.createConnection('start-session', 'start-session');
    this.signalR.registerHandler('start-session', 'SessionStarted', this.sessionStarted);
  }

  getErrorMessage() {
    if (this.nick.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  createSession(){
    this.signalR.sendRequest('start-session', 'CreateSession', this.nick.value);
  }

  sessionStarted(sessionId){
    alert(`Session started with id ${sessionId}!`);
  }

}
