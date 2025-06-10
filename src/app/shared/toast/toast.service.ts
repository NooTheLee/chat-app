import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type ToastType = 'success' | 'error' | 'warning' | 'infor';

export interface ToastData {
  content: string;
  type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastData | null>(null);

  toast$ = this.toastSubject.asObservable();

  show = (content: string, type: ToastType, time = 3000) => {
    this.toastSubject.next({ content, type });

    setTimeout(() => {
      this.toastSubject.next(null);
    }, time);
  };
}
