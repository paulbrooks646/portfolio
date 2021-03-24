import React, { useEffect } from "react"
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux"
import { logoutUser, getUser } from "../../redux/userReducer"
import axios from "axios"
import "./Nav.scss"

function Nav(props) {

useEffect(() => {
  getUser();
}, []);

const logout = () => {
  axios.delete("/api/logout").then(() => {
    props.logoutUser();
    props.history.push("/Auth");
  });
};


    return (
        <div className="nav-main">
            <h2 className="nav-welcome">Welcome </h2>
            <button className="nav-logout" onClick={logout}>Logout</button>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState;

export default withRouter(
  connect(mapStateToProps, { logoutUser, getUser })(Nav)
);