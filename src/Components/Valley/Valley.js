import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getValley } from "../../redux/valleyReducer"
import {getInventory} from "../../redux/inventoryReducer"
import axios from "axios";
import "./Valley.scss";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Character from "../Character/Character"
import Loading from "../Loading/Loading"

function Valley(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [rightLeft, setRightLeft] = useState(false);
  const [leftLeft, setLeftLeft] = useState(false);
  const [rightRight, setRightRight] = useState(false);
  const [leftRight, setLeftRight] = useState(false);
  const [leftCharacter, setLeftCharacter] = useState(false);
  const [rightCharacter, setRightCharacter] = useState(false);

   useEffect(() => {
     // if (!props.user.user.newgame) {
     //   setNewgameCard(false);

     // }
     axios.get("/api/nest").then((res) => {
       props.getValley(res.data[0]);

       if (props.user.user.last === "glade") {
         setLeftCharacter(true);
       } else if (props.user.user.last === "stables") {
         setRightCharacter(true);
       }
       setIsLoading(false);
     });
   }, []);
  

 const toggleRight = () => {
   axios.post("/api/changeLast", { last: "valley" }).then((res) => {
     props.getUser(res.data).then(() => {
       props.history.push("/Stables");
     });
   });
 };

  const toggleLeft = () => {
    axios.post("/api/changeLast", { last: "valley" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Glade");
      });
    });
  };

   const toggleGoLeft = () => {
     if (props.user.user.last === "glade") {
       setLeftCharacter(false);
       setLeftLeft(true);
     } else if (props.user.user.last === "stables") {
       setRightCharacter(false);
       setRightLeft(true);
     }
  };
  
   const toggleGoRight = () => {
     if (props.user.user.last === "glade") {
       setLeftCharacter(false);
       setLeftRight(true);
     } else if (props.user.user.last === "stables") {
       setRightCharacter(false);
       setRightRight(true);
     }
   };

  

  return (
    <div className="valley-main">
      <Nav />
      <div className="valley-body">
        <div className="valley-top">
          <div className="valley-top-left">
            <div className="troll"></div>
          </div>
          <div className="valley-top-middle"></div>
          <div className="valley-top-right"></div>
        </div>
        <div className="valley-middle">
          <div className="valley-middle-left">
            <div className="valley-glade" onClick={toggleGoLeft}>
              <ArrowBack />
              <h2>Glade</h2>
            </div>
            <div
              className={`${
                leftCharacter ? "character-left" : "character-left-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${leftLeft ? "left-left" : "left-left-closed"}`}
              onAnimationEnd={toggleLeft}
            >
              <Character />
            </div>
            <div
              className={`${leftRight ? "left-right" : "left-right-closed"}`}
              onAnimationEnd={toggleRight}
            >
              <Character />
            </div>
          </div>
          <div className="valley-middle-middle"></div>
          <div className="valley-middle-right">
            <div
              className={`${
                rightCharacter ? "character-right" : "character-right-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${rightLeft ? "right-left" : "right-left-closed"}`}
              onAnimationEnd={toggleLeft}
            >
              <Character />
            </div>

            <div
              className={`${rightRight ? "right-right" : "right-right-closed"}`}
              onAnimationEnd={toggleRight}
            >
              <Character />
            </div>
            <div className="valley-stables" onClick={toggleGoRight}>
              <h2>Stables</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="valley-bottom">
          <div className="valley-bottom-left"></div>
          <div className="valley-bottom-middle"></div>
          <div className="valley-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getValley, getInventory })(Valley);
