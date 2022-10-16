import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from '~~/apolloClient'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.provide(DefaultApolloClient, apolloClient)
})
