import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Throne.scss";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Character from "../Character/Character";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Loading from "../Loading/Loading";
import House from "../House/House";

function Throne(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [answerFive, setAnswerFive] = useState(false);
  const [answerSix, setAnswerSix] = useState(false);
  const [answerSeven, setAnswerSeven] = useState(false);
  const [answerEight, setAnswerEight] = useState(false);
  const [answerNine, setAnswerNine] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [firstTimeCard, setFirstTimeCard] = useState(false);
  const [downCharacter, setDownCharacter] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [throneData, setThroneData] = useState();
  const [king, setKing] = useState(false);
  const [commonerRejectionCard, setCommonerRejectionCard] = useState(false);
  const [paintingCard, setPaintingCard] = useState(false);
  const [throneRejectionCard, setThroneRejectionCard] = useState(false);
  const [hairCard, setHairCard] = useState(false);
  const [scalesCard, setScalesCard] = useState(false);
  const [queenCard, setQueenCard] = useState(false);
  const [gemCard, setGemCard] = useState(false);
  const [axeCard, setAxeCard] = useState(false);

  useEffect(() => {
    axios.get("/api/throne").then((res) => {
      if (res.data[0].first_time) {
        setFirstTimeCard(true);
      }
      setThroneData(res.data[0]);
      setDownCharacter(true);
      setIsLoading(false);
    });
  }, []);

  const toggleFirst = () => {
    axios.post("/api/throneFirst").then((res) => {
      setThroneData(res.data[0]);
      setFirstTimeCard(false);
    });
  };

  const toggleKing = () => {
    if (!throneData.gem_used) {
      setCommonerRejectionCard(true)
    } if (throneData.queen_freed && !throneData.axe_received) {
      axios.post("/api/axe").then(res => {
        props.getInventory(res.data)
        axios.get("/api/throne").then(res => {
          setThroneData(res.data[0])
          setAxeCard(true)
        })
      })
    } else {
      setKing(!king);
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
    if (item === "gem") {
      axios.post("/api/useGem").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/throne").then((res) => {
          setThroneData(res.data[0]);
          setGemCard(true);
        });
      });
    } else if (item === "hair") {
      if (throneData.gem_used) {
        axios.post("/api/useHair").then((res) => {
          props.getInventory(res.data);
          axios.get("/api/throne").then((res) => {
            setThroneData(res.data[0]);
            setHairCard(true);
          });
        });
      } else {
        setRejectionCard(true);
      }
    } else if (item === "scales") {
      if (throneData.hair_used) {
        axios.post("/api/useScales").then((res) => {
          props.getInventory(res.data);
          axios.get("/api/throne").then((res) => {
            setThroneData(res.data[0]);
            setScalesCard(true);
          });
        });
      }
    } else {
      setRejectionCard(true);
    }
  };

  const toggleDown = () => {
    axios.post("/api/changeLast", { last: "throne" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Castle");
      });
    });
  };

  const toggleGoDown = () => {
    setDownDown(true);
    setDownCharacter(false);
  };

  const toggleAnswerOne = () => {
    toggleKing();
    setAnswerOne(!answerOne);
  };

  const toggleAnswerTwo = () => {
    toggleKing();
    setAnswerTwo(!answerTwo);
  };

  const toggleAnswerThree = () => {
    toggleKing();
    setAnswerThree(!answerThree);
  };

  const toggleAnswerFour = () => {
    toggleKing();
    setAnswerFour(!answerFour);
  };

  const toggleAnswerFive = () => {
    toggleKing();
    setAnswerFive(!answerFive);
  };

  const toggleAnswerSix = () => {
    toggleKing();
    setAnswerSix(!answerSix);
  };

  const toggleAnswerSeven = () => {
    toggleKing();
    setAnswerSeven(!answerSeven);
  };

  const toggleAnswerEight = () => {
    toggleKing();
    setAnswerEight(!answerEight);
  };

  const toggleAnswerNine = () => {
    toggleKing();
    setAnswerNine(!answerNine);
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
      <div className="throne-body">
        <House />
        <div className="throne-top">
          <div className="throne-top-left" onClick={() => setPaintingCard(true)}>
            <div className="princess-hat"></div>
            <div className="princess-head">
              <div className="princess-hair-left"></div>
              <div className="princess-face">
                <div className="princess-hair-top-left"></div>
                <div className="princess-hair-top-right"></div>
                <div className="princess-eyes">
                  <div className="princess-eye">
                    <div className="princess-iris">
                      <div className="princess-pupil"></div>
                    </div>
                  </div>
                  <div className="princess-eye">
                    <div className="princess-iris">
                      <div className="princess-pupil"></div>
                    </div>
                  </div>
                </div>
                <div className="princess-nose"></div>
                <div className="princess-mouth"></div>
              </div>
              <div className="princess-hair-right"></div>
            </div>
            <div className="princess-body">
              <div className="princess-upper-neck"></div>
              <div className="princess-neck"></div>
              <div className="princess-dress">
                <div className="princess-arm-left">
                  <div className="princess-hand-left">
                    <div className="princess-finger-one"></div>
                    <div className="princess-finger-two"></div>
                    <div className="princess-finger-three"></div>
                    <div className="princess-finger-four"></div>
                    <div className="princess-finger-five"></div>
                  </div>
                </div>
                <div className="princess-arm-right">
                  <div className="princess-hand-left">
                    <div className="princess-finger-one"></div>
                    <div className="princess-finger-two"></div>
                    <div className="princess-finger-three"></div>
                    <div className="princess-finger-four"></div>
                    <div className="princess-finger-five"></div>
                  </div>
                </div>
              </div>
              <div className="princess-legs">
                <div className="princess-leg-left">
                  <div className="princess-foot"></div>
                </div>
                <div className="princess-leg-right">
                  <div className="princess-foot"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="throne-top-middle">
            <div className="throne-seat-div" onClick={() => setThroneRejectionCard(true)}>
              <div className="throne-seat-top">
                <div className="throne-seat-top-left"></div>
                <div className="throne-seat-top-middle"></div>
                <div className="throne-seat-top-right"></div>
              </div>
              <div className="throne-seat-middle">
                <div className="throne-seat-middle-left"></div>
                <div className="throne-seat-middle-middle"></div>
                <div className="throne-seat-middle-right"></div>
              </div>

              <div className="throne-seat-bottom">
                <div className="throne-seat-bottom-left"></div>
                <div className="throne-seat-bottom-right"></div>
              </div>
            </div>
            <div className="throne-step-top"></div>
            <div className="throne-step-middle"></div>
            <div className="throne-step-bottom"></div>
          </div>
          <div className="throne-top-right">
            <div className="axe-div" onClick={() => setPaintingCard(true)}>
              <div className="axe-head">
                <div className="axe-head-left"></div>
                <div className="axe-head-middle">
                  <div className="axe-tip"></div>
                  <div className="axe-head-handle"></div>
                </div>
                <div className="axe-head-right"></div>
              </div>
              <div className="axe-handle-top"></div>
              <div className="axe-handle-bottom">
                <div className="axe-handle-line"></div>
                <div className="axe-handle-line"></div>
                <div className="axe-handle-line"></div>
                <div className="axe-handle-line"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="throne-middle">
          <div className="throne-middle-left"></div>
          <div className="throne-middle-middle">
            <div className="throne-king" onClick={toggleKing}>
              <div className="throne-king-cape"></div>
              <div className="throne-crown">
                <div className="throne-crown-top-div">
                  <div className="throne-crown-top"></div>
                  <div className="throne-crown-top"></div>
                  <div className="throne-crown-top"></div>
                  <div className="throne-crown-top"></div>
                  <div className="throne-crown-top"></div>
                </div>
                <div className="throne-crown-bottom"></div>
              </div>
              <div className="princess-hat"></div>
              <div className="princess-head">
                <div className="princess-hair-left"></div>
                <div className="princess-face">
                  <div className="princess-hair-top-left"></div>
                  <div className="princess-hair-top-right"></div>
                  <div className="princess-eyes">
                    <div className="princess-eye">
                      <div className="princess-iris">
                        <div className="princess-pupil"></div>
                      </div>
                    </div>
                    <div className="princess-eye">
                      <div className="princess-iris">
                        <div className="princess-pupil"></div>
                      </div>
                    </div>
                  </div>
                  <div className="princess-nose"></div>
                  <div className="princess-mouth"></div>
                </div>
                <div className="princess-hair-right"></div>
              </div>
              <div className="princess-body">
                <div className="princess-upper-neck"></div>
                <div className="princess-neck"></div>
                <div className="princess-dress">
                  <div className="princess-arm-left">
                    <div className="princess-hand-left">
                      <div className="princess-finger-one"></div>
                      <div className="princess-finger-two"></div>
                      <div className="princess-finger-three"></div>
                      <div className="princess-finger-four"></div>
                      <div className="princess-finger-five"></div>
                    </div>
                  </div>
                  <div className="princess-arm-right">
                    <div className="princess-hand-left">
                      <div className="princess-finger-one"></div>
                      <div className="princess-finger-two"></div>
                      <div className="princess-finger-three"></div>
                      <div className="princess-finger-four"></div>
                      <div className="princess-finger-five"></div>
                    </div>
                  </div>
                </div>
                <div className="princess-legs">
                  <div className="princess-leg-left">
                    <div className="princess-foot"></div>
                  </div>
                  <div className="princess-leg-right">
                    <div className="princess-foot"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="throne-middle-right"></div>
        </div>
        <div className="throne-bottom">
          <div className="throne-bottom-left"></div>
          <div className="throne-bottom-middle">
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
            <div className="throne-castle" onClick={toggleGoDown}>
              <h2>Castle</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="throne-bottom-right"></div>
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
      <Card className={`${king ? "component-card" : "component-card-closed"}`}>
        <Typography variant="h5" color="primary">
          What would you like to know about?
        </Typography>
        <List className="component-list">
          <ListItem onClick={toggleAnswerOne}>The Dragon</ListItem>
          <ListItem onClick={toggleAnswerNine}>Favor</ListItem>
          <ListItem onClick={toggleAnswerTwo}>The Garden</ListItem>
          <ListItem onClick={toggleAnswerThree}>The King</ListItem>
          <ListItem onClick={toggleAnswerFour}>Permission</ListItem>
          <ListItem onClick={toggleAnswerFive}>The Princess</ListItem>
          <ListItem onClick={toggleAnswerSix}>The Tower</ListItem>
          <ListItem onClick={toggleAnswerSeven}>The Throne Room</ListItem>
          <ListItem onClick={toggleAnswerEight}>The Ultimate Axe</ListItem>
        </List>
        <Button onClick={toggleKing} variant="contained" color="primary">
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Dragon
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You want to slay the dragon? Don't be a fool! It is said that only the
          Ultimate Axe is sharp enough to penetrate its scales.
        </Typography>
        <Button onClick={toggleAnswerOne} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Garden
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          A beautiful place to look at. I tried to get a flower for my wife once
          but the royal gardener wouldn't let me. She is very protective of her
          garden.
        </Typography>
        <Button onClick={toggleAnswerTwo} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The King
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The king doesn't like to be disturbed. He has been particularly
          irritable since he and the princess got into an argument and the
          princess took up residence in the tower.
        </Typography>
        <Button onClick={toggleAnswerThree} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Permission
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I'll tell you what if can convince me you have a legitimate reason to
          see the King and do me a favor I will let you pass.
        </Typography>
        <Button onClick={toggleAnswerFour} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFive ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Princess
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The Princess is very tempermental. Sometimes she is as warm as a
          summer day. Other times she is as frigid as winter. She is currently
          living in the tower.
        </Typography>
        <Button onClick={toggleAnswerFive} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerSix ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Tower
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          If you go there be careful. The princess doesn't want to disturbed.
          Her vicious pet weasel is attacking anyone who goes there.
        </Typography>
        <Button onClick={toggleAnswerSix} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerSeven ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Throne Room
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          No one enters the castle without my permission.
        </Typography>
        <Button onClick={toggleAnswerSeven} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerEight ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Ultimate Axe
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The Ultimate Axe is said to be the sharpest most powerful weapon ever
          created. It is in the King's posession and I can't imagine he will
          ever part with it.
        </Typography>
        <Button onClick={toggleAnswerEight} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerNine ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Favor
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          While I was hunting in the forest I lost my favorite hat. If you find
          it for me, I would be very grateful.
        </Typography>
        <Button onClick={toggleAnswerNine} variant="contained" color="primary">
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
          You walk up to a massive castle. There is a very large, grumpy looking
          guard standing in front of the castle gate.
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
  Throne
);
