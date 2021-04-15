import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Valley.scss";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Character from "../Character/Character"

function Valley(props) {
  const [right, setRight] = useState(false);
  const [left, setLeft] = useState(false);
  

  const toggleRight = () => {
    setRight(!right);
    props.history.push("/Stables");
  };

   const toggleLeft = () => {
     setLeft(!left);
     props.history.push("/Glade");
   };

  

  return (
    <div className="valley-main">
      <Nav />
      <div className="valley-body">
        <div className="valley-top">
          <div className="valley-top-left">
            <div className="troll"></div>
          </div>
          <div className="valley-top-middle"></div>
          <div className="valley-top-right"></div>
        </div>
        <div className="valley-middle">
          <div className="valley-middle-left">
            <div className="valley-glade" onClick={toggleLeft}>
              <ArrowBack />
              <h2>Glade</h2>
            </div>
          </div>
          <div className="valley-middle-middle"></div>
          <div className="valley-middle-right">
            <Character/>
            <div className="valley-stables" onClick={toggleRight}>
              <h2>Stables</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="valley-bottom">
          <div className="valley-bottom-left"></div>
          <div className="valley-bottom-middle"></div>
          <div className="valley-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Valley);
