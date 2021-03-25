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
      <Nav/>
      <h1>Dashboard</h1>
      <div className="dashboard-image" alt="goblin"/>
    </div>
  )
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Dashboard);