import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import {getCabin} from "../../redux/cabinReducer"
import axios from "axios";
import "./Cabin.scss";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Loading from "../Loading/Loading"
import Character from "../Character/Character";


function Cabin(props) {

  const [upCharacter, setUpCharacter] = useState(false);
  const [upUp, setUpUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {
     // if (!props.user.user.newgame) {
     //   setNewgameCard(false);

     // }
     axios.get("/api/cabin").then((res) => {
       props.getCabin(res.data[0]);
 setUpCharacter(true);
       
       setIsLoading(false);
     });
   }, []);


  const toggleUp = () => {
     axios.post("/api/changeLast", { last: "cabin" }).then((res) => {
       props.getUser(res.data).then(() => {
         props.history.push("/Pass");
       });
     });
  };

  const toggleGoUp = () => {
    setUpCharacter(false);
    setUpUp(true);
   
  };


  return (

    isLoading ? <Loading /> :
      
    <div className="cabin-main">
      <Nav />
      <div className="cabin-body">
        <div className="cabin-top">
          <div className="cabin-top-left">
            <div className="pine-tree"></div>
          </div>
          <div className="cabin-top-middle">
            <div className="cabin-home" onClick={toggleGoUp}>
              <ArrowUpward />
              <h2>Pass</h2>
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
          <div className="cabin-top-right">
            <div className="pine-tree"></div>
          </div>
        </div>
        <div className="cabin-middle">
          <div className="cabin-middle-left">
            <div className="cabin-cabin"></div>
          </div>
          <div className="cabin-middle-middle"></div>
          <div className="cabin-middle-right">
            <div className="pine-tree"></div>
          </div>
        </div>
        <div className="cabin-bottom">
          <div className="cabin-bottom-left">
            <div className="woodsman"></div>
          </div>
          <div className="cabin-bottom-middle"></div>
          <div className="cabin-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getCabin })(Cabin);
