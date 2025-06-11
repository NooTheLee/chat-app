import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, combineLatest } from 'rxjs';

import {
  ChatMessageDto,
  ChatRoomDto,
  ChatRoomDtos,
  ChatUserDto,
} from '../../../models';
import * as AppActions from '../../../store/app.actions';
import * as AppSelectors from '../../../store/app.selectors';
import { AuthStateService } from './auth.facade';

@Injectable({
  providedIn: 'root',
})
export class ChatRoomsStateService {
  constructor(
    private store: Store,
    private authStateService: AuthStateService
  ) {}

  // Selectors
  get chatrooms$(): Observable<ChatRoomDtos | []> {
    return this.store.select(AppSelectors.selectChatRooms);
  }

  get currentChatRoomId$(): Observable<string> {
    return this.store.select(AppSelectors.selectCurrentChatRoomId);
  }

  getCurrentChatRoom(): Observable<ChatRoomDto | undefined> {
    return combineLatest([this.chatrooms$, this.currentChatRoomId$]).pipe(
      map(([chatrooms, currentId]) =>
        chatrooms.find((chatroom) => chatroom.id === currentId)
      )
    );
  }

  getCurrentChatRoomMessages(): Observable<ChatMessageDto[]> {
    return combineLatest([this.chatrooms$, this.currentChatRoomId$]).pipe(
      map(
        ([chatrooms, currentId]) =>
          chatrooms.find((chatroom) => chatroom.id === currentId)?.messages ||
          []
      )
    );
  }

  getOtherMember(): Observable<ChatUserDto | undefined> {
    return combineLatest([this.chatrooms$, this.currentChatRoomId$, this.authStateService.userId$]).pipe(
      map(([chatrooms, currentId, userId]) => {
        return chatrooms
          .find((cr) => cr.id === currentId)
          ?.members?.find((mem) => mem.id !== userId);
      })
    );
  }

  // Actions
  setChatRooms(chatrooms: ChatRoomDtos): void {
    this.store.dispatch(AppActions.setChatRooms({ chatrooms }));
  }

  updateChatRooms(chatrooms: Partial<ChatRoomDtos>): void {
    this.store.dispatch(AppActions.updateChatRooms({ chatrooms }));
  }

  setCurrentChatRoomId(id: string): void {
    this.store.dispatch(AppActions.setCurrentChatRoomId({ id }));
  }

  addNewMessageToCurrentChatRoom(newMessage: ChatMessageDto): void {
    this.store.dispatch(AppActions.addNewMessage({ newMessage }));
  }
}
