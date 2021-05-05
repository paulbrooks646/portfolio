import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getCottage } from "../../redux/cottageReducer"
import {getInventory} from "../../redux/inventoryReducer"
import axios from "axios";
import "./Cottage.scss";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";


function Cottage(props) {
  
   const [upCharacter, setUpCharacter] = useState(false);
   const [upUp, setUpUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // if (!props.user.user.newgame) {
    //   setNewgameCard(false);

    // }
    axios.get("/api/cottage").then((res) => {
      props.getCottage(res.data[0]);
      setUpCharacter(true);

      setIsLoading(false);
    });
  }, []);


  const toggleUp = () => {
    axios.post("/api/changeLast", { last: "cottage" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Cave");
      });
    });
  };

   const toggleGoUp = () => {
     setUpCharacter(false);
     setUpUp(true);
   };

  const toggleHouseFive = () => {
    props.history.push("/HouseFive")
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div className="main">
      <Nav />
      <div className="cottage-body">
        <div className="cottage-top">
          <div className="cottage-top-left"></div>
          <div className="cottage-top-middle">
            <div className="cottage-home" onClick={toggleGoUp}>
              <ArrowUpward />
              <h2>Cave</h2>
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
          <div className="cottage-top-right"></div>
        </div>
        <div className="cottage-middle">
          <div className="cottage-middle-left"></div>
          <div className="cottage-middle-middle"></div>
          <div className="cottage-middle-right"></div>
        </div>
        <div className="cottage-bottom">
          <div className="cottage-bottom-left"></div>
          <div className="cottage-bottom-middle"></div>
          <div className="cottage-bottom-right">
            <ArrowUpward id="arrow-up" onClick={toggleHouseFive} />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getCottage, getInventory })(Cottage);
