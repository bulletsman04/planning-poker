import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { visitAll } from '@angular/compiler';
import { SignalRService } from '../services/signal-r.service';

@Component({
  selector: 'app-join-screen',
  templateUrl: './join-screen.component.html',
  styleUrls: ['./join-screen.component.less']
})
export class JoinScreenComponent implements OnInit {
  sessionId = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]);
  nick = new FormControl('', [Validators.required]);


  constructor(private signalR: SignalRService) { }

  ngOnInit(): void {
    this.signalR.createConnection('start-session', 'start-session');
    this.signalR.registerHandler('start-session', 'CanJoin', this.canJoinSessionHandler);
    this.signalR.registerHandler('start-session', 'JoinSession', this.joinSessionHandler);
  }

  getSessionErrorMessage() {
    if (this.sessionId.hasError('required')) {
      return 'You must enter a value';
    }

    if(this.sessionId.hasError('minlength') || this.sessionId.hasError('maxlength')){
      return 'Session id length should be 8.';
    }

    return '';
  }

  getNickErrorMessage() {
    if (this.nick.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  canJoinSession(){
    this.signalR.sendRequest('start-session', 'CanJoinSession', this.nick.value, this.sessionId.value);
  }

  canJoinSessionHandler(canJoin: boolean, error: string){

  }

  joinSession(){
    this.signalR.sendRequest('start-session', 'JoinSession',this.nick.value, this.sessionId.value);
  }

  joinSessionHandler(joined: boolean, error: string) {
    if(joined){
      alert('Joined session');
    }
    else{
      alert(error);
    }
  }

}
