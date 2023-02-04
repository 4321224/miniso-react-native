const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router");
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/", router);

app.listen(PORT, () => {
  console.log("this app running on port", PORT);
});

module.exports = app;
