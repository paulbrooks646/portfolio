import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getGarden } from "../../redux/gardenReducer";
import axios from "axios";
import "./Garden.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import Fairy from "../../Images/Fairy.png";

function Garden(props) {
  const [right, setRight] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fairy, setFairy] = useState(false);
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);

  useEffect(() => {
    axios.get("/api/garden").then((res) => {
      props.getGarden(res.data[0]);
      setIsLoading(false);
    });
  }, []);

  const toggleRight = () => {
    setRight(!right);
    props.history.push("/Castle");
  };

  const toggleFairy = () => {
    setFairy(!fairy);
  };

  const toggleAnswerOne = () => {
    toggleFairy();
    setAnswerOne(!answerOne);
  };

  const toggleAnswerTwo = () => {
    toggleFairy();
    setAnswerTwo(!answerTwo);
  };

  const toggleAnswerThree = () => {
    toggleFairy();
    setAnswerThree(!answerThree);
  };

  const toggleAnswerFour = () => {
    toggleFairy();
    setAnswerFour(!answerFour);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="garden-main">
      <Nav />
      <div className="garden-body">
        <div className="garden-top" onClick={() => setRejectionCard(true)}>
          <div className="garden-top-left"></div>
          <div className="garden-top-middle"></div>
          <div className="garden-top-right"></div>
        </div>
        <div className="garden-middle">
          <div className="garden-middle-left"></div>
          <div className="garden-middle-middle">
            <img
              src={Fairy}
              className="garden-fairy"
              alt="fairy"
              onClick={toggleFairy}
            />
          </div>
          <div className="garden-middle-right">
            <Character />
            <div className="garden-castle" onClick={toggleRight}>
              <h2>Castle</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="garden-bottom" onClick={() => setRejectionCard(true)}>
          <div className="garden-bottom-left"></div>
          <div className="garden-bottom-middle"></div>
          <div className="garden-bottom-right"></div>
        </div>
      </div>
      <Card className={`${fairy ? "garden-card" : "garden-card-closed"}`}>
        <Typography variant="h5" color="primary" className="garden-card-title">
          What would you like to know about?
        </Typography>
        <List className="garden-list">
          <ListItem className="garden-list-item" onClick={toggleAnswerOne}>
            The Dragon
          </ListItem>
          <ListItem className="garden-list-item" onClick={toggleAnswerTwo}>
            The Garden
          </ListItem>
          <ListItem className="garden-list-item" onClick={toggleAnswerThree}>
            The King
          </ListItem>
          <ListItem className="garden-list-item" onClick={toggleAnswerFour}>
            Permission
          </ListItem>
        </List>
        <Button
          onClick={toggleFairy}
          className="garden-card-button"
          variant="contained"
          color="primary"
        >
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="garden-card-title">
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
          className="garden-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="garden-card-title">
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
          className="garden-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="garden-card-title">
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
          className="garden-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="garden-card-title">
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
        <Button
          onClick={toggleAnswerFour}
          className="garden-card-button"
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
          Don't touch the flowers!!!
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
export default connect(mapStateToProps, { getUser, getGarden })(Garden);
