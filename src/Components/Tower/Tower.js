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
import Character from "../Character/Character";

function Tower(props) {
  const [left, setLeft] = useState(false);

  const toggleLeft = () => {
    setLeft(!left);
    props.history.push("/Castle");
  };
  return (
    <div className="tower-main">
      <Nav />
      <div className="tower-body">
        <div className="tower-top">
          <div className="tower-top-left">
            <div className="tower-top-left-up"></div>
            <div className="tower-top-left-down">
              <div className="tower-castle" onClick={toggleLeft}>
                <ArrowBack />
                <h2>Castle</h2>
              </div>
              <Character />
            </div>
          </div>

          <div className="tower-top-right"></div>
        </div>

        <div className="tower-bottom">
          <div className="tower-bottom-left"></div>
          <div className="tower-bottom-middle">
            <div className="tower-bottom-middle-up"></div>
            <div className="tower-bottom-middle-down"></div>
          </div>
          <div className="tower-bottom-right">
            <div className="tower-bottom-right-up"></div>
            <div className="tower-bottom-right-down"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Tower);
