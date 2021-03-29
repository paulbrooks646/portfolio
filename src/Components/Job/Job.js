import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Job.scss";
import { Link } from "react-redux";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowUpward from "@material-ui/icons/ArrowUpward";

function Job(props) {
  return (
    <div className="job-main">
      <Nav />
      <div className="job-body">
        <div className="job-top">
          <div className="job-top-left"></div>
          <div className="job-top-middle">
            <div className="job-town">
              <ArrowUpward />
              <h2>Nest</h2>
            </div>
          </div>
          <div className="job-top-right"></div>
        </div>
        <div className="job-middle">
          <div className="job-middle-left"></div>
          <div className="job-middle-middle"></div>
          <div className="job-middle-right">
            <div className="job-entrance">
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
        <div className="job-bottom">
          <div className="job-bottom-left"></div>
          <div className="job-bottom-middle">
            <div className="job-crag">
              <h2>Crag</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="job-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Job);
