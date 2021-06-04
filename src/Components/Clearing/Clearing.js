import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import axios from "axios";
import "./Clearing.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import { getInventory } from "../../redux/inventoryReducer";

function Clearing(props) {
  const [downCharacter, setDownCharacter] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [clearingData, setClearingData] = useState({});
  const [gateRejectionCard, setGateRejectionCard] = useState(false);
  const [gateCard, setGateCard] = useState(false);
  const [firstTimeCard, setFirstTimeCard] = useState(false);
  const [chestCard, setChestCard] = useState(false);
  const [strengthCard, setStrengthCard] = useState(false);
  const [seedCard, setSeedCard] = useState(false);
  const [invisibilityRejectionCard, setInvisibilityRejectionCard] = useState(false)
  const [invisibilityCard, setInvisibilityCard] = useState(false);
  const [daggerCard, setDaggerCard] = useState(false);
  const [plantCard, setPlantCard] = useState(false);
  const [queenCard, setQueenCard] = useState(false);

  useEffect(() => {
    axios.get("/api/clearing").then((res) => {
      if (res.data[0].first_time) {
        setFirstTimeCard(true);
      }
      setClearingData(res.data[0]);
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
    if (item === "seed") {
      if (!clearingData.dagger_used) {
        setRejectionCard(true)
      } else {
        axios.post("/api/useSeed").then((res) => {
          props.getInventory(res.data)
          axios.get("/api/clearing").then(res => {
            setClearingData(res.data[0]);
            setSeedCard(true)

          })
        });
      }
    } else if (item === "strength") {
      axios.post("/api/useStrength").then(res => {
        props.getInventory(res.data)
        axios.get("/api/clearing").then(res => {
          setClearingData(res.data[0])
          setStrengthCard(true)
        })
      })
    } else if (item === "invisibility") {
      if (!clearingData.strength_used) {
        setRejectionCard(true)
      } else {
        axios.post("/api/useInvisibility").then(res => {
          props.getInventory(res.data)
          axios.get("/api/clearing").then(res => {
            setClearingData(res.data[0])
            setInvisibilityCard(true)
          })
        })
      }
    } else if (item === "dagger") {
      if (!clearingData.invisibility_used) {
        setRejectionCard(true)
      } else {
        axios.post("/api/useDagger").then(res => {
          props.getInventory(res.data)
          axios.get("/api/clearing").then(res => {
            setClearingData(res.data[0])
            setDaggerCard(true)
          })
        })
      }
    } else {
      setRejectionCard(true)
    }
  };

  const toggleDown = () => {
    axios.post("/api/changeLast", { last: "clearing" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Maze");
      });
    });
  };

  const toggleFirst = () => {
    axios.post("/api/clearingFirst").then((res) => {
      setClearingData(res.data[0]);
      setFirstTimeCard(false)
    });
  };

  const toggleGoDown = () => {
    setDownDown(true);
    setDownCharacter(false);
  };

  const toggleGate = () => {
    setGateCard(true)
  }

  const toggleChest = () => {
    if (!clearingData.strength_used) {
      setGateRejectionCard(true)
    } else if (!clearingData.invisibility_used) {
      setInvisibilityRejectionCard(true)
    } else {
      axios.post("/api/chest").then(res => {
        props.getInventory(res.data)
        axios.get("/api/clearing").then(res => {
          setClearingData(res.data[0])
          setChestCard(true)
        })
      })
    }
  }

  const toggleQueen = () => {
    if (!clearingData.strength_used) {
      setGateRejectionCard(true)
    } else if (!clearingData.invisibility_used) {
      setInvisibilityRejectionCard(true)
    } else {
      setQueenCard(true)
    }
  }

  const togglePlant = () => {
    setPlantCard(true)
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
      <div className="clearing-body">
        <div className="clearing-top">
          <div className="clearing-top-left">
            <div className="clearing-cottage">
              <div className="clearing-left"></div>
              <div className="clearing-cottage-middle">
                <div className="clearing-chimney-div">
                  <div className="clearing-smoke"></div>
                  <div className="clearing-smoke-middle"></div>
                  <div className="clearing-smoke"></div>
                  <div className="clearing-chimney"></div>
                </div>
                <div className="clearing-short-log"></div>
                <div className="clearing-medium-log"></div>
                <div className="clearing-window-div">
                  <div className="clearing-window-div-side">
                    <div className="clearing-short-log"></div>
                    <div className="clearing-short-log"></div>
                  </div>
                  <div className="clearing-window">
                    <div className="clearing-window-row">
                      <div className="clearing-window-pane"></div>
                      <div className="clearing-window-line"></div>
                      <div className="clearing-window-pane"></div>
                    </div>
                    <div className="clearing-window-middle"></div>
                    <div className="clearing-window-row">
                      <div className="clearing-window-pane"></div>
                      <div className="clearing-window-line"></div>
                      <div className="clearing-window-pane"></div>
                    </div>
                  </div>
                  <div className="clearing-window-div-side">
                    <div className="clearing-short-log"></div>
                    <div className="clearing-short-log"></div>
                  </div>
                </div>
                <div className="clearing-long-log"></div>
                <div className="clearing-long-log"></div>
                <div className="clearing-door-div">
                  <div className="clearing-door-div-side">
                    <div className="clearing-short-log"></div>
                    <div className="clearing-short-log"></div>
                    <div className="clearing-short-log"></div>
                  </div>
                  <div className="clearing-door">
                    <div className="clearing-door-knob"></div>
                    <div className="clearing-lock-div">
                      <div className="clearing-lock-top"></div>
                      <div className="clearing-lock-bottom"></div>
                    </div>
                  </div>
                  <div className="clearing-door-div-side">
                    <div className="clearing-short-log"></div>
                    <div className="clearing-short-log"></div>
                    <div className="clearing-short-log"></div>
                  </div>
                </div>
              </div>
              <div className="clearing-right"></div>
            </div>
          </div>
          <div className="clearing-top-middle">
            <div
              className={`${
                !clearingData.chest_taken
                  ? "clearing-hole"
                  : "clearing-hole-closed"
              }`} onClick={toggleChest}
            ></div>
          </div>
          <div className="clearing-top-right">
            <div
              className={`${
                !clearingData.dagger_used ? "queen" : "queen-closed"
              }`} onClick={toggleQueen}
            >
              <div className="queen-head">
                <div className="queen-hair-left"></div>
                <div className="queen-face">
                  <div className="queen-hair-top-left"></div>
                  <div className="queen-hair-top-right"></div>
                  <div className="queen-eyes">
                    <div className="queen-eye">
                      <div className="queen-iris"></div>
                    </div>
                    <div className="queen-eye">
                      <div className="queen-iris">
                        <div className="queen-pupil"></div>
                      </div>
                    </div>
                  </div>
                  <div className="queen-nose"></div>
                  <div className="queen-mouth"></div>
                </div>
                <div className="queen-hair-right"></div>
              </div>
              <div className="queen-body">
                <div className="queen-upper-neck"></div>
                <div className="queen-neck"></div>
                <div className="queen-dress">
                  <div className="queen-arm-left">
                    <div className="queen-finger-div">
                      <div className="queen-finger-one"></div>
                      <div className="queen-finger-two"></div>
                      <div className="queen-finger-three"></div>
                      <div className="queen-finger-four"></div>
                      <div className="queen-finger-five"></div>
                    </div>
                  </div>
                  <div className="queen-rope">
                    <div className="queen-rope-line"></div>
                    <div className="queen-rope-line"></div>
                    <div className="queen-rope-line"></div>
                    <div className="queen-rope-line"></div>
                    <div className="queen-rope-line"></div>
                    <div className="queen-rope-line"></div>
                  </div>
                  <div className="queen-dress-crease"></div>

                  <div className="queen-arm-right">
                    <div className="queen-finger-div">
                      <div className="queen-finger-one"></div>
                      <div className="queen-finger-two"></div>
                      <div className="queen-finger-three"></div>
                      <div className="queen-finger-four"></div>
                      <div className="queen-finger-five"></div>
                    </div>
                  </div>
                </div>
                <div className="queen-legs">
                  <div className="queen-leg-left">
                    <div className="queen-foot"></div>
                  </div>
                  <div className="queen-leg-right">
                    <div className="queen-foot"></div>
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
        </div>
        <div className="clearing-middle">
          <div className="clearing-middle-left">
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
          </div>
          <div className="clearing-middle-middle">
            <div
              className={`${
                !clearingData.strength_used
                  ? "clearing-gate"
                  : "clearing-gate-closed"
              }`} onClick={toggleGate}
            >
              <div className="clearing-gate-top">
                <div className="clearing-gate-bolt"></div>
                <div className="clearing-gate-bolt"></div>
              </div>
              <div className="clearing-gate-middle">
                <div className="clearing-gate-bar-div">
                  <div className="clearing-gate-support"></div>
                  <div className="clearing-gate-support"></div>
                </div>
                <div className="clearing-gate-handle-div">
                  <div className="clearing-gate-handle"></div>
                </div>
              </div>
              <div className="clearing-gate-bottom">
                <div className="clearing-gate-bolt"></div>
                <div className="clearing-gate-bolt"></div>
              </div>
            </div>
          </div>
          <div className="clearing-middle-right">
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
          </div>
        </div>
        <div className="clearing-bottom">
          <div className="clearing-bottom-left"></div>
          <div className="clearing-bottom-middle">
            <div
              className={`${
                clearingData.seed_used
                  ? "clearing-plant"
                  : "clearing-plant-closed"
              }`} onClick={togglePlant}
            >
              <div className="clearing-plant-head">
                <div className="clearing-plant-eye-div">
                  <div className="clearing-plant-eye">
                    <div className="clearing-plant-pupil"></div>
                  </div>
                  <div className="clearing-plant-eye">
                    <div className="clearing-plant-pupil"></div>
                  </div>
                </div>
                <div className="clearing-plant-mouth">
                  <div className="clearing-plant-top-teeth">
                    <div className="clearing-plant-top-tooth"></div>
                    <div className="clearing-plant-top-tooth"></div>
                    <div className="clearing-plant-top-tooth"></div>
                    <div className="clearing-plant-top-tooth"></div>
                    <div className="clearing-plant-top-tooth"></div>
                    <div className="clearing-plant-top-tooth"></div>
                    <div className="clearing-plant-top-tooth"></div>
                    <div className="clearing-plant-top-tooth"></div>
                  </div>
                  <div className="clearing-plant-bottom-teeth">
                    <div className="clearing-plant-bottom-tooth"></div>
                    <div className="clearing-plant-bottom-tooth"></div>
                    <div className="clearing-plant-bottom-tooth"></div>
                    <div className="clearing-plant-bottom-tooth"></div>
                    <div className="clearing-plant-bottom-tooth"></div>
                    <div className="clearing-plant-bottom-tooth"></div>
                    <div className="clearing-plant-bottom-tooth"></div>
                    <div className="clearing-plant-bottom-tooth"></div>
                  </div>
                </div>
              </div>
              <div className="clearing-vine-top"></div>
              <div className="clearing-leaf-top"></div>
              <div className="clearing-vine-middle"></div>
              <div className="clearing-leaf-bottom"></div>
              <div className="clearing-vine-bottom"></div>
            </div>
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
            <div className="clearing-maze" onClick={toggleGoDown}>
              <h2>Maze</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="clearing-bottom-right"></div>
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
      <Card
        className={`${
          gateRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          Until you can get this gate open, there is no way to get to the other
          side.
        </Typography>
        <Button
          onClick={() => setGateRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${plantCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          Are you crazy? Look at the size of that plant! Do you see its sharp
          teeth. It would devour you in one bite.
        </Typography>
        <Button
          onClick={() => setPlantCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${gateCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You are nowhere near strong enough to lift the bar on the gate or pull
          it open. It must take several brigands to do it.
        </Typography>
        <Button
          onClick={() => setGateCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${queenCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You try to untie the queen but the knots on the rope around her are
          too tight.
        </Typography>
        <Button
          onClick={() => setQueenCard(false)}
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
          After escaping the maze you come to a fortress. This must be where the
          brigands live. Be very careful.
        </Typography>
        <Button onClick={toggleFirst} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${daggerCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You carefully saw through the rope around the queen with your dagger.
          Once she is free the queens runs away as fast as she can.
        </Typography>
        <Button
          onClick={() => setDaggerCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${strengthCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          As you read the scroll, it disappers. You feel as strong as ten men.
          You easily but quietly remove the bar and open the gate.
        </Typography>
        <Button
          onClick={() => setStrengthCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${invisibilityCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          As you read the scroll, it disappears. You suddenly can't see
          yourself. You can now enter the compound without being seen.
        </Typography>
        <Button
          onClick={() => setInvisibilityCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${chestCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          The dirt here appears to have been recently disturbed. You start
          digging and find a large chest. It is packed with gold and other
          valuables. This must be everything the brigands have stolen.
        </Typography>
        <Button
          onClick={() => setChestCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${seedCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You plant the seed. The ground rumbles. A gigantic plant springs up.
          The brigands will never get past it. If a lucky few survive, the will
          have to flee away from this kingdom.
        </Typography>
        <Button
          onClick={() => setSeedCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${invisibilityRejectionCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          If you enter the compound the is a good chance you will be seen through a window. Find a way to prevent that from happening.
        </Typography>
        <Button
          onClick={() => setInvisibilityRejectionCard(false)}
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
  Clearing
);
