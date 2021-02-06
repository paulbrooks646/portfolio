require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");

const path = require("path");
const { SERVER_PORT} = process.env;
 
const app = express();

app.use(express.json());

app.use(express.static(__dirname + "/../build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(SERVER_PORT, () => console.log(`Running on port ${SERVER_PORT}`));
