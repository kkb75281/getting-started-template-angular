import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import { Skapi } from "skapi-js";

const PROJECT_ID = "";

export const skapi = new Skapi(PROJECT_ID);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err),
);
