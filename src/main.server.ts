import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { serverRoutes } from './app/app.routes.server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { provideServerRendering } from '@angular/platform-server';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

const bootstrap = () =>
  bootstrapApplication(AppComponent, {
    providers: [
      provideServerRendering(),
      provideServerRoutesConfig(serverRoutes),
      provideHttpClient(withInterceptorsFromDi()),
    ],
  });

export default bootstrap;
