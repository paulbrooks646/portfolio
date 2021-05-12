import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import {getInventory} from "../../redux/inventoryReducer"
import axios from "axios";
import "./HouseOne.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

function HouseOne(props) {

  const [downCharacter, setDownCharacter] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false)
  const [inventoryOpen, setInventoryOpen] = useState(false)
  const [houseOneData, setHouseOneData] = useState()

  useEffect(() => {
    
    axios.get("/api/houseOne").then((res) => {
      setHouseOneData(res.data[0]);
      setDownCharacter(true)
      setIsLoading(false);
    });
  }, []);

  const toggleInventoryOpen = () => setInventoryOpen(!inventoryOpen);

  const logout = () => {
    axios.delete("/api/logout").then(() => {
      props.logoutUser();
      props.history.push("/Auth");
    });
  };

  const inventoryList = props.inventory.inventory.map((e, index) => {
    return (
      <h4 key={index} className="nav-list-item" onClick={() => toggleItem(e)}>
        {e}
      </h4>
    );
  });

  const toggleItem = (item) => {
    if (item === "flute") {
      if (props.location.pathname === "/Tower") {
        axios.post("/api/useFlute").then((res) => {
          setHouseOneData(res.data[0]);
          ;
        });
      } else {
        setRejectionCard(true);
      }
    }
  };

  const toggleDown = () => {
    axios.post("/api/changeLast", { last: "home" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Town");
      });
    });
  };

  const toggleFirst = () => {
    axios.post("/api/houseOneFirst").then((res) => {
      setHouseOneData(res.data[0]);
    });
  };

   const toggleGoDown = () => {
     setDownDown(true);
     setDownCharacter(false);
   };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="main">
      <div className="nav-main">
        <div className="inventory-div">
          <BusinessCenter
            className="inventory-icon"
            onClick={toggleInventoryOpen}
          />
          <div
            className={`${
              inventoryOpen ? "inventory-open" : "inventory-closed"
            }`}
          >
            {inventoryList}
          </div>
        </div>
        <h2 className="nav-welcome">{props.user.user.name}'s Quest</h2>
        <div className="coin-div">
          <h3>{`Coins: ${props.user.user.coins}`}</h3>
        </div>
        <button className="nav-logout" onClick={logout}>
          Logout
        </button>
      </div>
      <div className="houseOne-body">
        <div className="houseOne-top">
          <div className="houseOne-top-left">
            <div className="table">
              <div className="paper"></div>
            </div>
          </div>
          <div className="houseOne-top-middle"></div>
          <div className="houseOne-top-right">
            <div className="cupboard"></div>
          </div>
        </div>
        <div className="houseOne-middle">
          <div className="houseOne-middle-left"></div>
          <div className="houseOne-middle-middle">
            <div className="dog"></div>
          </div>
          <div className="houseOne-middle-right"></div>
        </div>
        <div className="houseOne-bottom">
          <div className="houseOne-bottom-left">
            <div className="rug"></div>
          </div>
          <div className="houseOne-bottom-middle">
            <div
              className={`${
                downCharacter ? "character-down" : "character-down-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${downDown ? "down-down" : "down-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
            <div className="houseOne-town" onClick={toggleGoDown}>
              <h2>EXIT</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="houseOne-bottom-right">
            <div className="shovel"></div>
          </div>
        </div>
      </div>
      {/* <Card
        className={`${
          houseOneData.first_time
            ? "answer-card"
            : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You climb the steep cliff. Up ahead you see the massive Griffin's
          houseOne. You look around tenatively for the owner of the houseOne.
        </Typography>
        <Button
          onClick={toggleFirst}
          className="forest-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card> */}
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getInventory })(
  HouseOne
);
