import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Garden.scss";
import { Link } from "react-redux";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Character from "../Character/Character"

function Garden(props) {

  const [right, setRight] = useState(false)

  const toggleRight = () => {
    setRight(!right)
    props.history.push("/Castle")
  }
  return (
    <div className="garden-main">
      <Nav />
      <div className="garden-body">
        <div className="garden-top">
          <div className="garden-top-left"></div>
          <div className="garden-top-middle">
          </div>
          <div className="garden-top-right"></div>
        </div>
        <div className="garden-middle">
          <div className="garden-middle-left"></div>
          <div className="garden-middle-middle"></div>
          <div className="garden-middle-right">
            <Character/>
            <div className="garden-castle" onClick={toggleRight}>
              <h2>Castle</h2>
              <ArrowForward />
            </div>
            
          </div>
        </div>
        <div className="garden-bottom">
          <div className="garden-bottom-left"></div>
          <div className="garden-bottom-middle">
            
          </div>
          <div className="garden-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Garden);
