import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { apiUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SignalRService {

  private connections;
  private connectionsPromises;
  private events;

  constructor() {
    this.connections = {};
    this.connectionsPromises = {};
    this.events = [];
   }

  public createConnection(key: string, hubName: string) {

    if (this.connections[key]) {
      return Promise.resolve();
    }

    this.connections[key] = new signalR.HubConnectionBuilder();


    this.connections[key] = this.connections[key]
    .withUrl(`${apiUrl}/${hubName}`)
    .withAutomaticReconnect([0, 0, 1, 1]);

    this.connections[key] = this.connections[key]
      .configureLogging(signalR.LogLevel.Information)
      .build();


    this.connectionsPromises[key] = this.connections[key]
      .start()
      .catch(err => {
        console.log(`Could not create connection to ${hubName} hub: ${err}`);
        throw err;
      });

    return this.connectionsPromises[key];
  }


  public registerHandler(hubKey: string | number, functionName: any, handler: any) {

    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].hubKey === hubKey && this.events[i].functionName === functionName) {
        return;
      }
    }

    this.connections[hubKey].on(functionName, handler);
    this.events.push({ hubKey, functionName });
  }

  public unregisterHandlers() {
    this.events.forEach(event => {
      this.connections[event.hubKey].off(event.functionName);
    });

    this.events = null;
  }

  public sendRequest(hubKey: string | number, serverMethodName: any, ...params: any[]) {
    if (!this.connections || !this.connections[hubKey]) {
      throw new Error('Connection not yet established');
    }

    params = params.filter((value) => value !== undefined);
    return new Promise((resolve, reject) => {
      this.connectionsPromises[hubKey]
        .then(() => {
          let p;

          p = this.connections[hubKey]
            .invoke(serverMethodName, ...params)

          p.then(() => resolve())
            .catch(err => {
              console.log(`Could not send a request: ${err}, server method name: ${serverMethodName}`);
              reject(err);
            });
        })
        .catch((err) => reject(err));
    });
  }

  public isConnectionReady(hubKey: string | number) {
    return (
      this.connections[hubKey].state === signalR.HubConnectionState.Connected
    );
  }
}
