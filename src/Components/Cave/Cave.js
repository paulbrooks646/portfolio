import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Cave.scss";
import { Link } from "react-redux";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Loading from "../Loading/Loading";
import Character from "../Character/Character";

function Cave(props) {
  const [up, setUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleUp = () => {
    setUp(!up);
    props.history.push("/Forest");
  };

  return (
    <div className="cave-main">
      <Nav />
      <div className="cave-body">
        <div className="cave-top">
          <div className="cave-top-left"></div>
          <div className="cave-top-middle">
            <div className="cave-forest" onClick={toggleUp}>
              <ArrowUpward />
              <h2>Forest</h2>
              <Character/>
            </div>
          </div>
          <div className="cave-top-right"></div>
        </div>

        <div className="cave-bottom">
          <div className="cave-bottom-left">
            <div className="cave-wolf"></div>
          </div>
          <div className="cave-bottom-middle"></div>
          <div className="cave-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Cave);
