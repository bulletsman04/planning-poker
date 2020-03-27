import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { CreateSessionComponent } from './create-session/create-session.component';
import { JoinScreenComponent } from './join-screen/join-screen.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartScreenComponent},
  { path: 'create', component: CreateSessionComponent},
  { path: 'join', component: JoinScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
