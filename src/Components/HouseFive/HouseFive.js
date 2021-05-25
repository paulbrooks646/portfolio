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
  const [witchRejectionCard, setWitchRejectionCard] = useState(false);
  const [firstTimeCard, setFirstTimeCard] = useState(false);
  const [cauldronCard, setCauldronCard] = useState(false);
  const [broomCard, setBroomCard] = useState(false);
  const [glassesCard, setGlassesCard] = useState(false);
  const [ingredientCard, setIngredientCard] = useState(false);
  const [fireCard, setFireCard] = useState(false);
  const [mirrorCard, setMirrorCard] = useState(false);
  const [mirrorCardTwo, setMirrorCardTwo] = useState(false)
  const [homeCard, setHomeCard] = useState(false);
  const [laserRejectionCard, setLaserRejectionCard] = useState(false);
  const [witchCard, setWitchCard] = useState(false);
  const [bookCard, setBookCard] = useState(false);
  const [cageCard, setCageCard] = useState(false);
  const [flyCard, setFlyCard] = useState(false)
  const [unicornCard, setUnicornCard] = useState(false)
 

  useEffect(() => {
    axios.get("/api/houseFive").then((res) => {
      if (res.data[0].first_time) {
        setFirstTimeCard(true)
      }
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
    if (item === "glasses") {
      axios.post("/api/useGlasses").then((res) => {
        props.getInventory(res.data)
        axios.get("/api/houseFive").then(res => {
          setHouseFiveData(res.data[0]);
          setGlassesCard(true)
        })
      })
    } else if (item === "mirror") {
      if (houseFiveData.glasses_used) {
        axios.post("/api/mirror").then(res => {
          props.getInventory(res.data)
          axios.get("/api/houseFive").then(res => {
            setHouseFiveData(res.data[0])
            setMirrorCard(true)
          })
        })
      } else {
        setRejectionCard(true);
      }
    } else {
      setRejectionCard(true)
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
      setHouseFiveData(res.data[0])
      setFirstTimeCard(false)
    });
  };

  const toggleHome = () => {
    if (!houseFiveData.glasses_used) {
      setWitchRejectionCard(true)
    } else if (!houseFiveData.mirror_used) {
      setLaserRejectionCard(true)
    } else {
      axios.post("/api/homeTaken").then(res => {
        props.getInventory(res.data)
        axios.get("/api/houseFive").then(res => {
          setHouseFiveData(res.data[0])
          setHomeCard(true)
        })
      })
    }
  }

  const toggleIngredient = () => {
    if (!houseFiveData.glasses_used) {
      setWitchRejectionCard(true)
    } else if (!houseFiveData.mirror_used) {
      setLaserRejectionCard(true)
    } else {
      setIngredientCard(true)
    }
  }

  const toggleFire = () => {
     if (!houseFiveData.glasses_used) {
       setWitchRejectionCard(true);
     } else if (!houseFiveData.mirror_used) {
       setLaserRejectionCard(true);
     } else {
       setFireCard(true);
     }
  }

  const toggleBook = () => {
     if (!houseFiveData.glasses_used) {
       setWitchRejectionCard(true);
     } else if (!houseFiveData.mirror_used) {
       setLaserRejectionCard(true);
     } else {
       setBookCard(true);
     }
  }

  const toggleCauldron = () => {
     if (!houseFiveData.glasses_used) {
       setWitchRejectionCard(true);
     } else if (!houseFiveData.mirror_used) {
       setLaserRejectionCard(true);
     } else {
       setCauldronCard(true);
     }
  }

  const toggleBroom = () => {

    if (!houseFiveData.glasses_used) {
      setWitchRejectionCard(true);
    } else if (!houseFiveData.mirror_used) {
      setLaserRejectionCard(true);
    } else {
      setBroomCard(true);
    }
  }

  const toggleCage = () => {
     if (!houseFiveData.glasses_used) {
       setWitchRejectionCard(true);
     } else if (!houseFiveData.mirror_used) {
       setLaserRejectionCard(true);
     } else {
       axios.post("/api/openCage").then(res => {
         setHouseFiveData(res.data[0])
         setCageCard(true);
       })
     }
  }

  const toggleGoDown = () => {
    setDownDown(true);
    setDownCharacter(false);
  };

  const toggleWitch = () => {
    if (houseFiveData.glasses_used === true && houseFiveData.mirror_used === false) {
      setLaserRejectionCard(true)
    } else {
      setWitchCard(true)
    }
  }

  const toggleMirror = () => {
    setMirrorCard(false)
    setMirrorCardTwo(true)
  }

  const toggleUnicorn = () => {
    axios.post("/api/unicornGone").then(res => {
      setHouseFiveData(res.data[0])
      setUnicornCard(true)
    })
  }

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
              <div className="flame" onClick={toggleFire}>
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
                    !houseFiveData.house_taken
                      ? "houseFive-cottage-mini"
                      : "houseFive-cottage-mini-closed"
                  }`}
                  onClick={toggleHome}
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
                  className={`${
                    !houseFiveData.mirror_used
                      ? "potion-div"
                      : "potion-div-closed"
                  }`}
                  onClick={toggleIngredient}
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
                <div className="book-div" onClick={toggleBook}>
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
                <div className="eyes-div" onClick={toggleIngredient}>
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
                <div className="blood-div" onClick={toggleIngredient}>
                  <div className="blood-top"></div>
                  <div className="blood-bottom">
                    <div className="blood"></div>
                  </div>
                </div>
                <div className="bugs-div" onClick={toggleIngredient}>
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
          <div className="cauldron-div" onClick={toggleCauldron}>
            <div className="cauldron-top"></div>
            <div className="cauldron-bottom"></div>
          </div>
        </div>
        <div className="houseFive-middle-right">
          <div className="houseFive-middle-right-top">
            <div
              className={`${
                houseFiveData.mirror_used && !houseFiveData.cage_open
                  ? "fly-div"
                  : "fly-div-closed"
              }`}
            >
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
            <div
              className={`${
                !houseFiveData.mirror_used ? "witch" : "witch-closed"
              }`}
              onClick={toggleWitch}
            >
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
          <div className="broom-div" onClick={toggleBroom}>
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
              houseFiveData.glasses_used && !houseFiveData.mirror_used
                ? "houseFive-laser"
                : "houseFive-laser-closed"
            }`}
            onClick={() => setLaserRejectionCard(true)}
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
            <div
              class={`${
                houseFiveData.cage_open && !houseFiveData.unicorn_gone
                  ? "unicorn"
                  : "unicorn-closed"
              }`} onClick={toggleUnicorn}
            ></div>
          </div>
          <div className="cage-div">
            <div className="cage" onClick={toggleCage}>
              <div className="cage-top"></div>
              <div className="cage-middle">
                <div className="cage-bar"></div>
                <div
                  className={`${
                    !houseFiveData.cage_open
                      ? "cage-bar-short"
                      : "cage-bar-short-closed"
                  }`}
                ></div>
                <div
                  className={`${
                    !houseFiveData.cage_open ? "cage-door" : "cage-door-closed"
                  }`}
                >
                  <div className="cage-door-bars">
                    <div
                      className={`${
                        !houseFiveData.cage_open
                          ? "cage-bar-short"
                          : "cage-bar-short-closed"
                      }`}
                    ></div>
                    <div
                      className={`${
                        !houseFiveData.cage_open
                          ? "cage-bar-short"
                          : "cage-bar-short-closed"
                      }`}
                    ></div>
                    <div
                      className={`${
                        !houseFiveData.cage_open
                          ? "cage-bar-short"
                          : "cage-bar-short-closed"
                      }`}
                    ></div>
                    <div
                      className={`${
                        !houseFiveData.cage_open
                          ? "cage-bar-short"
                          : "cage-bar-short-closed"
                      }`}
                    ></div>
                    <div
                      className={`${
                        !houseFiveData.cage_open
                          ? "cage-bar-short"
                          : "cage-bar-short-closed"
                      }`}
                    ></div>
                    <div
                      className={`${
                        !houseFiveData.cage_open
                          ? "cage-bar-short"
                          : "cage-bar-short-closed"
                      }`}
                    ></div>
                  </div>
                  <div
                    className={`${
                      !houseFiveData.cage_open
                        ? "cage-lock-div"
                        : "cage-lock-div-closed"
                    }`}
                  >
                    <div className="cage-lock">
                      <div className="cage-keyhole-div">
                        <div className="cage-keyhole-top"></div>
                        <div className="cage-keyhole-bottom"></div>
                      </div>
                    </div>
                  </div>
                  <div className="cage-door-bars">
                    <div
                      className={`${
                        !houseFiveData.cage_open
                          ? "cage-bar-short"
                          : "cage-bar-short-closed"
                      }`}
                    ></div>
                    <div
                      className={`${
                        !houseFiveData.cage_open
                          ? "cage-bar-short"
                          : "cage-bar-short-closed"
                      }`}
                    ></div>
                    <div
                      className={`${
                        !houseFiveData.cage_open
                          ? "cage-bar-short"
                          : "cage-bar-short-closed"
                      }`}
                    ></div>
                    <div
                      className={`${
                        !houseFiveData.cage_open
                          ? "cage-bar-short"
                          : "cage-bar-short-closed"
                      }`}
                    ></div>
                    <div
                      className={`${
                        !houseFiveData.cage_open
                          ? "cage-bar-short"
                          : "cage-bar-short-closed"
                      }`}
                    ></div>
                    <div
                      className={`${
                        !houseFiveData.cage_open
                          ? "cage-bar-short"
                          : "cage-bar-short-closed"
                      }`}
                    ></div>
                  </div>

                  <div
                    className={`${
                      !houseFiveData.cage_open ? "frog" : "frog-closed"
                    }`}
                  >
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
                        <div className="frog-hand-left"></div>
                        <div className="frog-finger-div">
                          <div className="frog-finger-one"></div>
                          <div className="frog-finger-two"></div>
                          <div className="frog-finger-three"></div>
                          <div className="frog-finger-four"></div>
                        </div>
                      </div>
                      <div className="frog-leg">
                        <div className="frog-foot"></div>
                        <div className="frog-toe-div">
                          <div className="frog-toe-one"></div>
                          <div className="frog-toe-two"></div>
                          <div className="frog-toe-three"></div>
                          <div className="frog-toe-four"></div>
                        </div>
                      </div>
                      <div className="frog-leg">
                        <div className="frog-foot"></div>
                        <div className="frog-toe-div">
                          <div className="frog-toe-one"></div>
                          <div className="frog-toe-two"></div>
                          <div className="frog-toe-three"></div>
                          <div className="frog-toe-four"></div>
                        </div>
                      </div>
                      <div className="frog-arm-right">
                        <div className="frog-hand-right"></div>
                        <div className="frog-finger-div">
                          <div className="frog-finger-one"></div>
                          <div className="frog-finger-two"></div>
                          <div className="frog-finger-three"></div>
                          <div className="frog-finger-four"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    !houseFiveData.cage_open
                      ? "cage-bar-short"
                      : "cage-bar-short-closed"
                  }`}
                ></div>
                <div className="cage-bar"></div>
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
        <Card
          className={`${
            witchRejectionCard ? "answer-card" : "answer-card-closed"
          }`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="answer-card-description"
          >
            The second you left this entryway the witch would see you. Having
            heard what she is capable of you decide not to proceed without a
            solid plan.
          </Typography>
          <Button
            onClick={() => setWitchRejectionCard(false)}
            variant="contained"
            color="primary"
          >
            CLOSE
          </Button>
        </Card>
        <Card
          className={`${
            laserRejectionCard ? "answer-card" : "answer-card-closed"
          }`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="answer-card-description"
          >
            There is no way to get by the laser without getting zapped.
          </Typography>
          <Button
            onClick={() => setLaserRejectionCard(false)}
            variant="contained"
            color="primary"
          >
            CLOSE
          </Button>
        </Card>
        <Card className={`${fireCard ? "answer-card" : "answer-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="answer-card-description"
          >
            What possible reason could you have to want to burn your hand by
            touching the blazing fire.
          </Typography>
          <Button
            onClick={() => setFireCard(false)}
            variant="contained"
            color="primary"
          >
            CLOSE
          </Button>
        </Card>
        <Card className={`${homeCard ? "answer-card" : "answer-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="answer-card-description"
          >
            The miniature home is intricate and detailed. The inside is just as
            impressive. In fact, its your dream house. Unlike everything else in
            this place it isn't creepy. You decide to take it with you.
          </Typography>
          <Button
            onClick={() => setHomeCard(false)}
            variant="contained"
            color="primary"
          >
            CLOSE
          </Button>
        </Card>
        <Card
          className={`${ingredientCard ? "answer-card" : "answer-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="answer-card-description"
          >
            Yuck!!! You absolutely refuse to touch any of the witch's disgusting
            ingredients.
          </Typography>
          <Button
            onClick={() => setIngredientCard(false)}
            variant="contained"
            color="primary"
          >
            CLOSE
          </Button>
        </Card>
        <Card className={`${bookCard ? "answer-card" : "answer-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="answer-card-description"
          >
            You have no interest in dark magic.
          </Typography>
          <Button
            onClick={() => setBookCard(false)}
            variant="contained"
            color="primary"
          >
            CLOSE
          </Button>
        </Card>
        <Card
          className={`${glassesCard ? "answer-card" : "answer-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="answer-card-description"
          >
            You put on your glasses realize there was an invisible laser only
            inches in front of you. Phew! Its a good thing you found this before
            you decided to proceed.
          </Typography>
          <Button
            onClick={() => setGlassesCard(false)}
            variant="contained"
            color="primary"
          >
            CLOSE
          </Button>
        </Card>
        <Card
          className={`${mirrorCard ? "answer-card" : "answer-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="answer-card-description"
          >
            You push the mirror into the laser aiming at the witch. The mirror
            shatters but first sends a small laser ball flying toward the witch.
            To your dismay it misses her, instead it hits a green potion on the
            shelf above her. You cringe as she turns toward you smiling eerily.
          </Typography>
          <Button onClick={toggleMirror} variant="contained" color="primary">
            CLOSE
          </Button>
        </Card>
        <Card
          className={`${mirrorCardTwo ? "answer-card" : "answer-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="answer-card-description"
          >
            She raises one hand and you find you find you can no longer move.
            She raises her other hand and a big ball of lightning appears.
            You're sure this is the end when something green catches you eye. A
            single drop from the shattered potion oozes off the shelf and hits
            the witch's outstretched hand. Poof! The witch turns into a fly.
          </Typography>
          <Button
            onClick={() => setMirrorCardTwo(true)}
            variant="contained"
            color="primary"
          >
            CLOSE
          </Button>
        </Card>
        <Card
          className={`${cauldronCard ? "answer-card" : "answer-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="answer-card-description"
          >
            You have no idea what vile things the witch has brewed in that
            cauldron. Touching it isn't worth it.
          </Typography>
          <Button
            onClick={() => setCauldronCard(false)}
            variant="contained"
            color="primary"
          >
            CLOSE
          </Button>
        </Card>
        <Card className={`${broomCard ? "answer-card" : "answer-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="answer-card-description"
          >
            You decide against taking the broom. It is likely infused with dark
            magic.
          </Typography>
          <Button
            onClick={() => setBroomCard(false)}
            variant="contained"
            color="primary"
          >
            CLOSE
          </Button>
        </Card>
        <Card className={`${flyCard ? "answer-card" : "answer-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="answer-card-description"
          >
            Now that the witch is a fly, she can do no further harm. You are
            literally the type of person who couldn't hurt a fly.
          </Typography>
          <Button
            onClick={() => setFlyCard(false)}
            variant="contained"
            color="primary"
          >
            CLOSE
          </Button>
        </Card>
        <Card className={`${cageCard ? "answer-card" : "answer-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="answer-card-description"
          >
            Picking the lock you open the cage to free the poor frog. The cute
            little frog jumps out. The fly that was formerly a witch flys too
            close. A long pink tongue shoots out of the frog's mouth and the fly
            becomes his meal. Suddenly the frog starts glowing and before your
            eyes he turns into a unicorn.
          </Typography>
          <Button
            onClick={() => setCageCard(false)}
            variant="contained"
            color="primary"
          >
            CLOSE
          </Button>
        </Card>
        <Card
          className={`${firstTimeCard ? "answer-card" : "answer-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="answer-card-description"
          >
            You slowly creep into the house. You hear the witch cackling and you
            tremble in fear. Fortunately the entryway hides you from the witches
            view. It buys you a little time to plan your next move.
          </Typography>
          <Button onClick={toggleFirst} variant="contained" color="primary">
            CLOSE
          </Button>
        </Card>
        <Card className={`${witchCard ? "answer-card" : "answer-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="answer-card-description"
          >
            The witches quick and powerful. She enjoys transforming people into
            less desirable creatures. She keeps them in cages until she grows
            bored of them. Engaging her would be a really, really bad idea.
          </Typography>
          <Button
            onClick={() => setWitchCard(false)}
            variant="contained"
            color="primary"
          >
            CLOSE
          </Button>
        </Card>
        <Card
          className={`${unicornCard ? "answer-card" : "answer-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="answer-card-description"
          >
            The unicorn bows his head as if to say "thanks", then quickly gallops out of the cottage.
          </Typography>
          <Button
            onClick={() => setUnicornCard(false)}
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
