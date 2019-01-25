import { getHello, postHello } from '../utils/icarus-api.js'

describe('Test to hit the api', async function() {
  it('responds at the hello world lambda stack endpoint', async () => {
    const response = await getHello()
    expect(response.name).toBe('Roy')
  })

  it('accepts a posted name to the hello endpoint', async function() {
    const response = await postHello({
      query: `{greeting(firstName: "Icarus")}`,
    })
    expect(response.name).toBe('Icarus')
  })
})
