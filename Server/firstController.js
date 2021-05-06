module.exports = {
  towerFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const tower = await db.tower_first(id);
    res.status(200).send(tower);
  },

  dragonFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const dragon = await db.dragon_first(id);
    res.status(200).send(dragon);
  },

  caveFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const cave = await db.cave_first(id);
    res.status(200).send(cave);
  },

  cabinFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const cabin = await db.cabin_first(id);
    res.status(200).send(cabin);
  },

  nestFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const nest = await db.nest_first(id);
    res.status(200).send(nest);
  },

  passFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const pass = await db.pass_first(id);
    res.status(200).send(pass);
  },

  dashboardFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const dashboard = await db.dashboard_first(id);
    res.status(200).send(dashboard);
  },

  forestFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const forest = await db.forest_first(id);
    res.status(200).send(forest);
  },

  mountainFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const mountain = await db.mountain_first(id);
    res.status(200).send(mountain);
  },
};