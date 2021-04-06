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
    req.session.user = {
      id: newUser[0].id,
      name: newUser[0].name,
      newgame: newUser[0].newgame,
      coins: newUser[0].coins,
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

  newgame: (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    db.toggle_newgame(id);
    res.sendStatus(200);
  },

  getStables: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const stables = await db.get_stables(id);

    res.status(200).send(stables);
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

  manureHasCleaned: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const stables = await db.manure_has_cleaned(id);
    res.status(200).send(stables);
  },

  getInventory: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const inventory = await db.get_inventory(id);
    res.status(200).send(inventory);
  },

  manure: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const inventory = await db.manure(id);
    res.status(200).send(inventory);
  },

  manureHasTaken: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const stables = await db.manure_has_taken(id);
    res.status(200).send(stables);
  },

  coin: async (req, res) => {
    const db = req.app.get("db")
    const { id, coins} = req.session.user;
    const newCoins = (coins + 1)
    const user = await db.coin(id, newCoins)
    req.session.user = {
      id: user[0].id,
      name: user[0].name,
      newgame: user[0].newgame,
      coins: user[0].coins,
    };
    
    res.status(200).send(req.session.user)
  }
};
