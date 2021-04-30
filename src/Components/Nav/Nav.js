import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import { getCave } from "../../redux/caveReducer"
import { getDashboard } from "../../redux/dashboardReducer";
import { getCastle } from "../../redux/castleReducer";
import { getStables } from "../../redux/stablesReducer";
import { getGarden } from "../../redux/gardenReducer";
import { getTower } from "../../redux/towerReducer";
import { getNest } from "../../redux/nestReducer";
import {getPass} from "../../redux/passReducer"
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
  

  useEffect(() => {
    axios.get("/api/getUser").then((res) => {
      getUser(res.data)
    })
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
          props.getInventory(res.data)
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
    if (item === "sword") {
      if (props.location.pathname === "/Swamp") {
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
            props.getDashboard(res.data[0])
            axios.get("/api/inventory").then(res => {
              props.getInventory(res.data)
              setHomeCard(true);
            })
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
              props.getInventory(res.data)
              
            })
          });
        });
      } else {
        setRejectionCard(true);
      }
    }
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
          className="stables-card-button"
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
          className="stables-card-button"
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
          className="stables-card-button"
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
          className="stables-card-button"
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
          className="stables-card-button"
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
          className="stables-card-button"
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
          className="stables-card-button"
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
          className="stables-card-button"
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
          className="stables-card-button"
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
          className="stables-card-button"
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
          className="stables-card-button"
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
          className="stables-card-button"
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
    getDashboard
  })(Nav)
);
