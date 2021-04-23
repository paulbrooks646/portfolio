import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import { getCave } from "../../redux/caveReducer";
import axios from "axios";
import "./Cave.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Loading from "../Loading/Loading";
import Character from "../Character/Character";

function Cave(props) {
  const [upCharacter, setUpCharacter] = useState(false);
  const [downCharacter, setDownCharacter] = useState(false);
  const [downUp, setDownUp] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [upUp, setUpUp] = useState(false);
  const [upDown, setUpDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wolfCard, setWolfCard] = useState(false);
  const [coinCard, setCoinCard] = useState(false);
  const [boneCard, setBoneCard] = useState(false);
  const [hatCard, setHatCard] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);

   useEffect(() => {
     axios.get("/api/cave").then((res) => {
       props.getCave(res.data[0]);
       if (props.user.user.last === "cottage") {
         setDownCharacter(true);
       } else if (props.user.user.last === "forest") {
         setUpCharacter(true);
       }
       setIsLoading(false);
     });
   }, []);

  const toggleUp = () => {
   axios.post("/api/changeLast", { last: "cave" }).then((res) => {
     props.getUser(res.data).then(() => {
       props.history.push("/Forest");
     });
   });
  };

  const toggleDown = () => {
   axios.post("/api/changeLast", { last: "pass" }).then((res) => {
     props.getUser(res.data).then(() => {
       props.history.push("/Cottage");
     });
   });
  };

  const toggleFirst = () => {
    axios.post("/api/caveFirst").then((res) => {
      props.getCave(res.data[0]);
    });
  };

  const toggleWolfCard = () => {
    setWolfCard(!wolfCard);
  };

  const toggleCoin = () => {
    if (props.cave.cave.meat_given) {
      axios.post("/api/coin").then((res) => {
        props.getUser(res.data);
        axios.post("/api/caveCoin").then((res) => {
          props.getCave(res.data[0]);
          toggleCoinCard();
        });
      });
    } else {
      toggleRejectionCard();
    }
  };

  const toggleCoinCard = () => {
    setCoinCard(!coinCard);
  };

  const toggleBone = () => {
    if (props.cave.cave.meat_given) {
      axios.post("/api/bone").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/cave").then((res) => {
          props.getCave(res.data[0]);
          toggleBoneCard();
        });
      });
    } else {
      toggleRejectionCard();
    }
  };

  const toggleBoneCard = () => {
    setBoneCard(!boneCard);
  };

  const toggleHat = () => {
    if (props.cave.cave.meat_given) {
      axios.post("/api/hat").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/cave").then((res) => {
          props.getCave(res.data[0]);
          toggleHatCard();
        });
      });
    } else {
      toggleRejectionCard();
    }
  };

  const toggleHatCard = () => {
    setHatCard(!hatCard);
  };

  const toggleRejectionCard = () => {
    setRejectionCard(!rejectionCard);
  };

   const toggleGoUp = () => {
     if (props.user.user.last === "cottage") {
       setDownUp(true);
       setDownCharacter(false);
     } else if (props.user.user.last === "forest") {
       setUpCharacter(false);
       setUpUp(true);
     }
   };

   const toggleGoDown = () => {
     if (!props.cave.cave.meat_given) {
       setRejectionCard(true);
     } else if (props.user.user.last === "cottage") {
       setDownDown(true);
       setDownCharacter(false);
     } else if (props.user.user.last === "forest") {
       setUpCharacter(false);
       setUpDown(true);
     }
   };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="cave-main">
      <Nav />
      <div className="cave-body">
        <div className="cave-top">
          <div className="cave-top-left"></div>
          <div className="cave-top-middle">
            <div className="cave-forest" onClick={toggleGoUp}>
              <ArrowUpward />
              <h2>Forest</h2>
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
            <div
              className={`${upDown ? "up-down" : "up-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
          </div>
          <div className="cave-top-right"></div>
        </div>
        <div className="cave-middle">
          <div className="cave-middle-left"></div>
            <div className="cave-middle-middle"></div>
            <div className="cave-middle-right"></div>
        </div>
        <div className="cave-bottom">
          <div className="cave-bottom-left">
            <div
              className={`${
                props.cave.cave.meat_given ? "cave-wolf" : "cave-wolf-closed"
              }`}
              onClick={toggleWolfCard}
            ></div>
            <div
              className={`${
                props.cave.cave.meat_given ? "meat" : "meat-closed"
              }`}
            ></div>
          </div>
          <div className="cave-bottom-middle">
            <div
              className={`${
                !props.cave.cave.meat_given ? "cave-wolf" : "cave-wolf-closed"
              }`}
              onClick={toggleWolfCard}
            ></div>
            <div className="coin-div">
              <div
                className={`${
                  !props.cave.cave.coin_taken ? "coin" : "coin-closed"
                }`}
                onClick={toggleCoin}
              ></div>
            </div>
            <div className="bone-div">
              <div
                className={`${
                  !props.cave.cave.bone_taken ? "bone" : "bone-closed"
                }`}
                onClick={toggleBone}
              ></div>
            </div>
            <div className="hat-div">
              <div
                className={`${
                  !props.cave.cave.hat_taken ? "hat" : "hat-closed"
                }`}
                onClick={toggleHat}
              ></div>
            </div>
            <div
              className={`${
                downCharacter ? "character-down" : "character-down-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${downUp ? "down-up" : "down-up-closed"}`}
              onAnimationEnd={toggleUp}
            >
              <Character />
            </div>
            <div
              className={`${downDown ? "down-down" : "down-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
            <div className="cave-cottage" onClick={toggleGoDown}>
              <h2>Cottage</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="cave-bottom-right"></div>
        </div>
      </div>
      <Card className={`${wolfCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I would avoid interacting with that wolf at all costs.
        </Typography>
        <Button
          onClick={toggleWolfCard}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          props.cave.cave.first_time ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You continue traveling through the forest. You stop abruptly. In the
          distance you see a wolf standing in the middle of the trail. Chills
          run through you as you contemplate what to do next.
        </Typography>
        <Button
          onClick={toggleFirst}
          className="forest-card-button"
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
          Are you serious? Their is a ravenous wolf blocking the path.
        </Typography>
        <Button
          onClick={toggleRejectionCard}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${coinCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You pick up the shiny gold coin.
        </Typography>
        <Button
          onClick={toggleCoinCard}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${boneCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You pick up the disgusting bone left from the wolf's last meal.
        </Typography>
        <Button
          onClick={toggleBoneCard}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${hatCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You pick up the fancy hat.
        </Typography>
        <Button
          onClick={toggleHatCard}
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
export default connect(mapStateToProps, { getUser, getInventory, getCave })(
  Cave
);
