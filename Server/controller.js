module.exports = {
  manureCleanPermission: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const stables = await db.manure_clean_permission(id);
    res.status(200).send(stables);
  },

  manureTakePermission: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const stables = await db.manure_take_permission(id);
    res.status(200).send(stables);
  },

  caveCoin: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const cave = await db.cave_coin(id);
    res.status(200).send(cave);
  },

  useFlute: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const tower = await db.use_flute(id);
    res.status(200).send(tower);
  },

  towerFirstTime: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const tower = await db.tower_first_time(id);
    res.status(200).send(tower);
  },

  caveFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const tower = await db.cave_first(id);
    res.status(200).send(tower);
  },

  manureHasCleaned: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const stables = await db.manure_has_cleaned(id);
    res.status(200).send(stables);
  },

  manureGiven: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.manure_given(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  giveFlowers: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.give_flowers(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  giveRibbon: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.give_ribbon(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  manure: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.manure(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  flowers: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.flowers(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  bone: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.bone(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  hat: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.hat(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  manureHasTaken: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const stables = await db.manure_has_taken(id);
    res.status(200).send(stables);
  },

  giveNuts: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.give_nuts(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  giveHat: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.give_hat(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  showLetter: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.show_letter(id);

    res.sendStatus(200);
  },
};
