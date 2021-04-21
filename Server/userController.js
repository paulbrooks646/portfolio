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

    db.database_setup(newUser[0].id)

    req.session.user = {
      id: newUser[0].id,
      name: newUser[0].name,
      newgame: newUser[0].newgame,
      coins: newUser[0].coins,
      forest: newUser[0].forest_first,
      mountain: newUser[0].mountain_first,
      magic: newUser[0].magic_user,
      last: newUser[0].last,
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
          mountain: user[0].mountain_first,
          magic: user[0].magic_user,
          last: user[0].last,
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
      forest: user[0].forest_first,
      mountain: user[0].mountain_first,
      magic: user[0].magic_user,
      last: user[0].last,
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
      forest: user[0].forest_first,
      mountain: user[0].mountain_first,
      magic: user[0].magic_user,
      last: user[0].last,
    };
    res.status(200).send(req.session.user);
  },

  mountainFirst: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.session.user;
    const user = await db.mountain_first(id);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,
      newgame: user[0].newgame,
      coins: user[0].coins,
      forest: user[0].forest_first,
      mountain: user[0].mountain_first,
      magic: user[0].magic_user,
      last: user[0].last,
    };
    res.status(200).send(req.session.user);
  },

  coin: async (req, res) => {
    const db = req.app.get("db");
    const { id, coins } = req.session.user;
    const newCoins = coins + 1;
    const user = await db.coin([id, newCoins]);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,
      newgame: user[0].newgame,
      coins: user[0].coins,
      forest: user[0].forest_first,
      mountain: user[0].mountain_first,
      magic: user[0].magic_user,
      last: user[0].last,
    };

    res.status(200).send(req.session.user);
  },


  changeLast: async (req, res) => {
    const db = req.app.get("db")
    
    const { last } = req.body;
    const { id } = req.session.user;
    const user = await db.change_last([id, last])
 
    req.session.user = {
      id: user[0].id,
      name: user[0].name,
      newgame: user[0].newgame,
      coins: user[0].coins,
      forest: user[0].forest_first,
      mountain: user[0].mountain_first,
      magic: user[0].magic_user,
      last: user[0].last,
    };

    res.status(200).send(req.session.user);
  }
}
