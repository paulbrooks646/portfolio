import React from "react";
import Nav from "../Nav/Nav"
import { connect } from "react-redux"
import { getUser } from "../../redux/userReducer"
import axios from "axios"
import "./Dashboard.scss"
import { Link } from "react-redux"
import ArrowDownward from "@material-ui/icons/ArrowDownward"
import ArrowForward from "@material-ui/icons/ArrowForward"
import ArrowBack from "@material-ui/icons/ArrowBack"
import ArrowUpward from "@material-ui/icons/ArrowUpward"


function Dashboard(props) {
  return (
    <div className="dashboard-main">
      <Nav />
      <div className="dashboard-body">
        <div className="dashboard-top">
          <div className="dashboard-top-left"></div>
          <div className="dashboard-top-middle">
            <div className="dashboard-town">
              <ArrowUpward />
              <h2>Town</h2>
            </div>
          </div>
          <div className="dashboard-top-right"></div>
        </div>
        <div className="dashboard-middle">
          <div className="dashboard-middle-left">
            <div className="dashboard-mountains">
              <ArrowBack />
              <h2>Mountains</h2>
            </div>
          </div>
          <div className="dashboard-middle-middle"></div>
          <div className="dashboard-middle-right">
            <div className="dashboard-forest">
              <h2>Forest</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="dashboard-bottom">
          <div className="dashboard-bottom-left"></div>
          <div className="dashboard-bottom-middle"></div>
          <div className="dashboard-bottom-right"></div>
        </div>
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
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Dashboard);