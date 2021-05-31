module.exports = {
  towerFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const tower = await db.tower_first(id);
    res.status(200).send(tower);
  },

  thievesFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const thieves = await db.thieves_first(id);
    res.status(200).send(thieves);
  },

  alleyFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const alley = await db.alley_first(id);
    res.status(200).send(alley);
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

  townFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const town = await db.town_first(id);
    res.status(200).send(town);
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

  swampFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const swamp = await db.swamp_first(id);
    res.status(200).send(swamp);
  },

  bogFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const bog = await db.bog_first(id);
    res.status(200).send(bog);
  },

  cottageFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const cottage = await db.cottage_first(id);
    res.status(200).send(cottage);
  },

  houseOneFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const houseOne = await db.house_one_first(id);
    res.status(200).send(houseOne);
  },

  houseTwoFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const houseTwo = await db.house_two_first(id);
    res.status(200).send(houseTwo);
  },

  houseThreeFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const houseThree = await db.house_three_first(id);
    res.status(200).send(houseThree);
  },

  houseFourFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const houseFour = await db.house_four_first(id);
    res.status(200).send(houseFour);
  },

  houseFiveFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const houseFive = await db.house_five_first(id);
    res.status(200).send(houseFive);
  },
};