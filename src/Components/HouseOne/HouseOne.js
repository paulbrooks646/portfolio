import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getHouseOne } from "../../redux/houseOneReducer";
import axios from "axios";
import "./HouseOne.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import { getInventory } from "../../redux/inventoryReducer";

function HouseOne(props) {

  const [down, setDown] = useState(false);
  const [failure, setFailure] = useState(false);
  const [coinSuccess, setCoinSuccess] = useState(false);
  const [ribbonSuccess, setRibbonSuccess] = useState(false);
  const [featherSuccess, setFeatherSuccess] = useState(false);
  const [griffin, setGriffin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get("/api/houseOne").then((res) => {
      props.getHouseOne(res.data[0]);
      setIsLoading(false);
    });
  }, []);

  const toggleDown = () => {
    setDown(!down);
    props.history.push("/Town");
  };

  const toggleFirst = () => {
    axios.post("/api/houseOneFirst").then((res) => {
      props.getHouseOne(res.data[0]);
    });
  };

  const toggleCoin = () => {
    if (props.houseOne.houseOne.rope_used) {
      axios.post("/api/coin").then((res) => {
        props.getUser(res.data);
        axios.post("/api/houseOneCoin").then((res) => {
          props.getHouseOne(res.data[0]);
          setCoinSuccess(true);
        });
      });
    } else {
      setGriffin(true);
    }
  };

  const toggleRibbon = () => {
    if (props.houseOne.houseOne.rope_used) {
      axios.post("/api/ribbon").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/houseOne").then((res) => {
          props.getHouseOne(res.data[0]);
          setRibbonSuccess(true);
        });
      });
    } else {
      setGriffin(true);
    }
  };

  const toggleFeather = () => {
    if (props.houseOne.houseOne.rope_used) {
      axios.post("/api/feather").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/houseOne").then((res) => {
          props.getHouseOne(res.data[0]);
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
    <div className="houseOne-main">
      <Nav />
      <div className="houseOne-body">
        <div className="houseOne-top">
          <div className="houseOne-top-left">
            <div
              className={`${griffin ? "griffin-open" : "griffin-closed"}`}
              onAnimationEnd={toggleAnimationEnd}
            ></div>
          </div>
          <div className="houseOne-top-middle"></div>
          <div className="houseOne-top-right"></div>
        </div>
        <div className="houseOne-middle">
          <div className="houseOne-middle-left"></div>
          <div className="houseOne-middle-middle"></div>
          <div className="houseOne-middle-right"></div>
        </div>
        <div className="houseOne-bottom">
          <div className="houseOne-bottom-left"></div>
          <div className="houseOne-bottom-middle">
            <Character />
            <div className="houseOne-maze" onClick={toggleDown}>
              <h2>EXIT</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="houseOne-bottom-right"></div>
        </div>
      </div>
      <Card
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
          attack. You need to find something to help you climb to the houseOne
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
export default connect(mapStateToProps, { getUser, getHouseOne, getInventory })(
  HouseOne
);
