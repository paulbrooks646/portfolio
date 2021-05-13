import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Maze.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { getInventory } from "../../redux/inventoryReducer";

function Maze(props) {
  const [downCharacter, setDownCharacter] = useState(false);
  const [upCharacter, setUpCharacter] = useState(false);
  const [leftCharacter, setLeftCharacter] = useState(false);
  const [rightCharacter, setRightCharacter] = useState(false);
  const [downLeft, setDownLeft] = useState(false);
  const [upLeft, setUpLeft] = useState(false);
  const [rightLeft, setRightLeft] = useState(false);
  const [leftLeft, setLeftLeft] = useState(false);
  const [downUp, setDownUp] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [downRight, setDownRight] = useState(false);
  const [upUp, setUpUp] = useState(false);
  const [upRight, setUpRight] = useState(false);
  const [upDown, setUpDown] = useState(false);
  const [rightUp, setRightUp] = useState(false);
  const [rightRight, setRightRight] = useState(false);
  const [rightDown, setRightDown] = useState(false);
  const [leftUp, setLeftUp] = useState(false);
  const [leftRight, setLeftRight] = useState(false);
  const [leftDown, setLeftDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("")
  const [mazeData, setMazeData] = useState()
  const [rejectionCard, setRejectionCard] = useState(false)
  const [inventoryOpen, setInventoryOpen] = useState(false)

  useEffect(() => {
    // if (!props.user.user.newgame) {
    //   setNewgameCard(false);

    // }
    axios.get("/api/nest").then((res) => {
      setMazeData(res.data[0]);

      if (props.user.user.last === "glade" || props.user.user.last === "up") {
        setDownCharacter(true);
      } else if (props.user.user.last === "right") {
        setLeftCharacter(true);
      } else if (props.user.user.last === "left") {
        setRightCharacter(true);
      } else if (props.user.user.last === "clearing") {
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
          setMazeData(res.data[0]);
          ;
        });
      } else {
        setRejectionCard(true);
      }
    }
  };

  const toggleRight = () => {
    if (status === "uu") {
      setStatus("uur")
    } else {
      setStatus("")
    }
    axios.post("/api/changeLast", { last: "right" }).then((res) => {
      props.getUser(res.data).then(() => {
        setUpRight(false);
        setLeftRight(false);
        setRightRight(false);
        setDownRight(false);
        setLeftCharacter(true);
      });
    });
  };

  const toggleLeft = () => {
    if (status === "uur") {
      setStatus("uurl")
    } else {
      setStatus("")
    }
    axios.post("/api/changeLast", { last: "left" }).then((res) => {
      props.getUser(res.data).then(() => {
        setUpLeft(false);
        setLeftLeft(false);
        setRightLeft(false);
        setDownLeft(false);
        setRightCharacter(true);
      });
    });
  };

  const toggleUp = () => {
     if (status === "") {
       setStatus("u");
     } else if (status === "u") {
       setStatus("uu");
     } else if (status === "uurl") {
       axios.post("/api/changeLast", { last: "maze" }).then((res) => {
         props.getUser(res.data).then(() => {
           props.history.push("/Clearing")
         })
       })
     } else {setStatus("")}
    axios.post("/api/changeLast", { last: "up" }).then((res) => {
      props.getUser(res.data).then(() => {
        setLeftUp(false);
        setRightUp(false);
        setUpUp(false);
        setDownUp(false);
        setDownCharacter(true);
       
      });
    });
  };

  const toggleDown = () => {
    axios.post("/api/changeLast", { last: "maze" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Glade");
      });
    });
  };

  const toggleFirst = () => {
    axios.post("/api/mazeFirst").then((res) => {
      setMazeData(res.data[0]);
    });
  };

  const toggleGoLeft = () => {
    if (props.user.user.last === "glade" || props.user.user.last === "up") {
      setDownLeft(true);
      setDownCharacter(false);
    } else if (props.user.user.last === "right") {
      setLeftCharacter(false);
      setLeftLeft(true);
    } else if (props.user.user.last === "left") {
      setRightCharacter(false);
      setRightLeft(true);
    } else if (props.user.user.last === "clearing") {
      setUpCharacter(false);
      setUpLeft(true);
    }
  };

  const toggleGoRight = () => {
    if (props.user.user.last === "glade" || props.user.user.last === "up") {
      setDownRight(true);
      setDownCharacter(false);
    } else if (props.user.user.last === "right") {
      setLeftCharacter(false);
      setLeftRight(true);
    } else if (props.user.user.last === "left") {
      setRightCharacter(false);
      setRightRight(true);
    } else if (props.user.user.last === "clearing") {
      setUpCharacter(false);
      setUpRight(true);
    }
  };

  const toggleGoUp = () => {
    if (props.user.user.last === "glade" || props.user.user.last === "up") {
      setDownUp(true);
      setDownCharacter(false);
    } else if (props.user.user.last === "right") {
      setLeftCharacter(false);
      setLeftUp(true);
    } else if (props.user.user.last === "left") {
      setRightCharacter(false);
      setRightUp(true);
    } else if (props.user.user.last === "clearing") {
      setUpCharacter(false);
      setUpUp(true);
    }
  };

  const toggleGoDown = () => {
    if (props.user.user.last === "glade" || props.user.user.last === "up") {
      setDownDown(true);
      setDownCharacter(false);
    } else if (props.user.user.last === "right") {
      setLeftCharacter(false);
      setLeftDown(true);
    } else if (props.user.user.last === "left") {
      setRightCharacter(false);
      setRightDown(true);
    } else if (props.user.user.last === "clearing") {
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
      <div className="maze-body">
        <div className="maze-top">
          <div className="maze-top-left"></div>
          <div className="maze-top-middle">
            <div className="maze-up" onClick={toggleGoUp}>
              <ArrowUpward />
              <h2>Up</h2>
            </div>
            <div
              className={`${
                upCharacter ? "character-up" : "character-up-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${upLeft ? "up-left" : "up-left-closed"}`}
              onAnimationEnd={toggleLeft}
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
            <div
              className={`${upDown ? "up-down" : "up-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
          </div>
          <div className="maze-top-right"></div>
        </div>
        <div className="maze-middle">
          <div className="maze-middle-left">
            <div className="maze-left" onClick={toggleGoLeft}>
              <ArrowBack />
              <h2>Left</h2>
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
              className={`${leftUp ? "left-up" : "left-up-closed"}`}
              onAnimationEnd={toggleUp}
            >
              <Character />
            </div>
            <div
              className={`${leftRight ? "left-right" : "left-right-closed"}`}
              onAnimationEnd={toggleRight}
            >
              <Character />
            </div>
            <div
              className={`${leftDown ? "left-down" : "left-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
          </div>
          <div className="maze-middle-middle"></div>
          <div className="maze-middle-right">
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
            <div
              className={`${rightDown ? "right-down" : "right-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
            <div className="maze-right" onClick={toggleGoRight}>
              <h2>Right</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="maze-bottom">
          <div className="maze-bottom-left"></div>
          <div className="maze-bottom-middle">
            <div
              className={`${
                downCharacter ? "character-down" : "character-down-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${downLeft ? "down-left" : "down-left-closed"}`}
              onAnimationEnd={toggleLeft}
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
              className={`${downRight ? "down-right" : "down-right-closed"}`}
              onAnimationEnd={toggleRight}
            >
              <Character />
            </div>
            <div
              className={`${downDown ? "down-down" : "down-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
            <div className="maze-down" onClick={toggleGoDown}>
              <h2>Down</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="maze-bottom-right"></div>
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
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getInventory })(
  Maze
);
