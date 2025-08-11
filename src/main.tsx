// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// type TypePolicy = {
//   queryType?: true;
//   fields: {
//     Page: { keyFields: ["media"]; merge: true };
//   };
// };

const cache = new InMemoryCache({
  typePolicies: {
    Page: { keyFields: ["media"], merge: true },
  },
});

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  // useGETForQueries: true,
  cache: cache,
});

const root = createRoot(document.getElementById("root")!);

root.render(
  // <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
);
