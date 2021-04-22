import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer"
import {getTown} from "../../redux/townReducer"
import "./Town.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import House from "../../Images/House.jpg";
import Character from "../Character/Character";
import Farmer from "../../Images/Farmer.png";
import axios from "axios"
import Loading from "../Loading/Loading"

function Town(props) {
  const [oldmanCard, setOldmanCard] = useState(false);
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [answerFive, setAnswerFive] = useState(false);
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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // if (!props.user.user.newgame) {
    //   setNewgameCard(false);
  
    // }
    axios.get("/api/inventory").then((res) => {
      props.getInventory(res.data);

      if  (props.user.user.last === "home") {
        setDownCharacter(true);
      } else if (props.user.user.last === "stables") {
        setLeftCharacter(true);
      } else if (props.user.user.last === "market") {
        setRightCharacter(true);
      } else if (props.user.user.last === "castle") {
        setUpCharacter(true);
      } 
      setIsLoading(false);
    });
  }, []);

  const toggleRight = () => {
    axios.post("/api/changeLast", { last: "town" }).then((res) => {
      props.getUser(res.data).then(() => {

        props.history.push("/Market");
      })
    });
  };

  const toggleLeft = () => {
    axios.post("/api/changeLast", { last: "town" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Stables");
      });
    });
  };

  const toggleUp = () => {
    axios.post("/api/changeLast", { last: "town" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Castle");
      });
    });
  };

  const toggleDown = () => {
   axios.post("/api/changeLast", { last: "town" }).then((res) => {
     props.getUser(res.data).then(() => {
       props.history.push("/Dashboard");
     });
   });
  };

  const toggleOldmanCard = () => {
    setOldmanCard(!oldmanCard);
  };

  const toggleAnswerOne = () => {
    toggleOldmanCard();
    setAnswerOne(!answerOne);
  };

  const toggleAnswerTwo = () => {
    toggleOldmanCard();
    setAnswerTwo(!answerTwo);
  };

  const toggleAnswerThree = () => {
    toggleOldmanCard();
    setAnswerThree(!answerThree);
  };

  const toggleAnswerFour = () => {
    toggleOldmanCard();
    setAnswerFour(!answerFour);
  };

   const toggleAnswerFive = () => {
     toggleOldmanCard();
     setAnswerFive(!answerFive);
  };
  
  const toggleHouseOne = () => {
    props.history.push("/HouseOne")
  }

  const toggleHouseTwo = () => {
    props.history.push("/HouseTwo")
  }

  const toggleHouseThree = () => {
    props.history.push("/HouseThree")
  }

  const toggleHouseFour = () => {
    props.history.push("/HouseFour")
  }

   const toggleGoLeft = () => {
     if (
       props.user.user.last === "home"
     ) {
       setDownLeft(true);
       setDownCharacter(false);
     } else if (props.user.user.last === "stables") {
       setLeftCharacter(false);
       setLeftLeft(true);
     } else if (props.user.user.last === "market") {
       setRightCharacter(false);
       setRightLeft(true);
     } else if (props.user.user.last === "castle") {
       setUpCharacter(false);
       setUpLeft(true);
     }
   };

   const toggleGoRight = () => {
     if (
       props.user.user.last === "home"
     ) {
       setDownRight(true);
       setDownCharacter(false);
     } else if (props.user.user.last === "stables") {
       setLeftCharacter(false);
       setLeftRight(true);
     } else if (props.user.user.last === "market") {
       setRightCharacter(false);
       setRightRight(true);
     } else if (props.user.user.last === "castle") {
       setUpCharacter(false);
       setUpRight(true);
     }
   };

   const toggleGoUp = () => {
     if (
       props.user.user.last === "home"
     ) {
       setDownUp(true);
       setDownCharacter(false);
     } else if (props.user.user.last === "stables") {
       setLeftCharacter(false);
       setLeftUp(true);
     } else if (props.user.user.last === "market") {
       setRightCharacter(false);
       setRightUp(true);
     } else if (props.user.user.last === "castle") {
       setUpCharacter(false);
       setUpUp(true);
     }
   };

   const toggleGoDown = () => {
     if (
       props.user.user.last === "home"
     ) {
       setDownDown(true);
       setDownCharacter(false);
     } else if (props.user.user.last === "stables") {
       setLeftCharacter(false);
       setLeftDown(true);
     } else if (props.user.user.last === "market") {
       setRightCharacter(false);
       setRightDown(true);
     } else if (props.user.user.last === "castle") {
       setUpCharacter(false);
       setUpDown(true);
     }
   };

  return (

    isLoading ? <Loading/> :
    <div className="town-main">
      <Nav />
      <div className="town-body">
        <div className="town-top">
          <div className="town-top-left">
            <img src={House} alt="house" className="town-house" />
            <ArrowUpward id="up-arrow" onClick={toggleHouseOne} />
          </div>
          <div className="town-top-middle">
            <div className="town-castle" onClick={toggleGoUp}>
              <ArrowUpward />
              <h2>Castle</h2>
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
            <img
              src={Farmer}
              alt="irritated farmer"
              className="town-farmer"
              onClick={toggleOldmanCard}
            />
          </div>
          <div className="town-top-right">
            <img src={House} alt="house" className="town-house" />
            <ArrowUpward id="up-arrow" onClick={toggleHouseTwo} />
          </div>
        </div>
        <div className="town-middle">
          <div className="town-middle-left">
            <div className="town-stables" onClick={toggleGoLeft}>
              <ArrowBack />
              <h2>Stables</h2>
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
          <div className="town-middle-middle"></div>
          <div className="town-middle-right">
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
            <div className="town-market" onClick={toggleGoRight}>
              <h2>Market</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="town-bottom">
          <div className="town-bottom-left">
            <img src={House} alt="house" className="town-house" />
            <ArrowUpward id="up-arrow" onClick={toggleHouseThree} />
          </div>
          <div className="town-bottom-middle">
           
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
            <div className="town-town" onClick={toggleGoDown}>
              <h2>Home</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="town-bottom-right">
            <img src={House} alt="house" className="town-house" />
            <ArrowUpward id="up-arrow" onClick={toggleHouseFour} />
          </div>
        </div>
      </div>

      <Card className={`${oldmanCard ? "town-card" : "town-card-closed"}`}>
        <Typography variant="h4" color="primary" className="town-card-title">
          I don't have time to waste talking to you. Aaargh! Fine. What do you
          want to know?
        </Typography>
        <List className="town-list">
          <ListItem className="town-list-item" onClick={toggleAnswerOne}>
            The Castle
          </ListItem>
          <ListItem className="town-list-item" onClick={toggleAnswerTwo}>
            The Dragon
          </ListItem>
          <ListItem className="town-list-item" onClick={toggleAnswerFive}>
            The Guard
          </ListItem>
          <ListItem className="town-list-item" onClick={toggleAnswerThree}>
            The Market
          </ListItem>
          <ListItem className="town-list-item" onClick={toggleAnswerFour}>
            Employment
          </ListItem>
        </List>
        <Button
          onClick={toggleOldmanCard}
          className="town-card-button"
          variant="contained"
          color="primary"
        >
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="town-card-title">
          The Castle
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Bah! Don't waste your time at the castle. The king won't even see you.
          He has no use for his subjects except for our taxes.
        </Typography>
        <Button
          onClick={toggleAnswerOne}
          className="town-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="town-card-title">
          The Dragon
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Don't get me started on that wretched dragon. I imagine it would take
          magic to slay him but good luck getting a magical creature to help
          you.
        </Typography>
        <Button
          onClick={toggleAnswerTwo}
          className="town-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="town-card-title">
          The Market
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          It's a typical market. If you have gold it's a good place to get
          supplies.
        </Typography>
        <Button
          onClick={toggleAnswerThree}
          className="town-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="town-card-title">
          Employment
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Hah! You look lazy, I wouldn't waste my time on you. You could try the
          stables. I hope you like manure. Hehehe!
        </Typography>
        <Button
          onClick={toggleAnswerFour}
          className="town-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFive ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="town-card-title">
          The Guard
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I know little about the guard aside from the fact that he eats nuts
          constantly. He considers himself above us townspeople.
        </Typography>
        <Button
          onClick={toggleAnswerFive}
          className="town-card-button"
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
export default connect(mapStateToProps, { getUser, getInventory, getTown })(Town);
