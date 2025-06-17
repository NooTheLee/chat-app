import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';

import { appConfig } from '@/app.config';
import { AppComponent } from '@/components';
import { appReducer } from '@/store/app.reducer';

// Extend the appConfig with NgRx store providers
const providers = [
  ...appConfig.providers,
  provideStore({ app: appReducer }),
  provideStoreDevtools({
    maxAge: 25,
    logOnly: !isDevMode(),
    autoPause: true,
  })
];

bootstrapApplication(AppComponent, { providers })
  .catch((err) => console.error(err));
