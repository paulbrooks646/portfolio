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
  const [throneData, setThroneData] = useState({});
  const [king, setKing] = useState(false);
  const [commonerRejectionCard, setCommonerRejectionCard] = useState(false);
  const [paintingCard, setPaintingCard] = useState(false);
  const [throneRejectionCard, setThroneRejectionCard] = useState(false);
  const [hairCard, setHairCard] = useState(false);
  const [scalesCard, setScalesCard] = useState(false);
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
      setCommonerRejectionCard(true);
    }
     else if (throneData.queen_freed && !throneData.axe_received) {
      axios.post("/api/axe").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/throne").then((res) => {
          setThroneData(res.data[0]);
          setAxeCard(true);
        });
      });
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
      } else {
        setRejectionCard(true)
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
          <div
            className="throne-top-left"
            onClick={() => setPaintingCard(true)}
          >
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
            <div
              className="throne-seat-div"
              onClick={() => setThroneRejectionCard(true)}
            >
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
          <ListItem onClick={toggleAnswerOne}>Champion</ListItem>
          <ListItem onClick={toggleAnswerTwo}>Dragon</ListItem>
          <ListItem onClick={toggleAnswerThree}>Hydra</ListItem>
          <ListItem onClick={toggleAnswerFour}>Knight</ListItem>
          <ListItem onClick={toggleAnswerFive}>Maze</ListItem>
          <ListItem onClick={toggleAnswerSix}>Queen</ListItem>
          <ListItem onClick={toggleAnswerSeven}>Taxes</ListItem>
          <ListItem onClick={toggleAnswerEight}>Trolls</ListItem>
          <ListItem onClick={toggleAnswerNine}>The Ultimate Axe</ListItem>
        </List>
        <Button onClick={toggleKing} variant="contained" color="primary">
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Champion
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I have decreed that any knight who slays the hydra will be named my
          champion.
        </Typography>
        <Button onClick={toggleAnswerOne} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Dragon
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I do not know how to slay the dragon, many have died trying. I do
          possess the ultimate axe, which may help.
        </Typography>
        <Button onClick={toggleAnswerTwo} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Hydra
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Hydra's are near impossible to kill. If you cut one, it grows
          stronger. There is one in the bog. Brings some scales to prove it is
          dead.
        </Typography>
        <Button onClick={toggleAnswerThree} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Knight
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I will make you a knight if you can rid our land of the troll
          terrorizing the valley. Bring a strand of its hair to prove it's gone.
        </Typography>
        <Button onClick={toggleAnswerFour} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFive ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Maze
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Many have disappeared in the maze. One man may have solved it but he
          is injured and delirious. He lives somewhere in town.
        </Typography>
        <Button onClick={toggleAnswerFive} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerSix ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Queen
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          My beloved queen has disappeared. Even my bravest knights have failed
          to find her.
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
          I will not lower taxes until my queen is found.
        </Typography>
        <Button onClick={toggleAnswerSeven} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerEight ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Trolls
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Trolls are tough. The have strong arms and can throw very accurately.
          It is possible to scare a troll if you can figure out how.
        </Typography>
        <Button onClick={toggleAnswerEight} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerNine ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Ultimate Axe
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I could not part with our most prized family heirloom. I suppose if my
          champion returned my queen to me I would.
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
          You enter a beautiful throne room. The carpet, paintings and the
          actual throne are emaculate. The king is more imppressive still.
        </Typography>
        <Button onClick={toggleFirst} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          commonerRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Letter or no letter, I do not speak to commoners. If you are no
          commoner bring me a valuable gem to prove it.
        </Typography>
        <Button
          onClick={() => setCommonerRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${paintingCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          There would be dire consequences if you tried to steal one if the
          King's paintings.
        </Typography>
        <Button
          onClick={() => setPaintingCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          throneRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          No one sits on the throne except the king!
        </Typography>
        <Button
          onClick={() => setThroneRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${gemCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Aah! I suppose you are not as common as you seem.
        </Typography>
        <Button
          onClick={() => setGemCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${hairCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          So, you have rid us of the troll. I hereby declare you a knight.
        </Typography>
        <Button
          onClick={() => setHairCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${scalesCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          So, you have slain the hydra. Very impressive indeed. I hereby declare
          you my champion.
        </Typography>
        <Button
          onClick={() => setScalesCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${axeCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You have returned my queen to me, I cannot thank you enough. Here is the ultimate axe as promised. Go forth and slay the dragon.
        </Typography>
        <Button
          onClick={() => setAxeCard(false)}
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
  Throne
);
