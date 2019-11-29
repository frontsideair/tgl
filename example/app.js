const express = require("express");
const Keyv = require("keyv");
const { Tgl, middleware, router } = require("../lib");

const toggles = [
  {
    name: "universal",
    description: "Do we address the world, or the whole universe?",
    default: false
  },
  {
    name: "lasers",
    description: "Enable lasers!!!",
    default: true
  }
];
const storage = new Keyv();
const tgl = new Tgl({ toggles, storage });

const app = express();

app.use(middleware(tgl));

app.get("/", (req, res) => {
  const universal = req.tgl.universal;
  res.send(universal ? "Hello, universe!" : "Hello, world!");
});

app.use("/tgl", router(tgl));

module.exports = app;
