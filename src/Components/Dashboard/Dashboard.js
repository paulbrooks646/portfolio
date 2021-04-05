import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import {getInventory} from "../../redux/inventoryReducer"
import axios from "axios";
import "./Dashboard.scss";
import Card from "@material-ui/core/Card"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward"
import Character from "../Character/Character";
import Oldman from "../../Images/Oldman.jpg";


function Dashboard(props) {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false)
  const [newgameCard, setNewgameCard] = useState(true)
  const [oldmanCard, setOldmanCard] = useState(false)
  const [answerOne, setAnswerOne] = useState(false)
  const [answerTwo, setAnswerTwo] = useState(false)
  const [answerThree, setAnswerThree] = useState(false)
  const [answerFour, setAnswerFour] = useState(false)
  
  useEffect(() => {
    if (!props.user.user.newgame) {
     setNewgameCard(false)
    }
    axios.get("/api/inventory").then((res) => {
      props.getInventory(res.data[0]);
    });
  });

  const toggleRight = () => {
    setRight(!right);
    props.history.push("/Forest");
  };

  const toggleLeft = () => {
    setLeft(!left);

    props.history.push("/Mountain");
  };

  const toggleUp = () => {
    setUp(!up);
    props.history.push("/Town");
  };

  const toggleDown = () => {
    setDown(!down)
    props.history.push("/Dragon")
  }

  const toggleNewgame = () => {
    axios.post("/api/newgame")
    setNewgameCard(false)

  }
  
  const toggleOldmanCard = () => {
    setOldmanCard(!oldmanCard)

  }

  const toggleAnswerOne = () => {
    toggleOldmanCard()
    setAnswerOne(!answerOne)
  }

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


  return (
    <div className="dashboard-main">
      <Nav />
      <div className="dashboard-body">
        <div className="dashboard-top">
          <div className="dashboard-top-left"></div>
          <div className="dashboard-top-middle">
            <div className="dashboard-town" onClick={toggleUp}>
              <ArrowUpward />
              <h2>Town</h2>
            </div>
          </div>
          <div className="dashboard-top-right">
            <img
              src={Oldman}
              alt="Old man"
              className="dashboard-old-man"
              onClick={toggleOldmanCard}
            />
          </div>
        </div>
        <div className="dashboard-middle">
          <div className="dashboard-middle-left">
            <div className="dashboard-mountains" onClick={toggleLeft}>
              <ArrowBack />
              <h2>Mountains</h2>
            </div>
          </div>
          <div className="dashboard-middle-middle"></div>
          <div className="dashboard-middle-right">
            <div className="dashboard-forest" onClick={toggleRight}>
              <h2>Forest</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="dashboard-bottom">
          <div className="dashboard-bottom-left"></div>
          <div className="dashboard-bottom-middle">
            <Character />
            <div className="dashboard-dragon" onClick={toggleDown}>
              <h2>Dragon's Lair</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="dashboard-bottom-right"></div>
        </div>
      </div>
      <Card
        className={`${
          newgameCard ? "dashboard-card" : "dashboard-card-closed"
        }`}
      >
        <Typography
          variant="h4"
          color="primary"
          className="dashboard-card-title"
        >
          Welcome to {props.user.user.name}'s Quest
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="dashboard-card-description"
        >
          Tragedy has struck. Your home was burned to the ground by a dragon and
          everything you owned was destroyed. It is time to start a new life and
          to hopefully some day slay the dragon who ruined you life.
        </Typography>
        <Button
          onClick={toggleNewgame}
          className="dashboard-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>

      <Card
        className={`${oldmanCard ? "dashboard-card" : "dashboard-card-closed"}`}
      >
        <Typography
          variant="h4"
          color="primary"
          className="dashboard-card-title"
        >
          I saw the dragon burn your house poor boy. What would you
          like to know about?
        </Typography>
        <List className="dashboard-list">
          <ListItem className="dashboard-list-item" onClick={toggleAnswerOne}>
            The Dragon
          </ListItem>
          <ListItem className="dashboard-list-item" onClick={toggleAnswerTwo}>
            The Forest
          </ListItem>
          <ListItem className="dashboard-list-item" onClick={toggleAnswerThree}>
            The Mountains
          </ListItem>
          <ListItem className="dashboard-list-item" onClick={toggleAnswerFour}>
            The Town
          </ListItem>
        </List>
        <Button
          onClick={toggleOldmanCard}
          className="dashboard-card-button"
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
          className="dashboard-card-title"
        >
          The Dragon
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The cursed dragon has plagued this realm for far too long. Many have tried but they all ended up the
          dragon's lunch. If you want my advice, stay away.
        </Typography>
        <Button
          onClick={toggleAnswerOne}
          className="dashboard-card-button"
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
          className="dashboard-card-title"
        >
          The Forest
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The forest is a scary place full of ravenous beasts and other dangers.
          You'd be wise to avoid it.
        </Typography>
        <Button
          onClick={toggleAnswerTwo}
          className="dashboard-card-button"
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
          className="dashboard-card-title"
        >
          The Mountains
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The Mountains are cold and treacherous. Do not go there unless you are
          prepared.
        </Typography>
        <Button
          onClick={toggleAnswerThree}
          className="dashboard-card-button"
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
          className="dashboard-card-title"
        >
          The Town
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The town is as unfriendly as the rest of this realm. If you don't have
          gold there is no place for you there.
        </Typography>
        <Button
          onClick={toggleAnswerFour}
          className="dashboard-card-button"
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
export default connect(mapStateToProps, { getUser, getInventory })(Dashboard);
