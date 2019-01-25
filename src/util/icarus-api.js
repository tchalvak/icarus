import fetchPonyfill from 'fetch-ponyfill'
const { fetch, Request, Response, Headers } = fetchPonyfill();

const apiBase = `https://jpw7bvkdld.execute-api.us-east-1.amazonaws.com/dev/`
const UserKey = 'mockkeyfornow'
const projectKey = 'mockkeyfornow'
const token = 'mocktokenfornow'


const headersSet = {
    "Content-Type": "application/json",
    'User-Key': UserKey,
    'Project-Key': projectKey,
    'Token': token
}


const getHello = () => {
    const icarusPayload = `{greeting(firstName: "Icarus")}`;
    fetch(`${apiBase}query?query=${encodeURIComponent(icarusPayload)}`, { headers: headersSet });
}

const getHelloData = (data) => fetch(`${apiBase}query`, { headers: headersSet });

const postHello = helloData => fetch(`${apiBase}query/`, { method: 'POST', body: helloData, headers: headersSet })