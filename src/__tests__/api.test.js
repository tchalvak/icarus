import '@babel/polyfill' // For async await
import {
    getHello,
    postHello,
    getHelloData,
    auth,
    query,
} from '../util/icarus-api.js'
import fetchPonyfill from 'fetch-ponyfill'
const { fetch, Request, Response, Headers } = fetchPonyfill()

// Just a simple promise to mock out the first async await
const resolveAfterABit = x => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x)
        }, 1)
    })
}

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

    it('posts a dynamic name to the endpoint', async () => {
        const response = await getHelloData({
            query: `{greeting(firstName: "Test-Runner")}`,
        })
        await expect(response.json()).resolves.toEqual({
            data: { greeting: 'Hello, Test-Runner.' },
        })
    })

    it('gets auth info returned', async () => {
        const response = await auth({
            username: 'someUsername',
            password: 'somepass',
        })
        expect(response.json()).toEqual({
            username: 'username',
            password: 'password',
        })
    })

    it('allows an arbitrary graphql query', async () => {
        const response = await query({
            query: `{greeting(firstName: "Query-Running-Test")}`,
        })
        await expect(response.json()).resolves.toEqual({
            data: {
                greeting: 'Hello, Query-Running-Test.',
            },
        })
    })

    /*xit('accepts a posted name to the hello endpoint', async function() {
        const response = await postHello({
            query: `{greeting(firstName: "Icarus3")}`,
        })
        await expect(response.json()).resolves.toEqual({
            data: { greeting: 'Hello, Icarus3.' },
        })
    })*/
})
