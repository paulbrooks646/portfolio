import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Stables.scss";
import { Link } from "react-redux";
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

function Stables(props) {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [oldmanCard, setOldmanCard] = useState(false);
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [answerFourYesA, setAnswerFourYesA] = useState(false);
  const [answerFourYesB, setAnswerFourYesB] = useState(false);
  const [answerFourNo, setAnswerFourNo] = useState(false);

  const toggleLeft = () => {
    setLeft(!left);
    props.history.push("/Valley");
  };

  const toggleRight = () => {
    setRight(!right);
    props.history.push("/Town");
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

  const toggleAnswerFourYes = () => {
    setOldmanCard(false)
    setAnswerFour(false)
    if (props.user.user.hasWorked) {
      toggleAnswerFourYesB()
    } else {
      toggleAnswerFourYesA();
    }
  };

  const toggleAnswerFourYesA = () => {
    setAnswerFourYesA(!answerFourYesA);

  };

  const toggleAnswerFourYesB = () => {
    setAnswerFourYesB(!answerFourYesB);

  };

  const toggleAnswerFourNo = () => {
    setAnswerFourNo(!answerFourNo);
    setOldmanCard(false)
    setAnswerFour(false)
  };

  return (
    <div className="stables-main">
      <Nav />
      <div className="stables-body">
        <div className="stables-top">
          <div className="stables-top-left">
            <img src={Horse} alt="horse" className="stables-horse" />
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
            <div className="stables-valley" onClick={toggleLeft}>
              <ArrowBack />
              <h2>Valley</h2>
            </div>
          </div>
          <div className="stables-middle-middle"></div>
          <div className="stables-middle-right">
            <div className="stables-stables" onClick={toggleRight}>
              <h2>Town</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="stables-bottom">
          <div className="stables-bottom-left"></div>
          <div className="stables-bottom-middle"></div>
          <div className="stables-bottom-right"></div>
        </div>
      </div>
      <Card
        className={`${oldmanCard ? "stables-card" : "stables-card-closed"}`}
      >
        <Typography variant="h4" color="primary" className="stables-card-title">
          Hello there! I'm busy so be quick. What do you want to know?
        </Typography>
        <List className="stables-list">
          <ListItem className="stables-list-item" onClick={toggleAnswerOne}>
            Manure
          </ListItem>
          <ListItem className="stables-list-item" onClick={toggleAnswerTwo}>
            The Mountains
          </ListItem>
          <ListItem className="stables-list-item" onClick={toggleAnswerThree}>
            The Valley
          </ListItem>
          <ListItem className="stables-list-item" onClick={toggleAnswerFour}>
            Employment
          </ListItem>
        </List>
        <Button
          onClick={toggleOldmanCard}
          className="stables-card-button"
          variant="contained"
          color="primary"
        >
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="stables-card-title">
          Manure
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Stinky stuff! Help yourself to as much as you want. Hahaha!
        </Typography>
        <Button
          onClick={toggleAnswerOne}
          className="stables-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="stables-card-title">
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
        <Button
          onClick={toggleAnswerTwo}
          className="stables-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="stables-card-title">
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
        <Button
          onClick={toggleAnswerThree}
          className="stables-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="stables-card-title">
          Employment
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I don't have a lot of work these days but I suppose I could give you a
          coin if you put all the little manure pieces into the manure pile over
          there.
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Would you like to clean up manure?
        </Typography>
        <div className="stables-card-button-div">
          <Button
            onClick={toggleAnswerFourYes}
            className="stables-card-button"
            variant="contained"
            color="primary"
          >
            YES
          </Button>
          <Button
            onClick={toggleAnswerFourNo}
            className="stables-card-button"
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
        <Typography variant="h4" color="primary" className="stables-card-title">
          Have fun!
        </Typography>

        <Button
          onClick={toggleAnswerFourYesB}
          className="stables-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${answerFourYesB ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography variant="h4" color="primary" className="stables-card-title">
          Looks like you're out of luck. There is no manure left.
        </Typography>

        <Button
          onClick={toggleAnswerFourYesB}
          className="stables-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${answerFourNo ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography variant="h4" color="primary" className="stables-card-title">
          Suit yourself!
        </Typography>

        <Button
          onClick={toggleAnswerFourNo}
          className="stables-card-button"
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
export default connect(mapStateToProps, { getUser })(Stables);
