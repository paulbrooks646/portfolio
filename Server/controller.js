module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { newUsername, newPassword} = req.body;

    const existingUser = await db.check_user(newUsername);
    if (existingUser[0]) {
      return res.status(409).send("User already exists!");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);

    const newUser = await db.register_user([newUsername, hash, newEmail]);
    req.session.user = {
      id: newUser[0].user_id,
      username: newUser[0].username,
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
          id: user[0].user_id,
          username: user[0].username,
          email: user[0].email,
          date: user[0].trip_date,
        };
        res.status(200).send(req.session.user);
      } else {
        res.status(403).send("Username or password incorrect!");
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
};