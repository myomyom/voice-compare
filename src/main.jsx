import * as ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  // useGETForQueries: true,
  cache: new InMemoryCache(),
  typePolicies: {
    Query: {
      fields: {
        Page: { keyFields: ["media"], merge: true },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
