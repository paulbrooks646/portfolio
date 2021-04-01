import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Blacksmith.scss";
import { Link } from "react-redux";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowUpward from "@material-ui/icons/ArrowUpward";

function Blacksmith(props) {

  const [exit, setExit] = useState(false)

  const toggleExit = () => {
    setExit(!exit)
    props.history.push("/Market")
  }
  return (
    <div className="blacksmith-main">
      <Nav />
      <div className="blacksmith-body">
        <div className="blacksmith-card">
          <button className="blacksmith-button" onClick={toggleExit}>EXIT SHOP</button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Blacksmith);
