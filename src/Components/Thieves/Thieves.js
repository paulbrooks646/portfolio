import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getThieves } from "../../redux/thievesReducer";
import axios from "axios";
import "./Thieves.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { getInventory } from "../../redux/inventoryReducer";

function Thieves(props) {
  const [right, setRight] = useState(false);
  const [failure, setFailure] = useState(false);
  const [coinSuccess, setCoinSuccess] = useState(false);
  const [ribbonSuccess, setRibbonSuccess] = useState(false);
  const [featherSuccess, setFeatherSuccess] = useState(false);
  const [griffin, setGriffin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get("/api/thieves").then((res) => {
      props.getThieves(res.data[0]);
      setIsLoading(false);
    });
  }, []);

  const toggleRight = () => {
    setRight(!right);
    props.history.push("/Mountain");
  };

  const toggleFirst = () => {
    axios.post("/api/thievesFirst").then((res) => {
      props.getThieves(res.data[0]);
    });
  };

  const toggleCoin = () => {
    if (props.thieves.thieves.rope_used) {
      axios.post("/api/coin").then((res) => {
        props.getUser(res.data);
        axios.post("/api/thievesCoin").then((res) => {
          props.getThieves(res.data[0]);
          setCoinSuccess(true);
        });
      });
    } else {
      setGriffin(true);
    }
  };

  const toggleRibbon = () => {
    if (props.thieves.thieves.rope_used) {
      axios.post("/api/ribbon").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/thieves").then((res) => {
          props.getThieves(res.data[0]);
          setRibbonSuccess(true);
        });
      });
    } else {
      setGriffin(true);
    }
  };

  const toggleFeather = () => {
    if (props.thieves.thieves.rope_used) {
      axios.post("/api/feather").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/thieves").then((res) => {
          props.getThieves(res.data[0]);
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
    <div className="thieves-main">
      <Nav />
      <div className="thieves-body">
        <div className="thieves-top">
          <div className="thieves-top-left">
            <div
              className={`${griffin ? "griffin-open" : "griffin-closed"}`}
              onAnimationEnd={toggleAnimationEnd}
            ></div>
          </div>
          <div className="thieves-top-middle"></div>
          <div className="thieves-top-right"></div>
        </div>
        <div className="thieves-middle">
          <div className="thieves-middle-left">
            <div className="feather-div">
              <div
                className={`${
                  props.thieves.thieves.feather_taken
                    ? "thieves-feather-closed"
                    : "thieves-feather"
                }`}
                onClick={toggleFeather}
              ></div>
            </div>
            <div className="coin-div">
              <div
                className={`${
                  props.thieves.thieves.coin_taken ? "thieves-coin-closed" : "thieves-coin"
                }`}
                onClick={toggleCoin}
              ></div>
            </div>
            <div className="ribbon-div">
              <div
                className={`${
                  props.thieves.thieves.ribbon_taken
                    ? "thieves-ribbon-closed"
                    : "thieves-ribbon"
                }`}
                onClick={toggleRibbon}
              ></div>
            </div>
          </div>
          <div className="thieves-middle-middle"></div>
          <div className="thieves-middle-right">
            <Character />
            <div className="thieves-mountains" onClick={toggleRight}>
              <h2>Mountains</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="thieves-bottom">
          <div className="thieves-bottom-left"></div>
          <div className="thieves-bottom-middle"></div>
          <div className="thieves-bottom-right"></div>
        </div>
      </div>
      <Card
        className={`${
          props.thieves.thieves.first_time ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You climb the steep cliff. Up ahead you see the massive Griffin's
          thieves. You look around tenatively for the owner of the thieves.
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
          attack. You need to find something to help you climb to the thieves more
          quickly.
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
export default connect(mapStateToProps, { getUser, getThieves, getInventory })(
  Thieves
);
