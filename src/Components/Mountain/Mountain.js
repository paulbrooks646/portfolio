import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Mountain.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Character from "../Character/Character";

function Mountain(props) {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [down, setDown] = useState(false);
  const [mountaineer, setMountaineer] = useState(false);
  const [mountainFirst, setMountainFirst] = useState(props.user.user.mountain);
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);

  const toggleRight = () => {
    axios.post("/api/changeLast", { last: "mountain" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Dashboard");
      });
    });
  };

  const toggleLeft = () => {
    setLeft(!left);
    props.history.push("/Nest");
  };

  const toggleDown = () => {
    setDown(!down);
    props.history.push("/Pass");
  };

  const toggleMountaineer = () => {
    setMountaineer(!mountaineer);
  };

  const toggleAnswerOne = () => {
    toggleMountaineer();
    setAnswerOne(!answerOne);
  };

  const toggleAnswerTwo = () => {
    toggleMountaineer();
    setAnswerTwo(!answerTwo);
  };

  const toggleAnswerThree = () => {
    toggleMountaineer();
    setAnswerThree(!answerThree);
  };

  const toggleAnswerFour = () => {
    toggleMountaineer();
    setAnswerFour(!answerFour);
  };

  const toggleMountainFirst = () => {
    axios.post("/api/mountainFirst").then((res) => props.getUser(res.data));
  };

  return (
    <div className="mountain-main">
      <Nav />
      <div className="mountain-body">
        <div className="mountain-top">
          <div className="mountain-top-left"></div>
          <div className="mountain-top-middle"></div>
          <div className="mountain-top-right"></div>
        </div>
        <div className="mountain-middle">
          <div className="mountain-middle-left">
            <div className="mountain-nest" onClick={toggleLeft}>
              <ArrowBack />
              <h2>Nest</h2>
            </div>
          </div>
          <div className="mountain-middle-middle">
            <div className="mountaineer" onClick={toggleMountaineer}></div>
          </div>
          <div className="mountain-middle-right">
            <Character />
            <div className="mountain-home" onClick={toggleRight}>
              <h2>Home</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="mountain-bottom">
          <div className="mountain-bottom-left"></div>
          <div className="mountain-bottom-middle">
            <div className="mountain-pass" onClick={toggleDown}>
              <h2>Pass</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="mountain-bottom-right"></div>
        </div>
      </div>
      <Card
        className={`${
          props.user.user.mountain ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You arduously climb up the snowy mountain and stumble across an old
          woodsman.
        </Typography>
        <Button
          onClick={toggleMountainFirst}
          className="mountain-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${mountaineer ? "mountain-card" : "mountain-card-closed"}`}
      >
        <Typography
          variant="h5"
          color="primary"
          className="mountain-card-title"
        >
          What brings you up the mountain?
        </Typography>
        <List className="mountain-list">
          <ListItem className="mountain-list-item" onClick={toggleAnswerOne}>
            Griffins
          </ListItem>
          <ListItem className="mountain-list-item" onClick={toggleAnswerTwo}>
            Nests
          </ListItem>
          <ListItem className="mountain-list-item" onClick={toggleAnswerThree}>
            Ogres
          </ListItem>
          <ListItem className="mountain-list-item" onClick={toggleAnswerFour}>
            The Pass
          </ListItem>
        </List>
        <Button
          onClick={toggleMountaineer}
          className="mountain-card-button"
          variant="contained"
          color="primary"
        >
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="mountain-card-title"
        >
          Griffins
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Griffins are massive birds. They are very fast and very protective of
          their young. Griffins typically won't attack humans unless a human
          gets too close to the Griffin's nest.
        </Typography>
        <Button
          onClick={toggleAnswerOne}
          className="mountain-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="mountain-card-title"
        >
          Nests
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          There are nests all throughout the cliffs up in the mountains. They
          are home to giant birds like Rocs and Griffins. Griffins are
          particularly common in this area.
        </Typography>
        <Button
          onClick={toggleAnswerTwo}
          className="mountain-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="mountain-card-title"
        >
          Ogres
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Ogres are massive. Funny creatures, you could hit an Ogre as hard as
          you like, it wouldn't hurt the Ogre and he wouldn't feel it. You could
          scream as loud as you want, an Ogre wouldn't even notice. But an
          Ogre's sense of smell is unrivaled. Ogre's keep to themselves but can
          get aggressive if they smell something nasty enough.
        </Typography>
        <Button
          onClick={toggleAnswerThree}
          className="mountain-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="mountain-card-title"
        >
          The Pass
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          As snow in the mountains melt, it flows down the mountain. Many people
          and creatures depend on that water. The pass is a point this water is
          shallow enough to cross, it is the only way through the mountains.
        </Typography>
        <Button
          onClick={toggleAnswerFour}
          className="mountain-card-button"
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
export default connect(mapStateToProps, { getUser })(Mountain);
