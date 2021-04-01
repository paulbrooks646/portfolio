import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Alley.scss";
import { Link } from "react-redux";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Character from "../Character/Character"

function Alley(props) {

  const [left, setLeft] = useState(false)
  
  const toggleLeft = () => {
    setLeft(!left)
    props.history.push("/Market")
  }



  return (
    <div className="alley-main">
      <Nav />
      <div className="alley-body">
        <div className="alley-top"></div>
        <div className="alley-middle">
          <div className="alley-middle-left">
            <div className="alley-market" onClick={toggleLeft}>
              <ArrowBack />
              <h2>Market</h2>
            </div>
            <Character/>
          </div>
          <div className="alley-middle-middle"></div>
          <div className="alley-middle-right"></div>
        </div>
        <div className="alley-bottom">
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Alley);
