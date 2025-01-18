import { inject, Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private webSocket = inject(Socket);
  private platformId = inject(PLATFORM_ID);

  constructor() {}

  sendMessage(event: string, message: any) {
    console.log(`Sending message: ${message} to event: ${event}`);
    this.webSocket.emit(event, message);
  }

  connectSocket() {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Attempting to connect to WebSocket...');
      this.webSocket.connect();
      this.webSocket.on('connect', () => console.log('WebSocket connected'));
      this.webSocket.on('error', (error: any) =>
        console.log('WebSocket error', error)
      );
      this.webSocket.on('connect_error', (error: any) =>
        console.log('WebSocket connection error', error)
      );
    } else {
      console.log('WebSocket connection attempt skipped on server side');
    }
  }

  isActive() {
    return this.webSocket.active;
  }

  on(event: string, cb: (data: any) => void) {
    return this.webSocket.fromEvent(event).subscribe(cb);
  }

  disconnectSocket() {
    console.log('Disconnecting WebSocket...');
    this.webSocket.disconnect();
  }
}
