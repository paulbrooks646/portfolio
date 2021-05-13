import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Pass.scss";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Loading from "../Loading/Loading";
import Character from "../Character/Character";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function Pass(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [downRejection, setDownRejection] = useState(false);
  const [ogre, setOgre] = useState(false);
  const [ogreAnimation, setOgreAnimation] = useState(false);
  const [upCharacter, setUpCharacter] = useState(false);
  const [downCharacter, setDownCharacter] = useState(false);
  const [downUp, setDownUp] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [upUp, setUpUp] = useState(false);
  const [upDown, setUpDown] = useState(false);
  const [coinCard, setCoinCard] = useState(false);
  const [gemCard, setGemCard] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false)
  const [inventoryOpen, setInventoryOpen] = useState(false)
  const [passData, setPassData] = useState()

  useEffect(() => {
    axios.get("/api/pass").then((res) => {
      setPassData(res.data[0]);
      if (props.user.user.last === "cabin") {
        setDownCharacter(true);
      } else if (props.user.user.last === "mountain") {
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
          setPassData(res.data[0]);
          ;
        });
      } else {
        setRejectionCard(true);
      }
    }
  };

  const toggleCakeGiven = () => {
    axios.post("/api/ogreMoved").then((res) => {
      setPassData(res.data[0]);
      setOgreAnimation(true);
    });
  };

  const toggleGem = () => {
    axios.post("/api/gem").then((res) => {
      props.getInventory(res.data);
      axios.get("/api/pass").then((res) => {
        setPassData(res.data[0]);
        setGemCard(true);
      });
    });
  };

  const toggleCoin = () => {
    axios.post("/api/passCoin").then((res) => {
      setPassData(res.data[0]);
      axios.post("/api/coin").then((res) => {
        props.getUser(res.data);
        setCoinCard(true);
      });
    });
  };

  const toggleOgreAnimationEnd = () => {
    setOgreAnimation(false);
  };

  const toggleUp = () => {
    axios.post("/api/changeLast", { last: "pass" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Mountain");
      });
    });
  };

  const toggleDown = () => {
    axios.post("/api/changeLast", { last: "pass" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Cabin");
      });
    });
  };

  const toggleFirst = () => {
    axios.post("/api/passFirst").then((res) => {
      setPassData(res.data[0]);
    });
  };

  const toggleGoUp = () => {
    if (props.user.user.last === "cabin") {
      setDownUp(true);
      setDownCharacter(false);
    } else if (props.user.user.last === "mountain") {
      setUpCharacter(false);
      setUpUp(true);
    }
  };

  const toggleGoDown = () => {
    if (!passData.cake_given) {
      setDownRejection(true);
    } else if (props.user.user.last === "cabin") {
      setDownDown(true);
      setDownCharacter(false);
    } else if (props.user.user.last === "mountain") {
      setUpCharacter(false);
      setUpDown(true);
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
      <div className="pass-body">
        <div className="pass-top">
          <div className="pass-top-left"></div>
          <div className="pass-top-middle">
            <div className="pass-mountain" onClick={toggleGoUp}>
              <ArrowUpward />
              <h2>Mountains</h2>
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
              className={`${upDown ? "up-down" : "up-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
          </div>
          <div
            className={`${
              passData.cake_given ? "pass-top-right-closed" : "pass-top-right"
            }`}
          ></div>
        </div>
        <div className="pass-middle">
          <div className="pass-middle-left"></div>
          <div className="pass-middle-middle">
            <div
              className={`${
                !passData.cake_given ? "pass-ogre" : "pass-ogre-closed"
              }`}
              onClick={() => setOgre(true)}
            ></div>
            <div
              className={`${ogreAnimation ? "ogre-two" : "ogre-two-closed"}`}
              onAnimationEnd={toggleOgreAnimationEnd}
            ></div>
            <div
              className={`${
                passData.cake_given &&
                passData.ogre_moved &&
                passData.gem_taken &&
                !passData.coin_taken
                  ? "coin"
                  : "coin-closed"
              }`}
              onClick={toggleCoin}
            ></div>
            <div
              className={`${
                passData.cake_given &&
                passData.ogre_moved &&
                !passData.gem_taken
                  ? "gem"
                  : "gem-closed"
              }`}
              onClick={toggleGem}
            ></div>
          </div>

          <div
            className={`${
              passData.cake_given
                ? "pass-middle-right-closed"
                : "pass-middle-right"
            }`}
          ></div>
        </div>
        <div className="pass-bottom">
          <div className="pass-bottom-left"></div>
          <div className="pass-bottom-middle">
            <div
              className={`${
                downCharacter ? "character-down" : "character-down-closed"
              }`}
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
              className={`${downDown ? "down-down" : "down-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
            <div className="pass-cabin" onClick={toggleGoDown}>
              <h2>Cabin</h2>
              <ArrowDownward />
            </div>
          </div>
          <div
            className={`${
              passData.cake_given
                ? "pass-bottom-right-closed"
                : "pass-bottom-right"
            }`}
          ></div>
        </div>
      </div>
      <Card
        className={`${
          passData.first_time ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          As you make your way through the pass, right in the middle of your
          path is a giant ogre. Fortunately the ogre is asleep. Unfortunately he
          is blocking your way and stopping the runoff from making its way down
          the mountain.
        </Typography>
        <Button onClick={toggleFirst} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${downRejection ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          There is a giant ogre blocking your way. There is no way to get
          through.
        </Typography>
        <Button
          onClick={() => setDownRejection(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${ogre ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Against your better judgement you poke the ogre. Nothing happens. You
          scream as loud as you can. The ogre doesn't even stir. There has to be
          some way to get this ogre to move.
        </Typography>
        <Button
          onClick={() => setOgre(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        id={`${
          passData.cake_given && !passData.ogre_moved
            ? "answer-card"
            : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          As you pull the cake out of your pack, the ogre starts to stir. You
          hurry over and place the cake next to him. The ogre fully wakes up,
          grabs the cake and lumbers up the mountain.
        </Typography>
        <Button
          onClick={toggleCakeGiven}
          className="stables-card-button"
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
      <Card className={`${gemCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You find a beautiful blue gem in the water.
        </Typography>
        <Button
          onClick={() => setGemCard(false)}
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
export default connect(mapStateToProps, { getUser, getInventory })(
  Pass
);
