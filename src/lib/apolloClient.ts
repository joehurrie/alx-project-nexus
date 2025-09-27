// src/lib/apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://ecowise-backend.vercel.app/api/graphql', // your Payload CMS endpoint
  }),
})
