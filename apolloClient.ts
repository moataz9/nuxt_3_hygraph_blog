import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

const httpsLink = createHttpLink({
  uri: import.meta.env.VITE_HYGRAH_ENDPOINT as string,
})

const authLink = setContext((_, { headers }) => {
  // get the Authentication token from .env file
  const token = import.meta.env.VITE_HYGRAPH_TOKEN
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpsLink),
  cache: new InMemoryCache(),
})
