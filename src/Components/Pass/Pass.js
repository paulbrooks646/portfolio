import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import {getPass} from "../../redux/passReducer"
import axios from "axios";
import "./Pass.scss";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Loading from "../Loading/Loading";
import Character from "../Character/Character";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function Pass(props) {

  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [downRejection, setDownRejection] = useState(false);
  const [ogre, setOgre] = useState(false)

  useEffect(() => {
    axios.get("/api/pass").then((res) => {
      props.getPass(res.data[0]);
      setIsLoading(false);
    });
  }, []);

  const toggleUp = () => {
    setUp(!up)
    props.history.push("/Mountain")
  }

  const toggleDown = () => {
    if (props.pass.pass.cake_given) {
setDown(!down);
props.history.push("/Cabin");
    } else {
      setDownRejection(true)
    }
    
  }

  const toggleFirst = () => {
    axios.post("/api/passFirst").then((res) => {
      props.getPass(res.data[0]);
    });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="pass-main">
      <Nav />
      <div className="pass-body">
        <div className="pass-top">
          <div className="pass-top-left"></div>
          <div className="pass-top-middle">
            <div className="pass-mountain" onClick={toggleUp}>
              <ArrowUpward />
              <h2>Mountains</h2>
            </div>
            <Character />
          </div>
          <div
            className={`${
              props.pass.pass.cake_given
                ? "pass-top-right-closed"
                : "pass-top-right"
            }`}
          ></div>
        </div>
        <div className="pass-middle">
          <div className="pass-middle-left"></div>
          <div className="pass-middle-middle">
            <div
              className={`${
                props.pass.pass.cake_given ? "pass-ogre-closed" : "pass-ogre"
              }`}
              onClick={() => setOgre(true)}
            ></div>
          </div>
          <div
            className={`${
              props.pass.pass.cake_given
                ? "pass-middle-right-closed"
                : "pass-middle-right"
            }`}
          ></div>
        </div>
        <div className="pass-bottom">
          <div className="pass-bottom-left"></div>
          <div className="pass-bottom-middle">
            <div className="pass-cabin" onClick={toggleDown}>
              <h2>Cabin</h2>
              <ArrowDownward />
            </div>
          </div>
          <div
            className={`${
              props.pass.pass.cake_given
                ? "pass-bottom-right-closed"
                : "pass-bottom-right"
            }`}
          ></div>
        </div>
      </div>
      <Card
        className={`${
          props.pass.pass.first_time ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          As you make your way through thye pass, right in the middle of your
          path is a giant ogre. Fortunately the ogre is asleep. Unfortunately he
          is blocking your way and stopping the runoff from making its way down
          the mountain.
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
        className={`${downRejection ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          There is a giant ogre blocking your way. There is no way to get
          through.
        </Typography>
        <Button
          onClick={() => setDownRejection(false)}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${ogre ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Against your better judgement you poke the ogre. Nothing happens. You scream as loud as you can. The ogre doesn't even stir. There has to be some way to get this ogre to move.
        </Typography>
        <Button
          onClick={() => setOgre(false)}
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
export default connect(mapStateToProps, { getUser, getInventory, getPass })(Pass);
