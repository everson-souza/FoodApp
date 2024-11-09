import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { reducers } from './core/store/reducers';
import { FoodEffects } from './core/store/effects';
import { HttpClientModule } from '@angular/common/http';
import { metaReducers } from './core/store/metareducer';
import { HammerModule } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ food: reducers }, { metaReducers }), // Add metaReducer here
    provideEffects([FoodEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false, autoPause: true }),
    importProvidersFrom(HttpClientModule, HammerModule),
  ]
};
