import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Swamp.scss";
import { Link } from "react-redux";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowUpward from "@material-ui/icons/ArrowUpward";

function Swamp(props) {
  const [left, setLeft] = useState(false);

  const toggleLeft = () => {
    setLeft(!left);
    props.history.push("/Forest");
  };

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
            <div className="character">
              <div className="face">
                <div className="eyes">
                  <div className="eye"></div>
                  <div className="eye"></div>
                </div>
                <div className="nose"></div>
                <div className="mouth"></div>
              </div>
              <div className="body">
                <div className="neck"></div>
                <div className="arms">
                  <div className="left-arm">
                    <div className="hand"></div>
                  </div>
                  <div className="right-arm">
                    <div className="hand"></div>
                  </div>
                </div>
                <div className="torso"></div>
                <div className="legs">
                  <div className="left-leg">
                    <div className="foot"></div>
                  </div>
                  <div className="right-leg">
                    <div className="foot"></div>
                  </div>
                </div>
                <h3>{props.user.user.name}</h3>
              </div>
            </div>
          </div>
          <div className="swamp-middle-middle"></div>
          <div className="swamp-middle-right">
            <div className="goblin-open"></div>
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
