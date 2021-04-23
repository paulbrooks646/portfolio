import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getGlade } from "../../redux/gladeReducer";
import axios from "axios";
import "./Glade.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowUpward from "@material-ui/icons/ArrowUpward"
import { getInventory } from "../../redux/inventoryReducer";

function Glade(props) {
 const [answerOne, setAnswerOne] = useState(false);
 const [answerTwo, setAnswerTwo] = useState(false);
 const [answerThree, setAnswerThree] = useState(false);
 const [answerFour, setAnswerFour] = useState(false);
 const [answerFive, setAnswerFive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [upCharacter, setUpCharacter] = useState(false)
  const [rightCharacter, setRightCharacter] = useState(false)
  const [rightUp, setRightUp] = useState(false)
  const [rightRight, setRightRight] = useState(false)
  const [upUp, setUpUp] = useState(false)
  const [upRight, setUpRight] = useState(false)

 useEffect(() => {
   // if (!props.user.user.newgame) {
   //   setNewgameCard(false);

   // }
   axios.get("/api/nest").then((res) => {
     props.getGlade(res.data[0]);

     if (props.user.user.last === "valley") {
       setRightCharacter(true);
     } else if (props.user.user.last === "maze") {
       setUpCharacter(true);
     }
     setIsLoading(false);
   });
 }, []);

  const toggleRight = () => {
    axios.post("/api/changeLast", { last: "glade" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Valley");
      });
    });
  };

   const toggleUp = () => {
     axios.post("/api/changeLast", { last: "glade" }).then((res) => {
       props.getUser(res.data).then(() => {
         props.history.push("/Maze");
       });
     });
   };



  const toggleGoRight = () => {
    if (props.user.user.last === "valley") {
      setRightCharacter(false);
      setRightRight(true);
    } else if (props.user.user.last === "maze") {
      setUpCharacter(false);
      setUpRight(true);
    }
  };

const toggleGoUp = () => {
   if (props.user.user.last === "valley") {
    setRightCharacter(false);
    setRightUp(true);
  } else if (props.user.user.last === "maze") {
    setUpCharacter(false);
    setUpUp(true);
  }
};

  

  return isLoading ? (
    <Loading />
  ) : (
    <div className="glade-main">
      <Nav />
      <div className="glade-body">
        <div className="glade-top">
          <div className="glade-top-left"></div>
          <div className="glade-top-middle">
            <div className="glade-maze" onClick={toggleGoUp}>
              <ArrowUpward />
              <h2>Maze</h2>
            </div>
            <div
              className={`${
                upCharacter ? "character-up" : "character-up-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${upUp ? "up-up" : "up-up-closed"}`}
              onAnimationEnd={toggleUp}
            >
              <Character />
            </div>
            <div
              className={`${upRight ? "up-right" : "up-right-closed"}`}
              onAnimationEnd={toggleRight}
            >
              <Character />
            </div>
          </div>
          <div className="glade-top-right"></div>
        </div>
        <div className="glade-middle">
          <div className="glade-middle-left">
            <div className="unicorn"></div>
            </div>
            <div className="glade-middle-middle"></div>
          <div className="glade-middle-right">
            <div
              className={`${
                rightCharacter ? "character-right" : "character-right-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${rightUp ? "right-up" : "right-up-closed"}`}
              onAnimationEnd={toggleUp}
            >
              <Character />
            </div>
            <div
              className={`${rightRight ? "right-right" : "right-right-closed"}`}
              onAnimationEnd={toggleRight}
            >
              <Character />
            </div>
            <div className="glade-valley" onClick={toggleGoRight}>
              <h2>Valley</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="glade-bottom">
          <div className="glade-bottom-left"></div>
          <div className="glade-bottom-middle"></div>
          <div className="glade-bottom-right"></div>
        </div>
      </div>
     
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getGlade, getInventory })(
  Glade
);
