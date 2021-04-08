import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import { getCastle } from "../../redux/castleReducer";
import { getStables } from "../../redux/stablesReducer";
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

  useEffect(() => {
    getUser();
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
        alert("blah blah blah");
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "rope") {
      if (props.location.pathname === "/Nest") {
        alert("blah blah blah");
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "meat") {
      if (props.location.pathname === "/Cave") {
        alert("blah blah blah");
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "cake") {
      if (props.location.pathname === "/Pass") {
        alert("blah blah blah");
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "ribbon") {
      if (props.location.pathname === "/Tower") {
        alert("blah blah blah");
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "flowers") {
      if (props.location.pathname === "/Tower") {
        alert("blah blah blah");
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
        alert("blah blah blah");
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
  })(Nav)
);
