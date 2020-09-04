import { tUser } from './actions'
import { tUserState } from './reducer'
import { useSelector } from 'react-redux'
import { composeSelectors, tSelectorMap, tSelector, tAppState } from '../store'

/**
 * Custom Selectors allow us to customize how we access the Redux store.
 * The necessity of this is up for debate. In the other Redux store sample,
 * we will be deferring to components to access data in more explicit ways
 * simplifying the Redux arena exponentially.
 */

// Define each selector. For proper type hinting, must be of type tSelector.
// Also for type hinting, the state passed in must be the entire state. Possibly a better way to do this?
const userSelector: tSelector = (_state: tAppState): tUser => _state.user.user
const userUsernameSelector: tSelector = (_state: tAppState): string => _state.user?.user?.username ? _state.user.user.username : ''

// Define the selector mapping for type hinting by adding tSelectorMap,
// then assemble all of the selectors in a way that will be used within the Views.
const selectors: tSelectorMap = {
    user: userSelector,
    username: userUsernameSelector,
}

// The total list of return-types from all of the selectors get mapped out here.
// We typically have the entire sub-state, in addition to others that may be sub-sets.
type tUserSelectors = tUserState & {
    username: string
}


// The selector hook which composes memoized selector function. useSelector() comes from react-redux,
// which does the memoizing. To reduce boilderplate, we compose our selectors within a single useSelector call.
// Basically it gives us memoized access to the entire state through function-based getters that already contain
// the data we need.
export const useUserSelectors = <tUserSelectors>() => useSelector(composeSelectors<tUserSelectors>(selectors))
