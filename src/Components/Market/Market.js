import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import {getInventory} from "../../redux/inventoryReducer"
import axios from "axios";
import "./Market.scss";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Blacksmith from "../../Images/Blacksmith.jpg";
import Store from "../../Images/General.jpg";
import Magic from "../../Images/MagicOutside.png";
import Grocer from "../../Images/Grocer.png";
import Loading from "../Loading/Loading";
import Character from "../Character/Character"

function Market(props) {
 const [isLoading, setIsLoading] = useState(true);
 const [rightLeft, setRightLeft] = useState(false);
 const [leftLeft, setLeftLeft] = useState(false);
 const [rightRight, setRightRight] = useState(false);
 const [leftRight, setLeftRight] = useState(false);
 const [leftCharacter, setLeftCharacter] = useState(false);
  const [rightCharacter, setRightCharacter] = useState(false);
  const [marketData, setMarketData] = useState()
  const [inventoryOpen, setInventoryOpen] = useState(false)
  const [rejectionCard, setRejectionCard] = useState(false)
  
  useEffect(() => {
    // if (!props.user.user.newgame) {
    //   setNewgameCard(false);

    // }
    axios.get("/api/nest").then((res) => {
      setMarketData(res.data[0]);

      if (props.user.user.last === "town") {
        setLeftCharacter(true);
      } else if (props.user.user.last === "alley") {
        setRightCharacter(true);
      }
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
          setMarketData(res.data[0]);
          setFluteCard(true);
        });
      } else {
        setRejectionCard(true);
      }
    }
  };

  const toggleRight = () => {
    axios.post("/api/changeLast", { last: "market" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Alley");
      });
    });
  };

  const toggleLeft = () => {
   axios.post("/api/changeLast", { last: "market" }).then((res) => {
     props.getUser(res.data).then(() => {
       props.history.push("/Town");
     });
   });
  };
  const toggleBlack = () => {
    props.history.push("/Blacksmith");
  };

  const toggleGeneral = () => {
    props.history.push("/Store");
  };

  const toggleMagic = () => {
    props.history.push("/Magic");
  };

  const toggleGrocer = () => {
    props.history.push("/Grocer");
  };

  const toggleGoLeft = () => {
    if (props.user.user.last === "town") {
      setLeftCharacter(false);
      setLeftLeft(true);
    } else if (props.user.user.last === "alley") {
      setRightCharacter(false);
      setRightLeft(true);
    }
  };

  const toggleGoRight = () => {
    if (props.user.user.last === "town") {
      setLeftCharacter(false);
      setLeftRight(true);
    } else if (props.user.user.last === "alley") {
      setRightCharacter(false);
      setRightRight(true);
    }
  };

  return (

    isLoading ? <Loading/> :
    <div className="main">
      <Nav />
      <div className="market-body">
        <div className="market-top">
          <div className="market-top-left"></div>
          <div className="market-top-middle"></div>
          <div className="market-top-right"></div>
        </div>
        <div className="market-middle">
          <div className="market-middle-left">
            <div className="market-town" onClick={toggleGoLeft}>
              <ArrowBack />
              <h2>Town</h2>
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
          <div className="market-middle-middle"></div>
          <div className="market-middle-right">
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
            <div className="market-alley" onClick={toggleGoRight}>
              <h2>Alley</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="market-bottom">
          <div className="blacksmith-div" onClick={toggleBlack}>
            <img
              src={Blacksmith}
              alt="Blacksmith Shop"
              className="market-blacksmith"
            />
            <h2>Blacksmith</h2>
          </div>
          <div className="magic-store-div" onClick={toggleMagic}>
            <img src={Magic} alt="magic store" className="market-magic" />
            <h2>Magic Shop</h2>
          </div>
          <div className="grocer-div" onClick={toggleGrocer}>
            <img src={Grocer} className="market-grocer" alt="grocer" />
            <h2>Grocer</h2>
          </div>

          <div className="store-div" onClick={toggleGeneral}>
            <img src={Store} alt="general store" className="market-store" />
            <h2>General Store</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getInventory})(Market);
