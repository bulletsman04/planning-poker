import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';
import { User } from '../models/user';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-session-main',
  templateUrl: './session-main.component.html',
  styleUrls: ['./session-main.component.less']
})
export class SessionMainComponent implements OnInit {

  public voteOptions: number[];

  constructor(private signalR: SignalRService, public session: SessionService) {
    this.voteOptions = [0, 0.5, 1];
    let nextValue = 2;
    let length;
    while(nextValue < 40){
      this.voteOptions.push(nextValue);
      length = this.voteOptions.length;
      nextValue = this.voteOptions[length - 2] + this.voteOptions[length - 1];
    }

  }

  ngOnInit(): void {
    this.signalR.createConnection('manage-session', 'manage-session');
    this.signalR.registerHandler('manage-session', 'UserJoined', this.userJoinedSessionHandler.bind(this));
  }

  userJoinedSessionHandler(users: User[]) {
    this.session.users = users;
  }

  public vote(value: number){
    this.session.vote(value);
  }
}
