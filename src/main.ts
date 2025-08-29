import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Skapi } from 'skapi-js';

const SERVICE_ID = '';
const OWNER_ID = '';

export const skapi = new Skapi(SERVICE_ID, OWNER_ID);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
