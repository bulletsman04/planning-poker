import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';
import { User } from '../models/user';
import { SessionService } from '../services/session.service';
import { Router} from '@angular/router';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-session-main',
  templateUrl: './session-main.component.html',
  styleUrls: ['./session-main.component.less']
})
export class SessionMainComponent implements OnInit {

  public voteOptions: number[];
  public usersRows: number;
  private userElementsHeight: number = 50;
  public sessionLink: string;
  public tooltipPosition = 'right';

  constructor(
    private signalR: SignalRService,
    public session: SessionService,
    private router: Router
    ) {

    const origin = window.location.origin;
    this.sessionLink = `${origin}/join/${this.session.sessionId}`;

    if(!session.sessionId) {
      this.router.navigate(['/']);
    }

    this.voteOptions = [null, 0, 0.5, 1];
    let nextValue = 2;
    let length;
    while(nextValue < 40){
      this.voteOptions.push(nextValue);
      length = this.voteOptions.length;
      nextValue = this.voteOptions[length - 2] + this.voteOptions[length - 1];
    }

    const height = window.innerHeight - 150;
    this.usersRows = Math.floor(height / this.userElementsHeight);
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

  public showVotes(){
    this.session.showVotes();
  }

  public clearVotes(){
    this.session.clearVotes();
  }
}
