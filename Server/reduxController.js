module.exports = {
  getStables: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const stables = await db.get_stables(id);

    res.status(200).send(stables);
  },
  getThrone: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const throne = await db.get_throne(id);

    res.status(200).send(throne);
  },
  getClearing: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const clearing = await db.get_clearing(id);

    res.status(200).send(clearing);
  },
  getAlley: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const alley = await db.get_alley(id);

    res.status(200).send(alley);
  },
  getThieves: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const thieves = await db.get_thieves(id);

    res.status(200).send(thieves);
  },
  getGlade: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const glade = await db.get_glade(id);

    res.status(200).send(glade);
  },
  getValley: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const valley = await db.get_valley(id);

    res.status(200).send(valley);
  },
  getMountain: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const mountain = await db.get_mountain(id);

    res.status(200).send(mountain);
  },
  getTown: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const town = await db.get_town(id);

    res.status(200).send(town);
  },

  getCastle: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const castle = await db.get_castle(id);

    res.status(200).send(castle);
  },

  getCave: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const cave = await db.get_cave(id);

    res.status(200).send(cave);
  },

  getGarden: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const garden = await db.get_garden(id);

    res.status(200).send(garden);
  },

  getStore: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const store = await db.get_store(id);
    res.status(200).send(store);
  },

  getTower: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const tower = await db.get_tower(id);

    res.status(200).send(tower);
  },

  getNest: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const nest = await db.get_nest(id);

    res.status(200).send(nest);
  },

  getPass: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const pass = await db.get_pass(id);

    res.status(200).send(pass);
  },

  getInventory: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.get_inventory(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  getGrocer: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const grocer = await db.get_grocer(id);

    res.status(200).send(grocer);
  },

  getMagic: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const magic = await db.get_magic(id);

    res.status(200).send(magic);
  },

  getBlacksmith: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const blacksmith = await db.get_blacksmith(id);

    res.status(200).send(blacksmith);
  },

  getDragon: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const dragon = await db.get_dragon(id);

    res.status(200).send(dragon);
  },

  getDashboard: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const dashboard = await db.get_dashboard(id);

    res.status(200).send(dashboard);
  },

  getCabin: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const cabin = await db.get_cabin(id);

    res.status(200).send(cabin);
  },

  getForest: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const forest = await db.get_forest(id);

    res.status(200).send(forest);
  },

  getCottage: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const cottage = await db.get_cottage(id);

    res.status(200).send(cottage);
  },

  getSwamp: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const swamp = await db.get_swamp(id);

    res.status(200).send(swamp);
  },

  getBog: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const bog = await db.get_bog(id);

    res.status(200).send(bog);
  },

  getHouseOne: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const houseOne = await db.get_house_one(id);

    res.status(200).send(houseOne);
  },

  getHouseTwo: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const houseTwo = await db.get_house_two(id);

    res.status(200).send(houseTwo);
  },

  getHouseThree: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const houseThree = await db.get_house_three(id);

    res.status(200).send(houseThree);
  },

  getHouseFour: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const houseFour = await db.get_house_four(id);

    res.status(200).send(houseFour);
  },

  getHouseFive: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const houseFive = await db.get_house_five(id);

    res.status(200).send(houseFive);
  },

  getTown: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const town = await db.get_town(id);

    res.status(200).send(town);
  },
};
