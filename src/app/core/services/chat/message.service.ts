import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseService } from '../base/base.service';
import { ChatMessageDto, MessageRequestDto } from '../../../models';
import { ToastService } from '../../../shared/toast/toast.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MessageService extends BaseService {

  constructor(http: HttpClient, router: Router, toast: ToastService) {
    super(http, router, toast);
  }

  sentMessage = (requestDto: MessageRequestDto): Observable<ChatMessageDto> => {
    return this.post<ChatMessageDto>('Message/create', requestDto)
  }

}
