const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");

    const { newUsername, newPassword } = req.body;

    const existingUser = await db.check_user(newUsername);
    if (existingUser[0]) {
      return res.status(409).send("User already exists!");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);

    const newUser = await db.register_user([newUsername, hash, 0, true]);
    const inventory = db.new_inventory(newUser[0].id);
    const stables = db.new_stables(newUser[0].id);
    const castle = db.new_castle(newUser[0].id);
    const garden = db.new_garden(newUser[0].id);
    const tower = db.new_tower(newUser[0].id);

    req.session.user = {
      id: newUser[0].id,
      name: newUser[0].name,
      newgame: newUser[0].newgame,
      coins: newUser[0].coins,
      forest: newUser[0].forest_first,
    };
    res.status(200).send(req.session.user);
  },

  login: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    const user = await db.check_user(username);

    if (!user[0]) {
      return res.status(404).send("User doesn't exist!");
    } else {
      const authenticated = bcrypt.compareSync(password, user[0].password);
      if (authenticated) {
        req.session.user = {
          id: user[0].id,
          name: user[0].name,
          newgame: user[0].newgame,
          coins: user[0].coins,
          forest: user[0].forest_first,
        };
        res.status(200).send(req.session.user);
      } else {
        res.status(403).send("Name or password incorrect!");
      }
    }
  },
  logout: async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },

  getUser: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.sendStatus(404);
    }
  },

  newgame: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const user = await db.toggle_newgame(id);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,
      newgame: user[0].newgame,
      coins: user[0].coins,
      forest: user[0].forest_first
    };
    res.status(200).send(req.session.user);
  },

  forestFirst: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const user = await db.forest_first(id);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,
      newgame: user[0].newgame,
      coins: user[0].coins,
      forest: user[0].forest_first
    };
    res.status(200).send(req.session.user);
  },

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

  manureHasTaken: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const stables = await db.manure_has_taken(id);
    res.status(200).send(stables);
  },

  coin: async (req, res) => {
    const db = req.app.get("db");
    const { id, coins } = req.session.user;
    const newCoins = coins + 1;
    const user = await db.coin(id, newCoins);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,
      newgame: user[0].newgame,
      coins: user[0].coins,
    };

    res.status(200).send(req.session.user);
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
