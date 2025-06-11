import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';

import { appReducer } from './store/app.reducer';

// Export the NgRx store providers
export const appStoreProviders = [
  provideStore({ app: appReducer }),
  provideStoreDevtools({
    maxAge: 25,
    logOnly: !isDevMode(),
    autoPause: true,
  })
];

// This file is now only used for exporting providers
// The actual bootstrapping is done in main.ts