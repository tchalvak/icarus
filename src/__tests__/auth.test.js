import { handleLogin, isBrowser, getUser, setUser, isLoggedIn, isGapiAuthed, logout } from '../services/auth.js'

describe('authentication wrapping library' () => {
  it('has an auth method', () => {
    expect(handleLogin).toBeDefined();
    expect(isBrowser).toBeDefined();
    expect(getUser).toBeDefined();
    expect(logout).toBeDefined();
  })

  it('invalidates a wrong username and password', () => {
    expect(handleLogin({username: "username", password: "password"})).toBe(false);
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


describe('Test the api wrapper and endpoints', async function() {
  it('obtains the api methods', () => {
    expect(getHello).toBeDefined()
    expect(getHelloData).toBeDefined()
    expect(postHello).toBeDefined()
  })

  it('tests against the simple promise', async () => {
    var x = await resolveAfterABit(10)
    expect(x).toBe(10)
  })

  it('responds at the hello world lambda stack endpoint', async () => {
    const response = await getHello()
    await expect(response.status).toBe(200)
    await expect(response.json()).resolves.toMatchObject({
      data: { greeting: 'Hello, Icarus.' },
    })
  })

  it('posts a dynamic name to the endpoint', async function() {
    const response = await getHelloData({
      query: `{greeting(firstName: "Test-Runner")}`,
    })
    await expect(response.json()).resolves.toEqual({
      data: { greeting: 'Hello, Test-Runner.' },
    })
  })

  xit('accepts a posted name to the hello endpoint', async function() {
    const response = await postHello({
      query: `{greeting(firstName: "Icarus3")}`,
    })
    await expect(response.json()).resolves.toEqual({
      data: { greeting: 'Hello, Icarus3.' },
    })
  })
})
