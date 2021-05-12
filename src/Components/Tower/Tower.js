import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
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
  const [leftCharacter, setLeftCharacter] = useState(false);
  const [leftLeft, setLeftLeft] = useState(false);
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
  const [inventoryOpen, setInventoryOpen] = useState(false)
  const [towerData, setTowerData] = useState()

  useEffect(() => {
    axios.get("/api/tower").then((res) => {
      setTowerData(res.data[0]);
      setLeftCharacter(true);
      setIsLoading(false);
    });
    if (props.tower.tower.first_time) {
      axios.post("/api/towerFirstTime").then((res) => {
        getTower(res.data[0]);
        setFirstTime(true);
      });
    }
  }, []);

  const toggleInventoryOpen = () => setInentoryOpen(!inventoryOpen);

  const logout = () => {
    axios.delete("/api/logout").then(() => {
      props.logoutUser();
      props.history.push("/Auth");
    });
  };

  const inventoryList = props.inventory.inventory.map((e, index) => {
    return (
      <h4 key={index} className="nav-list-item" onClick={() => toggleItem(e)}>
        {e}
      </h4>
    );
  });

  const toggleItem = (item) => {
    if (item === "flute") {
      if (props.location.pathname === "/Tower") {
        axios.post("/api/useFlute").then((res) => {
          setTowerData(res.data[0]);
          setFluteCard(true);
        });
      } else {
        setRejectionCard(true);
      }
    }
  };

  const toggleLeft = () => {
    axios.post("/api/changeLast", { last: "tower" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Castle");
      });
    });
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

  const toggleGoLeft = () => {
    setLeftCharacter(false);
    setLeftLeft(true);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="main">
      <Nav />
      <div className="tower-body">
        <div className="tower-top">
          <div className="tower-top-left">
            <div className="tower-top-left-up"></div>
            <div className="tower-top-left-down">
              <div className="tower-castle" onClick={toggleGoLeft}>
                <ArrowBack />
                <h2>Castle</h2>
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
      <Card
        className={`${princess ? "component-card" : "component-card-closed"}`}
      >
        <Typography variant="h5" color="primary">
          What knowledge shall I bestow upon you?
        </Typography>
        <List className="component-list">
          <ListItem onClick={toggleAnswerOne}>The King</ListItem>
          <ListItem onClick={toggleAnswerTwo}>The Ribbon</ListItem>
          <ListItem onClick={toggleAnswerThree}>The Tower</ListItem>
          <ListItem onClick={toggleAnswerFour}>The Weasel</ListItem>
        </List>
        <Button onClick={togglePrincess} variant="contained" color="primary">
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
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
        <Button onClick={toggleAnswerOne} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
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
        <Button onClick={toggleAnswerTwo} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Tower
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The tower is where I go to when the King forgets what a beautiful,
          mature, intelligent young lady I am. I also come here to escape
          associating with boorish people like yourself.
        </Typography>
        <Button onClick={toggleAnswerThree} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Weasel
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Pop is far more intelligent and loyal than you will ever be.
        </Typography>
        <Button onClick={toggleAnswerFour} variant="contained" color="primary">
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
export default connect(mapStateToProps, { getUser, getInventory })(
  Tower
);
