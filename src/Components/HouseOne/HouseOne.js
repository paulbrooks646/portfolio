import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getHouseOne } from "../../redux/houseOneReducer";
import {getInventory} from "../../redux/inventoryReducer"
import axios from "axios";
import "./HouseOne.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

function HouseOne(props) {

  const [downCharacter, setDownCharacter] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get("/api/houseOne").then((res) => {
      props.getHouseOne(res.data[0]);
      setDownCharacter(true)
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
    axios.post("/api/houseOneFirst").then((res) => {
      props.getHouseOne(res.data[0]);
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
      <div className="houseOne-body">
        <div className="houseOne-top">
          <div className="houseOne-top-left">
            <div className="table">
              <div className="paper"></div>
            </div>
          </div>
          <div className="houseOne-top-middle"></div>
          <div className="houseOne-top-right">
            <div className="cupboard"></div>
          </div>
        </div>
        <div className="houseOne-middle">
          <div className="houseOne-middle-left"></div>
          <div className="houseOne-middle-middle">
            <div className="dog"></div>
          </div>
          <div className="houseOne-middle-right"></div>
        </div>
        <div className="houseOne-bottom">
          <div className="houseOne-bottom-left">
            <div className="rug"></div>
          </div>
          <div className="houseOne-bottom-middle">
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
            <div className="houseOne-maze" onClick={toggleGoDown}>
              <h2>EXIT</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="houseOne-bottom-right">
            <div className="shovel"></div>
          </div>
        </div>
      </div>
      {/* <Card
        className={`${
          props.houseOne.houseOne.first_time
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
          houseOne. You look around tenatively for the owner of the houseOne.
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
export default connect(mapStateToProps, { getUser, getHouseOne, getInventory })(
  HouseOne
);
