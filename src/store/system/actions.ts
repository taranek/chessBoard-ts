import { AppState, UPDATE_SESSION, AppActionTypes } from './types'
export function updateSession(newSession: AppState): AppActionTypes {
  return {
    type: UPDATE_SESSION,
    payload: newSession
  }
}