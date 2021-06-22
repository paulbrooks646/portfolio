import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Cottage.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";

function Cottage(props) {
  const [upCharacter, setUpCharacter] = useState(false);
  const [upUp, setUpUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [laserRejectionCard, setLaserRejectionCard] = useState(false);
  const [bramblesRejectionCard, setBramblesRejectionCard] = useState(false);
  const [podRejectionCard, setPodRejectionCard] = useState(false);
  const [purseCard, setPurseCard] = useState(false);
  const [coinCard, setCoinCard] = useState(false);
  const [podCard, setPodCard] = useState(false);
  const [levitationCard, setLevitationCard] = useState(false);
  const [invisibilityCard, setInvisibilityCard] = useState(false);
  const [laserCard, setLaserCard] = useState(false);
  const [brambleCard, setBrambleCard] = useState(false);
  const [doorRejectionCard, setDoorRejectionCard] = useState(false);
  const [lockRejectionCard, setLockRejectionCard] = useState(false);
  const [firstTimeCard, setFirstTimeCard] = useState(false);
  const [lockCard, setLockCard] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [cottageData, setCottageData] = useState();
  const [protectionCard, setProtectionCard] = useState(false);
  const [fireCard, setFireCard] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [takePodRejectionCard, setTakePodRejectionCard] = useState(false);
  const [featherCard, setFeatherCard] = useState(false);

  useEffect(() => {
    axios.get("/api/cottage").then((res) => {
      if (res.data[0].first_time) {
        setFirstTimeCard(true);
      }
      setCottageData(res.data[0]);
      setUpCharacter(true);

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
    if (item === "protection") {
      axios.post("/api/useProtection").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/cottage").then((res) => {
          setCottageData(res.data[0]);
          setProtectionCard(true);
        });
      });
    } else if (item === "fire") {
      if (cottageData.pod_taken) {
        axios.post("/api/useFire").then((res) => {
          props.getInventory(res.data);
          axios.get("/api/cottage").then((res) => {
            setCottageData(res.data[0]);
            setFireCard(true);
          });
        });
      } else {
        setRejectionCard(true);
      }
    } else if (item === "open") {
      if (cottageData.door_unlocked) {
        axios.post("/api/useOpen").then((res) => {
          props.getInventory(res.data);
          axios.get("/api/cottage").then((res) => {
            setCottageData(res.data[0]);
            setOpenCard(true);
          });
        });
      } else {
        setRejectionCard(true);
      }
    } else if (item === "feather") {
      if (cottageData.protection_used) {
        axios.post("/api/useFeather").then((res) => {
          props.getInventory(res.data);
          axios.get("/api/cottage").then((res) => {
            setCottageData(res.data[0]);
            setFeatherCard(true);
          });
        });
      } else {
        setRejectionCard(true);
      }
    } else {
      setRejectionCard(true);
    }
  };

  const toggleUp = () => {
    axios.post("/api/changeLast", { last: "cottage" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Cave");
      });
    });
  };

  const toggleGoUp = () => {
    setUpCharacter(false);
    setUpUp(true);
  };

  const toggleHouseFive = () => {
    if (!cottageData.protection_used) {
      setLaserRejectionCard(true);
    } else if (!cottageData.pod_taken) {
      setPodRejectionCard(true);
    } else if (!cottageData.fire_used) {
      setBramblesRejectionCard(true);
    } else if (!cottageData.door_unlocked) {
      if (cottageData.master_thief) {
        axios.post("/api/houseFiveLock").then((res) => {
          setCottageData(res.data[0]);
          setLockCard(true);
        });
      } else {
        setLockRejectionCard(true);
      }
    } else if (!cottageData.open_used) {
      setDoorRejectionCard(true);
    } else {
      props.history.push("/HouseFive");
    }
  };

  const togglePurse = () => {
    if (!cottageData.protection_used) {
      setLaserRejectionCard(true);
    } else if (!cottageData.pod_taken) {
      setPodRejectionCard(true);
    } else if (!cottageData.fire_used) {
      setBramblesRejectionCard(true);
    } else {
      axios.post("/api/coin").then((res) => {
        props.getUser(res.data);
        axios.post("/api/coin").then((res) => {
          props.getUser(res.data);
          axios.post("/api/coin").then((res) => {
            props.getUser(res.data);
            axios.post("/api/coin").then((res) => {
              props.getUser(res.data);
              axios.post("/api/coin").then((res) => {
                props.getUser(res.data);
                axios.post("/api/purseTaken").then((res) => {
                  setCottageData(res.data[0]);
                  setPurseCard(true);
                });
              });
            });
          });
        });
      });
    }
  };

  const toggleCoin = () => {
    axios.post("/api/coin").then((res) => {
      props.getUser(res.data);
      axios.post("/api/cottageCoin").then((res) => {
        setCottageData(res.data[0]);
      });
    });
  };

  const togglePod = () => {
    if (!cottageData.protection_used) {
      setLaserRejectionCard(true);
    } else if (!cottageData.feather_used) {
      setTakePodRejectionCard(true);
    } else {
      axios.post("/api/pod").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/cottage").then((res) => {
          setCottageData(res.data[0]);
          setPodCard(true);
        });
      });
    }
  };

  const toggleLevitation = () => {
    if (!cottageData.protection_used) {
      setLaserRejectionCard(true);
    } else if (!cottageData.pod_taken) {
      setPodRejectionCard(true);
    } else if (!cottageData.fire_used) {
      setBramblesRejectionCard(true);
    } else {
      axios.post("/api/levitation").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/cottage").then((res) => {
          setCottageData(res.data[0]);
          setLevitationCard(true);
        });
      });
    }
  };

  const toggleBrambles = () => {
    if (!cottageData.protection_used) {
      setLaserRejectionCard(true);
    } else if (!cottageData.pod_taken) {
      setPodRejectionCard(true);
    } else {
      setBrambleCard(true);
    }
  };

  const toggleInvisibility = () => {
    if (!cottageData.protection_used) {
      setLaserRejectionCard(true);
    } else if (!cottageData.pod_taken) {
      setPodRejectionCard(true);
    } else if (!cottageData.fire_used) {
      setBramblesRejectionCard(true);
    } else {
      axios.post("/api/invisibility").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/cottage").then((res) => {
          setCottageData(res.data[0]);
          setInvisibilityCard(true);
        });
      });
    }
  };

  const toggleFirstTime = () => {
    axios.post("/api/cottageFirst").then((res) => {
      setCottageData(res.data[0]);
      setFirstTimeCard(false);
    });
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
      <div className="cottage-body">
        <div className="cottage-top">
          <div className="cottage-top-left">
            <div className="creepy-tree">
              <div className="creepy-trunk-top">
                <div className="creepy-tree-branch-one"></div>
                <div className="creepy-tree-branch-two"></div>
              </div>
              <div className="creepy-trunk-middle">
                <div className="creepy-tree-branch-three"></div>
                <div className="creepy-tree-branch-four"></div>
              </div>
              <div className="creepy-trunk-bottom">
                <div className="creepy-tree-branch-five"></div>
              </div>
            </div>
          </div>
          <div className="cottage-top-middle">
            <div className="cottage-home" onClick={toggleGoUp}>
              <ArrowUpward />
              <h2>Cave</h2>
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
          <div className="cottage-top-right">
            <div className="creepy-tree">
              <div className="creepy-trunk-top">
                <div className="creepy-tree-branch-one"></div>
                <div className="creepy-tree-branch-two"></div>
              </div>
              <div className="creepy-trunk-middle">
                <div className="creepy-tree-branch-three"></div>
                <div className="creepy-tree-branch-four"></div>
              </div>
              <div className="creepy-trunk-bottom">
                <div className="creepy-tree-branch-five"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="cottage-middle">
          <div className="cottage-middle-left">
            <div
              className={`${
                !cottageData.protection_used ? "lasers" : "lasers-closed"
              }`}
              onClick={() => setLaserCard(true)}
            ></div>
            <div className="pouch-main">
              <div
                className={`${
                  !cottageData.purse_taken ? "pouch" : "pouch-closed"
                }`}
                onClick={togglePurse}
              >
                <div className="pouch-top"></div>
                <div className="pouch-rope-one"></div>
                <div className="pouch-rope-two"></div>
                <div className="pouch-bottom"></div>
              </div>
            </div>
            <div className="pod-div">
              <div
                className={`${
                  !cottageData.pod_taken
                    ? "dashboard-pod"
                    : "dahsboard-pod-closed"
                }`}
                onClick={togglePod}
              >
                <div className="pod-top">
                  <div className="pod-top-top">
                    <div className="pod-speckle"></div>
                    <div className="pod-speckle"></div>
                  </div>
                  <div className="pod-top-middle">
                    <div className="pod-speckle"></div>
                    <div className="pod-speckle"></div>
                    <div className="pod-speckle"></div>
                  </div>
                  <div className="pod-top-bottom">
                    <div className="pod-speckle"></div>
                    <div className="pod-speckle"></div>
                  </div>
                </div>
                <div className="pod-bottom"></div>
              </div>
              <div
                className={`${
                  !cottageData.coin_taken && cottageData.pod_taken
                    ? "coin"
                    : "coin-closed"
                }`}
                onClick={toggleCoin}
              ></div>
            </div>
          </div>
          <div className="cottage-middle-middle">
            <div
              className={`${
                !cottageData.protection_used ? "lasers" : "lasers-closed"
              }`}
              onClick={() => setLaserCard(true)}
            ></div>
          </div>
          <div className="cottage-middle-right">
            <div className="creepy-cottage">
              <div className="creepy-left"></div>
              <div className="creepy-middle">
                <div className="creepy-chimney-div">
                  <div className="creepy-smoke"></div>
                  <div className="creepy-smoke-middle"></div>
                  <div className="creepy-smoke"></div>
                  <div className="creepy-chimney"></div>
                </div>
                <div className="creepy-short-log"></div>
                <div className="creepy-medium-log"></div>
                <div className="creepy-window-div">
                  <div className="creepy-window-div-side">
                    <div className="creepy-short-log"></div>
                    <div className="creepy-short-log"></div>
                  </div>
                  <div className="creepy-window">
                    <div className="creepy-window-row">
                      <div className="creepy-window-pane"></div>
                      <div className="creepy-window-line"></div>
                      <div className="creepy-window-pane"></div>
                    </div>
                    <div className="creepy-window-middle"></div>
                    <div className="creepy-window-row">
                      <div className="creepy-window-pane"></div>
                      <div className="creepy-window-line"></div>
                      <div className="creepy-window-pane"></div>
                    </div>
                  </div>
                  <div className="creepy-window-div-side">
                    <div className="creepy-short-log"></div>
                    <div className="creepy-short-log"></div>
                  </div>
                </div>
                <div className="creepy-long-log"></div>
                <div className="creepy-long-log"></div>
                <div className="creepy-door-div">
                  <div className="creepy-door-div-side">
                    <div className="creepy-short-log"></div>
                    <div className="creepy-short-log"></div>
                    <div className="creepy-short-log"></div>
                  </div>
                  <div className="creepy-door">
                    <div className="creepy-door-knob"></div>
                    <div className="creepy-lock-div">
                      <div className="creepy-lock-top"></div>
                      <div className="creepy-lock-bottom"></div>
                    </div>
                  </div>
                  <div className="creepy-door-div-side">
                    <div className="creepy-short-log"></div>
                    <div className="creepy-short-log"></div>
                    <div className="creepy-short-log"></div>
                  </div>
                </div>
              </div>
              <div className="creepy-right"></div>
            </div>
          </div>
        </div>
        <div className="cottage-bottom">
          <div className="cottage-bottom-left">
            <div className="scroll-div">
              <div className="inner-scroll-div">
                <div
                  className={`${
                    !cottageData.levitation_taken ? "scroll" : "scroll-closed"
                  }`}
                  onClick={toggleLevitation}
                >
                  <div className="scroll-top"></div>
                  <div className="scroll-bottom"></div>
                </div>
              </div>
              <div className="inner-scroll-div">
                <div
                  className={`${
                    !cottageData.invisibility_taken ? "scroll" : "scroll-closed"
                  }`}
                  onClick={toggleInvisibility}
                >
                  <div className="scroll-top"></div>
                  <div className="scroll-bottom"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="cottage-bottom-middle">
            <div
              className={`${
                !cottageData.fire_used ? "brambles" : "brambles-closed"
              }`}
              onClick={toggleBrambles}
            >
              <div className="bramble-one">
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
              </div>
              <div className="bramble-two">
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
              </div>
              <div className="bramble-three">
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
              </div>
              <div className="bramble-four">
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
              </div>
              <div className="bramble-five">
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
              </div>
              <div className="bramble-six">
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
              </div>
              <div className="bramble-seven">
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
              </div>
              <div className="bramble-eight">
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
              </div>
              <div className="bramble-nine">
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
              </div>
              <div className="bramble-ten">
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
                <div className="bramble-thorn"></div>
              </div>
            </div>
          </div>
          <div className="cottage-bottom-right">
            <div className="arrow-div">
              <ArrowUpward id="arrow-up" onClick={toggleHouseFive} />
            </div>
          </div>
        </div>
      </div>
      <Card className={`${laserCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Sticking your hand into a wall of red lasers is not likely to end
          well. You should probably find a way to protect yourself first.
        </Typography>
        <Button
          onClick={() => setLaserCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          laserRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You will have to find a way to get by the wall of red lasers before
          you can interact with anything beyond it.
        </Typography>
        <Button
          onClick={() => setLaserRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${podCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The creepy pod pulses. You slowly inch towards it and pluck it from
          the writhing vine. It throbs in your hand and you worry it could
          explode at any minute. You carefully slip it into your pack.
        </Typography>
        <Button
          onClick={() => setPodCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${podRejectionCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          It would be wise to decide what to do about the creepy pod before you
          proceed and further.
        </Typography>
        <Button
          onClick={() => setPodRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${brambleCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You think about pushing through or climbing over the wall of brambles.
          Then you decide you would rather not get poked by thorns that are
          likely poisonous.
        </Typography>
        <Button
          onClick={() => setBrambleCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          bramblesRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Until you get past the wall of brambles there is no chance of
          interacting with things on the other side.
        </Typography>
        <Button
          onClick={() => setBramblesRejectionCard(false)}
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
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${purseCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          As you pick up the old purse it disintegrates in your hand. Inside you
          find 5 gold coins. Wahoo!
        </Typography>
        <Button
          onClick={() => setPurseCard(false)}
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
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You pick up the scroll. Scanning it you discern that it allows the
          user to hover a few inches off the ground for a short period of time.
        </Typography>
        <Button
          onClick={() => setLevitationCard(false)}
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
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You pick up the scroll. Scanning it you discern that it allows the
          user to turn invisible for a short period of time.
        </Typography>
        <Button
          onClick={() => setInvisibilityCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          doorRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Despite being unlocked now, the door still seems to be magically
          sealed.
        </Typography>
        <Button
          onClick={() => setDoorRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          lockRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You try to pick the lock but you are not yet skilled enough to pick
          this lock.
        </Typography>
        <Button
          onClick={() => setLockRejectionCard(false)}
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
          Your skin crawls and your stomach twists. This is without a doubt
          creepiest place you have ever been. You long to get as far from here
          as possible.
        </Typography>
        <Button onClick={toggleFirstTime} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${lockCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Success! The lock clicks open.
        </Typography>
        <Button
          onClick={() => setLockCard(false)}
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
        className={`${protectionCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          As you read the protection scroll it disappears. You glow blue.
          Nervously, you step into the laser field. The lasers sizzle into
          nothingness as they hit you until they are all gone. You stop glowing.
        </Typography>
        <Button
          onClick={() => setProtectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${fireCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          As you read the fire scroll it disappears. The wall of brambles bursts
          into flames. After a few glorious minutes, the wall is nothing but
          ash.
        </Typography>
        <Button
          onClick={() => setFireCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${openCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          As you read the open scroll it disappears. The unlocked door pops
          open. For better or worse, you can now enter the cottage.
        </Typography>
        <Button
          onClick={() => setOpenCard(false)}
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
  Cottage
);
