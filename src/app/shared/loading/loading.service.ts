import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
//
import { AppState } from '@/store/app.state';
import { setLoading } from '@/store/app.actions';
import { selectLoading } from '@/store/app.selectors';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  constructor(private store: Store<{ app: AppState }>) {}
  
  get loading$(): Observable<boolean> {
    return this.store.select(selectLoading);
  }

  setLoading = (loading: boolean) => {
    this.store.dispatch(setLoading({loading}));
  };
}
