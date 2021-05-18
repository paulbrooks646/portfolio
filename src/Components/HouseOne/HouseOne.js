import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./HouseOne.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import House from "../House/House";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

function HouseOne(props) {
  const [downCharacter, setDownCharacter] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [houseOneData, setHouseOneData] = useState();

  useEffect(() => {
    axios.get("/api/nest").then((res) => {
      setHouseOneData(res.data[0]);
      setDownCharacter(true);
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
      <House />
      <div className="houseOne-middle-left"></div>
      <div className="houseOne-middle-middle">
        <div className="dog">
          <div className="dog-top">
            <div className="dog-left-ear"></div>
            <div className="dog-face">
              <div className="dog-eye-div">
                <div className="dog-eye">
                  <div className="dog-pupil"></div>
                </div>
                <div className="dog-eye">
                  <div className="dog-pupil"></div>
                </div>
              </div>
              <div className="dog-nose"></div>
              <div className="dog-smile">
                <div className="dog-mouth"></div>
                <div className="dog-tongue">
                  <div className="tongue-line"></div>
                </div>
              </div>
            </div>
            <div className="dog-right-ear"></div>
          </div>
          <div className="dog-bottom">
            <div className="dog-body">
              <div className="dog-torso"></div>
              <div className="dog-leg-div">
                <div className="dog-leg-one">
                  <div className="dog-paw"></div>
                </div>
                <div className="dog-leg-two">
                  <div className="dog-paw"></div>
                </div>
                <div className="dog-leg-one">
                  <div className="dog-paw"></div>
                </div>
                <div className="dog-leg-two">
                  <div className="dog-paw"></div>
                </div>
              </div>
            </div>
            <div className="dog-tail"></div>
          </div>
        </div>
      </div>
      <div className="houseOne-middle-right"></div>
      <div className="houseOne-bottom-left"></div>
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
        <div className="houseOne-cottage" onClick={toggleGoDown}>
          <h2>EXIT</h2>
          <ArrowDownward />
        </div>
      </div>
      <div className="houseOne-bottom-right">
        <div className="shovel">
          <div className="shovel-top"></div>
          <div className="shovel-handle"></div>
        </div>
      </div>
      <Card
        className={`${rejectionCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          That item is either not useful here or not useful here yet.
        </Typography>
        <Button
          onClick={() => setRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
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
export default connect(mapStateToProps, { getUser, getInventory, logoutUser })(
  HouseOne
);
