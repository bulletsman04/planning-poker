import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { SignalRService } from '../services/signal-r.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.less']
})
export class CreateSessionComponent implements OnInit {
  nick = new FormControl('', [Validators.required]);

  constructor(private signalR: SignalRService, private router: Router) { }

  ngOnInit(): void {
    this.signalR.createConnection('start-session', 'start-session');
    this.signalR.registerHandler('start-session', 'SessionStarted', this.sessionStarted.bind(this));
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
    this.router.navigate(['/', 'session']);
  }

}
