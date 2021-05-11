import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getSwamp } from "../../redux/swampReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Swamp.scss";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";

function Swamp(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [rightLeft, setRightLeft] = useState(false);
  const [leftLeft, setLeftLeft] = useState(false);
  const [rightRight, setRightRight] = useState(false);
  const [leftRight, setLeftRight] = useState(false);
  const [leftCharacter, setLeftCharacter] = useState(false);
  const [rightCharacter, setRightCharacter] = useState(false);
  const [rightRejectionCard, setRightRejectionCard] = useState(false);
  const [goblinRejctionCard, setGoblinRejectionCard] = useState(false);
  const [logRejectionCard, setLogRejectionCard] = useState(false);
  const [logCard, setLogCard] = useState(false);
  const [logEmptyCard, setLogEmptyCard] = useState(false);
  const [firstTimeCard, setFirstTimeCard] = useState(false);

  useEffect(() => {
    axios.get("/api/swamp").then((res) => {
      props.getSwamp(res.data[0]);
      if (props.swamp.swamp.first_time) {
        setFirstTimeCard(true);
      }
      if (props.user.user.last === "forest") {
        setLeftCharacter(true);
      } else if (props.user.user.last === "bog") {
        setRightCharacter(true);
      }
      setIsLoading(false);
    });
  }, []);

  const toggleLeft = () => {
    axios.post("/api/changeLast", { last: "swamp" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Forest");
      });
    });
  };

  const toggleRight = () => {
    axios.post("/api/changeLast", { last: "swamp" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Bog");
      });
    });
  };

  const toggleGoLeft = () => {
    if (props.user.user.last === "forest") {
      setLeftCharacter(false);
      setLeftLeft(true);
    } else if (props.user.user.last === "bog") {
      setRightCharacter(false);
      setRightLeft(true);
    }
  };

  const toggleGoRight = () => {
    if (!props.swamp.swamp.goblin_gone) {
      setRightRejectionCard(true);
    } else if (props.user.user.last === "forest") {
      setLeftCharacter(false);
      setLeftRight(true);
    } else if (props.user.user.last === "bog") {
      setRightCharacter(false);
      setRightRight(true);
    }
  };

  const toggleLog = () => {
    if (!props.swamp.swamp.goblin_gone) {
      setLogRejectionCard(true);
    } else if (props.swamp.swamp.items_taken) {
      setLogEmptyCard(true);
    } else {
      axios.post("/api/getItems").then((res) => {
        props.getInventory(res.data);
        axios.post("/api/coin").then((res) => {
          props.getUser(res.data);
          axios.get("/api/swamp").then((res) => {
            props.getSwamp(res.data[0]);
            setLogCard(true);
          });
        });
      });
    }
  };

  const toggleFirst = () => {
    axios.post("/api/swampFirst").then((res) => {
      props.getSwamp(res.data[0]);
      setFirstTimeCard(false);
    });
  };

  const toggleAnimationEnd = () => {
    axios.post("/api/goblinGone").then((res) => {
      props.getSwamp(res.data[0]);
    });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="main">
      <Nav />
      <div className="swamp-body">
        <div className="swamp-top">
          <div className="log" onClick={toggleLog}></div>
        </div>
        <div className="swamp-middle">
          <div className="swamp-middle-left">
            <div className="swamp-forest" onClick={toggleGoLeft}>
              <ArrowBack />
              <h2>Forest</h2>
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
          </div>
          <div className="swamp-middle-middle">
            <div
              className={`${
                !props.swamp.swamp.goblin_scared ? "goblin" : "goblin-closed"
              }`}
              onClick={() => setGoblinRejectionCard(true)}
            ></div>
            <div
              className={`${
                props.swamp.swamp.goblin_scared &&
                !props.swamp.swamp.goblin_gone
                  ? "goblin-moving"
                  : "goblin-moving-closed"
              }`}
              onAnimationEnd={toggleAnimationEnd}
            ></div>
          </div>
          <div className="swamp-middle-right">
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
            <div className="swamp-bog" onClick={toggleGoRight}>
              <h2>Bog</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="swamp-bottom">
          <div className="swamp-bottom-left"></div>
          <div className="swamp-bottom-middle"></div>
          <div className="swamp-bottom-right"></div>
        </div>
      </div>
      <Card
        className={`${firstTimeCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The forest transitions into a swamp. The air get more and more rank as
          you proceed. You happen upon a goblin who seems none to pleased to see
          you.
        </Typography>
        <Button onClick={toggleFirst} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          goblinRejctionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The goblin looks furious. Talking to him would be a bad idea. Maybe
          instead you should think about fighting or fleeing.
        </Typography>
        <Button
          onClick={() => setGoblinRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${logRejectionCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          There is an angry goblin between you and the log. You should worry
          about him first.
        </Typography>
        <Button
          onClick={() => setLogRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          rightRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          There is an angry goblin in your way. You'll have to deal with him
          before you can go in that direction.
        </Typography>
        <Button
          onClick={() => setRightRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${logCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          This log must be where the goblin stashed his stuff. You find a coin,
          a nice, warm, surprisingly clean blanket, and a strange pair of
          glasses.
        </Typography>
        <Button
          onClick={() => setLogCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${logEmptyCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You find nothing else in the log.
        </Typography>
        <Button
          onClick={() => setLogEmptyCard(false)}
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
export default connect(mapStateToProps, { getUser, getInventory, getSwamp })(
  Swamp
);
