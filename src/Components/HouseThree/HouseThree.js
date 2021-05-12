import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./HouseThree.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

function HouseThree(props) {
  const [downCharacter, setDownCharacter] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false)
  const [inventoryOpen, setInventoryOpen] = useState(false)
  const [houseThreeData, setHouseThreeData] = useState()

  useEffect(() => {
    axios.get("/api/houseThree").then((res) => {
      setHouseThreeData(res.data[0]);
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
          setHouseThreeData(res.data[0]);
          setFluteCard(true);
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
    axios.post("/api/houseThreeFirst").then((res) => {
      setHouseThreeData(res.data[0]);
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
      <div className="houseThree-body">
        <div className="houseThree-top">
          <div className="houseThree-top-left">
            <div className="table">
              <div className="paper"></div>
            </div>
          </div>
          <div className="houseThree-top-middle"></div>
          <div className="houseThree-top-right">
            <div className="cupboard"></div>
          </div>
        </div>
        <div className="houseThree-middle">
          <div className="houseThree-middle-left"></div>
          <div className="houseThree-middle-middle">
            <div className="dog"></div>
          </div>
          <div className="houseThree-middle-right"></div>
        </div>
        <div className="houseThree-bottom">
          <div className="houseThree-bottom-left">
            <div className="rug"></div>
          </div>
          <div className="houseThree-bottom-middle">
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
            <div className="houseThree-town" onClick={toggleGoDown}>
              <h2>EXIT</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="houseThree-bottom-right">
            <div className="shovel"></div>
          </div>
        </div>
      </div>
      {/* <Card
        className={`${
          houseThreeData.first_time
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
          houseThree. You look around tenatively for the owner of the houseThree.
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
  HouseThree
);
