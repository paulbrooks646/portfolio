import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import { getTower} from "../../redux/towerReducer"
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
import Loading from "../Loading/Loading"

function Tower(props) {
  const [left, setLeft] = useState(false);
  const [weaselHiss, setWeaselHiss] = useState(false);
  const [weaselPurr, setWeaselPurr] = useState(false)
  const [princess, setPrincess] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);

  useEffect(() => {
    axios.get("/api/tower").then((res) => {
      props.getTower(res.data[0]);
      setIsLoading(false);
    });
  }, []);

  const toggleLeft = () => {
    setLeft(!left);
    props.history.push("/Castle");
  };

  const togglePrincess = () => {
    setPrincess(!princess);
  };

  const toggleWeasel = () => {
    if (props.tower.tower.weasel_soothed) {
      setWeaselPurr(true)
    } else {
      setWeaselHiss(true)
    }
  }

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
     if (
       props.tower.tower.flowers_given === true) {
       setPrincess(true)
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
                onClick={togglePrincess}
              />
            </div>
            <div className="tower-bottom-right-down"></div>
          </div>
        </div>
      </div>
      <Card className={`${princess ? "garden-card" : "garden-card-closed"}`}>
        <Typography variant="h5" color="primary" className="garden-card-title">
          What would you like to know about?
        </Typography>
        <List className="garden-list">
          <ListItem className="garden-list-item" onClick={toggleAnswerOne}>
            The Dragon
          </ListItem>
          <ListItem className="garden-list-item" onClick={toggleAnswerTwo}>
            Faeries
          </ListItem>
          <ListItem className="garden-list-item" onClick={toggleAnswerThree}>
            Flowers
          </ListItem>
          <ListItem className="garden-list-item" onClick={toggleAnswerFour}>
            Magical Creatures
          </ListItem>
        </List>
        <Button
          onClick={togglePrincess}
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
          Unlike most magical creatures, dragons are destructive.
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
          Fairies
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Unlike humans, fairies take care of nature.
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
          The Flowers
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I'm warning you. These flowers are to look at, not to touch!
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
          Magical Creatures
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          There are many magical creatures. If you want to meet more of them go
          to the magical glade.
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
          onClick={toggleRejectionCard}
          className="castle-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${weaselHiss ? "answer-card" : "answer-card-closed"}`}
      >
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
      <Card
        className={`${weaselPurr ? "answer-card" : "answer-card-closed"}`}
      >
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
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getInventory, getTower })(Tower);
