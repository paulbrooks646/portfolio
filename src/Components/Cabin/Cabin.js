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
    if (!props.cabin.cabin.potatoes_given) {
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
          What brings you up the cabin?
        </Typography>
        <List className="cabin-list">
          <ListItem className="cabin-list-item" onClick={toggleAnswerOne}>
            Griffins
          </ListItem>
          <ListItem className="cabin-list-item" onClick={toggleAnswerTwo}>
            Nests
          </ListItem>
          <ListItem className="cabin-list-item" onClick={toggleAnswerThree}>
            Ogres
          </ListItem>
          <ListItem className="cabin-list-item" onClick={toggleAnswerFour}>
            The Pass
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
          className="cabin-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="cabin-card-title">
          Nests
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          There are nests all throughout the cliffs up in the cabins. They are
          home to giant birds like Rocs and Griffins. Griffins are particularly
          common in this area.
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
          className="cabin-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="cabin-card-title">
          The Pass
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          As snow in the cabins melt, it flows down the cabin. Many people and
          creatures depend on that water. The pass is a point this water is
          shallow enough to cross, it is the only way through the cabins.
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
          The pass is open? Too bad. I like to be alone. Suppose people will come bumbling around now. If I didn't need occasional vittles and whittling supplies I would go deep into the mountains and no one would ever find me. You best be getting along.
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
