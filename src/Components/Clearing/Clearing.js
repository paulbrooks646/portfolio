import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import "./Clearing.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import { getInventory } from "../../redux/inventoryReducer";

function Clearing(props) {
  const [downCharacter, setDownCharacter] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false)
  const [rejectionCard, setRejectionCard] = useState(false)
  const [clearingData, setClearingData] = useState()

  useEffect(() => {
    axios.get("/api/clearing").then((res) => {
      setClearingData(res.data[0]);

      setDownCharacter(true);

      setIsLoading(false);
    });
  }, []);
  const toggleInventoryOpen = () => setInentoryOpen(!inventoryOpen);

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
          setCastleData(res.data[0]);
          setFluteCard(true);
        });
      } else {
        setRejectionCard(true);
      }
    }
  };

  const toggleDown = () => {
    axios.post("/api/changeLast", { last: "clearing" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Maze");
      });
    });
  };

  const toggleFirst = () => {
    axios.post("/api/clearingFirst").then((res) => {
      setClearingData(res.data[0]);
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
      <Nav />
      <div className="clearing-body">
        <div className="clearing-top">
          <div className="clearing-top-left"></div>
          <div className="clearing-top-middle"></div>
          <div className="clearing-top-right"></div>
        </div>
        <div className="clearing-middle">
          <div className="clearing-middle-left"></div>
          <div className="clearing-middle-middle"></div>
          <div className="clearing-middle-right"></div>
        </div>
        <div className="clearing-bottom">
          <div className="clearing-bottom-left"></div>
          <div className="clearing-bottom-middle">
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
            <div className="clearing-maze" onClick={toggleGoDown}>
              <h2>Maze</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="clearing-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getInventory })(
  Clearing
);
