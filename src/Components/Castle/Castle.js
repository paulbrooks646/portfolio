import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import {getCastle} from "../../redux/castleReducer"
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
  const [up, setUp] = useState(false);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [down, setDown] = useState(false);
  const [guard, setGuard] = useState(false);
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [answerFive, setAnswerFive] = useState(false);
  const [castleProps, setCastleProps] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rejectionCard, setRejectionCard] = useState(false);

  useEffect(() => {
    axios.get("/api/castle").then((res) => {
      props.getCastle(res.data[0]);
      setIsLoading(false);
    });
  }, []);

  const toggleUp = () => {
    setUp(!up);
    props.history.push("/Throne");
  };
  const toggleLeft = () => {
    setLeft(!left);
    props.history.push("/Garden");
  };

  const toggleRight = () => {
    setRight(!right);
    props.history.push("/Tower");
  };
  const toggleDown = () => {
    setDown(!down);
    props.history.push("/Town");
  };

  const toggleGuard = () => {
    
      if (props.castle.castle.nuts_given === true) {
        
        setGuard(!guard);
      } else {
        setRejectionCard(true);
        console.log("false")
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

  return isLoading ? (
    <Loading />
  ) : (
    <div className="castle-main">
      <Nav />
      <div className="castle-body">
        <div className="castle-top">
          <div className="castle-top-left"></div>
          <div className="castle-top-middle">
            <div className="castle-throne" onClick={toggleUp}>
              <ArrowUpward />
              <h2>Throne Room</h2>
            </div>
          </div>
          <div className="castle-top-right"></div>
        </div>
        <div className="castle-middle">
          <div className="castle-middle-left">
            <div className="castle-garden" onClick={toggleLeft}>
              <ArrowBack />
              <h2>Royal Garden</h2>
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
            <div className="castle-tower" onClick={toggleRight}>
              <h2>Tower</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="castle-bottom">
          <div className="castle-bottom-left"></div>
          <div className="castle-bottom-middle">
            <Character />
            <div className="castle-town" onClick={toggleDown}>
              <h2>Town</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="castle-bottom-right"></div>
        </div>
      </div>
      <Card className={`${guard ? "castle-card" : "castle-card-closed"}`}>
        <Typography variant="h4" color="primary" className="castle-card-title">
          I don't have time to waste talking to you. Aaargh! Fine. What do you
          want to know?
        </Typography>
        <List className="castle-list">
          <ListItem className="castle-list-item" onClick={toggleAnswerOne}>
            The Castle
          </ListItem>
          <ListItem className="castle-list-item" onClick={toggleAnswerTwo}>
            The Dragon
          </ListItem>
          <ListItem className="castle-list-item" onClick={toggleAnswerThree}>
            The Market
          </ListItem>
          <ListItem className="castle-list-item" onClick={toggleAnswerFour}>
            Employment
          </ListItem>
          <ListItem className="castle-list-item" onClick={toggleAnswerFive}>
            The Guard
          </ListItem>
        </List>
        <Button
          onClick={toggleGuard}
          className="castle-card-button"
          variant="contained"
          color="primary"
        >
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="castle-card-title">
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
          className="castle-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="castle-card-title">
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
          className="castle-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="castle-card-title">
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
          className="castle-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="castle-card-title">
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
          className="castle-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFive ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="castle-card-title">
          The Guard
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I know little about the guard aside from the fact that he eats nuts
          constantly. He considers himself above us castlespeople.
        </Typography>
        <Button
          onClick={toggleAnswerFive}
          className="castle-card-button"
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
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I don't talk to peasants!!!
        </Typography>
        <Button
          onClick={() => setRejectionCard(false)}
          className="castle-card-button"
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
export default connect(mapStateToProps, { getUser, getCastle })(Castle);
