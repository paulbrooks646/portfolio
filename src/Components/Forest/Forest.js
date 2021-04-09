import React, { useState} from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Forest.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Character from "../Character/Character"
import Elf from "../../Images/Elf.gif"

function Forest(props) {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [down, setDown] = useState(false);
  const [forestFirst, setForestFirst] = useState(props.user.user.forest);
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [ranger, setRanger] = useState(false)



  const toggleLeft = () => {
    setLeft(!left);
    props.history.push("/Dashboard");
  };

  const toggleRight = () => {
    setRight(!right);
    props.history.push("/Swamp");
  };

  const toggleDown = () => {
    setDown(!down);
    props.history.push("/Cave");
  };

  const toggleAnswerOne = () => {
    toggleRanger();
    setAnswerOne(!answerOne);
  };

  const toggleAnswerTwo = () => {
    toggleRanger();
    setAnswerTwo(!answerTwo);
  };

  const toggleAnswerThree = () => {
    toggleRanger();
    setAnswerThree(!answerThree);
  };

  const toggleAnswerFour = () => {
    toggleRanger();
    setAnswerFour(!answerFour);
  };

  const toggleRanger = () => {
    setRanger(!ranger)
  }

  const toggleForestFirst = () => {
    axios.post("/api/forestFirst").then((res) =>
      props.getUser(res.data))
    setForestFirst(false)
  }

  return (
    <div className="forest-main">
      <Nav />
      <div className="forest-body">
        <div className="forest-top">
          <div className="forest-top-left"></div>
          <div className="forest-top-middle"></div>
          <div className="forest-top-right"></div>
        </div>
        <div className="forest-middle">
          <div className="forest-middle-left">
            <div className="forest-home" onClick={toggleLeft}>
              <ArrowBack />
              <h2>Home</h2>
            </div>
            <Character />
          </div>
          <div className="forest-middle-middle"><img src={Elf} onClick={ toggleRanger} className="forest-ranger" alt="forest ranger"/></div>
          <div className="forest-middle-right">
            <div className="forest-swamp" onClick={toggleRight}>
              <h2>Swamp</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="forest-bottom">
          <div className="forest-bottom-left"></div>
          <div className="forest-bottom-middle">
            <div className="forest-cave" onClick={toggleDown}>
              <h2>Cave</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="forest-bottom-right"></div>
        </div>
      </div>
      <Card className={`${ranger ? "forest-card" : "forest-card-closed"}`}>
        <Typography variant="h5" color="primary" className="forest-card-title">
          What brings you into the forest?
        </Typography>
        <List className="forest-list">
          <ListItem className="forest-list-item" onClick={toggleAnswerOne}>
            Caves
          </ListItem>
          <ListItem className="forest-list-item" onClick={toggleAnswerTwo}>
            Goblins
          </ListItem>
          <ListItem className="forest-list-item" onClick={toggleAnswerThree}>
            The Swamp
          </ListItem>
          <ListItem className="forest-list-item" onClick={toggleAnswerFour}>
            Wolves
          </ListItem>
        </List>
        <Button
          onClick={toggleRanger}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="forest-card-title">
          Caves
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Caves are often used as homes by dangerous woodland creatures. This area has a particularly large population of wolves.
        </Typography>
        <Button
          onClick={toggleAnswerOne}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="forest-card-title">
          Goblins
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >Goblins are tough. More than a match for you, I reckon. They are also cowards. Come at them with a big enough weapon and they're likely to run off.
        </Typography>
        <Button
          onClick={toggleAnswerTwo}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="forest-card-title">
          The Swamp
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >The swamp is home to any number of foul creatures. Lately it seems to be overrun with goblins.
        </Typography>
        <Button
          onClick={toggleAnswerThree}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="forest-card-title">
          Wolves
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
         Wolves are dangerous especially if they're hungry. They're far quicker than we are. If you come across one, your best bet is to distract them.
        </Typography>
        <Button
          onClick={toggleAnswerFour}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${forestFirst ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
        After you travel in the forest for a little while you come across a ranger enjoying his lunch at a fork in the road. He may be a good source of information about the surrounding area.
        </Typography>
        <Button
          onClick={toggleForestFirst}
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
export default connect(mapStateToProps, { getUser })(Forest);
