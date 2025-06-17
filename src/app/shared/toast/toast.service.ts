import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
//
import { AppState, ToastType } from '@/store/app.state';
import { showToast, hideToast } from '@/store/app.actions';
import { selectToast } from '@/store/app.selectors';
import { ToastData } from '@/store/app.state';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private store: Store<{ app: AppState }>) {}
  
  get toast$(): Observable<ToastData | null> {
    return this.store.select(selectToast);
  }

  show = (content: string, toastType: ToastType = 'success', time = 3000) => {
    this.store.dispatch(showToast({ content, toastType, time }));

    setTimeout(() => {
      this.store.dispatch(hideToast());
    }, time);
  };
}
