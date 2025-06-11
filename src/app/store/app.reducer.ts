import { createReducer, on } from '@ngrx/store';
import { AppState } from './app.state';
import * as AppActions from './app.actions';

export const initialState: AppState = {
  user: null,
  darkMode: false,
  chatrooms: [],
  currentChatRoomId: '',
  toast: null,
};

export const appReducer = createReducer(
  initialState,

  // User reducers
  on(AppActions.setUser, (state, { user }) => ({
    ...state,
    user,
  })),

  on(AppActions.updateUser, (state, { user }) => ({
    ...state,
    user: state.user ? { ...state.user, ...user } : null,
  })),

  on(AppActions.setUserOnlineStatus, (state, { isOnline }) => ({
    ...state,
    user: state.user ? { ...state.user, isOnline } : null,
  })),

  // Chatroom reducers
  on(AppActions.setChatRooms, (state, { chatrooms }) => ({
    ...state,
    chatrooms,
  })),

  on(AppActions.setCurrentChatRoomId, (state, { id }) => ({
    ...state,
    currentChatRoomId: id,
  })),

  // Toast reducers
  on(AppActions.showToast, (state, { content, toastType }) => ({
    ...state,
    toast: { content, toastType },
  })),

  on(AppActions.hideToast, (state) => ({
    ...state,
    toast: null,
  })),

  on(AppActions.addNewMessage, (state, { newMessage }) => {
    try {
      console.log('newMessage', newMessage);

      const newChatRoom = state.chatrooms.map((cr) => {
        if (cr.id === state.currentChatRoomId) {
          return {
            ...cr,
            messages: [...cr.messages, newMessage],
          };
        }
        return cr;
      });

      return {
        ...state,
        chatrooms: newChatRoom,
      };
    } catch (error) {
      console.log('error', error);
      return {
        ...state,
      };
    }
  })
);
