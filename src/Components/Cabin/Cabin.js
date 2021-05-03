import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getCabin } from "../../redux/cabinReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Cabin.scss";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Loading from "../Loading/Loading";
import Character from "../Character/Character";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

function Cabin(props) {
  const [upCharacter, setUpCharacter] = useState(false);
  const [upUp, setUpUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mushroomCard, setMushroomCard] = useState(false);
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [oldMan, setOldMan] = useState(false);
  const [firstTimeCard, setFirstTimeCard] = useState(true);
  const [rejectionCard, setRejectionCard] = useState(false)

  useEffect(() => {
     if (!props.cabin.cabin.first_time) {
       setFirstTimeCard(false);
     }
    axios.get("/api/cabin").then((res) => {
     
      props.getCabin(res.data[0]);
      setUpCharacter(true);

      setIsLoading(false);
    });
  }, []);

  const toggleMushroom = () => {
    axios.post("/api/mushroom").then((res) => {
      props.getInventory(res.data);
      axios.get("/api/cabin").then(res => {
        props.getCabin(res.data[0])
        setMushroomCard(true);
      })
    });
  };

  const toggleOldMan = () => {
    if (props.cabin.cabin.knife_given && props.cabin.cabin.wood_given && !props.cabin.cabin.toy_received) {
      axios.post("/api/toy").then(res => {
        props.getInventory(res.data)
        axios.get("/api/cabin").then(res => {
          props.getCabin(res.data[0])
          setToyCard(true)
        })
      })
    }
    else if (!props.cabin.cabin.potatoes_given) {
      setRejectionCard(true)
    } else {
      setOldMan(!oldMan)
    }
  };

  const toggleAnswerOne = () => {
    toggleOldMan();
    setAnswerOne(!answerOne);
  };

  const toggleAnswerTwo = () => {
    toggleOldMan();
    setAnswerTwo(!answerTwo);
  };

  const toggleAnswerThree = () => {
    toggleOldMan();
    setAnswerThree(!answerThree);
  };

  const toggleAnswerFour = () => {
    toggleOldMan();
    setAnswerFour(!answerFour);
  };

  const toggleFirstTimeCard = () => {
    axios.post("/api/cabinFirst").then((res) => {
      props.getCabin(res.data[0]);
      setFirstTimeCard(false)
    });
  };

  const toggleUp = () => {
    axios.post("/api/changeLast", { last: "cabin" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Pass");
      });
    });
  };

  const toggleGoUp = () => {
    setUpCharacter(false);
    setUpUp(true);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="cabin-main">
      <Nav />
      <div className="cabin-body">
        <div className="cabin-top">
          <div className="cabin-top-left">
            <div className="pine-tree"></div>
          </div>
          <div className="cabin-top-middle">
            <div className="cabin-home" onClick={toggleGoUp}>
              <ArrowUpward />
              <h2>Pass</h2>
            </div>
            <div
              className={`${
                upCharacter ? "character-up" : "character-up-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${upUp ? "up-up" : "up-up-closed"}`}
              onAnimationEnd={toggleUp}
            >
              <Character />
            </div>
          </div>
          <div className="cabin-top-right">
            <div className="pine-tree"></div>
          </div>
        </div>
        <div className="cabin-middle">
          <div className="cabin-middle-left">
            <div className="cabin-cabin"></div>
          </div>
          <div className="cabin-middle-middle"></div>
          <div className="cabin-middle-right">
            <div className="pine-tree"></div>
          </div>
        </div>
        <div className="cabin-bottom">
          <div className="cabin-bottom-left">
            <div className="woodsman" onClick={toggleOldMan}></div>
          </div>
          <div className="cabin-bottom-middle"></div>
          <div className="cabin-bottom-right">
            <div
              className={`${
                !props.cabin.cabin.mushroom_taken
                  ? "mushroom"
                  : "mushroom-closed"
              }`}
              onClick={toggleMushroom}
            ></div>
          </div>
        </div>
      </div>
      <Card
        className={`${mushroomCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You pick the plump mushroom and take it with you.
        </Typography>
        <Button
          onClick={() => setMushroomCard(false)}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${oldMan ? "cabin-card" : "cabin-card-closed"}`}>
        <Typography variant="h5" color="primary" className="cabin-card-title">
          I suppose since you saved me a trip to civilization I could answer a few questions?
        </Typography>
        <List className="cabin-list">
          <ListItem className="cabin-list-item" onClick={toggleAnswerOne}>
            Pass
          </ListItem>
          <ListItem className="cabin-list-item" onClick={toggleAnswerTwo}>
            Cabin
          </ListItem>
          <ListItem className="cabin-list-item" onClick={toggleAnswerThree}>
            Whittling
          </ListItem>
          <ListItem className="cabin-list-item" onClick={toggleAnswerFour}>
            Toy
          </ListItem>
        </List>
        <Button
          onClick={toggleOldMan}
          className="cabin-card-button"
          variant="contained"
          color="primary"
        >
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="cabin-card-title">
          Pass
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I guess you being here means the pass is open. Too bad. Things have been quiet around here since the ogre blocked the pass. I've had plenty of time to whittle in peace.
        </Typography>
        <Button
          onClick={toggleAnswerOne}
          className="cabin-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="cabin-card-title">
          Cabin
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I built this cabin myself so that I could live in peace and quiet. Over the years more people have ventured up this way, at least until the ogre blocked the pass. Every year or so I go into town for food to supplement what I can find in the mountains.
        </Typography>
        <Button
          onClick={toggleAnswerTwo}
          className="cabin-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="cabin-card-title">
          Whittling
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I find whittling relaxing. I can make anything out of wood. Used to be I would chop down a tree and have enough wood to whittle for a long time. I'm old enough now that my tree chopping days are over. I scrounge for wood here and there but it is hard to find good wood.
        </Typography>
        <Button
          onClick={toggleAnswerThree}
          className="cabin-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="cabin-card-title">
          Toy
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I suppose I could make a toy for you if you got me some wood and a new knife.
        </Typography>
        <Button
          onClick={toggleAnswerFour}
          className="cabin-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${firstTimeCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography variant="h4" color="primary" className="cabin-card-title">
          Phew!
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          As you descend the other side of the mountain things start to get
          warmer. In the distance you see smoke. As you get closer you see that
          the smoke is coming out of the chimney of a cabin. An old man sits in
          a chair out front snoozing.
        </Typography>
        <Button
          onClick={toggleFirstTimeCard}
          className="cabin-card-button"
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
          If I didn't need the occasional vittles and whittling supplies I would go so deep into the mountains no one could ever find me. You best be getting along.
        </Typography>
        <Button
          onClick={() => setRejectionCard(false)}
          className="forest-card-button"
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
export default connect(mapStateToProps, { getUser, getCabin, getInventory })(
  Cabin
);
