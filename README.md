# tgl

`tgl` is a simple feature toggle service for Node.js. It's local to the project and comes with a simple UI.

# Usage

You need to initialize `tgl` with a list of existing toggles and a store that has an async `Map` interface, like [Keyv](https://github.com/lukechilds/keyv).

```javascript
const express = require("express");
const Keyv = require("keyv");
const { Tgl, middleware, router } = require("tgl");

const toggles = [
  {
    name: "universal",
    description: "Do we address the world, or the whole universe?",
    defaultValue: false
  },
  {
    name: "lasers",
    description: "Enable lasers!!!",
    defaultValue: true
  }
];
const storage = new Keyv();
const tgl = new Tgl({ toggles, storage });

const app = express();

app.use(middleware(tgl));

app.get("/", (req, res) => {
  const universal = req.tgl.get("universal");
  res.send(universal ? "Hello, universe!" : "Hello, world!");
});

app.use("/tgl", router(tgl));

app.listen(3000, () => console.log("Example app listening on port 3000!"));
```
