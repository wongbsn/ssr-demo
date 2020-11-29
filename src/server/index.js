import React from "react";
import { renderToString } from 'react-dom/server';
import express from "express";
import { render } from "@jaredpalmer/after";
import { getDataFromTree } from "@apollo/client/react/ssr";
import Document from "./Document";
import routes from "../routes";
import createProvider from "../providers";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const chunks = require(process.env.RAZZLE_CHUNKS_MANIFEST);

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get("/*", async (req, res) => {
    try {
      const customRenderer = (node) => {
        const { Provider, client } = createProvider({ ssrMode: true });
        const App = <Provider>{node}</Provider>;

        return getDataFromTree(App).then(() => {
          const initialApolloState = client.extract();
          const html = renderToString(App);
          return { html, initialApolloState };
        });
      };

      const html = await render({
        req,
        res,
        routes,
        assets,
        chunks,
        customRenderer,
        document: Document,
      });
      res.send(html);
    } catch (error) {
      console.error(error);
      res.json({ message: error.message, stack: error.stack });
    }
  });

export default server;
