import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Market.scss";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Blacksmith from "../../Images/Blacksmith.jpg";
import Store from "../../Images/General.jpg";
import Magic from "../../Images/MagicOutside.png";
import Grocer from "../../Images/Grocer.png";

function Market(props) {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);

  const toggleRight = () => {
    setRight(!right);
    props.history.push("/Alley");
  };

  const toggleLeft = () => {
    setLeft(!left);
    props.history.push("/Town");
  };
  const toggleBlack = () => {
    props.history.push("/Blacksmith");
  };

  const toggleGeneral = () => {
    props.history.push("/Store");
  };

  const toggleMagic = () => {
    props.history.push("/Magic");
  };

  const toggleGrocer = () => {
    props.history.push("/Grocer");
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
          </div>
          <div className="market-middle-middle"></div>
          <div className="market-middle-right">
            <div className="market-alley" onClick={toggleRight}>
              <h2>Alley</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="market-bottom">
          <div className="blacksmith-div" onClick={toggleBlack}>
            <img
              src={Blacksmith}
              alt="Blacksmith Shop"
              className="market-blacksmith"
            />
            <h2>Blacksmith</h2>
          </div>
          <div className="magic-store-div" onClick={toggleMagic}>
            <img src={Magic} alt="magic store" className="market-magic" />
            <h2>Magic Shop</h2>
          </div>
          <div className="grocer-div" onClick={toggleGrocer}>
            <img src={Grocer} className="market-grocer" alt="grocer" />
            <h2>Grocer</h2>
          </div>

          <div className="store-div" onClick={toggleGeneral}>
            <img src={Store} alt="general store" className="market-store" />
            <h2>General Store</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Market);
