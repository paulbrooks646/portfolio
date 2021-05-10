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

  forestCoin: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const forest = await db.forest_coin(id);
    res.status(200).send(forest);
  },

  nestCoin: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const nest = await db.nest_coin(id);
    res.status(200).send(nest);
  },

  useFlute: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const tower = await db.use_flute(id);
    res.status(200).send(tower);
  },

  useIce: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.use_ice(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  useSword: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.use_sword(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  useArmor: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.use_armor(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  useCloak: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.use_cloak(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  useSpeed: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.use_speed(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  useAxe: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.use_axe(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
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

  useRope: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.rope_used(id).then((inventory) => {
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

  giveCake: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.give_cake(id).then((inventory) => {
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

  giveMeat: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.give_meat(id).then((inventory) => {
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

  getItems: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.get_items(id).then((inventory) => {
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

  placeHome: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const dashboard = await db.place_home(id);
    res.status(200).send(dashboard);
  },

  removeHome: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const dashboard = await db.remove_home(id);
    res.status(200).send(dashboard);
  },

  castGrow: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const dashboard = await db.cast_grow(id);
    res.status(200).send(dashboard);
  },

  removeGrow: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const dashboard = await db.remove_grow(id);
    res.status(200).send(dashboard);
  },

  mountainCoin: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const mountain = await db.mountain_coin(id);
    res.status(200).send(mountain);
  },

  passCoin: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const pass = await db.pass_coin(id);
    res.status(200).send(pass);
  },

  dragonCoin: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const dragon = await db.dragon_coin(id);
    res.status(200).send(dragon);
  },

  ogreMoved: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const pass = await db.ogre_moved(id);
    res.status(200).send(pass);
  },

  killDragon: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const dragon = await db.kill_dragon(id);
    res.status(200).send(dragon);
  },

  givePotatoes: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const cabin = await db.give_potatoes(id);
    res.status(200).send(cabin);
  },

  giveKnife: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const cabin = await db.give_knife(id);
    res.status(200).send(cabin);
  },

  giveWood: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const cabin = await db.give_wood(id);
    res.status(200).send(cabin);
  },

  goblinGone: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const swamp = await db.goblin_gone(id);
    res.status(200).send(swamp);
  },

  bogCoins: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const bog = await db.bog_coins(id);
    res.status(200).send(bog);
  },

  purseTaken: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const cottage = await db.purse_taken(id);
    res.status(200).send(cottage);
  },

  cottageCoin: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const cottage = await db.cottage_coin(id);
    res.status(200).send(cottage);
  },

  podThrown: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const bog = await db.pod_thrown(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  hydraExploding: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const bog = await db.hydra_exploding(id);
    res.status(200).send(bog);
  },

  hydraDead: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const bog = await db.hydra_dead(id);
    res.status(200).send(bog);
  },
};
