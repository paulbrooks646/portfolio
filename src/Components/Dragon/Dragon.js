import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Dragon.scss";
import ArrowUpward from "@material-ui/icons/ArrowUpward";

import Character from "../Character/Character";
import DragonPic from "../../Images/dragon.gif";

function Dragon(props) {
  const toggleUp = () => {
    axios.post("/api/changeLast", { last: "dragon" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Dashboard");
      });
    });
  };

  return (
    <div className="dragon-main">
      <Nav />
      <div className="dragon-body">
        <div className="dragon-top">
          <div className="dragon-top-left"></div>
          <div className="dragon-top-middle">
            <div className="dragon-home" onClick={toggleUp}>
              <ArrowUpward />
              <h2>Home</h2>
            </div>
            <Character />
          </div>
          <div className="dragon-top-right"></div>
        </div>
        <div className="dragon-middle">
          <div className="dragon-middle-left"></div>
          <div className="dragon-middle-middle"></div>
          <div className="dragon-middle-right"></div>
        </div>
        <div className="dragon-bottom">
          <div className="dragon-bottom-left"></div>
          <div className="dragon-bottom-middle">
            <img src={DragonPic} alt="dragon" className="dragon-dragon" />
          </div>
          <div className="dragon-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Dragon);
