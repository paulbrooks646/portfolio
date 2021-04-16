import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import { getBog } from "../../redux/bogReducer";
import axios from "axios";
import "./Bog.scss";
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

function Bog(props) {
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
    axios.get("/api/bog").then((res) => {
      props.getBog(res.data[0]);
      setIsLoading(false);
    });
    if (props.bog.bog.first_time) {
      axios.post("/api/bogFirstTime").then((res) => {
        getBog(res.data[0]);
        setFirstTime(true);
      });
    }
  }, []);

  const toggleLeft = () => {
    setLeft(!left);
    props.history.push("/Swamp");
  };

  const togglePrincess = () => {
    if (!props.bog.bog.weasel_soothed) {
    }
    setPrincess(!princess);
  };

  const toggleWeasel = () => {
    if (props.bog.bog.weasel_soothed) {
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
    if (!props.bog.bog.weasel_soothed) {
      setRejectionCardTwo(true);
    } else if (props.bog.bog.flowers_given === true) {
      setPrincess(true);
    } else {
      setRejectionCard(true);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="bog-main">
      <Nav />
      <div className="bog-body">
        <div className="bog-top"></div>
        <div className="bog-middle">
          <div className="bog-middle-left">
            <div className="bog-swamp" onClick={toggleLeft}>
              <ArrowBack />
              <h2>Swamp</h2>
            </div>
            <Character />
            </div>
            <div className="bog-middle-right"><div className="bog-hydra"></div></div>
        </div>

        <div className="bog-bottom">
          <div className="bog-bottom-left"></div>
          <div className="bog-bottom-middle"></div>
          <div className="bog-bottom-right"></div>
        </div>
      </div>
      <Card className={`${princess ? "bog-card" : "bog-card-closed"}`}>
        <Typography variant="h5" color="primary" className="bog-card-title">
          What knowledge shall I bestow upon you?
        </Typography>
        <List className="bog-list">
          <ListItem className="bog-list-item" onClick={toggleAnswerOne}>
            The King
          </ListItem>
          <ListItem className="bog-list-item" onClick={toggleAnswerTwo}>
            The Ribbon
          </ListItem>
          <ListItem className="bog-list-item" onClick={toggleAnswerThree}>
            The Bog
          </ListItem>
          <ListItem className="bog-list-item" onClick={toggleAnswerFour}>
            The Weasel
          </ListItem>
        </List>
        <Button
          onClick={togglePrincess}
          className="bog-card-button"
          variant="contained"
          color="primary"
        >
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="bog-card-title">
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
          className="bog-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="bog-card-title">
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
          className="bog-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="bog-card-title">
          The Bog
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The bog is where I go to when the King forgets what a beautiful,
          mature, intelligent young lady I am. I also come here to escape
          associating with boorish people like yourself.
        </Typography>
        <Button
          onClick={toggleAnswerThree}
          className="bog-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="bog-card-title">
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
          className="bog-card-button"
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
          You follow the castle around towards the bog. You stop abruptly as you
          see a ferocious weasel on the path in front of you. It hisses and
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
export default connect(mapStateToProps, { getUser, getInventory, getBog })(
  Bog
);
