import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getCastle } from "../../redux/castleReducer"
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
  
   useEffect(() => {
     axios.get("/api/clearing").then((res) => {
       props.getCastle(res.data[0]);

       setDownCharacter(true);

       setIsLoading(false);
     });
   }, []);

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
    <div className="throne-main">
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
export default connect(mapStateToProps, { getUser, getInventory, getCastle })(Throne);
