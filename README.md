# tgl

`tgl` is a simple feature toggle service for Node.js. It's local to the project and comes with a simple UI.

# Usage

```javascript
const express = require("express");
const MemoryStorage = require("../storage/memory");
const Tgl = require("../lib");

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
const storage = new MemoryStorage();
const toggleService = new Tgl({ toggles, storage });

const app = express();

app.get("/", async (req, res) => {
  const universal = await toggleService.get("universal");
  res.send(universal ? "Hello, universe!" : "Hello, world!");
});

app.use("/tgl", toggleService.router());
app.listen(3000, () => console.log("Example app listening on port 3000!"));
```

# Roadmap

- [ ] Prettier UI
- [ ] Include middleware for setting feature flags using query params
- [ ] Support enum flags
