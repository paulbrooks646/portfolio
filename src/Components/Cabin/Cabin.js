import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Cabin.scss";
import { Link } from "react-redux";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import House from "../../Images/House.jpg";
import Character from "../Character/Character";


function Cabin(props) {
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
    props.history.push("/Pass");
  };

  const toggleDown = () => {
    setDown(!down);
    props.history.push("/Dashboard");
  };

  return (
    <div className="cabin-main">
      <Nav />
      <div className="cabin-body">
        <div className="cabin-top">
          <div className="cabin-top-left"></div>
          <div className="cabin-top-middle">
            <div className="cabin-home" onClick={toggleUp}>
              <ArrowUpward />
              <h2>Pass</h2>
            </div>
            <Character />
          </div>
          <div className="cabin-top-right"></div>
        </div>
        <div className="cabin-middle">
          <div className="cabin-middle-left"><div className="cabin-cabin"></div></div>
          <div className="cabin-middle-middle"></div>
          <div className="cabin-middle-right"></div>
        </div>
        <div className="cabin-bottom">
          <div className="cabin-bottom-left"><div className="woodsman"></div></div>
          <div className="cabin-bottom-middle">
          </div>
          <div className="cabin-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Cabin);
