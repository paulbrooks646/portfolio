import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
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

function Town(props) {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  const [oldmanCard, setOldmanCard] = useState(false);
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [answerFive, setAnswerFive] = useState(false)

  const toggleRight = () => {
    setRight(!right);
    props.history.push("/Market");
  };

  const toggleLeft = () => {
    setLeft(!left);

    props.history.push("/Stables");
  };

  const toggleUp = () => {
    setUp(!up);
    props.history.push("/Castle");
  };

  const toggleDown = () => {
    setDown(!down);
    props.history.push("/Dashboard");
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

  return (
    <div className="town-main">
      <Nav />
      <div className="town-body">
        <div className="town-top">
          <div className="town-top-left">
            <img src={House} alt="house" className="town-house" />
          </div>
          <div className="town-top-middle">
            <div className="town-castle" onClick={toggleUp}>
              <ArrowUpward />
              <h2>Castle</h2>
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
          </div>
        </div>
        <div className="town-middle">
          <div className="town-middle-left">
            <div className="town-stables" onClick={toggleLeft}>
              <ArrowBack />
              <h2>Stables</h2>
            </div>
          </div>
          <div className="town-middle-middle"></div>
          <div className="town-middle-right">
            <div className="town-market" onClick={toggleRight}>
              <h2>Market</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="town-bottom">
          <div className="town-bottom-left">
            <img src={House} alt="house" className="town-house" />
          </div>
          <div className="town-bottom-middle">
            <Character />
            <div className="town-town" onClick={toggleDown}>
              <h2>Home</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="town-bottom-right">
            <img src={House} alt="house" className="town-house" />
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
          I know little about the guard aside from the fact that he eats nuts constantly. He considers himself above us townspeople. 
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
export default connect(mapStateToProps, { getUser })(Town);
