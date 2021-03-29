import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Tower.scss";
import { Link } from "react-redux";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowUpward from "@material-ui/icons/ArrowUpward";

function Tower(props) {
  return (
    <div className="tower-main">
      <Nav />
      <div className="tower-body">
        <div className="tower-top">
          <div className="tower-top-left"></div>
          <div className="tower-top-middle">
            <div className="tower-town">
              <ArrowUpward />
              <h2>Nest</h2>
            </div>
          </div>
          <div className="tower-top-right"></div>
        </div>
        <div className="tower-middle">
          <div className="tower-middle-left"></div>
          <div className="tower-middle-middle"></div>
          <div className="tower-middle-right">
            <div className="tower-entrance">
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
        <div className="tower-bottom">
          <div className="tower-bottom-left"></div>
          <div className="tower-bottom-middle">
            <div className="tower-crag">
              <h2>Crag</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="tower-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Tower);
