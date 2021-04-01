import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Market.scss";
import { Link } from "react-redux";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Blacksmith from "../../Images/Blacksmith.jpg";
import Store from "../../Images/General.jpg";

function Market(props) {

  const [left, setLeft] = useState(false)

  const toggleLeft = () => {
    setLeft(!left)
    props.history.push("/Town")
  }
  const toggleBlack = () => {
    props.history.push("/Blacksmith");
  };

  const toggleGeneral = () => {
    props.history.push("/Store");
  };

  return (
    <div className="market-main">
      <Nav />
      <div className="market-body">
        <div className="market-top">
          <div className="market-top-left"></div>
          <div className="market-top-middle"></div>
          <div className="market-top-right"></div>
        </div>
        <div className="market-middle">
          <div className="market-middle-left">
            <div className="market-town" onClick={toggleLeft}>
              <ArrowBack />
              <h2>Town</h2>
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
          <div className="market-middle-middle"></div>
          <div className="market-middle-right"></div>
        </div>
        <div className="market-bottom">
          <div className="market-bottom-left">
            <div className="blacksmith-div" onClick={toggleBlack}>
              <img
                src={Blacksmith}
                alt="Blacksmith Shop"
                className="market-blacksmith"
              />
              <h2>Blacksmith</h2>
            </div>
          </div>
          <div className="market-bottom-middle"></div>
          <div className="market-bottom-right">
            <div className="store-div" onClick={toggleGeneral}>
              <img src={Store} alt="general store" className="market-store" />
              <h2>General Store</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Market);
