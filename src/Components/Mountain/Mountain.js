import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Mountain.scss";
import { Link } from "react-redux";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowUpward from "@material-ui/icons/ArrowUpward";


function Mountain(props) {

    const [left, setLeft] = useState(false);
    const [right, setRight] = useState(false);
    const [down, setDown] = useState(false);

    const toggleRight = () => {
      setRight(!right);
      props.history.push("/Dashboard");
    };

    const toggleLeft = () => {
      setLeft(!left);
      props.history.push("/Nest");
    };

    const toggleDown = () => {
      setDown(!down);
      props.history.push("/Pass");
    };


    return (
      <div className="mountain-main">
        <Nav />
        <div className="mountain-body">
          <div className="mountain-top">
            <div className="mountain-top-left"></div>
            <div className="mountain-top-middle"></div>
            <div className="mountain-top-right"></div>
          </div>
          <div className="mountain-middle">
            <div className="mountain-middle-left">
              <div className="mountain-nest" onClick={toggleLeft}>
                <ArrowBack />
                <h2>Nest</h2>
              </div>
            </div>
            <div className="mountain-middle-middle"></div>
            <div className="mountain-middle-right">
              <div className="mountain-home" onClick={toggleRight}>
                <h2>Home</h2>
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
          <div className="mountain-bottom">
            <div className="mountain-bottom-left"></div>
            <div className="mountain-bottom-middle">
              <div className="mountain-crag" onClick={toggleDown}>
                <h2>Crag</h2>
                <ArrowDownward />
              </div>
            </div>
            <div className="mountain-bottom-right"></div>
          </div>
        </div>
      </div>
    );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Mountain);