import React from 'react'
import { useUserSelectors, useUserActions } from '../../redux/ducks-pattern'

/**
 * LOGIN PAGE
 * 
 * This simulates a simple relationship with Redux using
 * a common model type, the User.
 */
const LoginPage = () => {
    // A simple click function.
    const onSignInClick = () => {
        // ATTN: The code below is from the Ducks Pattern Redux.
        setUser({
            username: 'King Jenkins',
            title: 'King',
        })
    }

    // ATTN: The code below is from the Ducks Pattern Redux.
    const { user } = useUserSelectors()
    const { setUser } = useUserActions()

    return (
        <div>
            <h1>Welcome to the login page!</h1>
            <div>
                <div>Username: {user.username}</div>
                <div>User Title: {user.title}</div>
                <button onClick={onSignInClick}>Sign In</button>
            </div>
        </div>
    )
}

export default LoginPage;