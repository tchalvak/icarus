import fetchPonyfill from 'fetch-ponyfill'
const { fetch, Request, Response, Headers } = fetchPonyfill()

const apiBase = `https://jpw7bvkdld.execute-api.us-east-1.amazonaws.com/dev/`
const UserKey = 'mockkeyfornow'
const projectKey = 'mockkeyfornow'
const token = 'mocktokenfornow'

const headersSet = {
    'Content-Type': 'application/json',
    'User-Key': UserKey,
    'Project-Key': projectKey,
    //token: token,
}

// Simply give a hello response back, hardcoded as icarus
export const getHello = () => {
    const icarusPayload = `{greeting(firstName: "Icarus")}`
    return fetch(`${apiBase}query?query=${encodeURIComponent(icarusPayload)}`, {
        headers: headersSet,
    })
}

// A simple hit against the endpoint with no associated data
export const getHelloData = data => {
    return fetch(
        `${apiBase}query?query=${encodeURIComponent(data && data.query)}`,
        { headers: headersSet }
    )
}

// Try posting against the endpoint as well
export const postHello = helloData => {
    return fetch(`${apiBase}query/`, {
        method: 'POST',
        body: helloData,
        headers: headersSet,
    })
}

// A mock auth promise
export const auth = auth => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { username: 'username', password: 'password' }
            const response = {
                json: () => {
                    return data
                },
            }
            resolve(response)
        }, 300)
    })
}
/*
// Just a call to the auth query
export const auth = auth => {
    return fetch(`${apiBase}query?query=${encodeURIComponent({auth: auth})}`, {
        headers: headersSet,
    })
}
*/
