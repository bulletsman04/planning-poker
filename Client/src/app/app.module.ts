import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppRoutingModule } from './app-routing.module';
import { JoinScreenComponent } from './join-screen/join-screen.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CreateSessionComponent } from './create-session/create-session.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { UserElementComponent} from './user-element/user-element.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SessionMainComponent } from './session-main/session-main.component';
import {MatIconModule} from '@angular/material/icon';
import { FlipModule } from 'ngx-flip';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    AppComponent,
    JoinScreenComponent,
    CreateSessionComponent,
    StartScreenComponent,
    SessionMainComponent,
    UserElementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
     FlipModule,
     MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
