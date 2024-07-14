import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appRoutes } from './app.routes';
import { booksFeature } from './feature-creator/+store/reducer';
import { BooksEffect } from './traditional/+store/effects';
import { booksReducer } from './traditional/+store/reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideStore(),
    provideState('traditional-books', booksReducer),
    provideState(booksFeature),
    provideEffects(BooksEffect),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
