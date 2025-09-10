// src/app/app.config.server.ts
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/ssr';
import { appConfig } from './app.config';
import { provideHttpClient, withFetch } from '@angular/common/http'; // 👈 Adicione estas duas linhas.

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withFetch()) // 👈 Adicione esta linha.
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);