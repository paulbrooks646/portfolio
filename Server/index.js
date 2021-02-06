require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const path = require("path");
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;
 
const app = express();

app.use(express.json());
app.use(
  session({
    resave: false,

    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
    secret: SESSION_SECRET,
  })
);

app.use(express.static(__dirname + "/../build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((db) => {
    app.set("db", db);
    console.log("DB connected");
    app.listen(SERVER_PORT, () =>
      console.log(`Running on port ${SERVER_PORT}`)
    );
  })
  .catch((err) => console.log(err));
