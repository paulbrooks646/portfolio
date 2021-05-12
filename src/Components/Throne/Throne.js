import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import {getInventory} from "../../redux/inventoryReducer"
import axios from "axios";
import "./Throne.scss";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Character from "../Character/Character"
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Loading from "../Loading/Loading"

function Throne(props) {

   const [isLoading, setIsLoading] = useState(false);
   const [answerOne, setAnswerOne] = useState(false);
   const [answerTwo, setAnswerTwo] = useState(false);
   const [answerThree, setAnswerThree] = useState(false);
   const [answerFour, setAnswerFour] = useState(false);
   const [rejectionCard, setRejectionCard] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
   const [downCharacter, setDownCharacter] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false)
  const [inventoryOpen, setInventoryOpen] = useState(false)
  const [throneData, setThroneData] = useState()
  
   useEffect(() => {
     axios.get("/api/clearing").then((res) => {
       setThroneData(res.data[0]);

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
          setThroneData(res.data[0]);
          setFluteCard(true);
        });
      } else {
        setRejectionCard(true);
      }
    }
  };

  const toggleDown = () => {
    axios.post("/api/changeLast", { last: "throne" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Castle");
      });
    });
  };

   const toggleGoDown = () => {
     setDownDown(true);
     setDownCharacter(false);
   };

  return (
    <div className="main">
      <Nav />
      <div className="throne-body">
        <div className="throne-top"></div>

        <div className="throne-bottom">
          <div className="throne-bottom-left"></div>
          <div className="throne-bottom-middle">
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
            <div className="throne-castle" onClick={toggleGoDown}>
              <h2>Castle</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="throne-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getInventory })(Throne);
