import {ApolloClient, InMemoryCache} from "@apollo/client";

const apolloConfig = new ApolloClient({
    uri: 'https://api.vrmarketing.guru/',
    cache: new InMemoryCache(),
});

export default apolloConfig;
