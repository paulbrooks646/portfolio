import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import { getForest } from "../../redux/forestReducer";
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
import Character from "../Character/Character";
import Elf from "../../Images/Elf.gif";
import Loading from "../Loading/Loading";

function Forest(props) {
  const [forestFirst, setForestFirst] = useState(false);
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [ranger, setRanger] = useState(false);
  const [downCharacter, setDownCharacter] = useState(false);
  const [leftCharacter, setLeftCharacter] = useState(false);
  const [rightCharacter, setRightCharacter] = useState(false);
  const [downLeft, setDownLeft] = useState(false);
  const [rightLeft, setRightLeft] = useState(false);
  const [leftLeft, setLeftLeft] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [downRight, setDownRight] = useState(false);
  const [rightRight, setRightRight] = useState(false);
  const [rightDown, setRightDown] = useState(false);
  const [leftRight, setLeftRight] = useState(false);
  const [leftDown, setLeftDown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [trunkRejectionCard, setTrunkRejectionCard] = useState(false);
  const [holeRejectionCard, setHoleRejectionCard] = useState(false);
  const [coinCard, setCoinCard] = useState(false);

  useEffect(() => {
    axios.get("/api/forest").then((res) => {
      props.getForest(res.data[0]);
      if (res.data[0].first_time) {
        setForestFirst(true);
      }

      if (props.user.user.last === "cave") {
        setDownCharacter(true);
      } else if (props.user.user.last === "home") {
        setLeftCharacter(true);
      } else if (props.user.user.last === "swamp") {
        setRightCharacter(true);
      }
      setIsLoading(false);
    });
  }, []);

  const toggleLeft = () => {
    axios.post("/api/changeLast", { last: "forest" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Dashboard");
      });
    });
  };

  const toggleRight = () => {
    axios.post("/api/changeLast", { last: "forest" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Swamp");
      });
    });
  };

  const toggleDown = () => {
    axios.post("/api/changeLast", { last: "forest" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Cave");
      });
    });
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
    setRanger(!ranger);
  };

  const toggleForestFirst = () => {
    axios.post("/api/forestFirst").then((res) => props.getUser(res.data));
    setForestFirst(false);
  };

  const toggleGoLeft = () => {
    if (props.user.user.last === "cave") {
      setDownLeft(true);
      setDownCharacter(false);
    } else if (props.user.user.last === "home") {
      setLeftCharacter(false);
      setLeftLeft(true);
    } else if (props.user.user.last === "swamp") {
      setRightCharacter(false);
      setRightLeft(true);
    }
  };

  const toggleGoRight = () => {
    if (props.user.user.last === "cave") {
      setDownRight(true);
      setDownCharacter(false);
    } else if (props.user.user.last === "home") {
      setLeftCharacter(false);
      setLeftRight(true);
    } else if (props.user.user.last === "swamp") {
      setRightCharacter(false);
      setRightRight(true);
    }
  };

  const toggleGoDown = () => {
    if (props.user.user.last === "cave") {
      setDownDown(true);
      setDownCharacter(false);
    } else if (props.user.user.last === "home") {
      setLeftCharacter(false);
      setLeftDown(true);
    } else if (props.user.user.last === "swamp") {
      setRightCharacter(false);
      setRightDown(true);
    }
  };

  const tree = () => {
    setTrunkRejectionCard(true);
  };

  const hole = () => {
    if (props.forest.forest.coin_taken) {
      setHoleRejectionCard(true);
    } else {
      axios.post("/api/forestCoin").then((res) => {
        props.getForest(res.data[0]);
        axios.post("/api/coin").then((res) => {
          props.getUser(res.data);
          setCoinCard(true);
        });
      });
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="main">
      <Nav />
      <div className="forest-body">
        <div className="forest-top">
          <div className="trunk" onClick={tree}></div>
          <div className="hole" onClick={hole}></div>
        </div>
        <div className="forest-middle">
          <div className="forest-middle-left">
            <div className="forest-home" onClick={toggleGoLeft}>
              <ArrowBack />
              <h2>Home</h2>
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
            <div
              className={`${leftRight ? "left-right" : "left-right-closed"}`}
              onAnimationEnd={toggleRight}
            >
              <Character />
            </div>
            <div
              className={`${leftDown ? "left-down" : "left-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
          </div>
          <div className="forest-middle-middle">
            <img
              src={Elf}
              onClick={toggleRanger}
              className="forest-ranger"
              alt="forest ranger"
            />
          </div>
          <div className="forest-middle-right">
            <div
              className={`${
                rightCharacter ? "character-right" : "character-right-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${rightLeft ? "right-left" : "right-left-closed"}`}
              onAnimationEnd={toggleLeft}
            >
              <Character />
            </div>

            <div
              className={`${rightRight ? "right-right" : "right-right-closed"}`}
              onAnimationEnd={toggleRight}
            >
              <Character />
            </div>
            <div
              className={`${rightDown ? "right-down" : "right-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
            <div className="forest-swamp" onClick={toggleGoRight}>
              <h2>Swamp</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="forest-bottom">
          <div className="forest-bottom-left"></div>
          <div className="forest-bottom-middle">
            <div
              className={`${
                downCharacter ? "character-down" : "character-down-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${downLeft ? "down-left" : "down-left-closed"}`}
              onAnimationEnd={toggleLeft}
            >
              <Character />
            </div>
            <div
              className={`${downRight ? "down-right" : "down-right-closed"}`}
              onAnimationEnd={toggleRight}
            >
              <Character />
            </div>
            <div
              className={`${downDown ? "down-down" : "down-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
            <div className="forest-cave" onClick={toggleGoDown}>
              <h2>Cave</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="forest-bottom-right"></div>
        </div>
      </div>
      <Card id={`${ranger ? "forest-card" : "forest-card-closed"}`}>
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
      <Card id={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="forest-card-title">
          Caves
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Caves are often used as homes by dangerous woodland creatures. This
          area has a particularly large population of wolves.
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
      <Card id={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="forest-card-title">
          Goblins
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Goblins are tough. More than a match for you, I reckon. They are also
          cowards. Come at them with a big enough weapon and they're likely to
          run off.
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
      <Card id={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="forest-card-title">
          The Swamp
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The swamp is home to any number of foul creatures. Lately it seems to
          be overrun with goblins.
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
      <Card id={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary" className="forest-card-title">
          Wolves
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Wolves are dangerous especially if they're hungry. They're far quicker
          than we are. If you come across one, your best bet is to distract
          them.
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
      <Card id={`${forestFirst ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          After you travel in the forest for a little while you come across a
          ranger enjoying his lunch at a fork in the road. He may be a good
          source of information about the surrounding area.
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
      <Card id={`${coinCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You find a shiny gold coin in the hole in the tree.
        </Typography>
        <Button
          onClick={() => setCoinCard(false)}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${trunkRejectionCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You have no way to climb this tree. It is far to tall and slippery.
        </Typography>
        <Button
          onClick={() => setTrunkRejectionCard(false)}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card id={`${holeRejectionCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You find nothing else in this hole.
        </Typography>
        <Button
          onClick={() => setHoleRejectionCard(false)}
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
export default connect(mapStateToProps, { getUser, getForest, getInventory })(
  Forest
);
