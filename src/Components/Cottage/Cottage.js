import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Cottage.scss";
import { Link } from "react-redux";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import House from "../../Images/House.jpg";
import Character from "../Character/Character";


function Cottage(props) {
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
    props.history.push("/Cave");
  };

  const toggleDown = () => {
    setDown(!down);
    props.history.push("/Dashboard");
  };

  const toggleHouseFive = () => {
    props.history.push("/HouseFive")
  }

  return (
    <div className="cottage-main">
      <Nav />
      <div className="cottage-body">
        <div className="cottage-top">
          <div className="cottage-top-left"></div>
          <div className="cottage-top-middle">
            <div className="cottage-home" onClick={toggleUp}>
              <ArrowUpward />
              <h2>Cave</h2>
            </div>
            <Character />
          </div>
          <div className="cottage-top-right"></div>
        </div>
        <div className="cottage-middle">
          <div className="cottage-middle-left"></div>
          <div className="cottage-middle-middle"></div>
          <div className="cottage-middle-right"></div>
        </div>
        <div className="cottage-bottom">
          <div className="cottage-bottom-left"></div>
          <div className="cottage-bottom-middle"></div>
          <div className="cottage-bottom-right">
            <ArrowUpward id="arrow-up" onClick={toggleHouseFive}/>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Cottage);
