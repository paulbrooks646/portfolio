require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const controller = require("./controller");
const userController = require("./userController");
const reduxController = require("./reduxController");
const firstController = require("./firstController");
const inventoryController = require("./inventoryController");
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
app.post("/api/changeLast", userController.changeLast);
app.post("/api/coin", userController.coin);

app.get("/api/stables", reduxController.getStables);
app.get("/api/castle", reduxController.getCastle);
app.get("/api/garden", reduxController.getGarden);
app.get("/api/tower", reduxController.getTower);
app.get("/api/cave", reduxController.getCave);
app.get("/api/inventory", reduxController.getInventory);
app.get("/api/nest", reduxController.getNest);
app.get("/api/pass", reduxController.getPass);
app.get("/api/store", reduxController.getStore);
app.get("/api/grocer", reduxController.getGrocer);
app.get("/api/magic", reduxController.getMagic);
app.get("/api/blacksmith", reduxController.getBlacksmith);
app.get("/api/town", reduxController.getTown);
app.get("/api/dragon", reduxController.getDragon);
app.get("/api/mountain", reduxController.getMountain);
app.get("/api/dashboard", reduxController.getDashboard);
app.get("/api/cabin", reduxController.getCabin);
app.get("/api/forest", reduxController.getForest);
app.get("/api/swamp", reduxController.getSwamp);
app.get("/api/bog", reduxController.getBog);
app.get("/api/cottage", reduxController.getCottage);
app.get("/api/houseOne", reduxController.getHouseOne);
app.get("/api/houseTwo", reduxController.getHouseTwo);
app.get("/api/houseThree", reduxController.getHouseThree);
app.get("/api/houseFour", reduxController.getHouseFour);
app.get("/api/houseFive", reduxController.getHouseFive);
app.get("/api/town", reduxController.getTown)
app.get("/api/alley", reduxController.getAlley)
app.get("/api/thieves", reduxController.getThieves)
app.get("/api/valley", reduxController.getValley)
app.get("/api/glade", reduxController.getGlade)
app.get("/api/clearing", reduxController.getClearing)


app.post("/api/towerFirst", firstController.towerFirst);
app.post("/api/caveFirst", firstController.caveFirst);
app.post("/api/nestFirst", firstController.nestFirst);
app.post("/api/passFirst", firstController.passFirst);
app.post("/api/cabinFirst", firstController.cabinFirst);
app.post("/api/forestFirst", firstController.forestFirst);
app.post("/api/mountainFirst", firstController.mountainFirst);
app.post("/api/dashboardFirst", firstController.dashboardFirst);
app.post("/api/dragonFirst", firstController.dragonFirst);
app.post("/api/swampFirst", firstController.swampFirst);
app.post("/api/cottageFirst", firstController.cottageFirst);
app.post("/api/bogFirst", firstController.bogFirst);
app.post("/api/houseOneFirst", firstController.houseOneFirst);
app.post("/api/houseTwoFirst", firstController.houseTwoFirst);
app.post("/api/houseThreeFirst", firstController.houseThreeFirst);
app.post("/api/houseFourFirst", firstController.houseFourFirst);
app.post("/api/houseFiveFirst", firstController.houseFiveFirst);
app.post("/api/townFirst", firstController.townFirst)
app.post("/api/alleyFirst", firstController.alleyFirst)
app.post("/api/thievesFirst", firstController.thievesFirst)
app.post("/api/valleyFirst", firstController.valleyFirst)
app.post("/api/gladeFirst", firstController.gladeFirst)
app.post("/api/clearingFirst", firstController.clearingFirst)
app.post("/api/castleFirst", firstController.castleFirst)
app.post("/api/stablesFirst", firstController.stablesFirst)
app.post("/api/gardenFirst", firstController.gardenFirst)

app.post("/api/manure", inventoryController.manure);
app.post("/api/flowers", inventoryController.flowers);
app.post("/api/hat", inventoryController.hat);
app.post("/api/bone", inventoryController.bone);
app.post("/api/mushroom", inventoryController.mushroom);
app.post("/api/toy", inventoryController.toy);
app.post("/api/ribbon", inventoryController.ribbon);
app.post("/api/feather", inventoryController.feather);
app.post("/api/cake", inventoryController.cake);
app.post("/api/candy", inventoryController.candy);
app.post("/api/cheese", inventoryController.cheese);
app.post("/api/meat", inventoryController.meat);
app.post("/api/nuts", inventoryController.nuts);
app.post("/api/potatoes", inventoryController.potatoes);
app.post("/api/bottle", inventoryController.bottle);
app.post("/api/flute", inventoryController.flute);
app.post("/api/oil", inventoryController.oil);
app.post("/api/rope", inventoryController.rope);
app.post("/api/shoes", inventoryController.shoes);
app.post("/api/wood", inventoryController.wood);
app.post("/api/fire", inventoryController.fire);
app.post("/api/ice", inventoryController.ice);
app.post("/api/heal", inventoryController.heal);
app.post("/api/protection", inventoryController.protection);
app.post("/api/strength", inventoryController.strength);
app.post("/api/open", inventoryController.open);
app.post("/api/armor", inventoryController.armor);
app.post("/api/shield", inventoryController.shield);
app.post("/api/sword", inventoryController.sword);
app.post("/api/dagger", inventoryController.dagger);
app.post("/api/knife", inventoryController.knife);
app.post("/api/bow", inventoryController.bow);
app.post("/api/rock", inventoryController.rock);
app.post("/api/gem", inventoryController.gem);
app.post("/api/apple", inventoryController.apple);
app.post("/api/seed", inventoryController.seed);
app.post("/api/charcoal", inventoryController.charcoal);
app.post("/api/grow", inventoryController.grow);
app.post("/api/sulfur", inventoryController.sulfur);
app.post("/api/scales", inventoryController.scales);
app.post("/api/pod", inventoryController.pod);
app.post("/api/levitation", inventoryController.levitation);
app.post("/api/invisibility", inventoryController.invisibility);
app.post("/api/home", inventoryController.home)
app.post("/api/picture", inventoryController.picture)
app.post("/api/rag", inventoryController.rag)
app.post("/api/pick", inventoryController.pick)
app.post("/api/cloak", inventoryController.cloak)
app.post("/api/hair", inventoryController.hair)
app.post("/api/mirror", inventoryController.mirror)
app.post("/api/speed", inventoryController.speed)
app.post("/api/chest", inventoryController.chest)

