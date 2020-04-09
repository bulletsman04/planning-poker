import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { SignalRService } from './signal-r.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public average: number;
  public sessionId: string;
  // tslint:disable-next-line: variable-name
  private _users: User[];
  private user: string;

  constructor(private signalR: SignalRService) {
    this.signalR.createConnection('manage-session', 'manage-session');
    this.signalR.registerHandler('manage-session', 'SessionInfo', this.sessionInfoHandler.bind(this));


    this.average = 0;
    this._users = [];
    // const sessionLS = JSON.parse(localStorage.getItem('sessionId'));

   // if (sessionLS){
   //   this.sessionId = sessionLS;
   //   this.signalR.sendRequest('manage-session', 'SessionInfo', sessionLS);
   // }

   }

  public initialize(sessionId: string, user: string){
    this.sessionId = sessionId;
    this.user = user;
    localStorage.setItem('sessionId', JSON.stringify(sessionId));
    this.signalR.sendRequest('manage-session', 'SessionInfo', sessionId);
    setInterval(() => {
      this.signalR.sendRequest('manage-session', 'KeepAlive', sessionId);
    }, 5000);
  }

  public leaveSession(){
    // localStorage.removeItem('sessionId');
    this.signalR.sendRequest('manage-session', 'LeaveSession', this.sessionId);
  }

  private sessionInfoHandler(users: User[]){
    this._users = users;
  }

  vote(value: number) {
    let user = this._users.find(u => u.nickName === this.user);
    user.voteValue = value;
    this.signalR.sendRequest('manage-session', 'Vote', this.sessionId, value);
  }


  get users(){
    return this._users;
  }

  set users(users) {
    this._users = users;
    localStorage.setItem('sessionId', JSON.stringify(this.sessionId));
  }

}
