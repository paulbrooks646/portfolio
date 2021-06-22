import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Swamp.scss";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";

function Swamp(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [rightLeft, setRightLeft] = useState(false);
  const [leftLeft, setLeftLeft] = useState(false);
  const [rightRight, setRightRight] = useState(false);
  const [leftRight, setLeftRight] = useState(false);
  const [leftCharacter, setLeftCharacter] = useState(false);
  const [rightCharacter, setRightCharacter] = useState(false);
  const [rightRejectionCard, setRightRejectionCard] = useState(false);
  const [goblinRejctionCard, setGoblinRejectionCard] = useState(false);
  const [logRejectionCard, setLogRejectionCard] = useState(false);
  const [logCard, setLogCard] = useState(false);
  const [logEmptyCard, setLogEmptyCard] = useState(false);
  const [firstTimeCard, setFirstTimeCard] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [swampData, setSwampData] = useState();
  const [swordCard, setSwordCard] = useState(false);

  useEffect(() => {
    axios.get("/api/swamp").then((res) => {
      setSwampData(res.data[0]);
      if (res.data[0].first_time) {
        setFirstTimeCard(true);
      }
      if (props.user.user.last === "forest") {
        setLeftCharacter(true);
      } else if (props.user.user.last === "bog") {
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
    if (item === "sword") {
      axios.post("/api/useSword").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/swamp").then((res) => {
          setSwampData(res.data[0]);
          setSwordCard(true);
        });
      });
    } else {
      setRejectionCard(true);
    }
  };

  const toggleLeft = () => {
    axios.post("/api/changeLast", { last: "swamp" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Forest");
      });
    });
  };

  const toggleRight = () => {
    axios.post("/api/changeLast", { last: "swamp" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Bog");
      });
    });
  };

  const toggleGoLeft = () => {
    if (props.user.user.last === "forest") {
      setLeftCharacter(false);
      setLeftLeft(true);
    } else if (props.user.user.last === "bog") {
      setRightCharacter(false);
      setRightLeft(true);
    }
  };

  const toggleGoRight = () => {
    if (!swampData.goblin_gone) {
      setRightRejectionCard(true);
    } else if (props.user.user.last === "forest") {
      setLeftCharacter(false);
      setLeftRight(true);
    } else if (props.user.user.last === "bog") {
      setRightCharacter(false);
      setRightRight(true);
    }
  };

  const toggleLog = () => {
    if (!swampData.goblin_gone) {
      setLogRejectionCard(true);
    } else if (swampData.items_taken) {
      setLogEmptyCard(true);
    } else {
      axios.post("/api/getItems").then((res) => {
        props.getInventory(res.data);
        axios.post("/api/coin").then((res) => {
          props.getUser(res.data);
          axios.get("/api/swamp").then((res) => {
            setSwampData(res.data[0]);
            setLogCard(true);
          });
        });
      });
    }
  };

  const toggleFirst = () => {
    axios.post("/api/swampFirst").then((res) => {
      setSwampData(res.data[0]);
      setFirstTimeCard(false);
    });
  };

  const toggleAnimationEnd = () => {
    axios.post("/api/goblinGone").then((res) => {
      setSwampData(res.data[0]);
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
      <div className="swamp-body">
        <div className="swamp-top">
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
          <div className="log" onClick={toggleLog}>
            <div className="log-hole"></div>
            <div className="log-line"></div>
            <div className="log-line"></div>
            <div className="log-line"></div>
            <div className="log-line"></div>
            <div className="log-line"></div>
            <div className="log-line"></div>
          </div>
        </div>
        <div className="swamp-middle">
          <div className="swamp-middle-left">
            <div className="swamp-forest" onClick={toggleGoLeft}>
              <ArrowBack />
              <h2>Forest</h2>
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
          <div className="swamp-middle-middle">
            <div
              className={`${
                !swampData.goblin_scared ? "goblin" : "goblin-closed"
              }`}
              onClick={() => setGoblinRejectionCard(true)}
            >
              <div className="goblin-cover"></div>
            </div>
            <div
              className={`${
                swampData.goblin_scared && !swampData.goblin_gone
                  ? "goblin-moving"
                  : "goblin-moving-closed"
              }`}
              onAnimationEnd={toggleAnimationEnd}
            >
              <div className="goblin-cover"></div>
            </div>
          </div>
          <div className="swamp-middle-right">
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
            <div className="swamp-bog" onClick={toggleGoRight}>
              <h2>Bog</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="swamp-bottom">
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
      <Card
        className={`${firstTimeCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The forest transitions into a swamp. The air get more and more rank as
          you proceed. You happen upon a goblin who seems none to pleased to see
          you.
        </Typography>
        <Button onClick={toggleFirst} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          goblinRejctionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The goblin looks furious. Talking to him would be a bad idea. Maybe
          instead you should think about fighting or fleeing.
        </Typography>
        <Button
          onClick={() => setGoblinRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${logRejectionCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          There is an angry goblin between you and the log. You should worry
          about him first.
        </Typography>
        <Button
          onClick={() => setLogRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          rightRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          There is an angry goblin in your way. You'll have to deal with him
          before you can go in that direction.
        </Typography>
        <Button
          onClick={() => setRightRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${logCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          This log must be where the goblin stashed his stuff. You find a coin,
          a nice, warm, surprisingly clean blanket, and a strange pair of
          glasses.
        </Typography>
        <Button
          onClick={() => setLogCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${logEmptyCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You find nothing else in the log.
        </Typography>
        <Button
          onClick={() => setLogEmptyCard(false)}
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
      <Card className={`${swordCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          You charge, screaming and brandishing your sword. Seeing this, the
          goblin quickly flees. Luckily, it is after he is gone that your sword
          slips and sinks into the swamp.
        </Typography>
        <Button
          onClick={() => setSwordCard(false)}
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
  Swamp
);
