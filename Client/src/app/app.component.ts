import { Component } from '@angular/core';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Client';

  constructor(private session: SessionService){}

  homeClick(){
    debugger;
    this.session.leaveSession();
  }

}


