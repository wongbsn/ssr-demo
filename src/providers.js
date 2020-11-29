import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import fetch from "isomorphic-fetch";

const createProvider = ({ ssrMode = false } = {}) => {
  const cache = new InMemoryCache({ addTypename: false });

  if (!ssrMode) {
    cache.restore(window.__APOLLO_STATE__);
  }

  const client = new ApolloClient({
    ssrMode,
    link: createHttpLink({
      uri: "https://countries.trevorblades.com/",
      fetch,
    }),
    cache,
  });

  return {
    Provider: (props) => <ApolloProvider client={client} {...props} />,
    client,
  };
};

export default createProvider;
