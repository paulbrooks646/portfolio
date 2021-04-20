import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer"
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
import Loading from "../Loading/Loading";


function Dashboard(props) {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false)
  const [newgameCard, setNewgameCard] = useState(true)
  const [newGameCardTwo, setNewGameCardTwo] = useState(false)
  const [oldmanCard, setOldmanCard] = useState(false)
  const [answerOne, setAnswerOne] = useState(false)
  const [answerTwo, setAnswerTwo] = useState(false)
  const [answerThree, setAnswerThree] = useState(false)
  const [answerFour, setAnswerFour] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [dragonAnimation, setDragonAnimation] = useState(false)
  const [fireballAnimation, setFireballAnimation] = useState(false)
  const [burnt, setBurnt] = useState(false)
  const [downCharacter, setDownCharacter] = useState(false)
  const [upCharacter, setUpCharacter] = useState(false)
  const [leftCharacter, setLeftCharacter] = useState(false)
  const [rightCharacter, setRightCharacter] = useState(false)
  
  useEffect(() => {
    if (!props.user.user.newgame) {
     setNewgameCard(false)
    }
    axios.get("/api/inventory").then((res) => {
      
      props.getInventory(res.data);
      setIsLoading(false)
       if (props.user.user.last === "login") {
         setDownCharacter(true);
       } else if (props.user.user.last === "dragon") {
         setDownCharacter(true);
       } else if (props.user.user.last === "mountains") {
         setLeftCharacter(true);
       } else if (props.user.user.last === "forest") {
         setRightCharacter(true);
       } else if (props.user.user.last === "town") {
         setUpCharacter(true);
       } else {
         axios.post("/api/changeLast", { last: "login" }).then((res) => {
           props.getUser(res.data);
         });
       }

    });
   
  }, []);

  const toggleRight = () => {
    setRight(!right);
    props.history.push("/Forest");
  };

  const toggleLeft = () => {
    axios.post("/api/changeLast", { last: "home" }).then(res => {
      props.getUser(res.data)
    })
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
    axios.post("/api/newgame").then(res => {
      
      props.getUser(res.data)
    })
    
    setNewgameCard(false)
    setDragonAnimation(true)
    setFireballAnimation(true)
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

  const toggleDragonAnimationEnd = () => {
    setDragonAnimation(false)
    setFireballAnimation(false)
    setBurnt(true);
    setNewGameCardTwo(true)

  }


  return isLoading ? (
    <Loading />
  ) : (
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
            <div
              className={`${
                upCharacter ? "character-up" : "character-up-closed"
              }`}
            >
              <Character />
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
            <div
              className={`${
                leftCharacter ? "character-left" : "character-left-closed"
              }`}
            >
              <Character />
            </div>
          </div>
          <div className={`${burnt ? "burned-house" : "house"}`}></div>
          <div className="dashboard-middle-right">
            <div
              className={`${
                rightCharacter ? "character-right" : "character-right-closed"
              }`}
            >
              <Character />
            </div>
            <div className="dashboard-forest" onClick={toggleRight}>
              <h2>Forest</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="dashboard-bottom">
          <div className="dashboard-bottom-left">
            <div
              className={`${dragonAnimation ? "dragon" : "dragon-closed"}`}
              onAnimationEnd={toggleDragonAnimationEnd}
            >
              <div
                className={`${
                  fireballAnimation ? "fireball" : "fireball-closed"
                }`}
              ></div>
            </div>
          </div>
          <div className="dashboard-bottom-middle">
            <div
              className={`${
                downCharacter ? "character-down" : "character-down-closed"
              }`}
            >
              <Character />
            </div>
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
          {props.user.user.name}, you have recently come of age and have
          ventured far from your parents and the home of your youth to make a
          name for yourself. Using all the coins you have saved up in life you
          have bought a surprisingly cheap home. Everything seems perfect.
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
        className={`${
          newGameCardTwo ? "dashboard-card" : "dashboard-card-closed"
        }`}
      >
        <Typography
          variant="h4"
          color="primary"
          className="dashboard-card-title"
        >
          Oh boy!!!
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="dashboard-card-description"
        >
          What are you supposed to do now? You have no home, no coins, and no
          friends. How will you survive? More importantly, how will you slay the
          cursed dragon that ruined your life?
        </Typography>
        <Button
          onClick={() => setNewGameCardTwo(false)}
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
          I saw the dragon burn your house poor boy. What would you like to know
          about?
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
          The cursed dragon has plagued this realm for far too long. Many have
          tried but they all ended up the dragon's lunch. If you want my advice,
          stay away.
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
