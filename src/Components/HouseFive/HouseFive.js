import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getHouseFive } from "../../redux/houseFiveReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./HouseFive.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

function HouseFive(props) {
  const [downCharacter, setDownCharacter] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get("/api/houseFive").then((res) => {
      props.getHouseFive(res.data[0]);
      setDownCharacter(true);
      setIsLoading(false);
    });
  }, []);

  const toggleDown = () => {
    axios.post("/api/changeLast", { last: "houseFive" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Cottage");
      });
    });
  };

  const toggleFirst = () => {
    axios.post("/api/houseFiveFirst").then((res) => {
      props.getHouseFive(res.data[0]);
    });
  };

  const toggleGoDown = () => {
    setDownDown(true);
    setDownCharacter(false);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="main">
      <Nav />
      <div className="houseFive-body">
        <div className="houseFive-top">
          <div className="houseFive-top-left">
            <div className="table">
              <div className="paper"></div>
            </div>
          </div>
          <div className="houseFive-top-middle"></div>
          <div className="houseFive-top-right">
            <div className="cupboard"></div>
          </div>
        </div>
        <div className="houseFive-middle">
          <div className="houseFive-middle-left"></div>
          <div className="houseFive-middle-middle">
            <div className="dog"></div>
          </div>
          <div className="houseFive-middle-right"></div>
        </div>
        <div className="houseFive-bottom">
          <div className="houseFive-bottom-left">
            <div className="rug"></div>
          </div>
          <div className="houseFive-bottom-middle">
            <div
              className={`${
                downCharacter ? "character-down" : "character-down-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${downDown ? "down-down" : "down-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
            <div className="houseFive-cottage" onClick={toggleGoDown}>
              <h2>EXIT</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="houseFive-bottom-right">
            <div className="shovel"></div>
          </div>
        </div>
      </div>
      {/* <Card
        className={`${
          props.houseFive.houseFive.first_time
            ? "answer-card"
            : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You climb the steep cliff. Up ahead you see the massive Griffin's
          houseFive. You look around tenatively for the owner of the houseFive.
        </Typography>
        <Button
          onClick={toggleFirst}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card> */}
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getHouseFive, getInventory })(
  HouseFive
);
