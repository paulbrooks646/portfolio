import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Castle.scss";
import { Link } from "react-redux";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Character from "../Character/Character"

function Castle(props) {

  const [up, setUp] = useState(false)
  const [left, setLeft] = useState(false)
  const [right, setRight] = useState(false)
  const [down, setDown] = useState(false)

  const toggleUp = () => {
    setUp(!up)
    props.history.push("/Throne")
  }
  const toggleLeft = () => {
    setLeft(!left)
    props.history.push("/Garden")
  }

  const toggleRight = () => {
    setRight(!right)
    props.history.push("/Tower")
  }
  const toggleDown = () => {
    setDown(!down)
    props.history.push("/Town")
  }

  return (
    <div className="castle-main">
      <Nav />
      <div className="castle-body">
        <div className="castle-top">
          <div className="castle-top-left"></div>
          <div className="castle-top-middle">
            <div className="castle-throne" onClick={toggleUp}>
              <ArrowUpward />
              <h2>Throne Room</h2>
            </div>
          </div>
          <div className="castle-top-right"></div>
        </div>
        <div className="castle-middle">
          <div className="castle-middle-left">
            <div className="castle-garden" onClick={toggleLeft}>
              <ArrowBack />
              <h2>Royal Garden</h2>
            </div>
          </div>
          <div className="castle-middle-middle"><Character/></div>
          <div className="castle-middle-right">
            <div className="castle-tower" onClick={toggleRight}>
              <h2>Tower</h2>
              <ArrowForward />
            </div>
            
          </div>
        </div>
        <div className="castle-bottom">
          <div className="castle-bottom-left"></div>
          <div className="castle-bottom-middle">
            <div className="castle-town" onClick={toggleDown}>
              <h2>Town</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="castle-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Castle);
