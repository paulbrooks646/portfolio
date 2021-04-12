module.exports = {
  getStables: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const stables = await db.get_stables(id);

    res.status(200).send(stables);
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

  getTower: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const tower = await db.get_tower(id);

    res.status(200).send(tower);
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
};
