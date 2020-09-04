import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { userReducer, tUserState } from './user'

// Defining exported types where they are used vs. in a types directory is up for debate.
// This maps out the structure of the Redux State.
export type tAppState = {
    user: tUserState
}

// This generates the Redux Store, combines all the reducers into a single
// one (allows us to define Redux in separate files),
// and initializes all of the middleware we need to use with Redux.
// Redux does not support async actions by default which is one of the
// most common reasons to add middleware.
// redux-thunk also allows us to employ the use of action builders, in addition to
// enabling the use of async functions within actions.
export default createStore(
    combineReducers<tAppState>({
        user: userReducer,
    }),
    applyMiddleware(thunk),
)

// Defining exported types where they are used vs. in a types directory is up for debate.
// Each redux action will require the same 2 things.
export type tReduxAction<T> = {
    type: T
    payload?: any
}

/**
 * Enables dynamic typing of composed selectors.
 * Composing selectors allows for easier access and subscription
 * of Store keys/values.
 * 
 * Set once then forget sort of function.
 */
// This tSelector is to be used to strongly type each individual selector defined in each Duck.
export type tSelector = (state: tAppState) => {}

// The tSelectorMap is to be used when defining the selector object in each Duck.
export type tSelectorMap = { [key: string]: tSelector }

// This composer is similar to the useActions hook in that it wraps selectors in a way that
// reduces boilerplate in the Views, while enabling type hinting in our editors.
export const composeSelectors = <T>(_selectorMap: tSelectorMap) => (state: tAppState): T => {
    const selectors: { [key: string]: any } = {}
    Object.keys(_selectorMap).forEach((_selectorKey: string) => {
        const selector = _selectorMap[_selectorKey]
        selectors[_selectorKey] = selector(state)
    })

    return selectors as T
}