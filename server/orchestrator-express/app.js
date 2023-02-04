const cors = require("cors");
const express = require("express");
const app = express();
const PORT = 4000;
const router = require("./router");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ msg: "success" });
});

app.use("/", router);

app.listen(PORT, () => {
  console.log("listen on port", PORT);
});

module.exports = app;
