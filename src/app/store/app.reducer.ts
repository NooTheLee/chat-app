import { createReducer, on } from '@ngrx/store';
import { AppState } from './app.state';
import * as AppActions from './app.actions';

export const initialState: AppState = {
  user: null,
  darkMode: false,
  chatrooms: [],
  currentChatRoomId: '',
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
  }))
);
