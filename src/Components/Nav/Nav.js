import React, { useEffect, useState } from "react";
import {  withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Nav.scss";
import BusinessCenter from "@material-ui/icons/BusinessCenter";


function Nav(props) {
  const [inventoryOpen, setInentoryOpen] = useState(false);
  const [inventoryList, setInventoryList] = useState([]);
  

  useEffect(() => {
    getUser();
    
  }, []);

  const toggleInventoryOpen = () => setInentoryOpen(!inventoryOpen);

  const logout = () => {
    axios.delete("/api/logout").then(() => {
      props.logoutUser();
      props.history.push("/Auth");
    });
  };

  

  // const mapInventoryList = props.inventory[0].map((e, index) => {
  //   return <h4 key={index}>{e}</h4>;
  // });

  return (

    <div className="nav-main">
      <div className="inventory-div">
        <BusinessCenter
          className="inventory-icon"
          onClick={toggleInventoryOpen}
        />
        <div
          className={`${inventoryOpen ? "inventory-open" : "inventory-closed"}`}
        >
          {/* {mapInventoryList} */}
        </div>
      </div>

      <h2 className="nav-welcome">{props.user.user.name}'s Quest</h2>
      <div className="coin-div"><h3>{`Coins: ${props.user.user.coins}`}</h3></div>
      <button className="nav-logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;

export default withRouter(
  connect(mapStateToProps, { logoutUser, getUser, getInventory })(Nav)
);
