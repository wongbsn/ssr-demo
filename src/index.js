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


const app = express().use((req, res) => server.handle(req, res));

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;

  app.listen(port, function (err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`> Started on port ${port}`);
  });
}

exports.handler = serverless(app);
