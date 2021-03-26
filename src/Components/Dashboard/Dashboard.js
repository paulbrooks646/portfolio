import React from "react";
import Nav from "../Nav/Nav"
import { connect } from "react-redux"
import { getUser } from "../../redux/userReducer"
import axios from "axios"
import "./Dashboard.scss"
import { Link } from "react-redux"


function Dashboard(props) {
  return (
    <div className="dashboard-main">
      <Nav />
      <div className="dashboard-body">
        <div className="dashboard-top">
          <div className="dashboard-top-right"></div>
          <div className="dashboard-top-middle"></div>
          <div className="dashboard-top-right"></div>
        </div>
        <div className="dashboard-middle">
          <div className="dashboard-middle-right"></div>
          <div className="dashboard-middle-middle"></div>
          <div className="dashboard-middle-right"></div>
        </div>
        <div className="dashboard-bottom">
          <div className="dashboard-bottom-left"></div>
          <div className="dashboard-bottom-middle"></div>
          <div className="dashboard-middle-right"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Dashboard);