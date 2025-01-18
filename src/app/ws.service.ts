import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../environments/environment';
const wsPort = 8080;
@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private webSocket: Socket;
  constructor() {
    this.webSocket = new Socket({
      url: environment.apiBaseUrl + wsPort,

      options: {},
    });
  }

  sendMessage(event: string, message: any) {
    this.webSocket.emit(event, message);
  }

  connectSocket() {
    this.webSocket.connect();
  }

  isActive() {
    return this.webSocket.active;
  }

  receiveStatus() {
    return this.webSocket.fromEvent('/get-response');
  }

  disconnectSocket() {
    this.webSocket.disconnect();
  }

  // setUpCallbacks({ onConnect, onConnectError, onDisconnect, onError }) {}
}
