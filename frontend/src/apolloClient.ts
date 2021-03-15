import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://codecollab.me/graphql",
    cache: new InMemoryCache(),
});

export default client;