module.exports = {
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
  hair: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.hair(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  mirror: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.mirror(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  pick: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.pick(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  cloak: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.cloak(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  sulfur: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.sulfur(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  picture: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.picture(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  rag: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.rag(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  home: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.home(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  scales: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.scales(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  pod: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.pod(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  levitation: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.levitation(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  invisibility: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.invisibility(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  toy: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.toy(id).then((inventory) => {
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

  rock: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.rock(id).then((inventory) => {
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

  gem: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.gem(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  mushroom: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.mushroom(id).then((inventory) => {
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

  apple: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.apple(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  seed: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.seed(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  charcoal: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.charcoal(id).then((inventory) => {
      let newArr = [];

      for (let key in inventory[0]) {
        if (inventory[0][key] === true) {
          newArr.push(key);
        }
      }

      res.status(200).send(newArr);
    });
  },

  grow: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;

    db.grow(id).then((inventory) => {
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
