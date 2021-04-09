import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import { getTower } from "../../redux/towerReducer";
import axios from "axios";
import "./Tower.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Character from "../Character/Character";
import Weasel from "../../Images/Weasel.png";
import Princess from "../../Images/Princess.png";
import Loading from "../Loading/Loading";

function Tower(props) {
  const [left, setLeft] = useState(false);
  const [weaselHiss, setWeaselHiss] = useState(false);
  const [weaselPurr, setWeaselPurr] = useState(false);
  const [princess, setPrincess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const [rejectionCardTwo, setRejectionCardTwo] = useState(false);

  useEffect(() => {
    axios.get("/api/tower").then((res) => {
      props.getTower(res.data[0]);
      setIsLoading(false);
    });
    if (props.tower.tower.first_time) {
      axios.post("/api/towerFirstTime").then((res) => {
        getTower(res.data[0]);
        setFirstTime(true);
      });
    }
  }, []);

  const toggleLeft = () => {
    setLeft(!left);
    props.history.push("/Castle");
  };

  const togglePrincess = () => {
    if (!props.tower.tower.weasel_soothed) {
    }
    setPrincess(!princess);
  };

  const toggleWeasel = () => {
    if (props.tower.tower.weasel_soothed) {
      setWeaselPurr(true);
    } else {
      setWeaselHiss(true);
    }
  };

  const toggleAnswerOne = () => {
    togglePrincess();
    setAnswerOne(!answerOne);
  };

  const toggleAnswerTwo = () => {
    togglePrincess();
    setAnswerTwo(!answerTwo);
  };

  const toggleAnswerThree = () => {
    togglePrincess();
    setAnswerThree(!answerThree);
  };

  const toggleAnswerFour = () => {
    togglePrincess();
    setAnswerFour(!answerFour);
  };

  const toggleRejectionCard = () => {
    if (!props.tower.tower.weasel_soothed) {
      setRejectionCardTwo(true);
    } else if (props.tower.tower.flowers_given === true) {
      setPrincess(true);
    } else {
      setRejectionCard(true);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="tower-main">
      <Nav />
      <div className="tower-body">
        <div className="tower-top">
          <div className="tower-top-left">
            <div className="tower-top-left-up"></div>
            <div className="tower-top-left-down">
              <div className="tower-castle" onClick={toggleLeft}>
                <ArrowBack />
                <h2>Castle</h2>
              </div>
              <Character />
              <img
                src={Weasel}
                className="tower-weasel"
                onClick={toggleWeasel}
                alt="weasel"
              />
            </div>
          </div>

          <div className="tower-top-right"></div>
        </div>

        <div className="tower-bottom">
          <div className="tower-bottom-left"></div>
          <div className="tower-bottom-middle">
            <div className="tower-bottom-middle-up"></div>
            <div className="tower-bottom-middle-down"></div>
          </div>
          <div className="tower-bottom-right">
            <div className="tower-bottom-right-up">
              <img
                src={Princess}
                className="tower-princess"
                alt="princess"
                onClick={toggleRejectionCard}
              />
            </div>
            <div className="tower-bottom-right-down"></div>
          </div>
        </div>
      </div>
      <Card className={`${princess ? "tower-card" : "tower-card-closed"}`}>
        <Typography variant="h5" color="primary" className="tower-card-title">
          What knowledge shall I bestow upon you?
        </Typography>
        <List className="tower-list">
          <ListItem className="tower-list-item" onClick={toggleAnswerOne}>
            The King
          </ListItem>
          <ListItem className="tower-list-item" onClick={toggleAnswerTwo}>
            The Ribbon
          </ListItem>
          <ListItem className="tower-list-item" onClick={toggleAnswerThree}>
            The Tower
          </ListItem>
          <ListItem className="tower-list-item" onClick={toggleAnswerFour}>
            The Weasel
          </ListItem>
        </List>
        <Button
          onClick={togglePrincess}
          className="tower-card-button"
          variant="contained"
          color="primary"
        >
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="tower-card-title">
          The King
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You want to see the King? It would be too funny if I sent someone of
          your ignorance to speak with him. I will present you with a letter to
          be delivered to the King if you find my lost ribbon.
        </Typography>
        <Button
          onClick={toggleAnswerOne}
          className="tower-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="tower-card-title">
          Ribbon
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          One day while I was lounging in the shade a giant bird swooped down
          and stole my favorite ribbon from the line where my servants had hung
          it to dry. Such carelessness is peeving.
        </Typography>
        <Button
          onClick={toggleAnswerTwo}
          className="tower-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="tower-card-title">
          The Tower
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The tower is where I go to when the King forgets what a beautiful,
          mature, intelligent young lady I am. I also come here to escape associating with boorish people like yourself.
        </Typography>
        <Button
          onClick={toggleAnswerThree}
          className="tower-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="tower-card-title">
          The Weasel
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Pop is far more intelligent and loyal than you will ever be.
        </Typography>
        <Button
          onClick={toggleAnswerFour}
          className="tower-card-button"
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
          How droll! The peasant thinks I would talk to him.
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
      <Card
        className={`${rejectionCardTwo ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You should figure out how to deal with that weasel before you even
          think about talking to the princess
        </Typography>
        <Button
          onClick={() => setRejectionCardTwo(false)}
          className="castle-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${weaselHiss ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Hiiiisssssss!
        </Typography>
        <Button
          onClick={() => setWeaselHiss(false)}
          className="castle-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${weaselPurr ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Nem nem!
        </Typography>
        <Button
          onClick={() => setWeaselPurr(false)}
          className="castle-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${firstTime ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You follow the castle around towards the tower. You stop abruptly as
          you see a ferocious weasel on the path in front of you. It hisses and
          darts at you. You back away. You'll have to figure out how to get past
          the weasel if you want to go any further.
        </Typography>
        <Button
          onClick={() => setFirstTime(false)}
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
export default connect(mapStateToProps, { getUser, getInventory, getTower })(
  Tower
);
