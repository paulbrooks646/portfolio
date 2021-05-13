import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Cave.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Loading from "../Loading/Loading";
import Character from "../Character/Character";

function Cave(props) {
  const [upCharacter, setUpCharacter] = useState(false);
  const [downCharacter, setDownCharacter] = useState(false);
  const [downUp, setDownUp] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [upUp, setUpUp] = useState(false);
  const [upDown, setUpDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wolfCard, setWolfCard] = useState(false);
  const [coinCard, setCoinCard] = useState(false);
  const [boneCard, setBoneCard] = useState(false);
  const [hatCard, setHatCard] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [caveData, setCaveData] = useState(false)
  const [inventoryOpen, setInventoryOpen] = useState()
  const [caveRejectionCard, setCaveRejectionCard] = useState(false)

  useEffect(() => {
    axios.get("/api/cave").then((res) => {
      setCaveData(res.data[0]);
      if (props.user.user.last === "cottage") {
        setDownCharacter(true);
      } else if (props.user.user.last === "forest") {
        setUpCharacter(true);
      }
      setIsLoading(false);
    });
  }, []);

  const toggleInventoryOpen = () => setInventoryOpen(!inventoryOpen);

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
    if (item === "flute") {
      if (props.location.pathname === "/Tower") {
        axios.post("/api/useFlute").then((res) => {
          setCaveData(res.data[0]);
          ;
        });
      } else {
        setRejectionCard(true);
      }
    }
  };

  const toggleUp = () => {
    axios.post("/api/changeLast", { last: "cave" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Forest");
      });
    });
  };

  const toggleDown = () => {
    axios.post("/api/changeLast", { last: "pass" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Cottage");
      });
    });
  };

  const toggleFirst = () => {
    axios.post("/api/caveFirst").then((res) => {
      setCaveData(res.data[0]);
    });
  };

  const toggleWolfCard = () => {
    setWolfCard(!wolfCard);
  };

  const toggleCoin = () => {
    if (caveData.meat_given) {
      axios.post("/api/coin").then((res) => {
        props.getUser(res.data);
        axios.post("/api/caveCoin").then((res) => {
          setCaveData(res.data[0]);
          toggleCoinCard();
        });
      });
    } else {
      toggleRejectionCard();
    }
  };

  const toggleCoinCard = () => {
    setCoinCard(!coinCard);
  };

  const toggleBone = () => {
    if (caveData.meat_given) {
      axios.post("/api/bone").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/cave").then((res) => {
          setCaveData(res.data[0]);
          toggleBoneCard();
        });
      });
    } else {
      toggleRejectionCard();
    }
  };

  const toggleBoneCard = () => {
    setBoneCard(!boneCard);
  };

  const toggleHat = () => {
    if (caveData.meat_given) {
      axios.post("/api/hat").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/cave").then((res) => {
          setCaveData(res.data[0]);
          toggleHatCard();
        });
      });
    } else {
      toggleRejectionCard();
    }
  };

  const toggleHatCard = () => {
    setHatCard(!hatCard);
  };

  const toggleRejectionCard = () => {
    setCaveRejectionCard(!caveRejectionCard);
  };

  const toggleGoUp = () => {
    if (props.user.user.last === "cottage") {
      setDownUp(true);
      setDownCharacter(false);
    } else if (props.user.user.last === "forest") {
      setUpCharacter(false);
      setUpUp(true);
    }
  };

  const toggleGoDown = () => {
    if (!caveData.meat_given) {
      setRejectionCard(true);
    } else if (props.user.user.last === "cottage") {
      setDownDown(true);
      setDownCharacter(false);
    } else if (props.user.user.last === "forest") {
      setUpCharacter(false);
      setUpDown(true);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="main">
      <div className="nav-main">
        <div className="inventory-div">
          <BusinessCenter
            className="inventory-icon"
            onClick={toggleInventoryOpen}
          />
          <div
            className={`${
              inventoryOpen ? "inventory-open" : "inventory-closed"
            }`}
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
      </div>
      <div className="cave-body">
        <div className="cave-top">
          <div className="cave-top-left"></div>
          <div className="cave-top-middle">
            <div className="cave-forest" onClick={toggleGoUp}>
              <ArrowUpward />
              <h2>Forest</h2>
            </div>
            <div
              className={`${
                upCharacter ? "character-up" : "character-up-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${upUp ? "up-up" : "up-up-closed"}`}
              onAnimationEnd={toggleUp}
            >
              <Character />
            </div>
            <div
              className={`${upDown ? "up-down" : "up-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
          </div>
          <div className="cave-top-right"></div>
        </div>
        <div className="cave-middle">
          <div className="cave-middle-left"></div>
          <div className="cave-middle-middle"></div>
          <div className="cave-middle-right"></div>
        </div>
        <div className="cave-bottom">
          <div className="cave-bottom-left">
            <div
              className={`${
                caveData.meat_given ? "cave-wolf" : "cave-wolf-closed"
              }`}
              onClick={toggleWolfCard}
            ></div>
            <div
              className={`${caveData.meat_given ? "meat" : "meat-closed"}`}
            ></div>
          </div>
          <div className="cave-bottom-middle">
            <div
              className={`${
                !caveData.meat_given ? "cave-wolf" : "cave-wolf-closed"
              }`}
              onClick={toggleWolfCard}
            ></div>
            <div className="coin-div">
              <div
                className={`${!caveData.coin_taken ? "coin" : "coin-closed"}`}
                onClick={toggleCoin}
              ></div>
            </div>
            <div className="bone-div">
              <div
                className={`${!caveData.bone_taken ? "bone" : "bone-closed"}`}
                onClick={toggleBone}
              ></div>
            </div>
            <div className="hat-div">
              <div
                className={`${!caveData.hat_taken ? "hat" : "hat-closed"}`}
                onClick={toggleHat}
              ></div>
            </div>
            <div
              className={`${
                downCharacter ? "character-down" : "character-down-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${downUp ? "down-up" : "down-up-closed"}`}
              onAnimationEnd={toggleUp}
            >
              <Character />
            </div>
            <div
              className={`${downDown ? "down-down" : "down-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
            <div className="cave-cottage" onClick={toggleGoDown}>
              <h2>Cottage</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="cave-bottom-right"></div>
        </div>
      </div>
      <Card className={`${wolfCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I would avoid interacting with that wolf at all costs.
        </Typography>
        <Button onClick={toggleWolfCard} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          caveData.first_time ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You continue traveling through the forest. You stop abruptly. In the
          distance you see a wolf standing in the middle of the trail. Chills
          run through you as you contemplate what to do next.
        </Typography>
        <Button onClick={toggleFirst} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          caveRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Are you serious? Their is a ravenous wolf blocking the path.
        </Typography>
        <Button
          onClick={toggleRejectionCard}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${coinCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You pick up the shiny gold coin.
        </Typography>
        <Button onClick={toggleCoinCard} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${boneCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You pick up the disgusting bone left from the wolf's last meal.
        </Typography>
        <Button onClick={toggleBoneCard} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${hatCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You pick up the fancy hat.
        </Typography>
        <Button onClick={toggleHatCard} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
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
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getInventory})(
  Cave
);
