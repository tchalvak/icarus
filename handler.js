/*
A graphql schema
*/
const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')

// This method just inserts the user's first name into the greeting message.
const getGreeting = firstName => `Hello, ${firstName}.`

// Fake mock auth
const auth = (authData) => { 
  if(authData.username === 'testuser' && authData.password === 'testuser-345'){
    return {
      "id": "1",
      "email": "test@example.com",
      "url": "http://unknown-endpoint-wrapper.com/authorizations/1",
      "sub": "aaaaaaaa-bbbb-cccc-dddd-example",
      "aud": "xxxxxxxxxxxxexample",
      "email_verified": true,
      "token_use": "id",
      "auth_time": 1500009400,
      "iss": "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_example",
      "cognito:username": "testuser",
      "exp": 1500013000,
      "given_name": "Test User 1",
      "iat": 1500009400,
      "scopes": [
        "public_repo"
      ],
      "token": "213m234m23m23.23m23m2m3m23m23m23.2m23m23m23m23",
      "refresh_token": "12345678901234567890",
      "token_last_eight": "12345678",
      "hashed_token": "25f94a2a5c7fbaf499c665bc73d67c1c87e496da8985131633ee0a95819db2e8",
      "app": {
        "url": "http://app.icarus.io/",
        "name": "Icarus",
        "client_id": "abcde12345fghij67890"
      },
      "note": "optional note",
      "note_url": "http://optional/note/url",
      "updated_at": "2011-09-06T20:39:23Z",
      "created_at": "2011-09-06T17:26:27Z",
      "fingerprint": "jklmnop12345678"
    }
  } else {
      return {}
  }
};

// Here we declare the schema and resolvers for the query
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'HelloQueryType', // an arbitrary name
    fields: {
      // the query has a field called 'greeting'
      greeting: {
        // we need to know the user's name to greet them
        args: { firstName: { name: 'firstName', type: new GraphQLNonNull(GraphQLString) } },
        // the greeting message is a string
        type: GraphQLString,
        // resolve to a greeting message
        resolve: (parent, args) => getGreeting(args.firstName)
      }
    }
  }),
})

// We want to make a GET request with ?query=<graphql query>
// The event properties are specific to AWS. Other providers will differ.
module.exports.query = (event, context, callback) => graphql(schema, event.queryStringParameters.query)
  .then(
    result => callback(null, {statusCode: 200, body: JSON.stringify(result)}),
    err => callback(err)
  )
