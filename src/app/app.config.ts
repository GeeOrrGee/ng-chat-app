import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { baseUrlInterceptor } from './interceptors/baseUrl.interceptor';
import { SocketIoModule } from 'ngx-socket-io';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync('noop'),
    provideHttpClient(withFetch(), withInterceptors([baseUrlInterceptor])),
    importProvidersFrom(
      SocketIoModule.forRoot({
        url: 'http://localhost:50',
        options: {
          transports: ['websocket'],
          autoConnect: false,
          reconnectionAttempts: 3,
          extraHeaders: {
            origin: '*',
          },
        },
      })
    ),
  ],
};
