import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getSwamp } from "../../redux/swampReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Swamp.scss";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";

function Swamp(props) {
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
      props.getSwamp(res.data[0]);

      if (props.user.user.last === "forest") {
        setLeftCharacter(true);
      } else if (props.user.user.last === "bog") {
        setRightCharacter(true);
      }
      setIsLoading(false);
    });
  }, []);

  const toggleLeft = () => {
    axios.post("/api/changeLast", { last: "swamp" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Forest");
      });
    });
  };

  const toggleRight = () => {
    axios.post("/api/changeLast", { last: "swamp" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Bog");
      });
    });
  };

  const toggleGoLeft = () => {
    if (props.user.user.last === "forest") {
      setLeftCharacter(false);
      setLeftLeft(true);
    } else if (props.user.user.last === "bog") {
      setRightCharacter(false);
      setRightLeft(true);
    }
  };

  const toggleGoRight = () => {
    if (props.user.user.last === "forest") {
      setLeftCharacter(false);
      setLeftRight(true);
    } else if (props.user.user.last === "bog") {
      setRightCharacter(false);
      setRightRight(true);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="swamp-main">
      <Nav />
      <div className="swamp-body">
        <div className="swamp-top">
          <div className="swamp-top-left"></div>
          <div className="swamp-top-middle"></div>
          <div className="swamp-top-right"></div>
        </div>
        <div className="swamp-middle">
          <div className="swamp-middle-left">
            <div className="swamp-forest" onClick={toggleGoLeft}>
              <ArrowBack />
              <h2>Forest</h2>
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
          <div className="swamp-middle-middle">
            <div className="goblin-open"></div>
          </div>
          <div className="swamp-middle-right">
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
            <div className="swamp-bog" onClick={toggleGoRight}>
              <h2>Bog</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="swamp-bottom">
          <div className="swamp-bottom-left"></div>
          <div className="swamp-bottom-middle"></div>
          <div className="swamp-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getInventory, getSwamp })(
  Swamp
);
