import { tUser, eUserActions } from './actions';
import { tReduxAction } from '../store';

export type tUserState = {
    user: tUser
}

const initialState: tUserState = {
    user: {
        username: 'Unknown',
        title: 'Jobless',
    },
}

export const userReducer = (_state: tUserState = initialState, _action: tReduxAction<eUserActions>) => {
    switch (_action.type) {
        case eUserActions.SET_USER: return {..._state, user: _action.payload}
        case eUserActions.SET_USER_USERNAME: return {
            ..._state,
            user: {
                ..._state.user,
                username: _action.payload
            },
        }
        default: return _state
    }
}