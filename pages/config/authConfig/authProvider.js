import {createContext, useContext, useEffect, useState} from "react";
import {ApolloClient, ApolloProvider, gql, HttpLink, InMemoryCache} from "@apollo/client";
import {AUTH_TOKEN} from "./authConfig";

const authContext = createContext();

export function AuthProvider({children}) {
    const auth = useProvideAuth()

    return (
        <authContext.Provider value={auth}>
            <ApolloProvider client={auth.createApolloClient()}>
                {children}
            </ApolloProvider>
        </authContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(authContext)
}

function useProvideAuth() {

    useEffect(() => {
        setAuthToken(localStorage.getItem(AUTH_TOKEN));
    }, [])
    const [authToken, setAuthToken] = useState(null)

    const isSignedIn = () => {
        return !!authToken;
    }

    // const shallNotPass = () => {
    //     if (!authToken) {
    //         location.assign('/');
    //     }
    // }

    const getAuthHeaders = () => {
        if (!authToken) return null

        return {
            authorization: `Bearer ${authToken}`,
        }
    }

    const createApolloClient = () => {
        const link = new HttpLink({
            uri: 'https://api.vrmarketing.guru/',
            headers: getAuthHeaders(),
        })

        return new ApolloClient({
            link,
            cache: new InMemoryCache(),
        })
    }

    const client = createApolloClient();

    const signIn = async ({email, password}) => {

        const result = await client.mutate({
            mutation: gql`
            mutation login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    token
                }
            }`,
            variables: {email, password},
        })

        if (result?.data?.login?.token) {
            localStorage.setItem(AUTH_TOKEN, result.data.login.token);
            setAuthToken(result.data.login.token)
            location.assign('/feed');
        }
    }

    const signOut = () => {
        setAuthToken(null)
        localStorage.removeItem(AUTH_TOKEN);
        location.assign('/');
    }

    const signUp = async ({name, email, password}) => {
        const res = await client.mutate({
            mutation: gql`
                mutation signup($name: String!, $email: String!, $password: String!) {
                    signup (name: $name, email: $email, password: $password) {
                        token
                    }
                }`,
            variables: {name, email, password}
        });

        console.log(res);
        if (res?.data?.signup?.token) {
            localStorage.setItem(AUTH_TOKEN, res.data.signup.token);
            setAuthToken(res.data.signup.token);
            location.assign('/feed');
        }
    }

    const getAuthToken = () => authToken

    return {
        setAuthToken,
        getAuthToken,
        isSignedIn,
        signIn,
        signUp,
        signOut,
        createApolloClient,
    }
}