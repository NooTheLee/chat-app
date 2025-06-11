import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseService } from '../base/base.service';
import { ChatRoomDtos } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class ChatRoomService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getAll = (): Observable<ChatRoomDtos> => {
    return this.get<ChatRoomDtos>('Chatroom');
  };
}
