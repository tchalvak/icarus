import { handleLogin, isBrowser, getUser, setUser, isLoggedIn, isGapiAuthed, logout } from '../services/auth.js'

describe('the authentication wrapping library', () => {
  it('has an auth method', () => {
    expect(handleLogin).toBeDefined();
    expect(isBrowser).toBeDefined();
    expect(getUser).toBeDefined();
    expect(logout).toBeDefined();
  })

  it('invalidates a wrong username and password', () => {
    expect(handleLogin({username: "username", password: "password"})).toBe(false);
  })

  it('can get a user\'s empty data', () => {
    expect(getUser()).toBeEmpty();
  })

  it('accepts a username and password', () => {
    expect(handleLogin({username: "username", password: "password"})).toBeDefined();
    expect(getUser()).not.toBeEmpty();
  })

  it('can get user data after a valid login', () => {
    expect(handleLogin({username: "username", password: "password"})).not.toBeEmpty();
    const user = getUser();
    expect(user.username).toBe('username');
  })

  it('has no user data after a logout', () => {
    expect.assertions(6);
    expect(handleLogin({username: "username", password: "password"})).not.toBeEmpty();
    const user1 = getUser();
    expect(user1).not.toBeEmpty();
    expect(user1.username).not.toBeEmpty();
    expect(logout(()=> { return true })).toBe(true)
    const user = getUser();
    expect(user  && Object.keys(user).length === 0).toBe(true);
    expect(user.username).not.toBeDefined();
  })
})
