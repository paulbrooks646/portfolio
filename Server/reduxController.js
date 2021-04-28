module.exports = {
  getStables: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const stables = await db.get_stables(id);

    res.status(200).send(stables);
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
};
