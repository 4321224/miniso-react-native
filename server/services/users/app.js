const express = require("express");
const app = express();
const { mongodb } = require("./config/mongodb");
const router = require("./router");
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

mongodb()
  .then(() => {
    app.listen(PORT, () => {
      console.log("this app is running on port", PORT);
    });
  })
  .catch(console.error);
