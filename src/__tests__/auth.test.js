import '@babel/polyfill' // For async await
import {
    handleLogin,
    isBrowser,
    getUser,
    setUser,
    isLoggedIn,
    isGapiAuthed,
    logout,
} from '../services/auth.js'

// Jest async/await usage suggestions: https://medium.com/@liran.tal/demystifying-jest-async-testing-patterns-b730d4cca4ec

describe('the authentication wrapping library', () => {
    it('has an auth method', () => {
        expect(handleLogin).toBeDefined()
        expect(isBrowser).toBeDefined()
        expect(getUser).toBeDefined()
        expect(logout).toBeDefined()
        expect(typeof handleLogin).toBe('function')
        expect(typeof getUser).toBe('function')
        expect(typeof logout).toBe('function')
    })

    it('can get user data after a valid login', async () => {
        const login = await handleLogin({
            username: 'username',
            password: 'password',
        }).then(() => {
            return true
        })
        expect(login).toBeTruthy()
        const user = getUser()
        expect(user).toBeDefined()
        expect(user).toHaveProperty('username')
        expect(user.username).toBe('username')
    })

    it('has no user data after a logout', () => {
        expect.assertions(6)
        expect(
            handleLogin({ username: 'username', password: 'password' })
        ).toBeTruthy()
        const user1 = getUser()
        expect(user1).toBeDefined()
        expect(user1).toHaveProperty('username')
        expect(
            logout(() => {
                return true
            })
        ).toBe(true)
        const user = getUser()
        expect(user && Object.keys(user).length === 0).toBe(true)
        expect(user.username).not.toBeDefined()
    })

    // This might actually work temporarily as we mock the auth endpoint
    xit('invalidates on an incorrect username and password', async () => {
        const result = await handleLogin({
            username: 'thisshouldneverwork',
            password: 'password',
        })
        expect(result).toBeDefined()
        expect(result).toBe(false)
        expect(getUser()).toBeTruthy()
    })

    it("can get a user's empty data", () => {
        const user = getUser()
        expect(user).toBeDefined()
        expect(getUser()).toMatchObject({})
    })

    xit('accepts a username and password', async () => {
        //expect.assertions(5)
        var login = await handleLogin({
            username: 'username',
            password: 'password',
        })
        expect(login).toBeDefined()
        expect(login).toBe('{"username":"username","password":"password"}')
        const user = getUser()
        expect(user).toBeDefined()
        expect(user).toHaveProperty('username')
        expect(user.username).toBe('username')
    })
})
