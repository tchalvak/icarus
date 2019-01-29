import { auth } from '../util/icarus-api'

//Set up storage for authed, client-only user

export const isBrowser = () => typeof window !== "undefined"

// Get the stored user if it exists
export const getUser = () =>
    isBrowser() && window.localStorage.getItem("authUser")
        ? JSON.parse(window.localStorage.getItem("authUser"))
        : {}

// Store the user for later
const setUser = user =>
    isBrowser() && window.localStorage.setItem("authUser", JSON.stringify(user))

/**
 * Hit the auth endpoint
 * @param {string} username
 * @param {string} password
 */
export const handleLogin = ({ username, password }) => {
    const authInfo = auth({username: username, password: password}).then((response)=> response.json()).then(
        (authInfo) => {
            if(authInfo !== false && authInfo.username !== null){
                return setUser(authInfo)
            } else {
                return false
            }
        }
    );
}

// Check if the user is logged in and exists at all
export const isLoggedIn = () => {
    const user = getUser()

    return !!user.username
}

// We will want to know specifically if this user can access the gapi
export const isGapiAuthed = () => {
    const user = getUser();
    return !!user.gapiToken;
}

// We want to wipe the locally stored data now
export const logout = callback => {
    setUser({})
    callback()
}