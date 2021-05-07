import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getCottage } from "../../redux/cottageReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Cottage.scss";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";

function Cottage(props) {
  const [upCharacter, setUpCharacter] = useState(false);
  const [upUp, setUpUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [laserRejectionCard, setLaserRejectionCard] = useState(false)
  const [bramblesRejectionCard, setBramblesRejectionCard] = useState(false)
  const [podRejectionCard, setPodRejectionCard] = useState(false)
  const [purseCard, setPurseCard] = useState(false)
  const [coinCard, setCoinCard] = useState(false)
  const [podCard, setPodCard] = useState(false)
  const [levitationCard, setLevitationCard] = useState(false)
  const [invisibilityCard, setInvisibilityCard] = useState(false)
  const [laserCard, setLaserCard] = useState(false)
  const [brambleCard, setBrambleCard] = useState(false)
  const [doorRejectionCard, setDoorRejectionCard] = useState(false)
  const [lockRejectionCard, setLockRejectionCard] = useState(false)
  const [firstTimeCard, setFirstTimeCard] = useState(false)

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
    props.history.push("/HouseFive");
  };

  const togglePurse = () => {

  }

  const toggleCoin = () => {

  }

  const togglePod = () => {

  }

  const toggleLevitation = () => {

  }

  const toggleInvisibility = () => {

  }

  return isLoading ? (
    <Loading />
  ) : (
    <div className="main">
      <Nav />
      <div className="cottage-body">
        <div className="cottage-left"></div>
        <div className="cottage-middle">
          <div className="cottage-middle-top">
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
          <div className="cottage-middle-middle">
            <div className="lasers"></div>
            <div className="pouch"></div>
            <div className="brambles"></div>
          </div>
          <div className="cottage-middle-bottom">
            <div className="coin"></div>
          </div>
        </div>
        <div className="cottage-right">
          <div className="cottage-right-top"></div>
          <div className="cottage-right-middle"></div>
          <div className="cottage-right-bottom">
            <div className="pod-div">
              <div className="pod"></div>
            </div>
            "
            <div className="arrow-div">
              <ArrowUpward id="arrow-up" onClick={toggleHouseFive} />
            </div>
            <div className="scroll-div">
              <div className="inner-scroll-div">
                <div className="scroll"></div>
              </div>
              <div className="inner-scroll-div">
                <div className="scroll"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getCottage, getInventory })(
  Cottage
);
