import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./HouseFive.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

function HouseFive(props) {
  const [downCharacter, setDownCharacter] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [houseFiveData, setHouseFiveData] = useState(false);
  const [laser, setLaser] = useState(true);
  const [witchRejectionCard, setWitchRejectionCard] = useState(false);
  const [firstTimeCard, setFirstTimeCard] = useState(false);
  const [cauldronCard, setCauldronCard] = useState(false);
  const [broomCard, setBroomCard] = useState(false);
  const [glassesCard, setGlassesCard] = useState(false);
  const [potionCard, setPotionCard] = useState(false);
  const [bugsCard, setBugsCard] = useState(false);
  const [bugs, setBugs] = useState(false);
  const [fireCard, setFireCard] = useState(false);
  const [mirrorCard, setMirrorCard] = useState(false);
  const [homeCard, setHomeCard] = useState(false);
  const [laserRejectionCard] = useState(false);
  const [potion, setPotion] = useState(true);
  const [witch, setWitch] = useState(false);
  const [witchCard, setWitchCard] = useState(false);
  const [bookCard, setBookCard] = useState(false);
  const [eyesCard, setEyesCard] = useState(false);
  const [cageCard, setCageCard] = useState(false);
  const [cage, setCage] = useState(true);
  const [frog, setFrog] = useState(false);
  const [frogCard, setFrogCard] = useState(false);
  const [unicorn, setUnicorn] = useState(true);
  const [unicornCard, setUnicornCard] = useState(false);
  const [bloodCard, setBloodCard] = useState(false);
  const [fly, setFly] = useState(true);
  const [flyCard, setFlyCard] = useState(false);
  const [home, setHome] = useState(true);

  useEffect(() => {
    axios.get("/api/nest").then((res) => {
      setHouseFiveData(res.data[0]);
      setDownCharacter(true);
      setIsLoading(false);
    });
  }, []);

  const toggleInventoryOpen = () => setInventoryOpen(!inventoryOpen);

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
          setHouseFiveData(res.data[0]);
        });
      } else {
        setRejectionCard(true);
      }
    }
  };

  const toggleDown = () => {
    axios.post("/api/changeLast", { last: "houseFive" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Cottage");
      });
    });
  };

  const toggleFirst = () => {
    axios.post("/api/houseFiveFirst").then((res) => {
      setHouseFiveData(res.data[0]);
    });
  };

  const toggleGoDown = () => {
    setDownDown(true);
    setDownCharacter(false);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="main">
      <div className="nav-main">
        <div className="inventory-div">
          <BusinessCenter
            className="inventory-icon"
            onClick={toggleInventoryOpen}
          />
          <div
            className={`${
              inventoryOpen ? "inventory-open" : "inventory-closed"
            }`}
          >
            {inventoryList}
          </div>
        </div>
        <h2 className="nav-welcome">{props.user.user.name}'s Quest</h2>
        <div className="coin-div">
          <h3>{`Coins: ${props.user.user.coins}`}</h3>
        </div>
        <button className="nav-logout" onClick={logout}>
          Logout
        </button>
      </div>
      <div className="houseFive-body">
        <div className="houseFive-top">
          <div className="door">
            <div className="door-knob"></div>
          </div>
          <div className="dining-div">
            <div className="fireplace">
              <div className="flame">
                <div className="flame-one"></div>
                <div className="flame-two"></div>
                <div className="flame-three"></div>
                <div className="flame-four"></div>
                <div className="flame-five"></div>
                <div className="flame-six"></div>
                <div className="flame-seven"></div>
                <div className="flame-eight"></div>
              </div>
            </div>
          </div>
          <div className="dresser-div">
            <div className="dresser-side"></div>
            <div className="dresser-middle">
              <div className="shelf"></div>
              <div className="shelf-one">
                <div
                  className={`${
                    home
                      ? "houseFive-cottage-mini"
                      : "houseFive-cottage-mini-closed"
                  }`}
                >
                  <div className="houseFive-left-mini"></div>
                  <div className="houseFive-middle-mini">
                    <div className="houseFive-chimney-div">
                      <div className="houseFive-chimney"></div>
                    </div>
                    <div className="houseFive-short-log"></div>
                    <div className="houseFive-medium-log"></div>
                    <div className="houseFive-window-div">
                      <div className="houseFive-window-div-side">
                        <div className="houseFive-short-log"></div>
                        <div className="houseFive-short-log"></div>
                      </div>
                      <div className="houseFive-window">
                        <div className="houseFive-window-row">
                          <div className="houseFive-window-pane"></div>
                          <div className="houseFive-window-line"></div>
                          <div className="houseFive-window-pane"></div>
                        </div>
                        <div className="houseFive-window-middle"></div>
                        <div className="houseFive-window-row">
                          <div className="houseFive-window-pane"></div>
                          <div className="houseFive-window-line"></div>
                          <div className="houseFive-window-pane"></div>
                        </div>
                      </div>
                      <div className="houseFive-window-div-side">
                        <div className="houseFive-short-log"></div>
                        <div className="houseFive-short-log"></div>
                      </div>
                    </div>
                    <div className="houseFive-long-log"></div>
                    <div className="houseFive-long-log"></div>
                    <div className="houseFive-door-div">
                      <div className="houseFive-door-div-side">
                        <div className="houseFive-short-log"></div>
                        <div className="houseFive-short-log"></div>
                        <div className="houseFive-short-log"></div>
                      </div>
                      <div className="houseFive-door-mini">
                        <div className="houseFive-door-knob-mini"></div>
                        <div className="houseFive-lock-div">
                          <div className="houseFive-lock-top"></div>
                          <div className="houseFive-lock-bottom"></div>
                        </div>
                      </div>
                      <div className="houseFive-door-div-side">
                        <div className="houseFive-short-log"></div>
                        <div className="houseFive-short-log"></div>
                        <div className="houseFive-short-log"></div>
                      </div>
                    </div>
                  </div>
                  <div className="houseFive-right-mini"></div>
                </div>
                <div
                  className={`${potion ? "potion-div" : "potion-div-closed"}`}
                >
                  <div className="potion-cork"></div>
                  <div className="potion-top"></div>
                  <div className="potion-neck">
                    <div className="neck-potion"></div>
                  </div>
                  <div className="potion-bottle">
                    <div className="potion"></div>
                  </div>
                </div>
              </div>
              <div className="shelf-two">
                <div className="book-div">
                  <div className="book-cover-front">
                    <div className="book-title">
                      <div className="book-title-left"></div>
                      <div className="book-title-right"></div>
                      <div className="book-title-left"></div>
                      <div className="book-title-right"></div>
                      <div className="book-title-left"></div>
                    </div>
                  </div>
                  <div className="book-page"></div>
                  <div className="book-page"></div>
                  <div className="book-page"></div>
                  <div className="book-page"></div>
                  <div className="book-page"></div>
                  <div className="book-cover-back"></div>
                </div>
                <div className="eyes-div">
                  <div className="eyes-top"></div>
                  <div className="eyes-bottom">
                    <div className="eye-row">
                      <div className="eye">
                        <div className="eye-pupil"></div>
                      </div>
                      <div className="eye">
                        <div className="eye-pupil"></div>
                      </div>
                    </div>
                    <div className="eye-row">
                      <div className="eye">
                        <div className="eye-pupil"></div>
                      </div>
                      <div className="eye">
                        <div className="eye-pupil"></div>
                      </div>
                    </div>
                    <div className="eye-row">
                      <div className="eye">
                        <div className="eye-pupil"></div>
                      </div>
                      <div className="eye">
                        <div className="eye-pupil"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="shelf-three">
                <div className="blood-div">
                  <div className="blood-top"></div>
                  <div className="blood-bottom">
                    <div className="blood"></div>
                  </div>
                </div>
                <div className="bugs-div">
                  <div className="bugs-top"></div>
                  <div className="bugs-bottom">
                    <div className="bug">
                      <div className="bug-left">
                        <div className="bug-leg-one"></div>
                        <div className="bug-leg-two"></div>
                        <div className="bug-leg-three"></div>
                        <div className="bug-leg-four"></div>
                      </div>
                      <div className="bug-body">
                        <div className="bug-eye-div">
                          <div className="bug-eye">
                            <div className="bug-pupil"></div>
                          </div>
                          <div className="bug-eye">
                            <div className="bug-pupil"></div>
                          </div>
                        </div>
                      </div>
                      <div className="bug-right">
                        <div className="bug-leg-one"></div>
                        <div className="bug-leg-two"></div>
                        <div className="bug-leg-three"></div>
                        <div className="bug-leg-four"></div>
                      </div>
                    </div>
                    <div className="bug">
                      <div className="bug-left">
                        <div className="bug-leg-one"></div>
                        <div className="bug-leg-two"></div>
                        <div className="bug-leg-three"></div>
                        <div className="bug-leg-four"></div>
                      </div>
                      <div className="bug-body">
                        <div className="bug-eye-div">
                          <div className="bug-eye">
                            <div className="bug-pupil"></div>
                          </div>
                          <div className="bug-eye">
                            <div className="bug-pupil"></div>
                          </div>
                        </div>
                      </div>
                      <div className="bug-right">
                        <div className="bug-leg-one"></div>
                        <div className="bug-leg-two"></div>
                        <div className="bug-leg-three"></div>
                        <div className="bug-leg-four"></div>
                      </div>
                    </div>
                    <div className="bug">
                      <div className="bug-left">
                        <div className="bug-leg-one"></div>
                        <div className="bug-leg-two"></div>
                        <div className="bug-leg-three"></div>
                        <div className="bug-leg-four"></div>
                      </div>
                      <div className="bug-body">
                        <div className="bug-eye-div">
                          <div className="bug-eye">
                            <div className="bug-pupil"></div>
                          </div>
                          <div className="bug-eye">
                            <div className="bug-pupil"></div>
                          </div>
                        </div>
                      </div>
                      <div className="bug-right">
                        <div className="bug-leg-one"></div>
                        <div className="bug-leg-two"></div>
                        <div className="bug-leg-three"></div>
                        <div className="bug-leg-four"></div>
                      </div>
                    </div>
                    <div className="bug">
                      <div className="bug-left">
                        <div className="bug-leg-one"></div>
                        <div className="bug-leg-two"></div>
                        <div className="bug-leg-three"></div>
                        <div className="bug-leg-four"></div>
                      </div>
                      <div className="bug-body">
                        <div className="bug-eye-div">
                          <div className="bug-eye">
                            <div className="bug-pupil"></div>
                          </div>
                          <div className="bug-eye">
                            <div className="bug-pupil"></div>
                          </div>
                        </div>
                      </div>
                      <div className="bug-right">
                        <div className="bug-leg-one"></div>
                        <div className="bug-leg-two"></div>
                        <div className="bug-leg-three"></div>
                        <div className="bug-leg-four"></div>
                      </div>
                    </div>
                    <div className="bug">
                      <div className="bug-left">
                        <div className="bug-leg-one"></div>
                        <div className="bug-leg-two"></div>
                        <div className="bug-leg-three"></div>
                        <div className="bug-leg-four"></div>
                      </div>
                      <div className="bug-body">
                        <div className="bug-eye-div">
                          <div className="bug-eye">
                            <div className="bug-pupil"></div>
                          </div>
                          <div className="bug-eye">
                            <div className="bug-pupil"></div>
                          </div>
                        </div>
                      </div>
                      <div className="bug-right">
                        <div className="bug-leg-one"></div>
                        <div className="bug-leg-two"></div>
                        <div className="bug-leg-three"></div>
                        <div className="bug-leg-four"></div>
                      </div>
                    </div>
                    <div className="bug">
                      <div className="bug-left">
                        <div className="bug-leg-one"></div>
                        <div className="bug-leg-two"></div>
                        <div className="bug-leg-three"></div>
                        <div className="bug-leg-four"></div>
                      </div>
                      <div className="bug-body">
                        <div className="bug-eye-div">
                          <div className="bug-eye">
                            <div className="bug-pupil"></div>
                          </div>
                          <div className="bug-eye">
                            <div className="bug-pupil"></div>
                          </div>
                        </div>
                      </div>
                      <div className="bug-right">
                        <div className="bug-leg-one"></div>
                        <div className="bug-leg-two"></div>
                        <div className="bug-leg-three"></div>
                        <div className="bug-leg-four"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="shelf"></div>
            </div>
            <div className="dresser-side"></div>
          </div>
        </div>
        <div className="houseFive-bottom-middle">
          <div className="houseFive-middle">
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
          </div>
          <div className="houseFive-bottom">
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
            <div className="houseFive-board"></div>
          </div>
        </div>
        <div className="houseFive-middle-left"></div>
        <div className="houseFive-middle-middle">
          <div className="cauldron-div">
            <div className="cauldron-top"></div>
            <div className="cauldron-bottom"></div>
          </div>
        </div>
        <div className="houseFive-middle-right">
          <div className="houseFive-middle-right-top">
            <div className={`${fly ? "fly-div" : "fly-div-closed"}`}>
              <div className="fly-wing-left"></div>
              <div className="fly-body">
                <div className="fly-eye-div">
                  <div className="fly-eye">
                    <div className="fly-pupil"></div>
                  </div>
                  <div className="fly-eye">
                    <div className="fly-pupil"></div>
                  </div>
                </div>
              </div>
              <div className="fly-wing-right"></div>
            </div>
            <div className={`${witch ? "witch" : "witch-closed"}`}>
              <div className="witch-hat">
                <div className="witch-hat-top"></div>
                <div className="witch-hat-bottom"></div>
              </div>
              <div className="witch-head">
                <div className="witch-hair-left"></div>
                <div className="witch-face">
                  <div className="witch-eyes">
                    <div className="witch-eye">
                      <div className="witch-iris">
                        <div className="witch-pupil"></div>
                      </div>
                    </div>
                    <div className="witch-eye">
                      <div className="witch-iris">
                        <div className="witch-pupil"></div>
                      </div>
                    </div>
                  </div>
                  <div className="witch-nose">
                    <div className="witch-wart"></div>
                  </div>
                  <div className="witch-mouth"></div>
                </div>
                <div className="witch-hair-right"></div>
              </div>
              <div className="witch-body">
                <div className="witch-neck"></div>
                <div className="witch-arms">
                  <div className="witch-arm-left">
                    <div className="witch-hand"></div>
                  </div>
                  <div className="witch-arm-right">
                    <div className="witch-hand"></div>
                  </div>
                </div>
                <div className="witch-dress"></div>
                <div className="witch-legs">
                  <div className="witch-leg-left">
                    <div className="witch-foot"></div>
                  </div>
                  <div className="witch-leg-right">
                    <div className="witch-foot"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="houseFive-middle-right-bottom">
            <div className="houseFive-table-div">
              <div className="houseFive-table-top"></div>
              <div className="houseFive-table-leg-div">
                <div className="houseFive-table-leg"></div>
                <div className="houseFive-table-leg"></div>
              </div>
            </div>
            <div className="houseFive-chair-div">
              <div className="houseFive-chair-top-div">
                <div className="houseFive-chair-top"></div>
              </div>
              <div className="houseFive-chair-seat"></div>
              <div className="houseFive-chair-leg-div">
                <div className="houseFive-chair-leg"></div>
                <div className="houseFive-chair-leg"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="houseFive-bottom-left">
          <div className="broom-div">
            <div className="broom-top">
              <div className="broom-bristle"></div>
              <div className="broom-bristle"></div>
              <div className="broom-bristle"></div>
              <div className="broom-bristle"></div>
              <div className="broom-bristle"></div>
              <div className="broom-bristle"></div>
              <div className="broom-bristle"></div>
              <div className="broom-bristle"></div>
              <div className="broom-bristle"></div>
              <div className="broom-bristle"></div>
            </div>
            <div className="broom-middle"></div>
            <div className="broom-handle"></div>
          </div>
        </div>
        <div className="houseFive-bottom-center">
          <div
            className={`${
              laser ? "houseFive-laser" : "houseFive-laser-closed"
            }`}
          ></div>
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
          <div className="houseFive-town" onClick={toggleGoDown}>
            <h2>EXIT</h2>
            <ArrowDownward />
          </div>
        </div>
        <div className="houseFive-bottom-right">
          <div className="unicorn-div">
            <div class={`${unicorn ? "unicorn" : "unicorn-closed"}`}></div>
          </div>
          <div className="cage-div">
            <div className="cage">
              <div className="cage-top"></div>
              <div className="cage-middle">
                <div className="cage-bar"></div>
                <div className="cage-bar"></div>
                <div className={`${cage ? "cage-door" : "cage-door-closed"}`}>
                  <div className="cage-door-bars">
                    <div className="cage-bar-short"></div>
                    <div className="cage-bar-short"></div>
                    <div className="cage-bar-short"></div>
                    <div className="cage-bar-short"></div>
                    <div className="cage-bar-short"></div>
                    <div className="cage-bar-short"></div>
                  </div>
                  <div className="cage-lock-div">
                    <div className="cage-lock">
                      <div className="cage-keyhole-div">
                        <div className="cage-keyhole-top"></div>
                        <div className="cage-keyhole-bottom"></div>
                      </div>
                    </div>
                   
                  </div>
                  <div className="cage-door-bars">
                    <div className="cage-bar-short"></div>
                    <div className="cage-bar-short"></div>
                    <div className="cage-bar-short"></div>
                    <div className="cage-bar-short"></div>
                    <div className="cage-bar-short"></div>
                    <div className="cage-bar-short"></div>
                  </div>
                  <div className={`${frog ? "frog" : "frog-closed"}`}>
                    <div className="frog-head">
                      <div className="frog-eye-div">
                        <div className="frog-eye">
                          <div className="frog-pupil"></div>
                        </div>
                        <div className="frog-eye">
                          <div className="frog-pupil"></div>
                        </div>
                      </div>
                      <div className="frog-nostril-div">
                        <div className="frog-nostril"></div>
                        <div className="frog-nostril"></div>
                      </div>
                      <div className="frog-lips"></div>
                    </div>
                    <div className="frog-bottom-div">
                      <div className="frog-arm-left">
                        <div className="frog-hand-left">
                          <div className="frog-finger-one"></div>
                          <div className="frog-finger-two"></div>
                          <div className="frog-finger-three"></div>
                          <div className="frog-finger-four"></div>
                        </div>
                      </div>

                      <div className="frog-leg">
                        <div className="frog-foot">
                          <div className="frog-toe-one"></div>
                          <div className="frog-toe-two"></div>
                          <div className="frog-toe-three"></div>
                          <div className="frog-toe-four"></div>
                        </div>
                      </div>

                      <div className="frog-leg">
                        <div className="frog-foot">
                          <div className="frog-toe-one"></div>
                          <div className="frog-toe-two"></div>
                          <div className="frog-toe-three"></div>
                          <div className="frog-toe-four"></div>
                        </div>
                      </div>
                      <div className="frog-arm-right">
                        <div className="frog-hand-right">
                          <div className="frog-finger-one"></div>
                          <div className="frog-finger-two"></div>
                          <div className="frog-finger-three"></div>
                          <div className="frog-finger-four"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${!cage ? "open-cage" : "open-cage-closed"}`}>
                  <div className="cage-bar"></div>
                  <div className="cage-bar"></div>
                  <div className="cage-bar"></div>
                  <div className="cage-bar"></div>
                  <div className="cage-door-open"></div>
                </div>
              </div>
              <div className="cage-bottom"></div>
            </div>
          </div>
        </div>
        <Card
          className={`${rejectionCard ? "answer-card" : "answer-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="answer-card-description"
          >
            That item is either not useful here or not useful here yet.
          </Typography>
          <Button
            onClick={() => setRejectionCard(false)}
            variant="contained"
            color="primary"
          >
            CLOSE
          </Button>
        </Card>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getInventory, logoutUser })(
  HouseFive
);
