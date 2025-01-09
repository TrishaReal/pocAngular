import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Configurazione globale dell'applicazione.
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),      // Registra il router
    provideHttpClient(),        // Registra il client HTTP
    provideAnimationsAsync()    // Registra le animazioni (opzionali)
  ]
};
