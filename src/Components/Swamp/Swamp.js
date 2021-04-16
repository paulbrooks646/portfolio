import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Swamp.scss";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Character from "../Character/Character"
import Loading from "../Loading/Loading"

function Swamp(props) {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  const toggleLeft = () => {
    setLeft(!left);
    props.history.push("/Forest");
  };

  const toggleRight = () => {
    props.history.push("/Bog")
  }

  return (
    <div className="swamp-main">
      <Nav />
      <div className="swamp-body">
        <div className="swamp-top">
          <div className="swamp-top-left"></div>
          <div className="swamp-top-middle"></div>
          <div className="swamp-top-right"></div>
        </div>
        <div className="swamp-middle">
          <div className="swamp-middle-left">
            <div className="swamp-forest" onClick={toggleLeft}>
              <ArrowBack />
              <h2>Forest</h2>
            </div>
            <Character />
          </div>
          <div className="swamp-middle-middle">
            <div className="goblin-open"></div>
          </div>
          <div className="swamp-middle-right">
            <div className="swamp-bog" onClick={toggleRight}>
              <h2>Bog</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="swamp-bottom">
          <div className="swamp-bottom-left"></div>
          <div className="swamp-bottom-middle"></div>
          <div className="swamp-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Swamp);
