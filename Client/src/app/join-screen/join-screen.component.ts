import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { visitAll } from '@angular/compiler';
import { SignalRService } from '../services/signal-r.service';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { User } from '../models/user';

@Component({
  selector: 'app-join-screen',
  templateUrl: './join-screen.component.html',
  styleUrls: ['./join-screen.component.less']
})
export class JoinScreenComponent implements OnInit {
  joinError: string = null;
  form: FormGroup;
  private sentNickname: string;
  private sentSessionId: string;

  constructor(
    private signalR: SignalRService,
    private router: Router,
    private formBuilder: FormBuilder,
    private session: SessionService
    ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      sessionId: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      nick: [null, [Validators.required, Validators.maxLength(10)]],
    });

    this.signalR.createConnection('manage-session', 'manage-session');
    this.signalR.registerHandler('manage-session', 'JoinSession', this.joinSessionHandler.bind(this));
  }

  getSessionErrorMessage() {
    if (this.form.get('sessionId').hasError('required')) {
      return 'You must enter a value';
    }

    if(this.form.get('sessionId').hasError('minlength') || this.form.get('sessionId').hasError('maxlength')){
      return 'Session id length should be 8.';
    }
    return '';
  }

  getNickErrorMessage() {
    if (this.form.get('nick').hasError('required')) {
      return 'You must enter a value';
    }

    if (this.form.get('nick').hasError('maxlength')) {
      return 'Nick can have maximum 10 characters.';
    }

    return '';
  }

  joinSession(){
    this.sentNickname = this.form.get('nick').value;
    this.sentSessionId = this.form.get('sessionId').value;
    this.signalR.sendRequest('manage-session', 'JoinSession', this.sentNickname, this.sentSessionId);
  }

  joinSessionHandler(joined: boolean, error: string) {
    if (joined){
      this.session.initialize(this.sentSessionId, this.sentNickname);
      this.router.navigate(['/', 'session']);
    }
    else{
      this.joinError = error;
    }
  }

}
