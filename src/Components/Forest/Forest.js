import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Forest.scss";
import { Link } from "react-redux";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowUpward from "@material-ui/icons/ArrowUpward";

function Forest(props) {
  return (
    <div className="forest-main">
      <Nav />
      <div className="forest-body">
        <div className="forest-top">
          <div className="forest-top-left"></div>
          <div className="forest-top-middle">
            <div className="forest-town">
              <ArrowUpward />
              <h2>Nest</h2>
            </div>
          </div>
          <div className="forest-top-right"></div>
        </div>
        <div className="forest-middle">
          <div className="forest-middle-left"></div>
          <div className="forest-middle-middle"></div>
          <div className="forest-middle-right">
            <div className="forest-entrance">
              <h2>Entrance</h2>
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
        <div className="forest-bottom">
          <div className="forest-bottom-left"></div>
          <div className="forest-bottom-middle">
            <div className="forest-crag">
              <h2>Crag</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="forest-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Forest);
