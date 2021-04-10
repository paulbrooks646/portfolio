require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const controller = require("./controller");
const userController = require('./userController')
const path = require("path");
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

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

app.post("/api/register", userController.register);
app.post("/api/login", userController.login);
app.delete("/api/logout", userController.logout);
app.get("/api/user", userController.getUser);
app.post("/api/newgame", userController.newgame)
app.post("/api/forestFirst", userController.forestFirst);
app.post("/api/coin", userController.coin);


app.get("/api/stables", controller.getStables)
app.get("/api/castle", controller.getCastle);
app.get("/api/garden", controller.getGarden);
app.get("/api/tower", controller.getTower);
app.post("/api/towerFirstTime", controller.towerFirstTime)
app.post("/api/manureCleanPermission", controller.manureCleanPermission)
app.post("/api/useFlute", controller.useFlute);
app.post("/api/manureTakePermission", controller.manureTakePermission)
app.post("/api/giveNuts", controller.giveNuts)
app.post("/api/giveHat", controller.giveHat);
app.post("/api/giveFlowers", controller.giveFlowers)
app.post("/api/giveRibbon", controller.giveRibbon)
app.post("/api/showLetter", controller.showLetter);
app.post("/api/manureGiven", controller.manureGiven)
app.post("/api/manureHasCleaned", controller.manureHasCleaned)
app.post("/api/manureHasTaken", controller.manureHasTaken)
app.post("/api/manure", controller.manure)
app.post("/api/flowers", controller.flowers);

app.get("/api/inventory", controller.getInventory)

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
