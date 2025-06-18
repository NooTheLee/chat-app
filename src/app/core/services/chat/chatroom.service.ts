import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseService } from '../base/base.service';
import { ChatRoomDtos } from '@/models';
import { ToastService } from '@/shared';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ChatRoomService extends BaseService {

  constructor(http: HttpClient, router: Router, toast: ToastService) {
    super(http, router, toast);
  }

  getAll = (): Observable<ChatRoomDtos> => {
    return this.get<ChatRoomDtos>('Chatroom');
  };

   // protected override handleError(error: HttpErrorResponse): Observable<never> {
  //   // Custom handling
  //   return super.handleError(error);
  // }

  deleteChatroom = (id: string): Observable<void> => {
    return this.delete<void>(`Chatroom/${id}`);
  }
}
