import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Town.scss";
import { Link } from "react-redux";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import House from "../../Images/House.jpg";
import Character from "../Character/Character"

function Town(props) {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);

  const toggleRight = () => {
    setRight(!right);
    props.history.push("/Market");
  };

  const toggleLeft = () => {
    setLeft(!left);

    props.history.push("/Stables");
  };

  const toggleUp = () => {
    setUp(!up);
    props.history.push("/Castle");
  };

  const toggleDown = () => {
    setDown(!down);
    props.history.push("/Dashboard");
  };

  return (
    <div className="town-main">
      <Nav />
      <div className="town-body">
        <div className="town-top">
          <div className="town-top-left">
            <img src={House} alt="house" className="town-house" />
          </div>
          <div className="town-top-middle">
            <div className="town-castle" onClick={toggleUp}>
              <ArrowUpward />
              <h2>Castle</h2>
            </div>
          </div>
          <div className="town-top-right">
            <img src={House} alt="house" className="town-house" />
          </div>
        </div>
        <div className="town-middle">
          <div className="town-middle-left">
            <div className="town-stables" onClick={toggleLeft}>
              <ArrowBack />
              <h2>Stables</h2>
            </div>
          </div>
          <div className="town-middle-middle"></div>
          <div className="town-middle-right">
            <div className="town-market" onClick={toggleRight}>
              <h2>Market</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="town-bottom">
          <div className="town-bottom-left">
            <img src={House} alt="house" className="town-house" />
          </div>
          <div className="town-bottom-middle">
            <Character/>
            <div className="town-dashboard" onClick={toggleDown}>
              <h2>Home</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="town-bottom-right">
            <img src={House} alt="house" className="town-house" />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Town);
