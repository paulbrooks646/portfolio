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
  const [answerSix, setAnswerSix] = useState(false);
  const [answerSeven, setAnswerSeven] = useState(false);
  const [answerEight, setAnswerEight] = useState(false);
  const [answerNine, setAnswerNine] = useState(false);
  const [notAChance, setNotAChance] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rejectionCard, setRejectionCard] = useState(false);

  useEffect(() => {
    axios.get("/api/castle").then((res) => {
      props.getCastle(res.data[0]);
      setIsLoading(false);
    });
  }, []);

  const toggleUp = () => {
    if (props.castle.castle.nuts_given === true && props.castle.castle.hat_given === true && props.castle.castle.letter_given === true) {
      setUp(!up);
      props.history.push("/Throne")
    } else {
    setNotAChance(true)
    }
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
        <Typography variant="h5" color="primary" className="castle-card-title">
          What would you like to know about?
        </Typography>
        <List className="castle-list">
          <ListItem className="castle-list-item" onClick={toggleAnswerOne}>
            The Dragon
          </ListItem>
          <ListItem className="castle-list-item" onClick={toggleAnswerNine}>
            Favor
          </ListItem>
          <ListItem className="castle-list-item" onClick={toggleAnswerTwo}>
            The Garden
          </ListItem>
          <ListItem className="castle-list-item" onClick={toggleAnswerThree}>
            The King
          </ListItem>
          <ListItem className="castle-list-item" onClick={toggleAnswerFour}>
            Permission
          </ListItem>
          <ListItem className="castle-list-item" onClick={toggleAnswerFive}>
            The Princess
          </ListItem>
          <ListItem className="castle-list-item" onClick={toggleAnswerSix}>
            The Tower
          </ListItem>
          <ListItem className="castle-list-item" onClick={toggleAnswerSeven}>
            The Throne Room
          </ListItem>
          <ListItem className="castle-list-item" onClick={toggleAnswerEight}>
            The Ultimate Axe
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
          Permission
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I'll tell you
          what if can convince me you have a legitimate reason to see the King
          and do me a favor I will let you pass.
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
          The Princess
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The Princess is very tempermental. Sometimes she is as warm as a summer day. Other times she is as frigid as winter. She is currently living in the tower.
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
      <Card className={`${answerSix ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="castle-card-title">
          The Tower
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          If you go there be careful. The princess doesn't want to disturbed. Her vicious pet weasel is attacking anyone who goes there.
        </Typography>
        <Button
          onClick={toggleAnswerSix}
          className="castle-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerSeven ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="castle-card-title">
          The Throne Room
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          No one crosses the drawbridge and enters the throne room with out my permission.
        </Typography>
        <Button
          onClick={toggleAnswerSeven}
          className="castle-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerEight ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="castle-card-title">
          The Ultimate Axe
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The Ultimate Axe is said to be the sharpest most powerful weapon ever created. It is in the King's posession and I can't imagine he will ever part with it.
        </Typography>
        <Button
          onClick={toggleAnswerEight}
          className="castle-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerNine ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="castle-card-title">
          Favor
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          While I was hunting in the forest I lost my favorite hat. If you find it for me, I would be very grateful.
        </Typography>
        <Button
          onClick={toggleAnswerNine}
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
      <Card className={`${notAChance ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="castle-card-title">
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
