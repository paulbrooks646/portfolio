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

  towerFirstTime: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const tower = await db.tower_first(id);
    res.status(200).send(tower);
  },

  caveFirst: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    const cave = await db.cave_first(id);
    res.status(200).send(cave);
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

  ribbon: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.ribbon(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  feather: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.feather(id).then((inventory) => {
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

  cake: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,
      forest: user[0].forest_first,
      mountain: user[0].mountain_first,
      magic: user[0].magic_user,
      last: user[0].last,
    };

    db.cake(id).then((inventory) => {
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

  potatoes: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.potatoes(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },
  cheese: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.cheese(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },
  candy: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.candy(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },
  meat: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.meat(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },
  nuts: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.nuts(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },
  shoes: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.shoes(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },
  rope: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.rope(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },
  flute: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.flute(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },
  bottle: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.bottle(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },
  oil: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.oil(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },
  wood: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.wood(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },
  armor: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.armor(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },
  knife: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.knife(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },
  dagger: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.dagger(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },
  shield: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.shield(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },
  sword: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.sword(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },
  bow: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.bow(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },
  heal: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.heal(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },
  fire: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.fire(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },
  ice: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.ice(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },
  protection: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.protection(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },
  strength: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.strength(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },
  open: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { coins } = req.session.user;
    const payCoin = coins - 1;
    const user = await db.coin(id, payCoin);
    req.session.user = {
      id: user[0].id,
      name: user[0].name,

      coins: user[0].coins,

      last: user[0].last,
    };

    db.open(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
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
}
