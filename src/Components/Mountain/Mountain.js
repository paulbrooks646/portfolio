import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Mountain.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";

function Mountain(props) {
  const [mountaineer, setMountaineer] = useState(false);
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [downCharacter, setDownCharacter] = useState(false);
  const [leftCharacter, setLeftCharacter] = useState(false);
  const [rightCharacter, setRightCharacter] = useState(false);
  const [downLeft, setDownLeft] = useState(false);
  const [rightLeft, setRightLeft] = useState(false);
  const [leftLeft, setLeftLeft] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [downRight, setDownRight] = useState(false);
  const [rightRight, setRightRight] = useState(false);
  const [rightDown, setRightDown] = useState(false);
  const [leftRight, setLeftRight] = useState(false);
  const [leftDown, setLeftDown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [firstTimeCard, setFirstTimeCard] = useState(false);
  const [rockCard, setRockCard] = useState(false);
  const [coinCard, setCoinCard] = useState(false);
  const [mountainData, setMountainData] = useState();
  const [rejectionCard, setRejectionCard] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);

  useEffect(() => {
    axios.get("/api/mountain").then((res) => {
      if (res.data[0].first_time) {
        setFirstTimeCard(true);
      }
      setMountainData(res.data[0]);

      if (props.user.user.last === "pass") {
        setDownCharacter(true);
      } else if (props.user.user.last === "nest") {
        setLeftCharacter(true);
      } else if (props.user.user.last === "home") {
        setRightCharacter(true);
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
    setRejectionCard(true);
  };

  const toggleRock = () => {
    axios.post("/api/rock").then((res) => {
      props.getInventory(res.data);
      axios.get("/api/mountain").then((res) => {
        setMountainData(res.data[0]);
        setRockCard(true);
      });
    });
  };

  const toggleCoin = () => {
    axios.post("/api/mountainCoin").then((res) => {
      setMountainData(res.data[0]);
      axios.post("/api/coin").then((res) => {
        props.getUser(res.data);
        setCoinCard(true);
      });
    });
  };

  const toggleRight = () => {
    axios.post("/api/changeLast", { last: "mountain" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Dashboard");
      });
    });
  };

  const toggleLeft = () => {
    axios.post("/api/changeLast", { last: "mountain" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Nest");
      });
    });
  };

  const toggleDown = () => {
    axios.post("/api/changeLast", { last: "mountain" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Pass");
      });
    });
  };

  const toggleMountaineer = () => {
    setMountaineer(!mountaineer);
  };

  const toggleAnswerOne = () => {
    toggleMountaineer();
    setAnswerOne(!answerOne);
  };

  const toggleAnswerTwo = () => {
    toggleMountaineer();
    setAnswerTwo(!answerTwo);
  };

  const toggleAnswerThree = () => {
    toggleMountaineer();
    setAnswerThree(!answerThree);
  };

  const toggleAnswerFour = () => {
    toggleMountaineer();
    setAnswerFour(!answerFour);
  };

  const toggleFirstTimeCard = () => {
    axios.post("/api/mountainFirst").then((res) => {
      setMountainData(res.data[0]);
      setFirstTimeCard(false);
    });
  };

  const toggleGoLeft = () => {
    if (props.user.user.last === "pass") {
      setDownLeft(true);
      setDownCharacter(false);
    } else if (props.user.user.last === "nest") {
      setLeftCharacter(false);
      setLeftLeft(true);
    } else if (props.user.user.last === "home") {
      setRightCharacter(false);
      setRightLeft(true);
    }
  };

  const toggleGoRight = () => {
    if (props.user.user.last === "pass") {
      setDownRight(true);
      setDownCharacter(false);
    } else if (props.user.user.last === "nest") {
      setLeftCharacter(false);
      setLeftRight(true);
    } else if (props.user.user.last === "home") {
      setRightCharacter(false);
      setRightRight(true);
    }
  };

  const toggleGoDown = () => {
    if (props.user.user.last === "pass") {
      setDownDown(true);
      setDownCharacter(false);
    } else if (props.user.user.last === "nest") {
      setLeftCharacter(false);
      setLeftDown(true);
    } else if (props.user.user.last === "home") {
      setRightCharacter(false);
      setRightDown(true);
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
      <div className="mountain-body">
        <div className="mountain-top">
          <div className="mountain-top-left"></div>
          <div className="mountain-top-middle"></div>
          <div className="mountain-top-right"></div>
        </div>
        <div className="mountain-middle">
          <div className="mountain-middle-left">
            <div className="mountain-nest" onClick={toggleGoLeft}>
              <ArrowBack />
              <h2>Nest</h2>
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
          <div className="mountain-middle-middle">
            <div className="mountain-mountaineer" onClick={toggleMountaineer}>
              <div className="mountain-mountaineer-hat">
                <div className="mountain-mountaineer-hat-top"></div>
                <div className="mountain-mountaineer-hat-bottom"></div>
              </div>
              <div className="mountain-mountaineer-head">
                <div className="mountain-mountaineer-hair-left"></div>
                <div className="mountain-mountaineer-face">
                  <div className="mountain-mountaineer-eyes">
                    <div className="mountain-mountaineer-eye">
                      <div className="mountain-mountaineer-iris">
                        <div className="mountain-mountaineer-pupil"></div>
                      </div>
                    </div>
                    <div className="mountain-mountaineer-eye">
                      <div className="mountain-mountaineer-iris">
                        <div className="mountain-mountaineer-pupil"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mountain-mountaineer-nose-div">
                    <div className="mountain-mountaineer-left-ear"></div>
                    <div className="mountain-mountaineer-nose"></div>
                    <div className="mountain-mountaineer-right-ear"></div>
                  </div>
                  <div className="mountain-mountaineer-mouth"></div>
                </div>
                <div className="mountain-mountaineer-hair-right"></div>
              </div>
              <div className="mountain-mountaineer-neck"></div>
              <div className="mountain-mountaineer-shirt">
                <div className="mountain-mountaineer-left-arm">
                  <div className="mountain-mountaineer-hand">
                    <div className="mountain-mountaineer-finger-line"></div>
                    <div className="mountain-mountaineer-finger-line"></div>
                    <div className="mountain-mountaineer-finger-line"></div>
                  </div>
                </div>
                <div className="mountain-mountaineer-right-arm">
                  <div className="mountain-mountaineer-hand">
                    <div className="mountain-mountaineer-finger-line"></div>
                    <div className="mountain-mountaineer-finger-line"></div>
                    <div className="mountain-mountaineer-finger-line"></div>
                  </div>
                </div>
              </div>
              <div className="mountain-mountaineer-pants"></div>
              <div className="mountain-mountaineer-leg-div">
                <div className="mountain-mountaineer-leg">
                  <div className="mountain-mountaineer-shoe"></div>
                </div>
                <div className="mountain-mountaineer-leg">
                  <div className="mountain-mountaineer-shoe"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mountain-middle-right">
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
            <div className="mountain-home" onClick={toggleGoRight}>
              <h2>Home</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="mountain-bottom">
          <div className="mountain-bottom-left">
            <div
              className={`${!mountainData.rock_taken ? "rock" : "rock-closed"}`}
              onClick={toggleRock}
            ></div>
            <div
              className={`${
                mountainData.rock_taken && !mountainData.coin_taken
                  ? "coin"
                  : "coin-closed"
              }`}
              onClick={toggleCoin}
            ></div>
          </div>
          <div className="mountain-bottom-middle">
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
            <div className="mountain-pass" onClick={toggleGoDown}>
              <h2>Pass</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="mountain-bottom-right"></div>
        </div>
      </div>

      <Card
        className={`${
          mountaineer ? "component-card" : "component-card-closed"
        }`}
      >
        <Typography variant="h5" color="primary">
          What brings you up the mountain?
        </Typography>
        <List className="component-list">
          <ListItem onClick={toggleAnswerOne}>Griffins</ListItem>
          <ListItem onClick={toggleAnswerTwo}>Nests</ListItem>
          <ListItem onClick={toggleAnswerThree}>Ogres</ListItem>
          <ListItem onClick={toggleAnswerFour}>The Pass</ListItem>
        </List>
        <Button onClick={toggleMountaineer} variant="contained" color="primary">
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Griffins
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Griffins are massive birds. They are very fast and very protective of
          their young. Griffins typically won't attack humans unless a human
          gets too close to the Griffin's nest.
        </Typography>
        <Button onClick={toggleAnswerOne} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Nests
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          There are nests all throughout the cliffs up in the mountains. They
          are home to giant birds like Rocs and Griffins. Griffins are
          particularly common in this area.
        </Typography>
        <Button onClick={toggleAnswerTwo} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Ogres
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Ogres are massive. Funny creatures, you could hit an Ogre as hard as
          you like, it wouldn't hurt the Ogre and he wouldn't feel it. You could
          scream as loud as you want, an Ogre wouldn't even notice. But an
          Ogre's sense of smell is unrivaled. Ogre's keep to themselves but can
          get aggressive if they smell something nasty enough.
        </Typography>
        <Button onClick={toggleAnswerThree} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Pass
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          As snow in the mountains melt, it flows down the mountain. Many people
          and creatures depend on that water. The pass is a point this water is
          shallow enough to cross, it is the only way through the mountains.
        </Typography>
        <Button onClick={toggleAnswerFour} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${firstTimeCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography variant="h4" color="primary">
          Brrrrrrr!
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          It sure is cold up here. You make you way higher and higher into the
          mountains. You come across a mountaineer and hope he might be a good
          source of information about the surrounding area.
        </Typography>
        <Button
          onClick={toggleFirstTimeCard}
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
        <Button
          onClick={() => setCoinCard(false)}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${rockCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You take a rock that you find hidden under the snow.
        </Typography>
        <Button
          onClick={() => setRockCard(false)}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
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
  Mountain
);
