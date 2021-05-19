import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./HouseFour.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import House from "../House/House";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

function HouseFour(props) {
  const [downCharacter, setDownCharacter] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [houseFourData, setHouseFourData] = useState();
  const [healCard, setHealCard] = useState(false);
  const [toyCard, setToyCard] = useState(false);
  const [firstTimeCard, setFirstTimeCard] = useState(false);
  const [invalidRejectionCard, setInvalidRejectionCard] = useState(false);
  const [letterCard, setLetterCard] = useState(false);
  const [bandagesCard, setBandagesCard] = useState(false);
  const [invalidCard, setInvalidCard] = useState(false)

  useEffect(() => {
    axios.get("/api/houseFour").then((res) => {
      if (res.data[0].first_time) {
        setFirstTimeCard(true);
      }
      setHouseFourData(res.data[0]);
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
    if (item === "heal") {
      axios.post("/api/useHeal").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/houseFour").then((res) => {
          setHouseFourData(res.data[0]);
          setHealCard(true);
        });
      });
    } else if (item === "toy") {
      axios.post("/api/useToy").then((res) => {
        props.getInventory(res.data);
        setToyCard(true);
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
    axios.post("/api/houseFourFirst").then((res) => {
      setHouseFourData(res.data[0]);
      setFirstTimeCard(false);
    });
  };

  const toggleGoDown = () => {
    setDownDown(true);
    setDownCharacter(false);
  };

  const toggleLetter = () => {
    if (houseFourData.heal_used) {
      setLetterCard(true);
    } else {
      setInvalidRejectionCard(true);
    }
  };

  const toggleBandages = () => {
    if (houseFourData.heal_used) {
      setBandagesCard(true);
    } else {
      setInvalidRejectionCard(true);
    }
  };

  const toggleInvalid = () => {
    if (houseFourData.heal_used) {
      setInvalidCard(true)
    } else {
      setInvalidRejectionCard(true)
    }
  }

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
      <div className="houseFour-middle-left">
        <div className="houseFour-paper" onClick={toggleLetter}>
          <div className="line"></div>
          <div className="line-two"></div>
          <div className="line"></div>
          <div className="line-two"></div>
        </div>
      </div>
      <div className="houseFour-middle-middle"></div>
      <div className="houseFour-middle-right"></div>
      <div className="houseFour-bottom-left">
        <div className="bed">
          <div className="bed-left"></div>
          <div className="bed-middle">
            <div className="invalid" onClick={toggleInvalid}>
              <div className="invalid-shoe"></div>
              <div className="invalid-leg"></div>
              <div className="invalid-body">
                <div className="invalid-arm-div">
                  <div className="invalid-hand"></div>
                  <div className="invalid-arm"></div>
                </div>
              </div>
              <div className="invalid-head-div">
                <div className="invalid-head">
                  <div className="invalid-mouth"></div>
                  <div className="invalid-nose"></div>
                  <div className="invalid-eye"></div>
                  <div className="invalid-ear"></div>
                  <div className="invalid-hair"></div>
                </div>
                <div className="invalid-pillow"></div>
              </div>
            </div>
            <div className="invalid-mattress"></div>
            <div className="invalid-bed-bottom"></div>
          </div>
          <div className="bed-right"></div>
        </div>
      </div>
      <div className="houseFour-bottom-middle">
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
        <div className="houseFour-town" onClick={toggleGoDown}>
          <h2>EXIT</h2>
          <ArrowDownward />
        </div>
      </div>
      <div className="houseFour-bottom-right">
        <div className="bandages">
          <div className="bandage-left" onClick={toggleBandages}></div>
          <div className="bandage-middle" onClick={toggleBandages}></div>
          <div className="bandage-right" onClick={toggleBandages}></div>
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
          You pick up the piece of paper. It says "Toy". You quickly put it back
          where you found it.
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
          invalidRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          As you move, the poor, sick, injured man on the bed begins thrashing.
          You need to find a way to calm him before you can do anything else.
        </Typography>
        <Button
          onClick={() => setInvalidRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          invalidCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          Listening carefully you here the man say "Uurlu" in his sleep.
        </Typography>
        <Button
          onClick={() => setInvalidCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${healCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          As you read the scroll it disappears. Instantly the man on the bed
          calms and his breathing becomes regular. You feel great that you were
          able to help someone in such great need.
        </Typography>
        <Button
          onClick={() => setHealCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${toyCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You put the toy by the letter. It feels good to have put a little joy
          into the life of a child who has such hard life.
        </Typography>
        <Button
          onClick={() => setToyCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${bandagesCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You can't bring yourself to steal, especially from people who have so
          little.
        </Typography>
        <Button
          onClick={() => setBandagesCard(false)}
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
          people who live here are very poor. There is a man on a bed in this
          room. He is wrapped in bandgages and clearly sick.
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
  HouseFour
);
