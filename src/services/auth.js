import { auth } from '../util/icarus-api'

//Set up storage for authed, client-only user

export const isBrowser = () => typeof window !== 'undefined'

// Get the stored user if it exists
export const getUser = () =>
    isBrowser() && window.localStorage.getItem('authUser')
        ? JSON.parse(window.localStorage.getItem('authUser'))
        : {}

// Store the user for later
export const setUser = user =>
    isBrowser() && window.localStorage.setItem('authUser', JSON.stringify(user))

/**
 * Hit the auth endpoint
 * @note Asynchronous!
 * @param {string} username
 * @param {string} password
 * @return Promise with a resolve/reject to return false | string user
 */
export const handleLogin = ({ iusername, ipassword }) => {
    return auth({ username: iusername, password: ipassword })
        .then(response => response.json())
        .then(authInfo => {
            if (authInfo && authInfo.username) {
                return setUser(authInfo)
            } else {
                return false
            }
        })
        .catch(err => {
            console.error('Login error occurred', err)
            return false
        })
}

// Check if the user is logged in and exists at all
export const isLoggedIn = () => {
    const user = getUser()

    return !!user.username
}

// We will want to know specifically if this user can access the gapi
export const isGapiAuthed = () => {
    const user = getUser()
    return !!user.gapiToken
}

// We want to wipe the locally stored data now
export const logout = callback => {
    setUser({})
    return callback()
}
