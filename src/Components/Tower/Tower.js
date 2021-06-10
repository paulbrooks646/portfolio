import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Tower.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";

function Tower(props) {
  const [leftCharacter, setLeftCharacter] = useState(false);
  const [leftLeft, setLeftLeft] = useState(false);
  const [weaselHiss, setWeaselHiss] = useState(false);
  const [weaselPurr, setWeaselPurr] = useState(false);
  const [princess, setPrincess] = useState(false);
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
  const [princessRejectionCard, setPrincessRejectionCard] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const [weaselRejectionCard, setWeaselRejectionCard] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [towerData, setTowerData] = useState({});
  const [rejectionCard, setRejectionCard] = useState();
  const [flowerCard, setFlowerCard] = useState(false);
  const [ribbonCard, setRibbonCard] = useState(false);
  const [fluteCard, setFluteCard] = useState(false);
  const [coinCard, setCoinCard] = useState(false);
  const [coinRejectionCard, setCoinRejectionCard] = useState(false);

  useEffect(() => {
    axios.get("/api/tower").then((res) => {
      if (res.data[0].first_time) {
        setFirstTime(true);
      }
      setTowerData(res.data[0]);
      setLeftCharacter(true);
      setIsLoading(false);
    });
  }, []);

  const toggleFirst = () => {
    axios.post("/api/towerFirst").then((res) => {
      setTowerData(res.data[0]);
      setFirstTime(false);
    });
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
    if (item === "flute") {
      axios.post("/api/useFlute").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/tower").then((res) => {
          setTowerData(res.data[0]);
          axios.post("/api/coin").then((res) => {
            props.getUser(res.data);
            setFluteCard(true);
          });
        });
      });
    } else if (item === "ribbon") {
      if (towerData.weasel_soothed && towerData.flowers_given) {
        axios.post("/api/giveRibbon").then((res) => {
          props.getInventory(res.data);
          axios.get("/api/tower").then((res) => {
            setTowerData(res.data[0]);
            axios.post("/api/coin").then((res) => {
              props.getUser(res.data);
              setRibbonCard(true);
            });
          });
        });
      } else {
        setRejectionCard(true);
      }
    } else if (item === "flowers") {
      if (towerData.weasel_soothed) {
        axios.post("/api/giveFlowers").then((res) => {
          props.getInventory(res.data);
          axios.post("/api/coin").then((res) => {
            props.getUser(res.data);
            axios.post("/api/coin").then((res) => {
              props.getUser(res.data);
              axios.post("/api/coin").then((res) => {
                props.getUser(res.data);
                axios.get("/api/tower").then((res) => {
                  setTowerData(res.data[0]);
                  setFlowerCard(true);
                });
              });
            });
          });
        });
      } else {
        setRejectionCard(true);
      }
    } else {
      setRejectionCard(true);
    }
  };

  const toggleLeft = () => {
    axios.post("/api/changeLast", { last: "tower" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Castle");
      });
    });
  };

  const togglePrincess = () => {
    if (!towerData.weasel_soothed) {
      setWeaselRejectionCard(true)
    } else if (!towerData.flowers_given) {
      setPrincessRejectionCard(true)
    } else {
      setPrincess(!princess);
    }
  };

  const toggleWeasel = () => {
    if (towerData.weasel_soothed) {
      setWeaselPurr(true);
    } else {
      setWeaselHiss(true);
    }
  };

  const toggleCoin = () => {
    if (towerData.weasel_soothed) {
      if (!towerData.coin_taken) {
        axios.post("/api/towerCoin").then((res) => {
          setTowerData(res.data[0]);
          axios.post("/api/coin").then((res) => {
            props.getUser(res.data);
            setCoinCard(true);
          });
        });
      } else {
        setCoinRejectionCard(true);
      }
    } else {
      setWeaselRejectionCard(true);
    }
  };

  const toggleAnswerOne = () => {
    togglePrincess();
    setAnswerOne(!answerOne);
  };

  const toggleAnswerTwo = () => {
    togglePrincess();
    setAnswerTwo(!answerTwo);
  };

  const toggleAnswerThree = () => {
    togglePrincess();
    setAnswerThree(!answerThree);
  };

  const toggleAnswerFour = () => {
    togglePrincess();
    setAnswerFour(!answerFour);
  };

  const toggleAnswerFive = () => {
    togglePrincess();
    setAnswerFive(!answerFive);
  };

  const toggleAnswerSix = () => {
    togglePrincess();
    setAnswerSix(!answerSix);
  };

  const toggleAnswerSeven = () => {
    togglePrincess();
    setAnswerSeven(!answerSeven);
  };

  const toggleAnswerEight = () => {
    togglePrincess();
    setAnswerEight(!answerEight);
  };

  const toggleAnswerNine = () => {
    togglePrincess();
    setAnswerNine(!answerNine);
  };

  const toggleGoLeft = () => {
    setLeftCharacter(false);
    setLeftLeft(true);
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
      <div className="tower-body">
        <div className="tower-top">
          <div className="tower-top-left">
            <div className="tower-coin" onClick={toggleCoin}></div>
          </div>
          <div className="tower-top-middle"></div>
          <div className="tower-top-right">
            <div className="tower-tower">
              <div className="tower-window"></div>
              <div className="tower-door">
                <div className="tower-door-knob"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="tower-middle">
          <div className="tower-middle-left">
            <div className="tower-castle" onClick={toggleGoLeft}>
              <ArrowBack />
              <h2>Castle</h2>
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
          </div>
          <div className="tower-middle-middle">
            <div className="weasel" onClick={toggleWeasel}>
              <div className="weasel-head">
                <div className="weasel-ear">
                  <div className="weasel-inner-ear"></div>
                </div>
                <div className="weasel-face">
                  <div
                    className={`${
                      towerData.weasel_soothed
                        ? "weasel-eyes"
                        : "weasel-eyes-closed"
                    }`}
                  ></div>
                  <div
                    className={`${
                      !towerData.weasel_soothed
                        ? "weasel-crazy-eyes"
                        : "weasel-crazy-eyes-closed"
                    }`}
                  ></div>
                  <div className="weasel-nose-div">
                    <div className="weasel-nose"></div>
                    <div className="weasel-whisker-div">
                      <div className="weasel-whisker-one"></div>
                      <div className="weasel-whisker-two"></div>
                      <div className="weasel-whisker-three"></div>
                    </div>
                  </div>
                  <div
                    className={`${
                      towerData.weasel_soothed
                        ? "weasel-mouth"
                        : "weasel-mouth-closed"
                    }`}
                  ></div>
                  <div
                    className={`${
                      !towerData.weasel_soothed
                        ? "weasel-crazy-mouth"
                        : "weasel-crazy-mouth-closed"
                    }`}
                  >
                    <div className="weasel-crazy-mouth-top">
                      <div className="weasel-tooth"></div>
                      <div className="weasel-tooth"></div>
                      <div className="weasel-tooth"></div>
                      <div className="weasel-tooth"></div>
                    </div>
                    <div className="weasel-crazy-mouth-bottom">
                      <div className="weasel-tooth"></div>
                      <div className="weasel-tooth"></div>
                      <div className="weasel-tooth"></div>
                      <div className="weasel-tooth"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="weasel-neck"></div>
              <div className="weasel-body">
                <div className="weasel-tummy"></div>
                <div className="weasel-limb-div">
                  <div className="weasel-paw"></div>
                  <div className="weasel-foot"></div>
                </div>
              </div>
              <div className="weasel-tail"></div>
            </div>
          </div>
          <div className="tower-middle-right">
            <div className="princess" onClick={togglePrincess}>
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
        </div>
        <div className="tower-bottom">
          <div className="tower-bottom-left"></div>
          <div className="tower-bottom-middle"></div>
          <div className="tower-bottom-right"></div>
        </div>
      </div>
      <Card
        className={`${princess ? "component-card" : "component-card-closed"}`}
      >
        <Typography variant="h5" color="primary">
          What knowledge shall I bestow upon you?
        </Typography>
        <List className="component-list">
          <ListItem onClick={toggleAnswerOne}>Argument</ListItem>
          <ListItem onClick={toggleAnswerTwo}>Brigands</ListItem>
          <ListItem onClick={toggleAnswerThree}>Gardener</ListItem>
          <ListItem onClick={toggleAnswerFour}>King</ListItem>
          <ListItem onClick={toggleAnswerFive}>Queen</ListItem>
          <ListItem onClick={toggleAnswerSix}>Ribbon</ListItem>
          <ListItem onClick={toggleAnswerSeven}>Taxes</ListItem>
          <ListItem onClick={toggleAnswerEight}>Tower</ListItem>
          <ListItem onClick={toggleAnswerNine}>Weasel</ListItem>
        </List>
        <Button onClick={togglePrincess} variant="contained" color="primary">
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Argument
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The king proposed a decrease to my allowance. The nerve.
        </Typography>
        <Button onClick={toggleAnswerOne} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Brigands
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Inconsiderate thugs. If it wasn't for them, the coins my father is
          using to stop them could be spent on me.
        </Typography>
        <Button onClick={toggleAnswerTwo} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Gardener
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          That audacious woman. Forbidding me from taking flowers. I don't care
          if it is by the king's order. When I am queen, she'll be the first to
          go.
        </Typography>
        <Button onClick={toggleAnswerThree} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          King
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You want to see the King? It would be too funny if I sent someone of
          your ignorance to speak with him. I will present you with a letter to
          be delivered to the King if you find my lost ribbon.
        </Typography>
        <Button onClick={toggleAnswerFour} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFive ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Queen
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          It has been rough since she's been gone. The coins the king is
          investing in finding her could have been spent on me.
        </Typography>
        <Button onClick={toggleAnswerFive} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerSix ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Ribbon
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          One day while I was lounging in the shade a giant bird swooped down
          and stole my favorite ribbon from the line where my servants had hung
          it to dry. Such carelessness is peeving.
        </Typography>
        <Button onClick={toggleAnswerSix} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerSeven ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Taxes
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Decrease taxes? No way! How dare people complain about lack of food.
          They should feel honored to give me their coins.
        </Typography>
        <Button onClick={toggleAnswerSeven} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerEight ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Tower
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The tower is where I go to when the King forgets what a beautiful,
          mature, intelligent young lady I am. I also come here to escape
          associating with boorish people like yourself.
        </Typography>
        <Button onClick={toggleAnswerEight} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerNine ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Weasel
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Pop is far more intelligent and loyal than you will ever be.
        </Typography>
        <Button onClick={toggleAnswerNine} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          princessRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          How droll! The peasant thinks I would talk to him.
        </Typography>
        <Button
          onClick={() => setPrincessRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          weaselRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You need to figure out how to deal with that weasel before you think about doing that.
        </Typography>
        <Button
          onClick={() => setWeaselRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${weaselHiss ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Hiiiisssssss!
        </Typography>
        <Button
          onClick={() => setWeaselHiss(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${weaselPurr ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Nem nem!
        </Typography>
        <Button
          onClick={() => setWeaselPurr(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${firstTime ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You follow the castle around towards the tower. You stop abruptly as
          you see a ferocious weasel on the path in front of you. It hisses and
          darts at you. You back away. You'll have to figure out how to get past
          the weasel if you want to go any further.
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
      <Card className={`${fluteCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          The weasel dances as you play the flute. He now seems calmer. "I'll
          have that flute," says the princess. Fortunately she tosses a coin on
          the ground. You quickly pick it up.
        </Typography>
        <Button
          onClick={() => setFluteCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${flowerCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          Flowers for me? How quaint! She tosses three coins on the ground. You
          quickly pick them up. Despite her response she seems to like the
          flowers.
        </Typography>
        <Button
          onClick={() => setFlowerCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${ribbonCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          It would seem you have located my ribbon. She tosses a letter and a
          coin on the ground. You quickly pick them up.
        </Typography>
        <Button
          onClick={() => setRibbonCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          coinRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          You find nothing else in the hole.
        </Typography>
        <Button
          onClick={() => setCoinRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${coinCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          Yay! You find a coin hidden in the hole in the wall.
        </Typography>
        <Button
          onClick={() => setCoinCard(false)}
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
  Tower
);
