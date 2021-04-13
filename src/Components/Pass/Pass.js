import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import {getPass} from "../../redux/passReducer"
import axios from "axios";
import "./Pass.scss";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";

function Pass(props) {

  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false)

  const toggleUp = () => {
    setUp(!up)
    props.history.push("/Mountain")
  }
  return (
    <div className="pass-main">
      <Nav />
      <div className="pass-body">
        <div className="pass-top">
          <div className="pass-top-left"></div>
          <div className="pass-top-middle">
            <div className="pass-mountain" onClick={toggleUp}>
              <ArrowUpward />
              <h2>Mountains</h2>
            </div>
          </div>
          <div className="pass-top-right"></div>
        </div>
        <div className="pass-middle">
          <div className="pass-middle-left"></div>
          <div className="pass-middle-middle"></div>
          <div className="pass-middle-right"></div>
        </div>
        <div className="pass-bottom">
          <div className="pass-bottom-left"></div>
          <div className="pass-bottom-middle">
            <div className="pass-cabin" onClick={toggleUp}>
              <h2>Cabin</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="pass-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Pass);
