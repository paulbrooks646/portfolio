import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./HouseTwo.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import House from "../House/House";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

function HouseTwo(props) {
  const [downCharacter, setDownCharacter] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [firstTimeCard, setFirstTimeCard] = useState(false);
  const [blanketCard, setBlanketCard] = useState(false);
  const [letterCard, setLetterCard] = useState(false);
  const [forkCard, setForkCard] = useState(false);

  useEffect(() => {
    axios.get("/api/houseTwo").then((res) => {
      if (res.data[0].first_time) {
        setFirstTimeCard(true);
      }
    
      setDownCharacter(true);
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
    if (item === "blanket") {
      axios.post("/api/useBlanket").then((res) => {
        props.getInventory(res.data);
        setBlanketCard(true);
       
      });
    } else {
      setRejectionCard(true);
    }
  };

  const toggleDown = () => {
    axios.post("/api/changeLast", { last: "home" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Town");
      });
    });
  };

  const toggleFirst = () => {
    axios.post("/api/houseTwoFirst").then((res) => {
      setFirstTimeCard(false)
    });
  };

  const toggleGoDown = () => {
    setDownDown(true);
    setDownCharacter(false);
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
      <House />
      <div className="houseTwo-middle-left">
        <div className="houseTwo-paper" onClick={() => setLetterCard(true)}>
          <div className="line"></div>
          <div className="line-two"></div>
          <div className="line"></div>
          <div className="line-two"></div>
        </div>
      </div>
      <div className="houseTwo-middle-middle"></div>
      <div className="houseTwo-middle-right"></div>
      <div className="houseTwo-bottom-left"></div>
      <div className="houseTwo-bottom-middle">
        <div
          className={`${
            downCharacter ? "character-down" : "character-down-closed"
          }`}
        >
          <Character />
        </div>
        <div
          className={`${downDown ? "down-down" : "down-down-closed"}`}
          onAnimationEnd={toggleDown}
        >
          <Character />
        </div>
        <div className="houseTwo-town" onClick={toggleGoDown}>
          <h2>EXIT</h2>
          <ArrowDownward />
        </div>
      </div>
      <div className="houseTwo-bottom-right">
        <div className="fork" onClick={() => setForkCard(true)}>
          <div className="fork-top">
            <div className="tine-div">
              <div className="tip"></div>
              <div className="tine"></div>
            </div>
            <div className="tine-div">
              <div className="tip"></div>
              <div className="tine"></div>
            </div>
            <div className="tine-div">
              <div className="tip"></div>
              <div className="tine"></div>
            </div>
            <div className="tine-div">
              <div className="tip"></div>
              <div className="tine"></div>
            </div>
            </div>
            <div className="fork-middle"></div>
            <div className="fork-handle"></div>
        </div>
      </div>
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
      <Card className={`${blanketCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You fold up the blanket and set it next to the letter. It feels goo to
          know that this child will now sleep more warmly at night.
        </Typography>
        <Button
          onClick={() => setBlanketCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${letterCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You pick up the piece of paper. It says "Blanket". You quickly put it
          back where you found it.
        </Typography>
        <Button
          onClick={() => setLetterCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>

      <Card className={`${forkCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You can't bring yourself to steal, especially from people who have so
          little.
        </Typography>
        <Button
          onClick={() => setForkCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${firstTimeCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You look around the little house. The shelves are bare. Clearly the
          people who live here are very poor. Based on the pitch fork on the ground, these people propbably work on a farm.
        </Typography>
        <Button onClick={toggleFirst} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getInventory, logoutUser })(
  HouseTwo
);
