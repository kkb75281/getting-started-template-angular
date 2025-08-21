import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Skapi } from 'skapi-js';

const SERVICE_ID = 'ap22uU9iEzUsYtdNgi5D';
const OWNER_ID = 'bf305ace-03b5-4f9d-b88f-291458748ca3';

export const skapi = new Skapi(SERVICE_ID, OWNER_ID);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
