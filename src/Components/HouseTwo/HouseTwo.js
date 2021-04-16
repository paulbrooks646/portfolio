import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getHouseTwo } from "../../redux/houseTwoReducer";
import axios from "axios";
import "./HouseTwo.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import { getInventory } from "../../redux/inventoryReducer";

function HouseTwo(props) {
  const [down, setDown] = useState(false);
  const [failure, setFailure] = useState(false);
  const [coinSuccess, setCoinSuccess] = useState(false);
  const [ribbonSuccess, setRibbonSuccess] = useState(false);
  const [featherSuccess, setFeatherSuccess] = useState(false);
  const [griffin, setGriffin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get("/api/houseTwo").then((res) => {
      props.getHouseTwo(res.data[0]);
      setIsLoading(false);
    });
  }, []);

  const toggleDown = () => {
    setDown(!down);
    props.history.push("/Town");
  };

  const toggleFirst = () => {
    axios.post("/api/houseTwoFirst").then((res) => {
      props.getHouseTwo(res.data[0]);
    });
  };

  const toggleCoin = () => {
    if (props.houseTwo.houseTwo.rope_used) {
      axios.post("/api/coin").then((res) => {
        props.getUser(res.data);
        axios.post("/api/houseTwoCoin").then((res) => {
          props.getHouseTwo(res.data[0]);
          setCoinSuccess(true);
        });
      });
    } else {
      setGriffin(true);
    }
  };

  const toggleRibbon = () => {
    if (props.houseTwo.houseTwo.rope_used) {
      axios.post("/api/ribbon").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/houseTwo").then((res) => {
          props.getHouseTwo(res.data[0]);
          setRibbonSuccess(true);
        });
      });
    } else {
      setGriffin(true);
    }
  };

  const toggleFeather = () => {
    if (props.houseTwo.houseTwo.rope_used) {
      axios.post("/api/feather").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/houseTwo").then((res) => {
          props.getHouseTwo(res.data[0]);
          setFeatherSuccess(true);
        });
      });
    } else {
      setGriffin(true);
    }
  };

  const toggleAnimationEnd = () => {
    setGriffin(false);
    setFailure(true);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="houseTwo-main">
      <Nav />
      <div className="houseTwo-body">
        <div className="houseTwo-top">
          <div className="houseTwo-top-left">
            <div
              className={`${griffin ? "griffin-open" : "griffin-closed"}`}
              onAnimationEnd={toggleAnimationEnd}
            ></div>
          </div>
          <div className="houseTwo-top-middle"></div>
          <div className="houseTwo-top-right"></div>
        </div>
        <div className="houseTwo-middle">
          <div className="houseTwo-middle-left"></div>
          <div className="houseTwo-middle-middle"></div>
          <div className="houseTwo-middle-right"></div>
        </div>
        <div className="houseTwo-bottom">
          <div className="houseTwo-bottom-left"></div>
          <div className="houseTwo-bottom-middle">
            <Character />
            <div className="houseTwo-maze" onClick={toggleDown}>
              <h2>EXIT</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="houseTwo-bottom-right"></div>
        </div>
      </div>
      <Card
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
      </Card>
      <Card className={`${failure ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Are you serious? Their is a ravenous wolf blocking the path.
        </Typography>
        <Button
          onClick={() => setFailure(false)}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${coinSuccess ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You pick up the shiny gold coin.
        </Typography>
        <Button
          onClick={() => setCoinSuccess(false)}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${ribbonSuccess ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You pick up the beautiful blue ribbon.
        </Typography>
        <Button
          onClick={() => setRibbonSuccess(false)}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${featherSuccess ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You pick up the large griffin feather.
        </Typography>
        <Button
          onClick={() => setFeatherSuccess(false)}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${failure ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          A huge Griffin swoops out of the air. You barely manage to dodge its
          attack. You need to find something to help you climb to the houseTwo
          more quickly.
        </Typography>
        <Button
          onClick={() => setFailure(false)}
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
export default connect(mapStateToProps, { getUser, getHouseTwo, getInventory })(
  HouseTwo
);
