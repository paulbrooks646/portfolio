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

  alleyCoin: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const alley = await db.alley_coin(id);
    res.status(200).send(alley);
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

  useBlanket: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.use_blanket(id).then((inventory) => {
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

  useProtection: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.use_protection(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  useFire: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.use_fire(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  useOil: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.use_oil(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  useOpen: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.use_open(id).then((inventory) => {
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

  useCandy: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.use_candy(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  useLevitation: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.use_levitation(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  useShoes: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.use_shoes(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  useToy: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.use_toy(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  useHeal: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.use_heal(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  useBone: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.use_bone(id).then((inventory) => {
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

  useGlasses: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    db.use_glasses(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  useMirror: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    db.use_mirror(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  useGlassesAlley: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    db.use_glasses_alley(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  useCheese: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    db.use_cheese(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  useCharcoal: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    db.use_charcoal(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  useRock: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    db.use_rock(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
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

  houseFiveLock: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const cottage = await db.lock_five(id);
    res.status(200).send(cottage);
  },

  hydraDead: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const bog = await db.hydra_dead(id);
    res.status(200).send(bog);
  },

  houseOneLock: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const town = await db.lock_one(id);
    res.status(200).send(town);
  },

  houseTwoLock: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const town = await db.lock_two(id);
    res.status(200).send(town);
  },

  houseThreeLock: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const town = await db.lock_three(id);
    res.status(200).send(town);
  },

  houseFourLock: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const town = await db.lock_four(id);
    res.status(200).send(town);
  },

  cageOpen: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const houseFive = await db.cage_open(id);
    res.status(200).send(houseFive);
  },

  unicornGone: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const houseFive = await db.unicorn_gone(id);
    res.status(200).send(houseFive);
  },

  pictureViewed: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const alley = await db.picture_viewed(id);
    res.status(200).send(alley);
  },

  coinGiven: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const alley = await db.coin_given(id);
    res.status(200).send(alley);
  },
};
