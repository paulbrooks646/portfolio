import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Valley.scss";
import { Link } from "react-redux";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowUpward from "@material-ui/icons/ArrowUpward";

function Valley(props) {
  const [right, setRight] = useState(false);
  const [failure, setFailure] = useState(false);
  const [coinSuccess, setCoinSuccess] = useState(false);
  const [ribbonSuccess, setRibbonSuccess] = useState(false);
  const [griffin, setGriffin] = useState(false);

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
    if (props.user.user.rope) {
      toggleRibbonSuccess();
    } else {
      toggleFailure();
    }
  };

  const toggleFailureEvent = () => {
    setFailure(!failure);
    setGriffin(!griffin);
  };

  return (
    <div className="valley-main">
      <Nav />
      <div className="valley-body">
        <div className="valley-top">
          <div className="valley-top-left">
            <div
              className={`${griffin ? "griffin-open" : "griffin-closed"}`}
            ></div>
          </div>
          <div className="valley-top-middle"></div>
          <div className="valley-top-right"></div>
        </div>
        <div className="valley-middle">
          <div className="valley-middle-left">
            <div className="valley-coin" onClick={toggleCoin}></div>
            <div className="valley-ribbon" onClick={toggleRibbon}></div>
          </div>
          <div className="valley-middle-middle"></div>
          <div className="valley-middle-right">
            <div className="valley-mountains" onClick={toggleRight}>
              <h2>Mountains</h2>
              <ArrowForward />
            </div>
            <div className="character">
              <div className="face">
                <div className="eyes">
                  <div className="eye"></div>
                  <div className="eye"></div>
                </div>
                <div className="nose"></div>
                <div className="mouth"></div>
              </div>
              <div className="body">
                <div className="neck"></div>
                <div className="arms">
                  <div className="left-arm">
                    <div className="hand"></div>
                  </div>
                  <div className="right-arm">
                    <div className="hand"></div>
                  </div>
                </div>
                <div className="torso"></div>
                <div className="legs">
                  <div className="left-leg">
                    <div className="foot"></div>
                  </div>
                  <div className="right-leg">
                    <div className="foot"></div>
                  </div>
                </div>
                <h3>{props.user.user.name}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="valley-bottom">
          <div className="valley-bottom-left"></div>
          <div className="valley-bottom-middle"></div>
          <div className="valley-bottom-right"></div>
        </div>
      </div>
      <div className={`${failure ? "failure-card" : "failure-card-closed"}`}>
        <h1 className="card-title">Uh oh!</h1>
        <p className="card-paragraph">
          As you try to climb the moutain to the valley you hear a loud screech.
          You look up to see a griffin flying straight towards you. You'll need
          to find something to help you climb to the valley more quickly next
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
export default connect(mapStateToProps, { getUser })(Valley);
