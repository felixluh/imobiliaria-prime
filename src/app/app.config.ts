import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http'; // ⬅️ LINHA IMPORTANTE

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()), // ⬅️ ESSA É A LINHA QUE VOCÊ PRECISA ADICIONAR!
  ]
};