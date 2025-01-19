import { inject, Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Socket } from 'ngx-socket-io';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WebSocketService extends Socket {
  private platformId = inject(PLATFORM_ID);
  private authService = inject(AuthService);

  constructor() {
    super({
      url: 'http://localhost:50',
      options: {
        transports: ['websocket'],
        autoConnect: false,
        reconnectionAttempts: 3,
        extraHeaders: {
          origin: '*',
        },
      },
    });

    const token = this.authService.getToken();

    if (!token) {
      console.error('No token found');
      this.disconnectSocket();
      return;
    }

    this.ioSocket['auth'] = { token: this.authService.getToken() };
    this.connectSocket();
  }

  sendMessage(event: string, message: any): Observable<any> {
    console.log(`Sending message: ${message} to event: ${event}`);
    return this.emit(event, message).fromEvent(event);
  }

  connectSocket() {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Attempting to connect to WebSocket...');
      this.connect();
      this.on('connect', () => console.log('WebSocket connected'));
      this.on('error', (error: any) => {
        if (error.message === 'Invalid token') {
          console.log('Invalid token');
          this.authService.logout();
        }
      });
      this.on('connect_error', (error: any) => {
        console.log('WebSocket connection error', error);
      });
      this.on('disconnect', () => {
        console.log('WebSocket disconnected');
      });
    } else {
      console.log('WebSocket connection attempt skipped on server side');
    }
  }

  isActive() {
    return this.active;
  }

  disconnectSocket() {
    console.log('Disconnecting WebSocket...');
    this.disconnect();
  }
}
