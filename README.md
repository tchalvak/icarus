# Icarus
Codename Icarus, APIGateway auto-deployment

## Configure

 - Set up an IAM user for serverless with the appropriate credentials: https://serverless.com/framework/docs/providers/aws/guide/credentials/
(you may want to back down some of the so very high credentials in that account)
 - Set up your aws-cli, I recommend setting it up with a profile specifically for serverless.
 - `aws configure --profile serverless`

## Install

    yarn install
    yarn test
    npm install -g serverless

## Deploy a serverless stack

    serverless deploy

## Additional info

 Setting up a graphql api: https://serverless.com/blog/make-serverless-graphql-api-using-lambda-dynamodb/
