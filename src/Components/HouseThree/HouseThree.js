import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./HouseThree.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import House from "../House/House";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

function HouseThree(props) {
  const [downCharacter, setDownCharacter] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [houseThreeData, setHouseThreeData] = useState();
  const [levitationCard, setLevitationCard] = useState(false);
  const [shoesCard, setShoesCard] = useState(false);
  const [squeakRejectionCard, setSqueakRejectionCard] = useState(false);
  const [firstTimeCard, setFirstTimeCard] = useState(false);
  const [glovesCard, setGlovesCard] = useState(false);
  const [letterCard, setLetterCard] = useState(false);

  useEffect(() => {
    axios.get("/api/houseThree").then((res) => {
      if (res.data[0].first_time) {
        setFirstTimeCard(true);
      }
      setHouseThreeData(res.data[0]);
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
    if (item === "levitation") {
      axios.post("/api/useLevitation").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/houseThree").then((res) => {
          setHouseThreeData(res.data[0]);
          setLevitationCard(true);
        });
      });
    } else if (item === "shoes") {
      axios.post("/api/useShoes").then((res) => {
        props.getInventory(res.data);
        setShoesCard(true);
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
    axios.post("/api/houseThreeFirst").then((res) => {
      setHouseThreeData(res.data[0]);
      setFirstTimeCard(false);
    });
  };

  const toggleGoDown = () => {
    setDownDown(true);
    setDownCharacter(false);
  };

  const toggleLetter = () => {
    if (houseThreeData.levitation_used) {
      setLetterCard(true);
    } else {
      setSqueakRejectionCard(true);
    }
  };

  const toggleGloves = () => {
    if (houseThreeData.levitation_used) {
      setGlovesCard(true);
    } else {
      setSqueakRejectionCard(true);
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
      <div className="houseThree-middle-left">
        <div className="houseThree-paper" onClick={toggleLetter}>
          <div className="line"></div>
          <div className="line-two"></div>
          <div className="line"></div>
          <div className="line-two"></div>
        </div>
      </div>
      <div className="houseThree-middle-middle"></div>
      <div className="houseThree-middle-right"></div>
      <div className="houseThree-bottom-left"></div>
      <div className="houseThree-bottom-middle">
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
        <div className="houseThree-town" onClick={toggleGoDown}>
          <h2>EXIT</h2>
          <ArrowDownward />
        </div>
      </div>
      <div className="houseThree-bottom-right">
        <div className="glove-div">
          <div className="glove" onClick={toggleGloves}>
            <div className="finger-div">
              <div className="finger-one"></div>
              <div className="finger-two"></div>
              <div className="finger-three"></div>
              <div className="finger-four"></div>
              <div className="finger-five"></div>
            </div>
            <div className="glove-hand"></div>
          </div>
          <div className="glove-two">
            <div className="glove" onClick={toggleGloves}>
              <div className="finger-div">
                <div className="finger-one"></div>
                <div className="finger-two"></div>
                <div className="finger-three"></div>
                <div className="finger-four"></div>
                <div className="finger-five"></div>
              </div>
              <div className="glove-hand"></div>
            </div>
          </div>
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

      <Card className={`${letterCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You pick up the piece of paper. It says "Shoes". You quickly put it
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
        className={`${
          squeakRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          The floor is so squeaky in this house that you couldn't possibly take
          another step. You need to find a way to move around more quietly.
        </Typography>
        <Button
          onClick={() => setSqueakRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${levitationCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          As you read the scroll it disappears. Suddenly you are hovering a few
          inches off the ground. You lay on your stomach and start swimming
          through the air. You are now able to move around the room quietly.
        </Typography>
        <Button
          onClick={() => setLevitationCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${shoesCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You put the shoes by the letter. It feels good to know that this
          child's feet will now have some protection.
        </Typography>
        <Button
          onClick={() => setShoesCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${glovesCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You can't bring yourself to steal, especially from people who have so
          little.
        </Typography>
        <Button
          onClick={() => setGlovesCard(false)}
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
          people who live here are very poor. Based on the gloves on the ground
          you guess these people are pickers.
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
  HouseThree
);
