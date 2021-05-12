import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Castle.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Character from "../Character/Character";
import Guard from "../../Images/Guard.png";
import Loading from "../Loading/Loading";

function Castle(props) {
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
  const [guard, setGuard] = useState(false);
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [answerFive, setAnswerFive] = useState(false);
  const [answerSix, setAnswerSix] = useState(false);
  const [answerSeven, setAnswerSeven] = useState(false);
  const [answerEight, setAnswerEight] = useState(false);
  const [answerNine, setAnswerNine] = useState(false);
  const [notAChance, setNotAChance] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [castleData, setCastleData] = useState()
  const [inventoryOpen, setInentoryOpen] = useState(false);


  useEffect(() => {
    // if (!props.user.user.newgame) {
    //   setNewgameCard(false);

    // }
    axios.get("/api/castle").then((res) => {
      setCastleData(res.data[0]);

      if (props.user.user.last === "town") {
        setDownCharacter(true);
      } else if (props.user.user.last === "garden") {
        setLeftCharacter(true);
      } else if (props.user.user.last === "tower") {
        setRightCharacter(true);
      } else if (props.user.user.last === "throne") {
        setUpCharacter(true);
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
     if (item === "flute") {
       if (props.location.pathname === "/Tower") {
         axios.post("/api/useFlute").then((res) => {
           setCastleData(res.data[0]);
           ;
         });
       } else {
         setRejectionCard(true);
       }
     }
   };


  const toggleUp = () => {
    if (
      castleData.nuts_given === true &&
      castleData.hat_given === true &&
      castleData.letter_given === true
    ) {
      axios.post("/api/changeLast", { last: "castle" }).then((res) => {
        props.getUser(res.data).then(() => {
          props.history.push("/Throne");
        });
      });
    } else {
      setNotAChance(true);
    }
  };
  const toggleLeft = () => {
    axios.post("/api/changeLast", { last: "castle" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Garden");
      });
    });
  };

  const toggleRight = () => {
    axios.post("/api/changeLast", { last: "castle" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Tower");
      });
    });
  };
  const toggleDown = () => {
    axios.post("/api/changeLast", { last: "castle" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Town");
      });
    });
  };

  const toggleGuard = () => {
    if (castleData.nuts_given === true) {
      setGuard(!guard);
    } else {
      setRejectionCard(true);
      console.log("false");
    }
  };

  const toggleAnswerOne = () => {
    toggleGuard();
    setAnswerOne(!answerOne);
  };

  const toggleAnswerTwo = () => {
    toggleGuard();
    setAnswerTwo(!answerTwo);
  };

  const toggleAnswerThree = () => {
    toggleGuard();
    setAnswerThree(!answerThree);
  };

  const toggleAnswerFour = () => {
    toggleGuard();
    setAnswerFour(!answerFour);
  };

  const toggleAnswerFive = () => {
    toggleGuard();
    setAnswerFive(!answerFive);
  };

  const toggleAnswerSix = () => {
    toggleGuard();
    setAnswerSix(!answerSix);
  };

  const toggleAnswerSeven = () => {
    toggleGuard();
    setAnswerSeven(!answerSeven);
  };

  const toggleAnswerEight = () => {
    toggleGuard();
    setAnswerEight(!answerEight);
  };

  const toggleAnswerNine = () => {
    toggleGuard();
    setAnswerNine(!answerNine);
  };

  const toggleGoLeft = () => {
    if (props.user.user.last === "town") {
      setDownLeft(true);
      setDownCharacter(false);
    } else if (props.user.user.last === "garden") {
      setLeftCharacter(false);
      setLeftLeft(true);
    } else if (props.user.user.last === "tower") {
      setRightCharacter(false);
      setRightLeft(true);
    } else if (props.user.user.last === "throne") {
      setUpCharacter(false);
      setUpLeft(true);
    }
  };

  const toggleGoRight = () => {
    if (props.user.user.last === "town") {
      setDownRight(true);
      setDownCharacter(false);
    } else if (props.user.user.last === "garden") {
      setLeftCharacter(false);
      setLeftRight(true);
    } else if (props.user.user.last === "tower") {
      setRightCharacter(false);
      setRightRight(true);
    } else if (props.user.user.last === "throne") {
      setUpCharacter(false);
      setUpRight(true);
    }
  };

  const toggleGoUp = () => {
    if (props.user.user.last === "town") {
      setDownUp(true);
      setDownCharacter(false);
    } else if (props.user.user.last === "garden") {
      setLeftCharacter(false);
      setLeftUp(true);
    } else if (props.user.user.last === "tower") {
      setRightCharacter(false);
      setRightUp(true);
    } else if (props.user.user.last === "throne") {
      setUpCharacter(false);
      setUpUp(true);
    }
  };

  const toggleGoDown = () => {
    if (props.user.user.last === "town") {
      setDownDown(true);
      setDownCharacter(false);
    } else if (props.user.user.last === "garden") {
      setLeftCharacter(false);
      setLeftDown(true);
    } else if (props.user.user.last === "tower") {
      setRightCharacter(false);
      setRightDown(true);
    } else if (props.user.user.last === "throne") {
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
      <div className="castle-body">
        <div className="castle-top">
          <div className="castle-top-left"></div>
          <div className="castle-top-middle">
            <div className="castle-throne" onClick={toggleGoUp}>
              <ArrowUpward />
              <h2>Throne Room</h2>
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
          <div className="castle-top-right"></div>
        </div>
        <div className="castle-middle">
          <div className="castle-middle-left">
            <div className="castle-garden" onClick={toggleGoLeft}>
              <ArrowBack />
              <h2>Royal Garden</h2>
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
          <div className="castle-middle-middle">
            <img
              src={Guard}
              alt="palace guard"
              onClick={toggleGuard}
              className="guard-image"
            />
          </div>
          <div className="castle-middle-right">
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
            <div className="castle-tower" onClick={toggleGoRight}>
              <h2>Tower</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="castle-bottom">
          <div className="castle-bottom-left"></div>
          <div className="castle-bottom-middle">
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
            <div className="castle-town" onClick={toggleGoDown}>
              <h2>Town</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="castle-bottom-right"></div>
        </div>
      </div>
      <Card className={`${guard ? "component-card" : "component-card-closed"}`}>
        <Typography variant="h5" color="primary">
          What would you like to know about?
        </Typography>
        <List className="component-list">
          <ListItem onClick={toggleAnswerOne}>The Dragon</ListItem>
          <ListItem onClick={toggleAnswerNine}>Favor</ListItem>
          <ListItem onClick={toggleAnswerTwo}>The Garden</ListItem>
          <ListItem onClick={toggleAnswerThree}>The King</ListItem>
          <ListItem onClick={toggleAnswerFour}>Permission</ListItem>
          <ListItem onClick={toggleAnswerFive}>The Princess</ListItem>
          <ListItem onClick={toggleAnswerSix}>The Tower</ListItem>
          <ListItem onClick={toggleAnswerSeven}>The Throne Room</ListItem>
          <ListItem onClick={toggleAnswerEight}>The Ultimate Axe</ListItem>
        </List>
        <Button onClick={toggleGuard} variant="contained" color="primary">
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Dragon
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You want to slay the dragon? Don't be a fool! It is said that only the
          Ultimate Axe is sharp enough to penetrate its scales.
        </Typography>
        <Button onClick={toggleAnswerOne} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Garden
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          A beautiful place to look at. I tried to get a flower for my wife once
          but the royal gardener wouldn't let me. She is very protective of her
          garden.
        </Typography>
        <Button onClick={toggleAnswerTwo} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The King
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The king doesn't like to be disturbed. He has been particularly
          irritable since he and the princess got into an argument and the
          princess took up residence in the tower.
        </Typography>
        <Button onClick={toggleAnswerThree} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Permission
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I'll tell you what if can convince me you have a legitimate reason to
          see the King and do me a favor I will let you pass.
        </Typography>
        <Button onClick={toggleAnswerFour} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFive ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Princess
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The Princess is very tempermental. Sometimes she is as warm as a
          summer day. Other times she is as frigid as winter. She is currently
          living in the tower.
        </Typography>
        <Button onClick={toggleAnswerFive} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerSix ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Tower
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          If you go there be careful. The princess doesn't want to disturbed.
          Her vicious pet weasel is attacking anyone who goes there.
        </Typography>
        <Button onClick={toggleAnswerSix} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerSeven ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Throne Room
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          No one crosses the drawbridge and enters the throne room with out my
          permission.
        </Typography>
        <Button onClick={toggleAnswerSeven} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerEight ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Ultimate Axe
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The Ultimate Axe is said to be the sharpest most powerful weapon ever
          created. It is in the King's posession and I can't imagine he will
          ever part with it.
        </Typography>
        <Button onClick={toggleAnswerEight} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerNine ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Favor
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          While I was hunting in the forest I lost my favorite hat. If you find
          it for me, I would be very grateful.
        </Typography>
        <Button onClick={toggleAnswerNine} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${rejectionCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I don't talk to peasants!!!
        </Typography>
        <Button
          onClick={() => setRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${notAChance ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          NOT A CHANCE!!!
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          No one crosses the drawbridge without my permission.
        </Typography>
        <Button
          onClick={() => setNotAChance(false)}
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
export default connect(mapStateToProps, { getUser})(Castle);
