import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Alley.scss";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";

function Alley(props) {
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rightLeft, setRightLeft] = useState(false);
  const [leftLeft, setLeftLeft] = useState(false);
  const [rightRight, setRightRight] = useState(false);
  const [leftRight, setLeftRight] = useState(false);
  const [leftCharacter, setLeftCharacter] = useState(false);
  const [rightCharacter, setRightCharacter] = useState(false);
  const [inventoryOpen, setInentoryOpen] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [alleyData, setAlleyData] = useState();

  useEffect(() => {
    // if (!props.user.user.newgame) {
    //   setNewgameCard(false);

    // }
    axios.get("/api/nest").then((res) => {
      setAlleyData(res.data[0]);

      if (props.user.user.last === "market") {
        setLeftCharacter(true);
      } else if (props.user.user.last === "thieves") {
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
    if (item === "rock") {
      if (props.location.pathname === "/Alley") {
        axios.post("/api/useRock").then((res) => {
          setAlleyData(res.data[0]);
        });
      } else {
        setRejectionCard(true);
      }
    }
  };

  const toggleLeft = () => {
    axios.post("/api/changeLast", { last: "alley" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Market");
      });
    });
  };

  const toggleRight = () => {
    axios.post("/api/changeLast", { last: "alley" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Thieves");
      });
    });
  };

  const toggleGoLeft = () => {
    if (props.user.user.last === "market") {
      setLeftCharacter(false);
      setLeftLeft(true);
    } else if (props.user.user.last === "thieves") {
      setRightCharacter(false);
      setRightLeft(true);
    }
  };

  const toggleGoRight = () => {
    if (props.user.user.last === "market") {
      setLeftCharacter(false);
      setLeftRight(true);
    } else if (props.user.user.last === "thieves") {
      setRightCharacter(false);
      setRightRight(true);
    }
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
      <div className="alley-body">
        <div className="alley-top"></div>
        <div className="alley-middle">
          <div className="alley-middle-left">
            <div className="alley-market" onClick={toggleGoLeft}>
              <ArrowBack />
              <h2>Market</h2>
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
          <div className="alley-middle-middle">
            <div className="cat-div">
              <div className="cat">
                <div className="cat-top">
                  <div className="cat-left-ear">
                    <div className="cat-left-inner-ear"></div>
                  </div>
                  <div className="cat-face">
                    <div className="cat-eye-div">
                      <div className="cat-eye">
                        <div className="cat-pupil"></div>
                      </div>
                      <div className="cat-eye">
                        <div className="cat-pupil"></div>
                      </div>
                    </div>
                    <div className="cat-nose"></div>
                    <div className="cat-smile">
                      <div className="cat-mouth">
                        <div className="cat-teeth-top">
                          <div className="cat-tooth"></div>
                          <div className="cat-tooth"></div>
                          <div className="cat-tooth"></div>
                          <div className="cat-tooth"></div>
                        </div>
                        <div className="cat-teeth-bottom">
                          <div className="cat-tooth"></div>
                          <div className="cat-tooth"></div>
                          <div className="cat-tooth"></div>
                          <div className="cat-tooth"></div>
                          <div className="cat-tooth"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cat-right-ear">
                    <div className="cat-right-inner-ear"></div>
                  </div>
                </div>
                <div className="cat-bottom">
                  <div className="cat-body">
                    <div className="cat-torso"></div>
                    <div className="cat-leg-div">
                      <div className="cat-leg-one">
                        <div className="cat-paw"></div>
                      </div>
                      <div className="cat-leg-two">
                        <div className="cat-paw"></div>
                      </div>
                      <div className="cat-leg-one">
                        <div className="cat-paw"></div>
                      </div>
                      <div className="cat-leg-two">
                        <div className="cat-paw"></div>
                      </div>
                    </div>
                  </div>
                  <div className="cat-tail"></div>
                </div>
              </div>
            </div>
            <div className="beggar-div">
              <div className="beggar">
                <div className="beggar-hat">
                  <div className="beggar-hat-top"></div>
                </div>
                <div className="beggar-head">
                  <div className="beggar-hair-left"></div>
                  <div className="beggar-face">
                    <div className="beggar-eyes">
                      <div className="beggar-eye">
                        <div className="beggar-iris">
                          <div className="beggar-pupil"></div>
                        </div>
                      </div>
                      <div className="beggar-eye">
                        <div className="beggar-iris">
                          <div className="beggar-pupil"></div>
                        </div>
                      </div>
                    </div>
                    <div className="beggar-nose"></div>
                    <div className="beggar-mouth"></div>
                  </div>
                  <div className="beggar-hair-right"></div>
                </div>
                <div className="beggar-body">
                  <div className="beggar-neck"></div>
                  <div className="beggar-arms">
                    <div className="beggar-arm-left">
                      <div className="beggar-hand"></div>
                    </div>
                    <div className="beggar-arm-right">
                      <div className="beggar-hand"></div>
                    </div>
                  </div>
                  <div className="beggar-dress"></div>
                  <div className="beggar-legs">
                    <div className="beggar-leg-left">
                      <div className="beggar-foot"></div>
                    </div>
                    <div className="beggar-leg-right">
                      <div className="beggar-foot"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mouse">
                <div className="mouse-ear">
                  <div className="mouse-inner-ear"></div>
                </div>
                <div className="mouse-body-div">
                  <div className="mouse-nose"></div>
                  <div className="mouse-body-one">
                    <div className="mouse-eye"></div>
                    <div className="mouse-mouth"></div>
                  </div>
                  <div className="mouse-tail-one"></div>
                  <div className="mouse-tail-two"></div>
                </div>
                <div className="mouse-paw-div">
                  <div className="mouse-paw-one"></div>
                  <div className="mouse-paw-two"></div>
                  <div className="mouse-paw-three"></div>
                  <div className="mouse-paw-four"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="alley-middle-right">
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
            <div className="thieves-guild-div">
              <div className="alley-thieves-guild" onClick={toggleGoRight}>
                <h2>Thieves Guild</h2>
                <ArrowForward />
              </div>
            </div>
          </div>
        </div>
        <div className="alley-bottom"></div>
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
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getInventory, logoutUser })(
  Alley
);
