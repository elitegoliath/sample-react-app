import { useActions } from '../../../hooks'
import { tReduxAction } from '../store'

/**
 * Action Creators in the Ducks Pattern are set up to be used like this:
 * const { action1, action2, ...allActions } = useUserActions()
 * 
 * if (thing) action1(arg1, arg2, etc)
 */

// TypeScript allows us to set String type enums. Awesome!
export enum eUserActions {
    SET_USER = 'SET_USER',
    SET_USER_USERNAME = 'SET_USER_USERNAME',
}

// Defining exported types where they are used vs. in a types directory is up for debate.
export type tUser = {
    username?: string
    title?: string
}

// This defines actions useable by UI components. We can define actions outside of this to be dispatched
// by other actions, such as results from middleware.
// TODO: Get example of Middleware in actions, with a sort of private action.
const actions = {
    setUser: (_user: tUser): tReduxAction<eUserActions> => ({ type: eUserActions.SET_USER, payload: _user }),
    setUsername: (_username: string): tReduxAction<eUserActions> => ({ type: eUserActions.SET_USER_USERNAME, payload: _username })
}

// Defining the type of actions that are made available from this Duck enables
// useful type hinting for ease of development.
type tActions = {
    setUser: (_user: tUser) => void
    setUsername: (_username: string) => void
}

// Any variable defined in React with "use" in front of it will automatically
// get converted into a React Hook. React and other libraries come with hooks
// we can use, but we can also make out own.
// This hook provides a memoized function that gives us access to all the actions
// in this Duck without the need for boilerplate setup in the Views.
export const useUserActions = (): tActions => useActions(actions)
