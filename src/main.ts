import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from "./app/app.config";

// Avvia l'applicazione Angular, utilizzando AppComponent come componente principale.
// appConfig contiene la configurazione globale (es. router e HTTP client).
bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
