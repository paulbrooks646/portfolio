import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getDragon } from "../../redux/dragonReducer"
import {getInventory} from "../../redux/inventoryReducer"
import axios from "axios";
import "./Dragon.scss";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Character from "../Character/Character";
import DragonPic from "../../Images/dragon.gif";
import Loading from "../Loading/Loading"

function Dragon(props) {

  const [isLoading, setIsLoading] = useState(true)
  const [upUp, setUpUp] = useState(false)
  const [upCharacter, setUpCharacter] = useState(false)

  useEffect(() => {
    // if (!props.user.user.newgame) {
    //   setNewgameCard(false);

    // }
    axios.get("/api/inventory").then((res) => {
      props.getInventory(res.data);
      setUpCharacter(true)
      setIsLoading(false);
    });
  }, []);

  const toggleUp = () => {
    axios.post("/api/changeLast", { last: "dragon" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Dashboard");
      });
    });
  };

  const toggleGoUp = () => {
      setUpCharacter(false);
      setUpUp(true);
    
   };

  return (

    isLoading ? <Loading/> :
    <div className="dragon-main">
      <Nav />
      <div className="dragon-body">
        <div className="dragon-top">
          <div className="dragon-top-left"></div>
          <div className="dragon-top-middle">
            <div className="dragon-home" onClick={toggleGoUp}>
              <ArrowUpward />
              <h2>Home</h2>
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
          </div>
          <div className="dragon-top-right"></div>
        </div>
        <div className="dragon-middle">
          <div className="dragon-middle-left"></div>
          <div className="dragon-middle-middle"></div>
          <div className="dragon-middle-right"></div>
        </div>
        <div className="dragon-bottom">
          <div className="dragon-bottom-left"></div>
          <div className="dragon-bottom-middle">
            <img src={DragonPic} alt="dragon" className="dragon-dragon" />
          </div>
          <div className="dragon-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getDragon, getInventory })(Dragon);
