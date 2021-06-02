import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Valley.scss";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";

function Valley(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [rightLeft, setRightLeft] = useState(false);
  const [leftLeft, setLeftLeft] = useState(false);
  const [rightRight, setRightRight] = useState(false);
  const [leftRight, setLeftRight] = useState(false);
  const [leftCharacter, setLeftCharacter] = useState(false);
  const [rightCharacter, setRightCharacter] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [valleyData, setValleyData] = useState();
  const [firstTimeCard, setFirstTimeCard] = useState(false);
  const [trollRejectionCard, setTrollRejectionCard] = useState(false);
  const [pastRejectionCard, setPassRejectionCard] = useState(false);
  const [shieldCard, setShieldCard] = useState(false);
  const [pictureCard, setPictureCard] = useState(false);
  const [coinCard, setCoinCard] = useState(false);
  const [hairCard, setHairCard] = useState(false);
  const [mirrorCard, setMirrorCard] = useState(false)
  const [bridgeRejectionCard, setBridgeRejectionCard] = useState(false)

  useEffect(() => {
    axios.get("/api/valley").then((res) => {
      if (res.data[0].first_time) {
        setFirstTimeCard(true);
      }
      setValleyData(res.data[0]);

      if (props.user.user.last === "glade") {
        setLeftCharacter(true);
      } else if (props.user.user.last === "stables") {
        setRightCharacter(true);
      }
      setIsLoading(false);
    });
  }, []);

  const toggleFirst = () => {
    axios.post("/api/valleyFirst").then((res) => {
      setValleyData(res.data[0]);
      setFirstTimeCard(false);
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
    if (item === "shield") {
      axios.post("/api/useShield").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/valley").then((res) => {
          setValleyData(res.data[0]);
          setShieldCard(true);
        });
      });
    } else if (item === "picture") {
      if (valleyData.shield_used) {
        axios.post("/api/usePicture").then(res => {
          props.getInventory(res.data)
          axios.get("/api/valley").then(res => {
            setValleyData(res.data[0])
            setPictureCard(true)
          })
        })
      } else {
        setRejectionCard(true)
      }
    } else {
      setRejectionCard(true)
    }
  };

  const toggleRight = () => {
    axios.post("/api/changeLast", { last: "valley" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Stables");
      });
    });
  };

  const toggleLeft = () => {
    axios.post("/api/changeLast", { last: "valley" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Glade");
      });
    });
  };

  const toggleGoLeft = () => {
    if (props.user.user.last === "glade") {
      setLeftCharacter(false);
      setLeftLeft(true);
    } else if (props.user.user.last === "stables") {
      if (!valleyData.shield_used) {
        setPassRejectionCard(true)
      } else {
        setRightCharacter(false);
        setRightLeft(true);
      }
    }
  };

  const toggleGoRight = () => {
    if (props.user.user.last === "glade") {
      setLeftCharacter(false);
      setLeftRight(true);
    } else if (props.user.user.last === "stables") {
      setRightCharacter(false);
      setRightRight(true);
    }
  };

  const toggleHair = () => {
    axios.post("/api/hair").then(res => {
      props.getInventory(res.data)
      axios.get("/api/valley").then(res => {
        setValleyData(res.data[0])
        setHairCard(true)
      })
    })
  }

  const toggleCoin = () => {
    if (!valleyData.shield_used) {
      setPassRejectionCard(true)
    } else {
      axios.post("/api/valleyCoin").then(res => {
        setValleyData(res.data[0])
        axios.post("/api/coin").then(res => {
          props.getUser(res.data)
          setCoinCard(true)
        })
      })
    }
  }

   const toggleCoinTwo = () => {
     axios.post("/api/valleyCoinTwo").then((res) => {
       setValleyData(res.data[0]);
       axios.post("/api/coin").then((res) => {
         props.getUser(res.data);
         setCoinCard(true);
       });
     });
  };
  
  const toggleBridge = () => {
    if (!valleyData.shield_used) {
      setPassRejectionCard(true)
    } else if (valleyData.mirror_taken) {
      setBridgeRejectionCard(true)
    } else {
      axios.post("/api/mirror").then(res => {
        props.getInventory(res.data)
        axios.get("/api/valley").then(res => {
          setValleyData(res.data[0])
          setMirrorCard(true)
        })
})
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
      <div className="valley-body">
        <div className="valley-top">
          <div className="valley-top-left">
            <div
              className={`${
                !valleyData.picture_used ? "troll" : "troll.closed"
              }`}
              onClick={() => setTrollRejectionCard(true)}
            ></div>
            <div
              className={`${
                valleyData.picture_used && !valleyData.coin_two_taken
                  ? "coin"
                  : "coin-closed"
              }`}
              onClick={toggleCoinTwo}
            ></div>
            <div
              className={`${
                valleyData.picture_used && !valleyData.hair_taken
                  ? "hair"
                  : "hair-closed"
              }`}
              onClick={toggleHair}
            ></div>
          </div>
          <div className="valley-top-middle"></div>
          <div className="valley-top-right"></div>
        </div>
        <div className="valley-middle">
          <div className="valley-middle-left">
            <div className="valley-glade" onClick={toggleGoLeft}>
              <ArrowBack />
              <h2>Glade</h2>
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
          </div>
          <div className="valley-middle-middle" onClick={toggleBridge}></div>
          <div className="valley-middle-right">
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
            <div className="valley-stables" onClick={toggleGoRight}>
              <h2>Stables</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="valley-bottom">
          <div className="valley-bottom-left">
            {" "}
            <div
              className={`${!valleyData.coin_taken ? "coin" : "coin-closed"}`}
              onClick={toggleCoin}
            ></div>
          </div>
          <div className="valley-bottom-middle"></div>
          <div className="valley-bottom-right"></div>
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
      <Card
        className={`${firstTimeCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You approach the bridge. There is a troll grinning menacingly standing
          right next to the bridge holding a boulder.
        </Typography>
        <Button
          onClick={toggleFirst}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          trollRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Troll's aren't friendly. This one in particular looks ready to maim
          you. You decide not to approach him.
        </Typography>
        <Button
          onClick={() => setTrollRejectionCard(false)}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          pastRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Until you find a way to protect yourself from the Troll's boulder, you
          cannot proceed.
        </Typography>
        <Button
          onClick={() => setPassRejectionCard(false)}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${shieldCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You hide behind your shield and head towards the bridge. You hear a
          large clang and are knocked to the ground. As you get up you see
          disappointment in the troll's eyes. You are now safe to pass.
        </Typography>
        <Button
          onClick={() => setShieldCard(false)}
          className="forest-card-button"
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
          You pick up the greasy, disgusting strand of purple troll hair.
        </Typography>
        <Button
          onClick={() => setHairCard(false)}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${pictureCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You show the picture of the goat to the troll. Fear fills his eyes and
          he flees at an impressive speed. Unfortunately you drop your picture
          into the mud.
        </Typography>
        <Button
          onClick={() => setPictureCard(false)}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${mirrorCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Under the bridge you find a mirror.
        </Typography>
        <Button
          onClick={() => setMirrorCard(false)}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${bridgeRejectionCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You find nothing else under the bridge.
        </Typography>
        <Button
          onClick={() => setBridgeRejectionCard(false)}
          className="forest-card-button"
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
export default connect(mapStateToProps, { getUser, getInventory, logoutUser })(Valley);
