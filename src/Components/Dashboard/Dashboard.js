import React from "react";
import Nav from "../Nav/Nav"
import { connect } from "react-redux"
import { getUser } from "../../redux/userReducer"
import axios from "axios"
import "./Dashboard.scss"
import { Link } from "react-redux"


function Dashboard(props) {
  return (
    <div>
      <Nav/>
      <h1>Dashboard</h1>
    </div>
  )
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser })(Dashboard);