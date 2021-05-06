import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import { getStables } from "../../redux/stablesReducer";
import axios from "axios";
import "./Stables.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Horse from "../../Images/Horse.jpg";
import Stable from "../../Images/Stables.jpg";
import Cowboy from "../../Images/Cowboy.jpg";
import Loading from "../Loading/Loading";
import Character from "../Character/Character";

function Stables(props) {
  const [rightLeft, setRightLeft] = useState(false);
  const [leftLeft, setLeftLeft] = useState(false);
  const [rightRight, setRightRight] = useState(false);
  const [leftRight, setLeftRight] = useState(false);
  const [leftCharacter, setLeftCharacter] = useState(false);
  const [rightCharacter, setRightCharacter] = useState(false);
  const [oldmanCard, setOldmanCard] = useState(false);
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [answerFourYesA, setAnswerFourYesA] = useState(false);
  const [answerFourYesB, setAnswerFourYesB] = useState(false);
  const [answerFourNo, setAnswerFourNo] = useState(false);
  const [horseCard, setHorseCard] = useState(false);
  const [manureCleaned, setManureCleaned] = useState(false);
  const [goodReason, setGoodReason] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bottleNeeded, setBottleNeeded] = useState(false);
  const [needPermission, setNeedPermission] = useState(false);
  const [alreadyTaken, setAlreadyTaken] = useState(false);

  useEffect(() => {
    // if (!props.user.user.newgame) {
    //   setNewgameCard(false);

    // }
    axios.get("/api/stables").then((res) => {
      props.getStables(res.data[0]);

      if (props.user.user.last === "valley") {
        setLeftCharacter(true);
      } else if (props.user.user.last === "town") {
        setRightCharacter(true);
      }
      setIsLoading(false);
    });
  }, []);

  const toggleLeft = () => {
    axios.post("/api/changeLast", { last: "stables" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Valley");
      });
    });
  };

  const toggleRight = () => {
    axios.post("/api/changeLast", { last: "stables" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Town");
      });
    });
  };

  const toggleGoLeft = () => {
    if (props.user.user.last === "valley") {
      setLeftCharacter(false);
      setLeftLeft(true);
    } else if (props.user.user.last === "town") {
      setRightCharacter(false);
      setRightLeft(true);
    }
  };

  const toggleGoRight = () => {
    if (props.user.user.last === "valley") {
      setLeftCharacter(false);
      setLeftRight(true);
    } else if (props.user.user.last === "town") {
      setRightCharacter(false);
      setRightRight(true);
    }
  };

  const toggleOldmanCard = () => {
    setOldmanCard(!oldmanCard);
  };

  const toggleAnswerOne = () => {
    axios
      .post("/api/manureTakePermission")
      .then((res) => props.getStables(res.data[0]));
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
    axios.post("/api/manureCleanPermission").then((res) => {
      props.getStables(res.data[0]);
      toggleOldmanCard();
      setAnswerFour(!answerFour);
    });
  };

  const toggleAnswerFourYes = () => {
    setOldmanCard(false);
    setAnswerFour(false);
    if (props.stables.stables.has_cleaned) {
      toggleAnswerFourYesB();
    } else {
      toggleAnswerFourYesA();
    }
  };

  const toggleAnswerFourYesA = () => setAnswerFourYesA(!answerFourYesA);

  const toggleAnswerFourYesB = () => setAnswerFourYesB(!answerFourYesB);

  const toggleAnswerFourNo = () => {
    setAnswerFourNo(!answerFourNo);
    setOldmanCard(false);
    setAnswerFour(false);
  };

  const toggleHorseCard = () => setHorseCard(!horseCard);

  const toggleManureCleaned = () => {
    if (props.stables.stables.clean_permission) {
      axios.post("/api/manureHasCleaned").then((res) => {
        props.getStables(res.data[0]);
      });
      axios.post("/api/coin").then((res) => {
        props.getUser(res.data);
        setManureCleaned(!manureCleaned);
      });
    } else {
      toggleGoodReason();
    }
  };

  const toggleGoodReason = () => setGoodReason(!goodReason);

  const manureMound = () => {
    if (!props.stables.stables.take_permission) {
      toggleNeedPermission();
    } else if (props.stables.stables.has_taken) {
      toggleAlreadyTaken();
    } else {
      toggleBottleNeeded();
    }
  };

  const toggleAlreadyTaken = () => setAlreadyTaken(!alreadyTaken);

  const toggleNeedPermission = () => setNeedPermission(!needPermission);

  const toggleBottleNeeded = () => setBottleNeeded(!bottleNeeded);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="main">
      <Nav />
      <div className="stables-body">
        <div className="stables-top">
          <div className="stables-top-left">
            <img
              src={Horse}
              alt="horse"
              className="stables-horse"
              onClick={toggleHorseCard}
            />
          </div>
          <div className="stables-top-middle">
            <img
              src={Cowboy}
              alt="cowboy"
              className="stables-cowboy"
              onClick={toggleOldmanCard}
            />
          </div>
          <div className="stables-top-right">
            <img src={Stable} alt="stables" className="stables-stables" />
          </div>
        </div>
        <div className="stables-middle">
          <div className="stables-middle-left">
            <div className="stables-valley" onClick={toggleGoLeft}>
              <ArrowBack />
              <h2>Valley</h2>
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
          <div className="stables-middle-middle"></div>
          <div className="stables-middle-right">
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
            <div className="stables-stables" onClick={toggleGoRight}>
              <h2>Town</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="stables-bottom">
          <div className="stables-bottom-left">
            <div
              onClick={toggleManureCleaned}
              className={`${
                props.stables.stables.has_cleaned
                  ? "manure-piles-closed"
                  : "manure-piles"
              }`}
            >
              <div className="manure-top">
                <div className="manure"></div>
                <div className="manure"></div>
              </div>
              <div className="manure-middle">
                <div className="manure"></div>
                <div className="manure"></div>
                <div className="manure"></div>
              </div>
              <div className="manure-bottom">
                <div className="manure"></div>
                <div className="manure"></div>
              </div>
            </div>
          </div>
          <div className="stables-bottom-middle"></div>
          <div className="stables-bottom-right">
            <div className="manure-mound" onClick={manureMound}></div>
          </div>
        </div>
      </div>
      <Card
        className={`${oldmanCard ? "component-card" : "component-card-closed"}`}
      >
        <Typography variant="h4" color="primary">
          Hello there! I'm busy so be quick. What do you want to know?
        </Typography>
        <List className="component-list">
          <ListItem onClick={toggleAnswerOne}>Manure</ListItem>
          <ListItem onClick={toggleAnswerTwo}>The Mountains</ListItem>
          <ListItem onClick={toggleAnswerThree}>The Valley</ListItem>
          <ListItem onClick={toggleAnswerFour}>Employment</ListItem>
        </List>
        <Button onClick={toggleOldmanCard} variant="contained" color="primary">
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Manure
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Stinky stuff! Help yourself to as much as you want. Hahaha!
        </Typography>
        <Button onClick={toggleAnswerOne} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Mountains
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          We use get water running down from the mountains but earlier this year
          it stopped. Since its been gone my crops are struggling. I hear it is
          hurting the royal gardens as well.
        </Typography>
        <Button onClick={toggleAnswerTwo} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Valley
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I don't go down into the valley any more. If you're not full
          protected, you are liable to get hit by rocks. Some trolls have taken
          up residence there and are very protective of their territory.
        </Typography>
        <Button onClick={toggleAnswerThree} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Employment
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I don't have a lot of work these days but I suppose I could give you a
          coin if you put all the little dung pieces into the manure pile.
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Would you like to clean up manure?
        </Typography>
        <div className="component-card-button-div">
          <Button
            onClick={toggleAnswerFourYes}
            variant="contained"
            color="primary"
          >
            YES
          </Button>
          <Button
            onClick={toggleAnswerFourNo}
            variant="contained"
            color="primary"
          >
            NO
          </Button>
        </div>
      </Card>
      <Card
        className={`${answerFourYesA ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          Have fun!
        </Typography>

        <Button
          onClick={toggleAnswerFourYesA}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${answerFourYesB ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          Looks like you're out of luck. There is no dung left.
        </Typography>

        <Button
          onClick={toggleAnswerFourYesB}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${answerFourNo ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          Suit yourself!
        </Typography>

        <Button
          onClick={toggleAnswerFourNo}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${horseCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          Neigh!!!
        </Typography>

        <Button onClick={toggleHorseCard} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${goodReason ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          Disgusting!
        </Typography>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          You would have to have a really good reason to pick up this dung!
        </Typography>
        <Button onClick={toggleGoodReason} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${needPermission ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          Rank!
        </Typography>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          If you are serious, get permission from the farmer before you take his
          precious manure.
        </Typography>
        <Button
          onClick={toggleNeedPermission}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${bottleNeeded ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          Yuck!
        </Typography>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          If you seriously want some manure, at least find something to put it
          in.
        </Typography>
        <Button
          onClick={toggleBottleNeeded}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>

      <Card
        className={`${alreadyTaken ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          No way!
        </Typography>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          You have taken as much manure as you will ever need.
        </Typography>
        <Button
          onClick={toggleAlreadyTaken}
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
export default connect(mapStateToProps, { getUser, getInventory, getStables })(
  Stables
);
