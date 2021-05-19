import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./HouseOne.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import House from "../House/House";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

function HouseOne(props) {
  const [downCharacter, setDownCharacter] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [houseOneData, setHouseOneData] = useState();
  const [dogCard, setDogCard] = useState(false);
  const [shovelCard, setShovelCard] = useState(false);
  const [letterCard, setLetterCard] = useState(false);
  const [boneCard, setBoneCard] = useState(false);
  const [candyCard, setCandyCard] = useState(false);
  const [firstTimeCard, setFirstTimeCard] = useState(false);
  const [dogRejectionCard, setDogRejectionCard] = useState(false);

  useEffect(() => {
    axios.get("/api/houseOne").then((res) => {
      if (res.data[0].first_time) {
        setFirstTimeCard(true);
      }
      setHouseOneData(res.data[0]);
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
    if (item === "bone") {
      axios.post("/api/useBone").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/houseOne").then((res) => {
          setHouseOneData(res.data[0]);
          setBoneCard(true);
        });
      });
    } else if (item === "candy") {
      axios.post("/api/useCandy").then((res) => {
        props.getInventory(res.data);
        setCandyCard(true);
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
    axios.post("/api/houseOneFirst").then((res) => {
      setHouseOneData(res.data[0]);
      setFirstTimeCard(false);
    });
  };

  const toggleGoDown = () => {
    setDownDown(true);
    setDownCharacter(false);
  };

  const toggleLetter = () => {
    if (houseOneData.bone_used) {
      setLetterCard(true);
    } else {
      setDogRejectionCard(true);
    }
  };

  const toggleShovel = () => {
    if (houseOneData.bone_used) {
      setShovelCard(true);
    } else {
      setDogRejectionCard(true);
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
      <House />
      <div className="houseOne-middle-left">
        <div className="houseOne-paper" onClick={toggleLetter}>
          <div className="line"></div>
          <div className="line-two"></div>
          <div className="line"></div>
          <div className="line-two"></div>
        </div>
      </div>
      <div className="houseOne-middle-middle">
        <div className="dog" onClick={() => setDogCard(true)}>
          <div className="dog-top">
            <div className="dog-left-ear"></div>
            <div className="dog-face">
              <div className="dog-eye-div">
                <div className="dog-eye">
                  <div className="dog-pupil"></div>
                </div>
                <div className="dog-eye">
                  <div className="dog-pupil"></div>
                </div>
              </div>
              <div className="dog-nose"></div>
              <div className="dog-smile">
                <div className="dog-mouth"></div>
                <div className="dog-tongue">
                  <div className="tongue-line"></div>
                </div>
              </div>
            </div>
            <div className="dog-right-ear"></div>
          </div>
          <div className="dog-bottom">
            <div className="dog-body">
              <div className="dog-torso"></div>
              <div className="dog-leg-div">
                <div className="dog-leg-one">
                  <div className="dog-paw"></div>
                </div>
                <div className="dog-leg-two">
                  <div className="dog-paw"></div>
                </div>
                <div className="dog-leg-one">
                  <div className="dog-paw"></div>
                </div>
                <div className="dog-leg-two">
                  <div className="dog-paw"></div>
                </div>
              </div>
            </div>
            <div className="dog-tail"></div>
          </div>
        </div>
      </div>
      <div className="houseOne-middle-right"></div>
      <div className="houseOne-bottom-left"></div>
      <div className="houseOne-bottom-middle">
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
        <div className="houseOne-town" onClick={toggleGoDown}>
          <h2>EXIT</h2>
          <ArrowDownward />
        </div>
      </div>
      <div className="houseOne-bottom-right">
        <div className="shovel" onClick={toggleShovel}>
          <div className="shovel-top">
            <div className="shovel-line"></div>
          </div>
          <div className="shovel-handle"></div>
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
      <Card className={`${dogCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          As much as you would like to play with the adorable dog, the dog would
          inevitably make noise. Either find a way to distract it or come back
          later.
        </Typography>
        <Button
          onClick={() => setDogCard(false)}
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
          You pick up the piece of paper. It says "Candy". You quickly put it
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
      <Card
        className={`${dogRejectionCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          Find a way to keep the dog quiet before you try to do anything else.
        </Typography>
        <Button
          onClick={() => setDogRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${boneCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You toss the bone to the dog. He chews it contentedly.
        </Typography>
        <Button
          onClick={() => setBoneCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${candyCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You put the candy on the letter. It feels good to know that this child will have something sweet during an otherwise difficult life.
        </Typography>
        <Button
          onClick={() => setCandyCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${shovelCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You can't bring yourself to steal, especially from people who have so
          little.
        </Typography>
        <Button
          onClick={() => setShovelCard(false)}
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
          people who live here are very poor. A friendly dog stands directly in
          front of you.
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
  HouseOne
);
