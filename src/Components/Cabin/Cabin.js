import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Cabin.scss";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Loading from "../Loading/Loading";
import Character from "../Character/Character";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

function Cabin(props) {
  const [upCharacter, setUpCharacter] = useState(false);
  const [upUp, setUpUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mushroomCard, setMushroomCard] = useState(false);
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [oldMan, setOldMan] = useState(false);
  const [firstTimeCard, setFirstTimeCard] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [toyCard, setToyCard] = useState(false);
  const [cabinData, setCabinData] = useState();
  const [inventoryOpen, setInentoryOpen] = useState(false);
  const [cabinRejectionCard, setCabinRejectionCard] = useState(false);
   const [woodCard, setWoodCard] = useState(false);
   const [knifeCard, setKnifeCard] = useState(false);
   const [potatoesCard, setPotatoesCard] = useState(false);

  useEffect(() => {
    axios.get("/api/cabin").then((res) => {
      setCabinData(res.data[0]);
      setUpCharacter(true);
      if (res.data[0].first_time) {
        setFirstTimeCard(true);
      }
      setIsLoading(false);
    });
  }, []);

  const toggleInventoryOpen = () => setInentoryOpen(!inventoryOpen);

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
    if (item === "wood") {
      if (cabinData.potatoes_given) {
        axios.post("/api/giveWood").then(() => {
          axios.get("/api/cabin").then((res) => {
            setCabinData(res.data[0]);
            axios.get("/api/inventory").then((res) => {
              props.getInventory(res.data);
              setWoodCard(true);
            });
          });
        });
      } else {
        setRejectionCard(true);
      }
    } else if (item === "potatoes") {
      axios.post("/api/givePotatoes").then(() => {
        axios.get("/api/cabin").then((res) => {
          setCabinData(res.data[0]);
          axios.get("/api/inventory").then((res) => {
            props.getInventory(res.data);
            axios.post("/api/coin").then((res) => {
              props.getUser(res.data);
              setPotatoesCard(true);
            });
          });
        });
      });
    } else if (item === "knife") {
      if (cabinData.potatoes_given) {
        axios.post("/api/giveKnife").then(() => {
          axios.get("/api/cabin").then((res) => {
            setCabinData(res.data[0]);
            axios.get("/api/inventory").then((res) => {
              props.getInventory(res.data);
              setKnifeCard(true);
            });
          });
        });
      } else {
        setRejectionCard(true);
      }
    } else {
      setRejectionCard(true)
    }
  };

  const toggleMushroom = () => {
    axios.post("/api/mushroom").then((res) => {
      props.getInventory(res.data);
      axios.get("/api/cabin").then((res) => {
        setCabinData(res.data[0]);
        setMushroomCard(true);
      });
    });
  };

  const toggleOldMan = () => {
    if (
      cabinData.knife_given &&
      cabinData.wood_given &&
      !cabinData.toy_received
    ) {
      axios.post("/api/toy").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/cabin").then((res) => {
          setCabinData(res.data[0]);
          setToyCard(true);
        });
      });
    } else if (!cabinData.potatoes_given) {
      setCabinRejectionCard(true);
    } else {
      setOldMan(!oldMan);
    }
  };

  const toggleAnswerOne = () => {
    toggleOldMan();
    setAnswerOne(!answerOne);
  };

  const toggleAnswerTwo = () => {
    toggleOldMan();
    setAnswerTwo(!answerTwo);
  };

  const toggleAnswerThree = () => {
    toggleOldMan();
    setAnswerThree(!answerThree);
  };

  const toggleAnswerFour = () => {
    toggleOldMan();
    setAnswerFour(!answerFour);
  };

  const toggleFirstTimeCard = () => {
    axios.post("/api/cabinFirst").then((res) => {
      setCabinData(res.data[0]);
      setFirstTimeCard(false);
    });
  };

  const toggleUp = () => {
    axios.post("/api/changeLast", { last: "cabin" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Pass");
      });
    });
  };

  const toggleGoUp = () => {
    setUpCharacter(false);
    setUpUp(true);
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
      <div className="cabin-body">
        <div className="cabin-top">
          <div className="cabin-top-left">
            <div className="pine-tree">
              <div className="pine-tree-top"></div>
              <div className="pine-tree-middle"></div>
              <div className="pine-tree-bottom"></div>
              <div className="pine-tree-trunk"></div>
            </div>
          </div>
          <div className="cabin-top-middle">
            <div className="cabin-home" onClick={toggleGoUp}>
              <ArrowUpward />
              <h2>Pass</h2>
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
          </div>
          <div className="cabin-top-right">
            <div className="pine-tree">
              <div className="pine-tree-top"></div>
              <div className="pine-tree-middle"></div>
              <div className="pine-tree-bottom"></div>
              <div className="pine-tree-trunk"></div>
            </div>
          </div>
        </div>
        <div className="cabin-middle">
          <div className="cabin-middle-left">
            <div className="cabin-cottage">
              <div className="cabin-left"></div>
              <div className="cabin-cottage-middle">
                <div className="cabin-chimney-div">
                  <div className="cabin-smoke"></div>
                  <div className="cabin-smoke-middle"></div>
                  <div className="cabin-smoke"></div>
                  <div className="cabin-chimney"></div>
                </div>
                <div className="cabin-short-log"></div>
                <div className="cabin-medium-log"></div>
                <div className="cabin-window-div">
                  <div className="cabin-window-div-side">
                    <div className="cabin-short-log"></div>
                    <div className="cabin-short-log"></div>
                  </div>
                  <div className="cabin-window">
                    <div className="cabin-window-row">
                      <div className="cabin-window-pane"></div>
                      <div className="cabin-window-line"></div>
                      <div className="cabin-window-pane"></div>
                    </div>
                    <div className="cabin-window-middle"></div>
                    <div className="cabin-window-row">
                      <div className="cabin-window-pane"></div>
                      <div className="cabin-window-line"></div>
                      <div className="cabin-window-pane"></div>
                    </div>
                  </div>
                  <div className="cabin-window-div-side">
                    <div className="cabin-short-log"></div>
                    <div className="cabin-short-log"></div>
                  </div>
                </div>
                <div className="cabin-long-log"></div>
                <div className="cabin-long-log"></div>
                <div className="cabin-door-div">
                  <div className="cabin-door-div-side">
                    <div className="cabin-short-log"></div>
                    <div className="cabin-short-log"></div>
                    <div className="cabin-short-log"></div>
                  </div>
                  <div className="cabin-door">
                    <div className="cabin-door-knob"></div>
                    <div className="cabin-lock-div">
                      <div className="cabin-lock-top"></div>
                      <div className="cabin-lock-bottom"></div>
                    </div>
                  </div>
                  <div className="cabin-door-div-side">
                    <div className="cabin-short-log"></div>
                    <div className="cabin-short-log"></div>
                    <div className="cabin-short-log"></div>
                  </div>
                </div>
              </div>
              <div className="cabin-right"></div>
            </div>
          </div>
          <div className="cabin-middle-middle"></div>
          <div className="cabin-middle-right">
            <div className="pine-tree">
              <div className="pine-tree-top"></div>
              <div className="pine-tree-middle"></div>
              <div className="pine-tree-bottom"></div>
              <div className="pine-tree-trunk"></div>
            </div>
          </div>
        </div>
        <div className="cabin-bottom">
          <div className="cabin-bottom-left">
            <div
              className="woodsman"
              onClick={toggleOldMan}
            >
              <div className="woodsman-head">
                <div className="woodsman-hair-left"></div>
                <div className="woodsman-face">
                  <div className="woodsman-hair-top-left"></div>
                  <div className="woodsman-hair-top-right"></div>
                  <div className="woodsman-eyes">
                    <div className="woodsman-eye">
                      <div className="woodsman-iris"></div>
                    </div>
                    <div className="woodsman-eye">
                      <div className="woodsman-iris">
                        <div className="woodsman-pupil"></div>
                      </div>
                    </div>
                  </div>
                  <div className="woodsman-nose"></div>
                  <div className="woodsman-mouth"></div>
                </div>
                <div className="woodsman-hair-right"></div>
              </div>
              <div className="woodsman-body">
                <div className="woodsman-upper-neck"></div>
                <div className="woodsman-neck"></div>
                <div className="woodsman-dress">
                  <div className="woodsman-arm-left">
                    <div className="woodsman-finger-div">
                      <div className="woodsman-finger-one"></div>
                      <div className="woodsman-finger-two"></div>
                      <div className="woodsman-finger-three"></div>
                      <div className="woodsman-finger-four"></div>
                      <div className="woodsman-finger-five"></div>
                    </div>
                  </div>
                  <div className="woodsman-rope">
                    <div className="woodsman-rope-line"></div>
                    <div className="woodsman-rope-line"></div>
                    <div className="woodsman-rope-line"></div>
                    <div className="woodsman-rope-line"></div>
                    <div className="woodsman-rope-line"></div>
                    <div className="woodsman-rope-line"></div>
                  </div>
                  <div className="woodsman-dress-crease"></div>

                  <div className="woodsman-arm-right">
                    <div className="woodsman-finger-div">
                      <div className="woodsman-finger-one"></div>
                      <div className="woodsman-finger-two"></div>
                      <div className="woodsman-finger-three"></div>
                      <div className="woodsman-finger-four"></div>
                      <div className="woodsman-finger-five"></div>
                    </div>
                  </div>
                </div>
                <div className="woodsman-legs">
                  <div className="woodsman-leg-left">
                    <div className="woodsman-foot"></div>
                  </div>
                  <div className="woodsman-leg-right">
                    <div className="woodsman-foot"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="chair-div">
              <div className="chair-top-div">
                <div className="chair-top"></div>
              </div>
              <div className="chair-seat"></div>
              <div className="chair-leg-div">
                <div className="chair-leg"></div>
                <div className="chair-leg"></div>
              </div>
            </div>
          </div>
          <div className="cabin-bottom-middle"></div>
          <div className="cabin-bottom-right">
            <div
              className={`${
                !cabinData.mushroom_taken ? "mushroom" : "mushroom-closed"
              }`}
              onClick={toggleMushroom}
            >
              <div className="mushroom-top">
                <div className="mushroom-speckle-one"></div>
                <div className="mushroom-speckle-two"></div>
                <div className="mushroom-speckle-three"></div>
                <div className="mushroom-speckle-four"></div>
              </div>
              <div className="mushroom-stem"></div>
            </div>
          </div>
        </div>
      </div>
      <Card
        className={`${mushroomCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You pick the plump mushroom and take it with you.
        </Typography>
        <Button
          onClick={() => setMushroomCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${oldMan ? "component-card" : "component-card-closed"}`}
      >
        <Typography variant="h5" color="primary">
          I suppose since you saved me a trip to civilization I could answer a
          few questions?
        </Typography>
        <List className="component-list">
          <ListItem onClick={toggleAnswerOne}>Pass</ListItem>
          <ListItem onClick={toggleAnswerTwo}>Cabin</ListItem>
          <ListItem onClick={toggleAnswerThree}>Whittling</ListItem>
          <ListItem onClick={toggleAnswerFour}>Toy</ListItem>
        </List>
        <Button onClick={toggleOldMan} variant="contained" color="primary">
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Pass
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I guess you being here means the pass is open. Too bad. Things have
          been quiet around here since the ogre blocked the pass. I've had
          plenty of time to whittle in peace.
        </Typography>
        <Button onClick={toggleAnswerOne} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Cabin
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I built this cabin myself so that I could live in peace and quiet.
          Over the years more people have ventured up this way, at least until
          the ogre blocked the pass. Every year or so I go into town for food to
          supplement what I can find in the mountains.
        </Typography>
        <Button onClick={toggleAnswerTwo} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Whittling
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I find whittling relaxing. I can make anything out of wood. Used to be
          I would chop down a tree and have enough wood to whittle for a long
          time. I'm old enough now that my tree chopping days are over. I
          scrounge for wood here and there but it is hard to find good wood.
        </Typography>
        <Button onClick={toggleAnswerThree} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Toy
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I suppose I could make a toy for you if you got me some wood and a new
          knife.
        </Typography>
        <Button onClick={toggleAnswerFour} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${firstTimeCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography variant="h4" color="primary">
          Phew!
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          As you descend the other side of the mountain things start to get
          warmer. In the distance you see smoke. As you get closer you see that
          the smoke is coming out of the chimney of a cabin. An old man sits in
          a chair out front snoozing.
        </Typography>
        <Button
          onClick={toggleFirstTimeCard}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          cabinRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          If I didn't need the occasional vittles and whittling supplies I would
          go so deep into the mountains no one could ever find me. You best be
          getting along.
        </Typography>
        <Button
          onClick={() => setCabinRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${toyCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Here is the toy as promised.
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
      <Card
        className={`${potatoesCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          Thanks for the potatoes. I was running low on vittles. Here is a coin
          in payment.
        </Typography>
        <Button
          onClick={() => setPotatoesCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${knifeCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          Thanks for the new knife!
        </Typography>
        <Button
          onClick={() => setKnifeCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${woodCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          Thanks for the wood!
        </Typography>
        <Button
          onClick={() => setWoodCard(false)}
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
  Cabin
);
