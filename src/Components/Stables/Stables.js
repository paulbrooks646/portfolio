import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Stables.scss";
import { Link } from "react-redux";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Horse from "../../Images/Horse.jpg";
import Stable from "../../Images/Stables.jpg";
import Cowboy from "../../Images/Cowboy.jpg";

function Stables(props) {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);

  const toggleLeft = () => {
    setLeft(!left);
    props.history.push("/Valley");
  };

  const toggleRight = () => {
    setRight(!right);
    props.history.push("/Town");
  };
  return (
    <div className="stables-main">
      <Nav />
      <div className="stables-body">
        <div className="stables-top">
          <div className="stables-top-left">
            <img src={Horse} alt="horse" className="stables-horse" />
          </div>
          <div className="stables-top-middle">
            <img src={Cowboy} alt="cowboy" className="stables-cowboy" />
          </div>
          <div className="stables-top-right">
            <img src={Stable} alt="stables" className="stables-stables" />
          </div>
        </div>
        <div className="stables-middle">
          <div className="stables-middle-left">
            <div className="stables-valley" onClick={toggleLeft}>
              <ArrowBack />
              <h2>Valley</h2>
            </div>
          </div>
          <div className="stables-middle-middle"></div>
          <div className="stables-middle-right">
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
            <div className="stables-town" onClick={toggleRight}>
              <h2>Town</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="stables-bottom">
          <div className="stables-bottom-left"></div>
          <div className="stables-bottom-middle"></div>
          <div className="stables-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Stables);
