import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { visitAll } from '@angular/compiler';
import { SignalRService } from '../services/signal-r.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-screen',
  templateUrl: './join-screen.component.html',
  styleUrls: ['./join-screen.component.less']
})
export class JoinScreenComponent implements OnInit {
  joinError: string = null;
  form: FormGroup;

  constructor(private signalR: SignalRService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      sessionId: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      nick: [null, Validators.required],
    });

    this.signalR.createConnection('start-session', 'start-session');
    this.signalR.registerHandler('start-session', 'JoinSession', this.joinSessionHandler.bind(this));
  }

  getSessionErrorMessage() {
    if (this.form.get('sessionId').hasError('required')) {
      return 'You must enter a value';
    }

    if(this.form.get('sessionId').hasError('minlength') ||this.form.get('sessionId').hasError('maxlength')){
      return 'Session id length should be 8.';
    }

    return '';
  }

  getNickErrorMessage() {
    if (this.form.get('nick').hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  joinSession(){
    this.signalR.sendRequest('start-session', 'JoinSession', this.form.get('nick').value, this.form.get('sessionId').value);
  }

  joinSessionHandler(joined: boolean, error: string) {
    if(joined){
      this.router.navigate(['/', 'session']);
    }
    else{
      this.joinError = error;
    }
  }

}
