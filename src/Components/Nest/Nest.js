import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getNest } from "../../redux/nestReducer";
import axios from "axios";
import "./Nest.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowForward from "@material-ui/icons/ArrowForward";

function Nest(props) {
  const [right, setRight] = useState(false);
  const [failure, setFailure] = useState(false);
  const [coinSuccess, setCoinSuccess] = useState(false);
  const [ribbonSuccess, setRibbonSuccess] = useState(false);
  const [griffin, setGriffin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get("/api/nest").then((res) => {
      props.getNest(res.data[0]);
      setIsLoading(false);
    });
  }, []);

  const toggleRight = () => {
    setRight(!right);
    props.history.push("/Mountain");
  };

  const toggleCoinSuccess = () => {
    setCoinSuccess(!coinSuccess);
  };

  const toggleRibbonSuccess = () => {
    setRibbonSuccess(!ribbonSuccess);
    
  };

  const toggleFailure = () => {
    setFailure(!failure);
  };

  const toggleCoin = () => {
    if (props.user.user.rope) {
      toggleCoinSuccess();
    } else {
      toggleFailure();
    }
  };

  const toggleRibbon = () => {
    setGriffin(true);
    // if (props.user.user.rope) {
    //   toggleRibbonSuccess();
    // } else {
    //   toggleFailure();
    // }
  };

  const toggleFailureEvent = () => {
    setFailure(!failure);
    setGriffin(!griffin);
  };

  const toggleHello = () => {

  }

  return isLoading ? (
    <Loading />
  ) : (
    <div className="nest-main">
      <Nav />
      <div className="nest-body">
        <div className="nest-top">
          <div className="nest-top-left">
            <div
              className={`${griffin ? "griffin-open" : "griffin-closed"}`}
            ></div>
          </div>
          <div className="nest-top-middle"></div>
          <div className="nest-top-right"></div>
        </div>
        <div className="nest-middle">
          <div className="nest-middle-left">
            <div className="egg-div">
              <div className="nest-egg"></div>
            </div>
            <div className="coin-div">
              <div className="nest-coin" onClick={toggleCoin}></div>
            </div>
            <div className="ribbon-div">
              <div className="nest-ribbon" onClick={toggleRibbon}></div>
            </div>
          </div>
          <div className="nest-middle-middle"><div className="animation-test" onAnimationEnd={toggleHello}></div></div>
          <div className="nest-middle-right">
              <Character/>
            <div className="nest-mountains" onClick={toggleRight}>
              <h2>Mountains</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="nest-bottom">
          <div className="nest-bottom-left"></div>
          <div className="nest-bottom-middle"></div>
          <div className="nest-bottom-right"></div>
        </div>
      </div>
      <div className={`${failure ? "failure-card" : "failure-card-closed"}`}>
        <h1 className="card-title">Uh oh!</h1>
        <p className="card-paragraph">
          As you try to climb the moutain to the nest you hear a loud screech.
          You look up to see a griffin flying straight towards you. You'll need
          to find something to help you climb to the nest more quickly next
          time.
        </p>
        <h2 className="card-subtitle">Run away!</h2>
        <button className="card-button" onClick={toggleFailureEvent}>
          CLOSE
        </button>
      </div>
      <div
        className={`${
          coinSuccess ? "coin-success-card" : "coin-success-card-closed"
        }`}
      ></div>
      <div
        className={`${
          ribbonSuccess ? "ribbon-success-card" : "ribbon-success-card-closed"
        }`}
      ></div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getNest })(Nest);
