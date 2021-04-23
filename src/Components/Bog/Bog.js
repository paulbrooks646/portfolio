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
import ArrowBack from "@material-ui/icons/ArrowBack";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";

function Bog(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const [rejectionCardTwo, setRejectionCardTwo] = useState(false);
  const [leftCharacter, setLeftCharacter] = useState(false);
  const [leftLeft, setLeftLeft] = useState(false);

  useEffect(() => {
    // if (!props.user.user.newgame) {
    //   setNewgameCard(false);

    // }
    axios.get("/api/nest").then((res) => {
      props.getBog(res.data[0]);
      setLeftCharacter(true)
      setIsLoading(false);
    });
  }, []);

  const toggleLeft = () => {
     axios.post("/api/changeLast", { last: "bog" }).then((res) => {
       props.getUser(res.data).then(() => {
         props.history.push("/Swamp");
       });
     });
  };

  const toggleGoLeft = () => {
     setLeftCharacter(false);
     setLeftLeft(true);
    
   };



  const toggleRejectionCard = () => {
    if (!props.bog.bog.weasel_soothed) {
      setRejectionCardTwo(true);
    }  else {
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
            <div className="bog-swamp" onClick={toggleGoLeft}>
              <ArrowBack />
              <h2>Swamp</h2>
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
          </div>
          <div className="bog-middle-right">
            <div className="bog-hydra"></div>
          </div>
        </div>

        <div className="bog-bottom">
          <div className="bog-bottom-left"></div>
          <div className="bog-bottom-middle"></div>
          <div className="bog-bottom-right"></div>
        </div>
      </div>

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
