import {
    handleLogin,
    isBrowser,
    getUser,
    setUser,
    isLoggedIn,
    isGapiAuthed,
    logout,
} from '../services/auth.js'
import { query } from './utils/icarus-api.js' // Api wrapper

// Export an api to use these functions
export default {
    query: query,
    handleLogin: handleLogin,
    getUser: getUser,
    setUser: setUser,
    isLoggedIn: isLoggedIn,
    isGapiAuthed: isGapiAuthed,
    logout: logout,
}