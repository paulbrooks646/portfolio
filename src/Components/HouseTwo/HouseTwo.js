import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getHouseTwo } from "../../redux/houseTwoReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./HouseTwo.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

function HouseTwo(props) {
  const [downCharacter, setDownCharacter] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get("/api/houseTwo").then((res) => {
      props.getHouseTwo(res.data[0]);
      setDownCharacter(true);
      setIsLoading(false);
    });
  }, []);

  const toggleDown = () => {
    axios.post("/api/changeLast", { last: "home" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Town");
      });
    });
  };

  const toggleFirst = () => {
    axios.post("/api/houseTwoFirst").then((res) => {
      props.getHouseTwo(res.data[0]);
    });
  };

  const toggleGoDown = () => {
    setDownDown(true);
    setDownCharacter(false);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="houseTwo-main">
      <Nav />
      <div className="houseTwo-body">
        <div className="houseTwo-top">
          <div className="houseTwo-top-left">
            <div className="table">
              <div className="paper"></div>
            </div>
          </div>
          <div className="houseTwo-top-middle"></div>
          <div className="houseTwo-top-right">
            <div className="cupboard"></div>
          </div>
        </div>
        <div className="houseTwo-middle">
          <div className="houseTwo-middle-left"></div>
          <div className="houseTwo-middle-middle">
            <div className="dog"></div>
          </div>
          <div className="houseTwo-middle-right"></div>
        </div>
        <div className="houseTwo-bottom">
          <div className="houseTwo-bottom-left">
            <div className="rug"></div>
          </div>
          <div className="houseTwo-bottom-middle">
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
            <div className="houseTwo-maze" onClick={toggleGoDown}>
              <h2>EXIT</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="houseTwo-bottom-right">
            <div className="shovel"></div>
          </div>
        </div>
      </div>
      {/* <Card
        className={`${
          props.houseTwo.houseTwo.first_time
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
          houseTwo. You look around tenatively for the owner of the houseTwo.
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
export default connect(mapStateToProps, { getUser, getHouseTwo, getInventory })(
  HouseTwo
);
