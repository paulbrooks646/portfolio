require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const controller = require("./controller");
const userController = require('./userController')
const reduxController = require('./reduxController')
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
app.post("/api/mountainFirst", userController.mountainFirst);
app.post("/api/coin", userController.coin);


app.get("/api/stables", reduxController.getStables)
app.get("/api/castle", reduxController.getCastle);
app.get("/api/garden", reduxController.getGarden);
app.get("/api/tower", reduxController.getTower);
app.get("/api/cave", reduxController.getCave);
app.get("/api/inventory", reduxController.getInventory);
app.get("/api/nest", reduxController.getNest)
app.get("/api/pass", reduxController.getPass);


app.post("/api/towerFirstTime", controller.towerFirstTime)
app.post("/api/caveFirst", controller.caveFirst)
app.post("/api/nestFirst", controller.nestFirst);
app.post("/api/passFirst", controller.passFirst)
app.post("/api/manureCleanPermission", controller.manureCleanPermission);
app.post("/api/caveCoin", controller.caveCoin);
app.post("/api/nestCoin", controller.nestCoin);
app.post("/api/useFlute", controller.useFlute);
app.post("/api/useRope", controller.useRope)
app.post("/api/manureTakePermission", controller.manureTakePermission)
app.post("/api/giveNuts", controller.giveNuts)
app.post("/api/giveHat", controller.giveHat);
app.post("/api/giveMeat", controller.giveMeat);
app.post("/api/giveFlowers", controller.giveFlowers)
app.post("/api/giveCake", controller.giveCake)
app.post("/api/giveRibbon", controller.giveRibbon)
app.post("/api/showLetter", controller.showLetter);
app.post("/api/manureGiven", controller.manureGiven)
app.post("/api/manureHasCleaned", controller.manureHasCleaned)
app.post("/api/manureHasTaken", controller.manureHasTaken)
app.post("/api/manure", controller.manure)
app.post("/api/flowers", controller.flowers);
app.post("/api/hat", controller.hat);
app.post("/api/bone", controller.bone);
app.post("/api/ribbon", controller.ribbon);
app.post("/api/feather", controller.feather)
app.post("/api/Cake", controller.Cake)


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
