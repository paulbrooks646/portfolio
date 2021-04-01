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
  

  const toggleRight = () => {
    setRight(!right);
    props.history.push("/Stables");
  };

  

  return (
    <div className="valley-main">
      <Nav />
      <div className="valley-body">
        <div className="valley-top">
          <div className="valley-top-left"></div>
          <div className="valley-top-middle"></div>
          <div className="valley-top-right"></div>
        </div>
        <div className="valley-middle">
          <div className="valley-middle-left"></div>
          <div className="valley-middle-middle"></div>
          <div className="valley-middle-right">
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
            <div className="valley-stables" onClick={toggleRight}>
              <h2>Stables</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="valley-bottom">
          <div className="valley-bottom-left"></div>
          <div className="valley-bottom-middle"></div>
          <div className="valley-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Valley);
