import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import "./Town.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import House from "../../Images/House.jpg";
import Character from "../Character/Character";
import Farmer from "../../Images/Farmer.png";
import Casa from "../../Images/Casa/Casa"
import axios from "axios";
import Loading from "../Loading/Loading";

function Town(props) {
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [oldmanCard, setOldmanCard] = useState(false);
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [answerFive, setAnswerFive] = useState(false);
  const [downCharacter, setDownCharacter] = useState(false);
  const [upCharacter, setUpCharacter] = useState(false);
  const [leftCharacter, setLeftCharacter] = useState(false);
  const [rightCharacter, setRightCharacter] = useState(false);
  const [downLeft, setDownLeft] = useState(false);
  const [upLeft, setUpLeft] = useState(false);
  const [rightLeft, setRightLeft] = useState(false);
  const [leftLeft, setLeftLeft] = useState(false);
  const [downUp, setDownUp] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [downRight, setDownRight] = useState(false);
  const [upUp, setUpUp] = useState(false);
  const [upRight, setUpRight] = useState(false);
  const [upDown, setUpDown] = useState(false);
  const [rightUp, setRightUp] = useState(false);
  const [rightRight, setRightRight] = useState(false);
  const [rightDown, setRightDown] = useState(false);
  const [leftUp, setLeftUp] = useState(false);
  const [leftRight, setLeftRight] = useState(false);
  const [leftDown, setLeftDown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [firstTimeCard, setFirstTimeCard] = useState(false);
  const [PickRejectionCard, setPickRejectionCard] = useState(false);
  const [unlockCard, setUnlockCard] = useState(false);
  const [oilRejectionCard, setOilRejectionCard] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [oilCard, setOilCard] = useState(false);
  const [townData, setTownData] = useState(false);

  useEffect(() => {
    axios.get("/api/town").then((res) => {
      if (res.data[0].first_time) {
        setFirstTimeCard(true);
      }
      setTownData(res.data[0]);

      if (props.user.user.last === "home") {
        setDownCharacter(true);
      } else if (props.user.user.last === "stables") {
        setLeftCharacter(true);
      } else if (props.user.user.last === "market") {
        setRightCharacter(true);
      } else if (props.user.user.last === "castle") {
        setUpCharacter(true);
      }
      setIsLoading(false);
    });
  }, []);

  const toggleFirst = () => {
    axios.post("/api/townFirst").then((res) => {
      setTownData(res.data[0]);
      setFirstTimeCard(false);
    });
  };

  const toggleRight = () => {
    axios.post("/api/changeLast", { last: "town" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Market");
      });
    });
  };

  const toggleLeft = () => {
    axios.post("/api/changeLast", { last: "town" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Stables");
      });
    });
  };

  const toggleUp = () => {
    axios.post("/api/changeLast", { last: "town" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Castle");
      });
    });
  };

  const toggleDown = () => {
    axios.post("/api/changeLast", { last: "town" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Dashboard");
      });
    });
  };

  const toggleOldmanCard = () => {
    setOldmanCard(!oldmanCard);
  };

  const toggleAnswerOne = () => {
    toggleOldmanCard();
    setAnswerOne(!answerOne);
  };

  const toggleAnswerTwo = () => {
    toggleOldmanCard();
    setAnswerTwo(!answerTwo);
  };

  const toggleAnswerThree = () => {
    toggleOldmanCard();
    setAnswerThree(!answerThree);
  };

  const toggleAnswerFour = () => {
    toggleOldmanCard();
    setAnswerFour(!answerFour);
  };

  const toggleAnswerFive = () => {
    toggleOldmanCard();
    setAnswerFive(!answerFive);
  };

  const toggleHouseOne = () => {
    if (!props.inventory.inventory.includes("pick")) {
      setPickRejectionCard(true);
    } else if (!townData.lock_one) {
      axios.post("/api/houseOneLock").then((res) => {
        setTownData(res.data[0]);
        setUnlockCard(true);
      });
    } else {
      props.history.push("/HouseOne");
    }
  };

  const toggleHouseTwo = () => {
    if (!props.inventory.inventory.includes("pick")) {
      setPickRejectionCard(true);
    } else if (!townData.oil_used) {
      setOilRejectionCard(true);
    } else if (!townData.lock_two) {
      axios.post("/api/houseTwoLock").then((res) => {
        setTownData(res.data[0]);
        setUnlockCard(true);
      });
    } else {
      props.history.push("/HouseTwo");
    }
  };

  const toggleHouseThree = () => {
    if (!props.inventory.inventory.includes("pick")) {
      setPickRejectionCard(true);
    } else if (!townData.lock_three) {
      axios.post("/api/houseThreeLock").then((res) => {
        setTownData(res.data[0]);
        setUnlockCard(true);
      });
    } else {
      props.history.push("/HouseThree");
    }
  };

  const toggleHouseFour = () => {
    if (!props.inventory.inventory.includes("pick")) {
      setPickRejectionCard(true);
    } else if (!townData.lock_four) {
      axios.post("/api/houseFourLock").then((res) => {
        setTownData(res.data[0]);
        setUnlockCard(true);
      });
    } else {
      props.history.push("/HouseFour");
    }
  };

  const toggleGoLeft = () => {
    if (props.user.user.last === "home") {
      setDownLeft(true);
      setDownCharacter(false);
    } else if (props.user.user.last === "stables") {
      setLeftCharacter(false);
      setLeftLeft(true);
    } else if (props.user.user.last === "market") {
      setRightCharacter(false);
      setRightLeft(true);
    } else if (props.user.user.last === "castle") {
      setUpCharacter(false);
      setUpLeft(true);
    }
  };

  const toggleGoRight = () => {
    if (props.user.user.last === "home") {
      setDownRight(true);
      setDownCharacter(false);
    } else if (props.user.user.last === "stables") {
      setLeftCharacter(false);
      setLeftRight(true);
    } else if (props.user.user.last === "market") {
      setRightCharacter(false);
      setRightRight(true);
    } else if (props.user.user.last === "castle") {
      setUpCharacter(false);
      setUpRight(true);
    }
  };

  const toggleGoUp = () => {
    if (props.user.user.last === "home") {
      setDownUp(true);
      setDownCharacter(false);
    } else if (props.user.user.last === "stables") {
      setLeftCharacter(false);
      setLeftUp(true);
    } else if (props.user.user.last === "market") {
      setRightCharacter(false);
      setRightUp(true);
    } else if (props.user.user.last === "castle") {
      setUpCharacter(false);
      setUpUp(true);
    }
  };

  const toggleGoDown = () => {
    if (props.user.user.last === "home") {
      setDownDown(true);
      setDownCharacter(false);
    } else if (props.user.user.last === "stables") {
      setLeftCharacter(false);
      setLeftDown(true);
    } else if (props.user.user.last === "market") {
      setRightCharacter(false);
      setRightDown(true);
    } else if (props.user.user.last === "castle") {
      setUpCharacter(false);
      setUpDown(true);
    }
  };

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
    if (item === "oil") {
      axios.post("/api/useOil").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/town").then((res) => {
          setTownData(res.data[0]);
          setOilCard(true);
        });
      });
    } else {
      setRejectionCard(true);
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
      <div className="town-body">
        <div className="town-top">
          <div className="town-top-left">
            <Casa />
            <ArrowUpward id="up-arrow" onClick={toggleHouseOne} />
          </div>
          <div className="town-top-middle">
            <div className="town-castle" onClick={toggleGoUp}>
              <ArrowUpward />
              <h2>Castle</h2>
            </div>
            <div
              className={`${
                upCharacter ? "character-up" : "character-up-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${upLeft ? "up-left" : "up-left-closed"}`}
              onAnimationEnd={toggleLeft}
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
              className={`${upRight ? "up-right" : "up-right-closed"}`}
              onAnimationEnd={toggleRight}
            >
              <Character />
            </div>
            <div
              className={`${upDown ? "up-down" : "up-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
            <img
              src={Farmer}
              alt="irritated farmer"
              className="town-farmer"
              onClick={toggleOldmanCard}
            />
          </div>
          <div className="town-top-right">
            <Casa />
            <ArrowUpward id="up-arrow" onClick={toggleHouseTwo} />
          </div>
        </div>
        <div className="town-middle">
          <div className="town-middle-left">
            <div className="town-stables" onClick={toggleGoLeft}>
              <ArrowBack />
              <h2>Stables</h2>
            </div>
            <div
              className={`${
                leftCharacter ? "character-left" : "character-left-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${leftLeft ? "left-left" : "left-left-closed"}`}
              onAnimationEnd={toggleLeft}
            >
              <Character />
            </div>
            <div
              className={`${leftUp ? "left-up" : "left-up-closed"}`}
              onAnimationEnd={toggleUp}
            >
              <Character />
            </div>
            <div
              className={`${leftRight ? "left-right" : "left-right-closed"}`}
              onAnimationEnd={toggleRight}
            >
              <Character />
            </div>
            <div
              className={`${leftDown ? "left-down" : "left-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
          </div>
          <div className="town-middle-middle"></div>
          <div className="town-middle-right">
            <div
              className={`${
                rightCharacter ? "character-right" : "character-right-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${rightLeft ? "right-left" : "right-left-closed"}`}
              onAnimationEnd={toggleLeft}
            >
              <Character />
            </div>
            <div
              className={`${rightUp ? "right-up" : "right-up-closed"}`}
              onAnimationEnd={toggleUp}
            >
              <Character />
            </div>
            <div
              className={`${rightRight ? "right-right" : "right-right-closed"}`}
              onAnimationEnd={toggleRight}
            >
              <Character />
            </div>
            <div
              className={`${rightDown ? "right-down" : "right-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
            <div className="town-market" onClick={toggleGoRight}>
              <h2>Market</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="town-bottom">
          <div className="town-bottom-left">
            <Casa />
            <ArrowUpward id="up-arrow" onClick={toggleHouseThree} />
          </div>
          <div className="town-bottom-middle">
            <div
              className={`${
                downCharacter ? "character-down" : "character-down-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${downLeft ? "down-left" : "down-left-closed"}`}
              onAnimationEnd={toggleLeft}
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
              className={`${downRight ? "down-right" : "down-right-closed"}`}
              onAnimationEnd={toggleRight}
            >
              <Character />
            </div>
            <div
              className={`${downDown ? "down-down" : "down-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
            <div className="town-town" onClick={toggleGoDown}>
              <h2>Home</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="town-bottom-right">
            <Casa />
            <ArrowUpward id="up-arrow" onClick={toggleHouseFour} />
          </div>
        </div>
      </div>

      <Card
        className={`${oldmanCard ? "component-card" : "component-card-closed"}`}
      >
        <Typography variant="h4" color="primary">
          I don't have time to waste talking to you. Aaargh! Fine. What do you
          want to know?
        </Typography>
        <List className="component-list">
          <ListItem onClick={toggleAnswerOne}>The Castle</ListItem>
          <ListItem onClick={toggleAnswerTwo}>The Dragon</ListItem>
          <ListItem onClick={toggleAnswerFive}>The Guard</ListItem>
          <ListItem onClick={toggleAnswerThree}>The Market</ListItem>
          <ListItem onClick={toggleAnswerFour}>Employment</ListItem>
        </List>
        <Button onClick={toggleOldmanCard} variant="contained" color="primary">
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Castle
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Bah! Don't waste your time at the castle. The king won't even see you.
          He has no use for his subjects except for our taxes.
        </Typography>
        <Button onClick={toggleAnswerOne} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Dragon
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Don't get me started on that wretched dragon. I imagine it would take
          magic to slay him but good luck getting a magical creature to help
          you.
        </Typography>
        <Button onClick={toggleAnswerTwo} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Market
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          It's a typical market. If you have gold it's a good place to get
          supplies.
        </Typography>
        <Button onClick={toggleAnswerThree} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Employment
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Hah! You look lazy, I wouldn't waste my time on you. You could try the
          stables. I hope you like manure. Hehehe!
        </Typography>
        <Button onClick={toggleAnswerFour} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFive ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Guard
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I know little about the guard aside from the fact that he eats nuts
          constantly. He considers himself above us townspeople.
        </Typography>
        <Button onClick={toggleAnswerFive} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${oilRejectionCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The lock is far too rusty to unlock.
        </Typography>
        <Button
          onClick={() => setOilRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          PickRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The door is locked.
        </Typography>
        <Button
          onClick={() => setPickRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${unlockCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The lock clicks open.
        </Typography>
        <Button
          onClick={() => setUnlockCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${oilCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You apply oil liberally to the lock. It should now be easier to
          unlock.
        </Typography>
        <Button
          onClick={() => setOilCard(false)}
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
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          This part of town is very quiet. Everyone must be off working except
          one cantankerous old man who is standing at the crossroads giving you
          dirty looks.
        </Typography>
        <Button onClick={toggleFirst} variant="contained" color="primary">
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
export default connect(mapStateToProps, { getUser, getInventory, logoutUser })(
  Town
);
