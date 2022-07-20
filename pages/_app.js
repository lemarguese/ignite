import '../styles/globals.css'
import {ApolloProvider} from "@apollo/client";
import apolloConfig from "./config/apollo/apolloConfig";

function MyApp({Component, pageProps}) {
    return (
        <ApolloProvider client={apolloConfig}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export default MyApp;
