import React from 'react'
import { LoginPage, LifeCycles } from './views'
import { Provider as ReduxProvider } from 'react-redux'
import { AppStore } from './redux/ducks-pattern'

/**
 * This is where we should wrap the app in things
 * that lower-level components will depend on, such as
 * access to the Redux Store, and the application's
 * theme/css tools.
 */
function App() {
    return (
        // Empty HTML tags is shorthand for telling React to not
        // compile an HTML wrapper around the contents.
        // React always requires the returned contents to be wrapped,
        // but sometimes this can cause issues in the desired HTML structure.
        // Enter blank tags!
        <>
            <ReduxProvider store={AppStore}>
                <div>
                    <LoginPage />
                    <LifeCycles />
                </div>
            </ReduxProvider>
        </>
    )
}

export default App
