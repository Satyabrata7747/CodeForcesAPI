const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const router = require("./controller/router");
app.use(router);
app.listen(3000, () => {
  console.log("server Listening on port 3000");
});