app.post("/api/manureCleanPermission", controller.manureCleanPermission);
app.post("/api/caveCoin", controller.caveCoin);
app.post("/api/nestCoin", controller.nestCoin);
app.post("/api/gardenCoin", controller.gardenCoin)
app.post("/api/towerCoin", controller.towerCoin)
app.post("/api/useFlute", controller.useFlute);
app.post("/api/useRope", controller.useRope);
app.post("/api/useProtection", controller.useProtection);
app.post("/api/useFire", controller.useFire);
app.post("/api/useOpen", controller.useOpen);
app.post("/api/manureTakePermission", controller.manureTakePermission);
app.post("/api/useNuts", controller.useNuts);
app.post("/api/useHat", controller.useHat);
app.post("/api/giveMeat", controller.giveMeat);
app.post("/api/giveFlowers", controller.giveFlowers);
app.post("/api/giveCake", controller.giveCake);
app.post("/api/giveRibbon", controller.giveRibbon);
app.post("/api/useLetter", controller.useLetter);
app.post("/api/manureGiven", controller.manureGiven);
app.post("/api/manureHasCleaned", controller.manureHasCleaned);
app.post("/api/placeHome", controller.placeHome);
app.post("/api/castGrow", controller.castGrow);
app.post("/api/removeGrow", controller.removeGrow);
app.post("/api/removeHome", controller.removeHome);
app.post("/api/mountainCoin", controller.mountainCoin);
app.post("/api/passCoin", controller.passCoin);
app.post("/api/forestCoin", controller.forestCoin);
app.post("/api/dragonCoin", controller.dragonCoin);
app.post("/api/cottageCoin", controller.cottageCoin);
app.post("/api/ogreMoved", controller.ogreMoved);
app.post("/api/givePotatoes", controller.givePotatoes);
app.post("/api/giveWood", controller.giveWood);
app.post("/api/giveKnife", controller.giveKnife);
app.post("/api/killDragon", controller.killDragon);
app.post("/api/useIce", controller.useIce);
app.post("/api/useArmor", controller.useArmor);
app.post("/api/useCloak", controller.useCloak);
app.post("/api/useSpeed", controller.useSpeed);
app.post("/api/useAxe", controller.useAxe);
app.post("/api/getItems", controller.getItems);
app.post("/api/goblinGone", controller.goblinGone);
app.post("/api/useSword", controller.useSword);
app.post("/api/bogCoins", controller.bogCoins);
app.post("/api/podThrown", controller.podThrown);
app.post("/api/hydraExploding", controller.hydraExploding);
app.post("/api/hydraDead", controller.hydraDead);
app.post("/api/purseTaken", controller.purseTaken);
app.post("/api/houseFiveLock", controller.houseFiveLock)
app.post("/api/houseOneLock", controller.houseOneLock)
app.post("/api/houseTwoLock", controller.houseTwoLock)
app.post("/api/houseThreeLock", controller.houseThreeLock)
app.post("/api/houseFourLock", controller.houseFourLock)
app.post("/api/useOil", controller.useOil)
app.post("/api/useBone", controller.useBone)
app.post("/api/useCandy", controller.useCandy)
app.post("/api/useBlanket", controller.useBlanket)
app.post("/api/useLevitation", controller.useLevitation)
app.post("/api/useShoes", controller.useShoes)
app.post("/api/useHeal", controller.useHeal)
app.post("/api/useToy", controller.useToy)
app.post("/api/useGlasses", controller.useGlasses)
app.post("/api/useMirror", controller.useMirror)
app.post("/api/cageOpen", controller.cageOpen)
app.post("/api/unicornGone", controller.unicornGone)
app.post("/api/alleyCoin", controller.alleyCoin)
app.post("/api/useRock", controller.useRock)
app.post("/api/useCharcoal", controller.useCharcoal)
app.post("/api/useCheese", controller.useCheese)
app.post("/api/useGlassesAlley", controller.useGlassesAlley)
app.post("/api/coinGiven", controller.coinGiven)
app.post("/api/useRag", controller.useRag)
app.post("/api/useChest", controller.useChest)
app.post("/api/masterThief", controller.masterThief)
app.post("/api/useShield", controller.useShield)
app.post("/api/usePicture", controller.usePicture)
app.post("/api/valleyCoin", controller.valleyCoin)
app.post("/api/valleyCoinTwo", controller.valleyCoinTwo)
app.post("/api/gladeCoin", controller.gladeCoin)
app.post("/api/magicUser", controller.magicUser)
app.post("/api/useSulfur", controller.useSulfur)
app.post("/api/useMushroom", controller.useMushroom)
app.post("/api/useApple", controller.useApple)
app.post("/api/useDagger", controller.useDagger)
app.post("/api/useStrength", controller.useStrength)
app.post("/api/useInvisibility", controller.useInvisibility)
app.post("/api/useSeed", controller.useSeed)

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
