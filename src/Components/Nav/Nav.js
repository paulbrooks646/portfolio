import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import { getCave } from "../../redux/caveReducer";
import { getDashboard } from "../../redux/dashboardReducer";
import { getCastle } from "../../redux/castleReducer";
import { getStables } from "../../redux/stablesReducer";
import { getGarden } from "../../redux/gardenReducer";
import { getTower } from "../../redux/towerReducer";
import { getNest } from "../../redux/nestReducer";
import { getPass } from "../../redux/passReducer";
import { getCabin } from "../../redux/cabinReducer";
import { getForest } from "../../redux/forestReducer";
import { getDragon } from "../../redux/dragonReducer";
import { getSwamp } from "../../redux/swampReducer";
import { getCottage } from "../../redux/cottageReducer";
import { getBog } from "../../redux/bogReducer";
import { getHouseOne } from "../../redux/houseOneReducer";
import { getHouseTwo } from "../../redux/houseTwoReducer";
import { getHouseThree } from "../../redux/houseThreeReducer";
import { getHouseFour } from "../../redux/houseFourReducer";
import { getHouseFive } from "../../redux/houseFiveReducer";
import axios from "axios";
import "./Nav.scss";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

function Nav(props) {
  const [inventoryOpen, setInentoryOpen] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [nutCard, setNutCard] = useState(false);
  const [hatCard, setHatCard] = useState(false);
  const [showLetterCard, setShowLetterCard] = useState(false);
  const [bottleCard, setBottleCard] = useState(false);
  const [manureCard, setManureCard] = useState(false);
  const [fluteCard, setFluteCard] = useState(false);
  const [flowerCard, setFlowerCard] = useState(false);
  const [ribbonCard, setRibbonCard] = useState(false);
  const [meatCard, setMeatCard] = useState(false);
  const [ropeCard, setRopeCard] = useState(false);
  const [homeCard, setHomeCard] = useState(false);
  const [woodCard, setWoodCard] = useState(false);
  const [knifeCard, setKnifeCard] = useState(false);
  const [potatoesCard, setPotatoesCard] = useState(false);
  const [bowCard, setBowCard] = useState(false);
  const [iceCard, setIceCard] = useState(false);
  const [armorCard, setArmorCard] = useState(false);
  const [cloakCard, setCloakCard] = useState(false);
  const [speedCard, setSpeedCard] = useState(false);
  const [axeCard, setAxeCard] = useState(false);
  const [swordCard, setSwordCard] = useState(false);
  const [podCard, setPodCard] = useState(false);

  useEffect(() => {
    axios.get("/api/getUser").then((res) => {
      getUser(res.data);
    });
  }, []);

  const toggleInventoryOpen = () => setInentoryOpen(!inventoryOpen);

  const logout = () => {
    axios.delete("/api/logout").then(() => {
      props.logoutUser();
      props.history.push("/Auth");
    });
  };

  const inventoryList = props.inventory.inventory.map((e, index) => {
    return (
      <h4 key={index} className="nav-list-item" onClick={() => toggleItem(e)}>
        {e}
      </h4>
    );
  });

  const toggleItem = (item) => {
    if (item === "bottle") {
      if (props.location.pathname === "/Stables") {
        axios.post("/api/manure").then((res) => {
          props.getInventory(res.data);
        });
        axios.post("/api/manureHasTaken").then((res) => {
          props.getStables(res.data[0]);
          setBottleCard(true);
        });
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "flute") {
      if (props.location.pathname === "/Tower") {
        axios.post("/api/useFlute").then((res) => {
          props.getTower(res.data[0]);
          setFluteCard(true);
        });
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "rope") {
      if (props.location.pathname === "/Nest") {
        axios.post("/api/useRope").then((res) => {
          props.getInventory(res.data);
        });
        axios.get("/api/nest").then((res) => {
          props.getNest(res.data[0]);
          setRopeCard(true);
        });
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "meat") {
      if (props.location.pathname === "/Cave") {
        axios.post("/api/giveMeat").then((res) => {
          props.getInventory(res.data);
          axios.get("/api/cave").then((res) => {
            props.getCave(res.data[0]);
            setMeatCard(true);
          });
        });
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "cake") {
      if (props.location.pathname === "/Pass") {
        axios.post("/api/giveCake").then((res) => {
          props.getInventory(res.data);
          axios.get("/api/pass").then((res) => {
            props.getPass(res.data[0]);
          });
        });
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "ribbon") {
      if (props.location.pathname === "/Tower") {
        axios.post("/api/giveRibbon").then((res) => {
          props.getInventory(res.data);
          axios.get("/api/tower").then((res) => {
            props.getTower(res.data[0]);
            setRibbonCard(true);
          });
        });
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "flowers") {
      if (props.location.pathname === "/Tower") {
        axios.post("/api/giveFlowers").then((res) => {
          props.getInventory(res.data);
          axios.post("/api/coin").then((res) => {
            props.getUser(res.data);
            axios.get("/api/tower").then((res) => {
              props.getTower(res.data[0]);
              setFlowerCard(true);
            });
          });
        });
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "dagger") {
      if (props.location.pathname === "/Alley") {
        alert("blah blah blah");
      } else {
        setRejectionCard(true);
      }
    }

    if (item === "shield") {
      if (props.location.pathname === "/Valley") {
        alert("blah blah blah");
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "manure") {
      if (props.location.pathname === "/Garden") {
        axios.post("/api/manureGiven").then((res) => {
          props.getInventory(res.data);
          axios.get("/api/garden").then((res) => {
            props.getGarden(res.data[0]);
            axios.post("/api/coin").then((res) => {
              props.getUser(res.data);
              setManureCard(true);
            });
          });
        });
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "nuts") {
      if (props.location.pathname === "/Castle") {
        axios.post("/api/giveNuts").then((res) => {
          props.getInventory(res.data);
          axios.post("/api/coin").then((res) => {
            props.getUser(res.data);
            axios.get("/api/castle").then((res) => {
              props.getCastle(res.data[0]);
              setNutCard(true);
            });
          });
        });
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "hat") {
      if (props.location.pathname === "/Castle") {
        axios.post("/api/giveHat").then((res) => {
          props.getInventory(res.data);
          axios.get("/api/castle").then((res) => {
            props.getCastle(res.data[0]);
            setHatCard(true);
          });
        });
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "letter") {
      if (props.location.pathname === "/Castle") {
        axios.post("/api/showLetter").then(() => {
          axios.get("/api/castle").then((res) => {
            props.getCastle(res.data[0]);
            setShowLetterCard(true);
          });
        });
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "home") {
      if (props.location.pathname === "/Dashboard") {
        axios.post("/api/placeHome").then(() => {
          axios.get("/api/dashboard").then((res) => {
            props.getDashboard(res.data[0]);
            axios.get("/api/inventory").then((res) => {
              props.getInventory(res.data);
              setHomeCard(true);
            });
          });
        });
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "grow") {
      if (props.location.pathname === "/Dashboard") {
        axios.post("/api/castGrow").then(() => {
          axios.get("/api/dashboard").then((res) => {
            props.getDashboard(res.data[0]);
            axios.get("/api/inventory").then((res) => {
              props.getInventory(res.data);
            });
          });
        });
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "wood") {
      if (
        props.location.pathname === "/Cabin" &&
        props.cabin.cabin.potatoes_given
      ) {
        axios.post("/api/giveWood").then(() => {
          axios.get("/api/cabin").then((res) => {
            props.getCabin(res.data[0]);
            axios.get("/api/inventory").then((res) => {
              props.getInventory(res.data);
              setWoodCard(true);
            });
          });
        });
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "potatoes") {
      if (props.location.pathname === "/Cabin") {
        axios.post("/api/givePotatoes").then(() => {
          axios.get("/api/cabin").then((res) => {
            props.getCabin(res.data[0]);
            axios.get("/api/inventory").then((res) => {
              props.getInventory(res.data);
              axios.post("/api/coin").then((res) => {
                props.getUser(res.data);
                setPotatoesCard(true);
              });
            });
          });
        });
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "knife") {
      if (
        props.location.pathname === "/Cabin" &&
        props.cabin.cabin.potatoes_given
      ) {
        axios.post("/api/giveKnife").then(() => {
          axios.get("/api/cabin").then((res) => {
            props.getCabin(res.data[0]);
            axios.get("/api/inventory").then((res) => {
              props.getInventory(res.data);
              setKnifeCard(true);
            });
          });
        });
      } else {
        setRejectionCard(true);
      }
    }

    if (item === "bow") {
      if (props.location.pathname === "/Forest") {
        axios.post("/api/apple").then((res) => {
          props.getInventory(res.data);
          axios.get("/api/forest").then((res) => {
            props.getForest(res.data[0]);
            setBowCard(true);
          });
        });
      } else {
        setRejectionCard(true);
      }
    }

    if (item === "ice") {
      if (props.location.pathname === "/Dragon") {
        axios.post("/api/useIce").then((res) => {
          props.getInventory(res.data);
          axios.get("/api/dragon").then((res) => {
            props.getDragon(res.data[0]);
            setIceCard(true);
          });
        });
      } else {
        setRejectionCard(true);
      }
    }

    if (item === "armor") {
      if (props.location.pathname === "/Dragon") {
        axios.post("/api/useArmor").then((res) => {
          props.getInventory(res.data);
          axios.get("/api/dragon").then((res) => {
            props.getDragon(res.data[0]);
            setArmorCard(true);
          });
        });
      } else {
        setRejectionCard(true);
      }
    }

    if (item === "cloak") {
      if (props.location.pathname === "/Dragon") {
        axios.post("/api/useCloak").then((res) => {
          props.getInventory(res.data);
          axios.get("/api/dragon").then((res) => {
            props.getDragon(res.data[0]);
            setCloakCard(true);
          });
        });
      } else {
        setRejectionCard(true);
      }
    }

    if (item === "speed") {
      if (props.location.pathname === "/Dragon") {
        axios.post("/api/useSpeed").then((res) => {
          props.getInventory(res.data);
          axios.get("/api/dragon").then((res) => {
            props.getDragon(res.data[0]);
            setSpeedCard(true);
          });
        });
      } else {
        setRejectionCard(true);
      }
    }

    if (item === "axe") {
      if (props.location.pathname === "/Dragon") {
        axios.post("/api/useAxe").then((res) => {
          props.getInventory(res.data);
          axios.get("/api/dragon").then((res) => {
            props.getDragon(res.data[0]);
            setAxeCard(true);
          });
        });
      } else {
        setRejectionCard(true);
      }
    }

    if (item === "sword") {
      if (props.location.pathname === "/Swamp") {
        axios.post("/api/useSword").then((res) => {
          props.getInventory(res.data);
          axios.get("/api/swamp").then((res) => {
            props.getSwamp(res.data[0]);
            setSwordCard(true);
          });
        });
      } else {
        setRejectionCard(true);
      }
    }

    if (item === "pod") {
      if (props.location.pathname === "/Bog") {
        setPodCard(true);
      } else {
        setRejectionCard(true);
      }
    }
  };

  const togglePod = () => {
    setPodCard(false)
    axios.post("/api/podThrown").then((res) => {
      props.getInventory(res.data);
      axios.get("/api/bog").then((res) => {
        props.getBog(res.data[0]);
      });
    });
  };

  return (
    <div className="nav-main">
      <div className="inventory-div">
        <BusinessCenter
          className="inventory-icon"
          onClick={toggleInventoryOpen}
        />
        <div
          className={`${inventoryOpen ? "inventory-open" : "inventory-closed"}`}
        >
          {inventoryList}
        </div>
      </div>

      <h2 className="nav-welcome">{props.user.user.name}'s Quest</h2>
      <div className="coin-div">
        <h3>{`Coins: ${props.user.user.coins}`}</h3>
      </div>
      <button className="nav-logout" onClick={logout}>
        Logout
      </button>
      <Card id={`${rejectionCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          That item is not useful here.
        </Typography>
        <Button
          onClick={() => setRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${nutCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You give the guard the nuts. In exchange he gives you a coin and is
          willing to talk to you.
        </Typography>
        <Button
          onClick={() => setNutCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${hatCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          Thanks for finding my hat!!!
        </Typography>
        <Button
          onClick={() => setHatCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${showLetterCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          Great! Delivering a letter from the Princess is a legitimate reason to
          see the King.
        </Typography>
        <Button
          onClick={() => setShowLetterCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${bottleCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          You succeed in filling your bottle with smelly, rancid manure.
          Congratulations?
        </Typography>
        <Button
          onClick={() => setBottleCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${manureCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          You give the fairy the bottle of manure. "Ooh, this is fresh," she
          says as she sniffs it excitedly. For this manure I'll give you a coin
          and just once let you have some flowers.
        </Typography>
        <Button
          onClick={() => setManureCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${fluteCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          The weasel dances as you play the flute. Even after you stop the
          weasel seems calmer than before.
        </Typography>
        <Button
          onClick={() => setFluteCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${flowerCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          Flowers for me? How quaint! She tosses a coin to the ground for you.
          You quickly pick it up. Despite her response she seems to like the
          flowers.
        </Typography>
        <Button
          onClick={() => setFlowerCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${ribbonCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          It would seem you have located my ribbon. Here is the letter as
          promised.
        </Typography>
        <Button
          onClick={() => setRibbonCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${meatCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          You hurl the hunk of meat to the wolf. It eyes the meat suspiciously,
          walks over, smells it, drags it to the side of the path, then starts
          to devour it.
        </Typography>
        <Button
          onClick={() => setMeatCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${ropeCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          You tie one end of your rope into a knot and hurl it at the nest. The
          knot gets wedged amid the branches. Using the rope you might be able
          to get to the nest before the griffin can attack.
        </Typography>
        <Button
          onClick={() => setRopeCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${homeCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          You place the model of a home where your home used to be. Now what?
        </Typography>
        <Button
          onClick={() => setHomeCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${potatoesCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          Thanks for the potatoes. I was running low on vittles. Here is a coin
          in payment.
        </Typography>
        <Button
          onClick={() => setPotatoesCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${knifeCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          Thanks for the new knife!
        </Typography>
        <Button
          onClick={() => setKnifeCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${woodCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          Thanks for the wood!
        </Typography>
        <Button
          onClick={() => setWoodCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${bowCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          You fire straight up. The arrow sails into the branches and a single
          apple falls. You dive and catch it but break the bow in the process.
        </Typography>
        <Button
          onClick={() => setBowCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${iceCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          As you read the magic words, a small segment of coals turns slightly
          blue.
        </Typography>
        <Button
          onClick={() => setIceCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${armorCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          You put on your armor.
        </Typography>
        <Button
          onClick={() => setArmorCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${cloakCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          You put on your cloak. The heat in the area no longer bothers you.
        </Typography>
        <Button
          onClick={() => setCloakCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${speedCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          As you read the scroll you feel significantly quicker.
        </Typography>
        <Button
          onClick={() => setSpeedCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${axeCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          Weilding the ultimate axe, you feel very powerful.
        </Typography>
        <Button
          onClick={() => setAxeCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${swordCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          You charge, screaming and brandishing your sword. Seeing this, the
          goblin quickly flees. Luckily, it is after he is gone that your sword
          slips and sinks into the swamp.
        </Typography>
        <Button
          onClick={() => setSwordCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${podCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
         Hoping that the hydra is covered in sulfur, you stand back and hurl the pod at it.
        </Typography>
        <Button
          onClick={togglePod}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;

export default withRouter(
  connect(mapStateToProps, {
    logoutUser,
    getUser,
    getInventory,
    getCastle,
    getStables,
    getGarden,
    getTower,
    getCave,
    getNest,
    getPass,
    getDashboard,
    getCabin,
    getForest,
    getDragon,
    getSwamp,
    getCottage,
    getBog,
    getHouseOne,
    getHouseTwo,
    getHouseThree,
    getHouseFour,
    getHouseFive,
  })(Nav)
);
