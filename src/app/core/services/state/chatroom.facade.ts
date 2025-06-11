import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, combineLatest } from 'rxjs';

import { ChatMessageDto, ChatRoomDto, ChatRoomDtos } from '../../../models';
import * as AppActions from '../../../store/app.actions';
import * as AppSelectors from '../../../store/app.selectors';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomsStateService {
  constructor(private store: Store) {}

  // Selectors
  get chatrooms$(): Observable<ChatRoomDtos | []> {
    return this.store.select(AppSelectors.selectChatRooms);
  }

  get currentChatRoomId$(): Observable<string> {
    return this.store.select(AppSelectors.selectCurrentChatRoomId);
  }

  getCurrentChatRoom(): Observable<ChatRoomDto | undefined> {
    return combineLatest([
      this.chatrooms$,
      this.currentChatRoomId$
    ]).pipe(
      map(([chatrooms, currentId]) => 
        chatrooms.find(chatroom => chatroom.id === currentId)
      )
    );
  }

  getCurrentChatRoomMessages(): Observable<ChatMessageDto[]> {
    return combineLatest([
      this.chatrooms$,
      this.currentChatRoomId$
    ]).pipe(
      map(([chatrooms, currentId]) => 
        chatrooms.find(chatroom => chatroom.id === currentId)?.messages || []
      )
    );
  }

  // Actions
  setChatRooms(chatrooms: ChatRoomDtos): void {
    this.store.dispatch(AppActions.setChatRooms({ chatrooms }));
  }

  updateChatRooms(chatrooms: Partial<ChatRoomDtos>): void {
    this.store.dispatch(AppActions.updateChatRooms({ chatrooms }));
  }

  setCurrentId(id: string): void {
    this.store.dispatch(AppActions.setCurrentChatRoomId({ id }));
  }
} 