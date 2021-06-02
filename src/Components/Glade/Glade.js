import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import axios from "axios";
import "./Glade.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import { getInventory } from "../../redux/inventoryReducer";

function Glade(props) {
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [answerFive, setAnswerFive] = useState(false);
  const [answerSix, setAnswerSix] = useState(false);
  const [answerSeven, setAnswerSeven] = useState(false);
  const [answerEight, setAnswerEight] = useState(false);
  const [answerNine, setAnswerNine] = useState(false);
  const [answerTen, setAnswerTen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [upCharacter, setUpCharacter] = useState(false);
  const [rightCharacter, setRightCharacter] = useState(false);
  const [rightUp, setRightUp] = useState(false);
  const [rightRight, setRightRight] = useState(false);
  const [upUp, setUpUp] = useState(false);
  const [upRight, setUpRight] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [gladeData, setGladeData] = useState();
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [firstTimeCard, setFirstTimeCard] = useState(false);
  const [druid, setDruid] = useState(false);

  useEffect(() => {
    axios.get("/api/glade").then((res) => {
      if (res.data[0].first_time) {
        setFirstTimeCard(true);
      }
      setGladeData(res.data[0]);

      if (props.user.user.last === "valley") {
        setRightCharacter(true);
      } else if (props.user.user.last === "maze") {
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
          setGladeData(res.data[0]);
        });
      } else {
        setRejectionCard(true);
      }
    }
  };

  const toggleRight = () => {
    axios.post("/api/changeLast", { last: "glade" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Valley");
      });
    });
  };

  const toggleUp = () => {
    axios.post("/api/changeLast", { last: "glade" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Maze");
      });
    });
  };

  const toggleGoRight = () => {
    if (props.user.user.last === "valley") {
      setRightCharacter(false);
      setRightRight(true);
    } else if (props.user.user.last === "maze") {
      setUpCharacter(false);
      setUpRight(true);
    }
  };

  const toggleGoUp = () => {
    if (props.user.user.last === "valley") {
      setRightCharacter(false);
      setRightUp(true);
    } else if (props.user.user.last === "maze") {
      setUpCharacter(false);
      setUpUp(true);
    }
  };

  const toggleDruid = () => {
    setDruid(!druid);
  };

  const toggleAnswerOne = () => {
    toggleDruid();
    setAnswerOne(!answerOne);
  };

  const toggleAnswerTwo = () => {
    toggleDruid();
    setAnswerTwo(!answerTwo);
  };

  const toggleAnswerThree = () => {
    toggleDruid();
    setAnswerThree(!answerThree);
  };

  const toggleAnswerFour = () => {
    toggleDruid();
    setAnswerFour(!answerFour);
  };

  const toggleAnswerFive = () => {
    toggleDruid();
    setAnswerFive(!answerFive);
  };

  const toggleAnswerSix = () => {
    toggleDruid();
    setAnswerSix(!answerSix);
  };

  const toggleAnswerSeven = () => {
    toggleDruid();
    setAnswerSeven(!answerSeven);
  };

  const toggleAnswerEight = () => {
    toggleDruid();
    setAnswerEight(!answerEight);
  };

  const toggleAnswerNine = () => {
    toggleDruid();
    setAnswerNine(!answerNine);
  };

  const toggleAnswerTen = () => {
    toggleDruid();
    setAnswerTen(!answerTen);
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
      <div className="glade-body">
        <div className="glade-top">
          <div className="glade-top-left">
            <div className="glade-upper-wall-div">
              <div className="glade-upper-wall-top"></div>
              <div className="glade-upper-wall-front"></div>
            </div>
          </div>

          <div className="glade-top-middle">
            <div className="glade-maze" onClick={toggleGoUp}>
              <ArrowUpward />
              <h2>Maze</h2>
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
              className={`${upRight ? "up-right" : "up-right-closed"}`}
              onAnimationEnd={toggleRight}
            >
              <Character />
            </div>
          </div>
          <div className="glade-top-right"></div>
        </div>
        <div className="glade-middle">
          <div className="glade-middle-left">
            <div className="glade-middle-wall-div">
              <div className="glade-middle-wall-top"></div>
              <div className="glade-middle-wall-front"></div>
              </div>
              </div>
            <div className="glade-middle-middle">
              <div className="druid" onClick={toggleDruid}>
                <div className="druid-hat"></div>
                <div className="druid-head">
                  <div className="druid-hair-left"></div>
                  <div className="druid-face">
                    <div className="druid-hair-top-left"></div>
                    <div className="druid-hair-top-right"></div>
                    <div className="druid-eyes">
                      <div className="druid-eye">
                        <div className="druid-iris">
                        </div>
                      </div>
                      <div className="druid-eye">
                        <div className="druid-iris">
                          <div className="druid-pupil"></div>
                        </div>
                      </div>
                    </div>
                    <div className="druid-nose"></div>
                    <div className="druid-mouth"></div>
                  </div>
                  <div className="druid-hair-right"></div>
                </div>
                <div className="druid-body">
                  <div className="druid-upper-neck"></div>
                  <div className="druid-neck"></div>
                  <div className="druid-dress">
                    <div className="druid-shirt">
                      <div className="druid-arm">
                        <div className="driud-staff-div">
                          <div className="druid-staff-top">

                          </div>
                          <div className="druid-staff-middle"></div>
                          <div className="druid-staff-bottom"></div>
                        </div>
                        <div className="druid-finger-div">
                          <div className="druid-finger-one"></div>
                          <div className="druid-finger-two"></div>
                          <div className="druid-finger-three"></div>
                          <div className="druid-finger-four"></div>
                          <div className="druid-finger-five"></div>
                        </div>
                      </div>
                    </div>
                    <div className="druid-pants-div"></div>
                  </div>
                  <div className="druid-legs">
                    <div className="druid-leg-left">
                      <div className="druid-foot"></div>
                    </div>
                    <div className="druid-leg-right">
                      <div className="druid-foot"></div>
                    </div>
                  </div>
                </div>
              </div>
            
          </div>
          <div className="glade-middle-right">
            <div
              className={`${
                rightCharacter ? "character-right" : "character-right-closed"
              }`}
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
            <div className="glade-valley" onClick={toggleGoRight}>
              <h2>Valley</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="glade-bottom">
          <div className="glade-bottom-left">
            <div className="glade-lower-wall-div">
              <div className="glade-lower-wall-top"></div>
              <div className="glade-lower-wall-front"></div>
            </div>
          </div>
          <div className="glade-bottom-middle"></div>
          <div className="glade-bottom-right"></div>
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
      <Card className={`${druid ? "component-card" : "component-card-closed"}`}>
        <Typography variant="h5" color="primary">
          What do you need to know?
        </Typography>
        <List className="component-list">
          <ListItem onClick={toggleAnswerOne}>Beggar</ListItem>
          <ListItem onClick={toggleAnswerTwo}>Brigands</ListItem>
          <ListItem onClick={toggleAnswerThree}>Dragon</ListItem>
          <ListItem onClick={toggleAnswerFour}>Fire Cloak</ListItem>
          <ListItem onClick={toggleAnswerFive}>Magic Druid</ListItem>
          <ListItem onClick={toggleAnswerSix}>Master Druid</ListItem>
          <ListItem onClick={toggleAnswerSeven}>Druid</ListItem>
          <ListItem onClick={toggleAnswerEight}>Thieves</ListItem>
          <ListItem onClick={toggleAnswerNine}>Becoming a Druid</ListItem>
          <ListItem onClick={toggleAnswerTen}>Quest</ListItem>
        </List>
        <Button onClick={toggleDruid} variant="contained" color="primary">
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Beggar
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          She keeps an eye on my entrance and signals me if there is a threat to
          me or her. I feed her and she sleeps in here at night. She must have
          liked you if she didn't warn me about you.
        </Typography>
        <Button onClick={toggleAnswerOne} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Brigand
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          How dare you! I am no brigand. I hurt no one unless threatened.
          Brigands do not care who they hurt or rob.
        </Typography>
        <Button onClick={toggleAnswerTwo} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Dragon
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I don't know how to slay the dragon but I do possess the Fire Cloak.
          It could definitely help.
        </Typography>
        <Button onClick={toggleAnswerThree} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Fire Cloak
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          It protects the user from heat and fire. I would only give it to a
          master druid who has completed a quest.
        </Typography>
        <Button onClick={toggleAnswerFour} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFive ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Magic Druid
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          If a child writes something they wish for on a piece of paper, the
          Magic Druid grants their wish and leaves what they wished for on the
          piece of paper.
        </Typography>
        <Button onClick={toggleAnswerFive} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerSix ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Master Druid
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          A master druid can open locks an ordinary druid can't and are eligible
          for quests. One must prove themself before I would delcare them a
          master druid.
        </Typography>
        <Button onClick={toggleAnswerSix} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>

      <Card className={`${answerSeven ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Druid
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I come from a long line of thieves. I was trained young and loved what
          I did until I saw the poverty of some targets. Once the brigand's
          arrived in the area everyone got poorer. I couldn't take from those
          who had so little. My parents died sometime ago. The other thieves
          left when people had nothing to steal.
        </Typography>
        <Button onClick={toggleAnswerSeven} variant="contained" color="primary">
          NEXT
        </Button>
      </Card>
      <Card className={`${answerEight ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Thieves
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The thieves of this guild have never been violent. Used to be that
          thieves would rob from anybody but things have changed.
        </Typography>
        <Button onClick={toggleAnswerEight} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerNine ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Becoming a Druid
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          If you will take on the mantel of Magic Druid. I will dub you a druid,
          and give you a lock pick and coins. If you grant four wishes without
          being heard, I will dub you master druid and give you a quest.
        </Typography>
        <Button onClick={toggleAnswerNine} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTen ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Quest
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The quest is two-fold. Bring me the gold the brigand's have stolen so
          I may distribute it to the poor. Then make sure the Brigand's can
          pillage no more. Do this and I will give you the Fire Cloak.
        </Typography>
        <Button onClick={toggleAnswerTen} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getInventory, logoutUser })(
  Glade
);
