import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import appStore from './App.store'

// const customFetch = (uri, options) => {
//     console.log({'options': JSON.parse(options.body).query});
//     console.log({'uri': uri});
//     return fetch('https://commandxback.satisgps.com/api/GraphQL', {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         ...options
//     });
// }

const cache = new InMemoryCache()

const link = new HttpLink({
    uri: 'https://ogumoeafifds3p3oat3aafulte.appsync-api.eu-west-2.amazonaws.com/graphql',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': 'da2-vcxbfe4ajje33f4kttszi3gwda'
    }
})

const middleware = new ApolloLink((operation, forward) => {
    appStore.startLoading()
    console.log({ 'operation': operation })
    return forward(operation).map(response => {
        setTimeout(() => {
            appStore.stopLoading()
            console.log({ 'response': response })
        }, 2000)
        return response
    })
})

export default new ApolloClient({
    link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                    )
                )
            if (networkError) console.log(`[Network error]: ${networkError}`)
        }),
        middleware,
        link
    ]),
    cache
})