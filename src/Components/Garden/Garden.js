import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getGarden } from "../../redux/gardenReducer";
import {getInventory} from "../../redux/inventoryReducer"
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
  const [rejectionCardTwo, setRejectionCardTwo] = useState(false)
  const [flowerRetrievalCard, setFlowerRetrievalCard] = useState(false)

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
    if (props.garden.garden.manure_given === true) {
      setFairy(!fairy)
    } else {
      setRejectionCardTwo(true)
    }
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

  const toggleRejectionCard = () => {
    if (props.garden.garden.manure_given === true && props.garden.garden.flowers_taken === false) {
      axios.post("/api/flowers").then((res) => {
        props.getInventory(res.data)
        axios.get("/api/garden").then((res) => {
          props.getGarden(res.data[0])
          setFlowerRetrievalCard(true);
        })
      })
    } else {
      setRejectionCard(true)
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div className="garden-main">
      <Nav />
      <div className="garden-body">
        <div className="garden-top" onClick={toggleRejectionCard}>
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
        <div className="garden-bottom" onClick={toggleRejectionCard}>
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
          In case you hadn't noticed, I am far too busy to talk to you.
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
      <Card
        className={`${
          flowerRetrievalCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You quickly pick the most beautiful flowers you can find before the
          fairy changes her mind.
        </Typography>
        <Button
          onClick={() => setFlowerRetrievalCard(false)}
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
export default connect(mapStateToProps, { getUser, getGarden, getInventory })(Garden);
