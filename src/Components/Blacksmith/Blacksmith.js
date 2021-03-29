import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Blacksmith.scss";
import { Link } from "react-redux";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowUpward from "@material-ui/icons/ArrowUpward";

function Blacksmith(props) {
  return (
    <div className="blacksmith-main">
      <Nav />
      <div className="blacksmith-body">
        <div className="blacksmith-top">
          <div className="blacksmith-top-left"></div>
          <div className="blacksmith-top-middle">
            <div className="blacksmith-town">
              <ArrowUpward />
              <h2>Nest</h2>
            </div>
          </div>
          <div className="blacksmith-top-right"></div>
        </div>
        <div className="blacksmith-middle">
          <div className="blacksmith-middle-left"></div>
          <div className="blacksmith-middle-middle"></div>
          <div className="blacksmith-middle-right">
            <div className="blacksmith-entrance">
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
        <div className="blacksmith-bottom">
          <div className="blacksmith-bottom-left"></div>
          <div className="blacksmith-bottom-middle">
            <div className="blacksmith-crag">
              <h2>Crag</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="blacksmith-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Blacksmith);
