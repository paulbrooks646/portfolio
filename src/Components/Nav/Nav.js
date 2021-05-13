import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
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
  const [protectionCard, setProtectionCard] = useState(false);
  const [fireCard, setFireCard] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [pickCard, setPickCard] = useState(false);

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
      if (props.location.pathname === "/Clearing") {
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

    if (item === "protection") {
      if (props.location.pathname === "/Cottage") {
        axios.post("/api/useProtection").then((res) => {
          props.getInventory(res.data);
          axios.get("/api/cottage").then((res) => {
            props.getCottage(res.data[0]);
            setProtectionCard(true);
          });
        });
      } else {
        setRejectionCard(true);
      }
    }

    if (item === "fire") {
      if (
        props.location.pathname === "/Cottage" &&
        props.cottage.cottage.pod_taken
      ) {
        axios.post("/api/useFire").then((res) => {
          props.getInventory(res.data);
          axios.get("/api/cottage").then((res) => {
            props.getCottage(res.data[0]);
            setFireCard(true);
          });
        });
      } else {
        setRejectionCard(true);
      }
    }

    if (item === "open") {
      if (
        props.location.pathname === "/Cottage" &&
        props.cottage.cottage.door_unlocked
      ) {
        axios.post("/api/useOpen").then((res) => {
          props.getInventory(res.data);
          axios.get("/api/cottage").then((res) => {
            props.getCottage(res.data[0]);
            setOpenCard(true);
          });
        });
      } else {
        setRejectionCard(true);
      }
    }

    if (item === "pick") {
      setPickCard(true);
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
      <Card
        className={`${rejectionCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          That item is either not useful here or not useful here yet.
        </Typography>
        <Button
          onClick={() => setRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${nutCard ? "answer-card" : "answer-card-closed"}`}>
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
      <Card className={`${hatCard ? "answer-card" : "answer-card-closed"}`}>
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
      <Card
        className={`${showLetterCard ? "answer-card" : "answer-card-closed"}`}
      >
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
      <Card className={`${bottleCard ? "answer-card" : "answer-card-closed"}`}>
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
      <Card className={`${manureCard ? "answer-card" : "answer-card-closed"}`}>
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
      <Card className={`${fluteCard ? "answer-card" : "answer-card-closed"}`}>
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
      <Card className={`${flowerCard ? "answer-card" : "answer-card-closed"}`}>
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
      <Card className={`${ribbonCard ? "answer-card" : "answer-card-closed"}`}>
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
     
      <Card
        className={`${protectionCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          As you read the protection scroll, you glow blue. Nervously, you step
          into the laser field. The lasers sizzle into nothingness as they hit
          you until they are all gone. You stop glowing.
        </Typography>
        <Button
          onClick={() => setProtectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${fireCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          As you read the fire scroll, the wall of brambles bursts into flames.
          After a few glorious minutes, the wall is nothing but ash.
        </Typography>
        <Button
          onClick={() => setFireCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${openCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          Now that the door is unlocked, you read the open scroll. The door pops
          open. For better or worse, you can now enter the cottage.
        </Typography>
        <Button
          onClick={() => setOpenCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${pickCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          You will automatically try to use your lock pick if you click on a
          locked door.
        </Typography>
        <Button
          onClick={() => setPickCard(false)}
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
  })(Nav)
);
