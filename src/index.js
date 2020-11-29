const express = require("express");
const serverless = require("serverless-http");

let server = require("./server").default;

if (module.hot) {
  module.hot.accept("./server", function () {
    console.log("🔁  HMR Reloading `./server`...");
    try {
      server = require("./server").default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info("✅  Server-side HMR Enabled!");
}

const port = process.env.PORT || 3000;

const app = express().use((req, res) => server.handle(req, res));

exports.handler = serverless(app);
