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

    const tower = await db.tower_first_time(id);
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

  cake: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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

  potatoes: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  cheese: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  candy: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  meat: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  nuts: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  shoes: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  rope: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  flute: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  bottle: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  oil: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  wood: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  armor: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  knife: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  dagger: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  shield: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  sword: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  bow: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  heal: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  fire: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  ice: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  protection: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  strength: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  open: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

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
  
};
