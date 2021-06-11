import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Throne.scss";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Character from "../Character/Character";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Loading from "../Loading/Loading";
import House from "../House/House";

function Throne(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const [downCharacter, setDownCharacter] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [throneData, setThroneData] = useState();

  useEffect(() => {
    axios.get("/api/clearing").then((res) => {
      setThroneData(res.data[0]);

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
          setThroneData(res.data[0]);
        });
      } else {
        setRejectionCard(true);
      }
    }
  };

  const toggleDown = () => {
    axios.post("/api/changeLast", { last: "throne" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Castle");
      });
    });
  };

  const toggleGoDown = () => {
    setDownDown(true);
    setDownCharacter(false);
  };

  return (
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
      <div className="throne-body">
        <House />
        <div className="throne-top">
          <div className="throne-top-left">
            <div className="princess-hat"></div>
            <div className="princess-head">
              <div className="princess-hair-left"></div>
              <div className="princess-face">
                <div className="princess-hair-top-left"></div>
                <div className="princess-hair-top-right"></div>
                <div className="princess-eyes">
                  <div className="princess-eye">
                    <div className="princess-iris">
                      <div className="princess-pupil"></div>
                    </div>
                  </div>
                  <div className="princess-eye">
                    <div className="princess-iris">
                      <div className="princess-pupil"></div>
                    </div>
                  </div>
                </div>
                <div className="princess-nose"></div>
                <div className="princess-mouth"></div>
              </div>
              <div className="princess-hair-right"></div>
            </div>
            <div className="princess-body">
              <div className="princess-upper-neck"></div>
              <div className="princess-neck"></div>
              <div className="princess-dress">
                <div className="princess-arm-left">
                  <div className="princess-hand-left">
                    <div className="princess-finger-one"></div>
                    <div className="princess-finger-two"></div>
                    <div className="princess-finger-three"></div>
                    <div className="princess-finger-four"></div>
                    <div className="princess-finger-five"></div>
                  </div>
                </div>
                <div className="princess-arm-right">
                  <div className="princess-hand-left">
                    <div className="princess-finger-one"></div>
                    <div className="princess-finger-two"></div>
                    <div className="princess-finger-three"></div>
                    <div className="princess-finger-four"></div>
                    <div className="princess-finger-five"></div>
                  </div>
                </div>
              </div>
              <div className="princess-legs">
                <div className="princess-leg-left">
                  <div className="princess-foot"></div>
                </div>
                <div className="princess-leg-right">
                  <div className="princess-foot"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="throne-top-middle">
            <div className="throne-seat-div">
              <div className="throne-seat-top">
                <div className="throne-seat-top-left"></div>
                <div className="throne-seat-top-middle"></div>
                <div className="throne-seat-top-right"></div>
              </div>
              <div className="throne-seat-middle">
                <div className="throne-seat-middle-left"></div>
                <div className="throne-seat-middle-middle"></div>
                <div className="throne-seat-middle-right"></div>
              </div>
              <div className="throne-seat-middle-two">
                <div className="throne-seat-middle-left-two"></div>
                <div className="throne-seat-middle-middle-two"></div>
                <div className="throne-seat-middle-right-two"></div>
              </div>
              <div className="throne-seat-bottom">
                <div className="throne-seat-bottom-left"></div>
                <div className="throne-seat-bottom-right"></div>
              </div>
            </div>
            <div className="throne-step-top"></div>
            <div className="throne-step-middle"></div>
            <div className="throne-step-bottom"></div>
          </div>
          <div className="throne-top-right">
            <div className="axe-div">
              <div className="axe-head">
                <div className="axe-head-left"></div>
                <div className="axe-head-middle">
                  <div className="axe-tip"></div>
                  <div className="axe-head-handle"></div>
                </div>
                <div className="axe-head-right"></div>
              </div>
              <div className="axe-handle-top"></div>
              <div className="axe-handle-bottom">
                <div className="axe-handle-line"></div>
                <div className="axe-handle-line"></div>
                <div className="axe-handle-line"></div>
                <div className="axe-handle-line"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="throne-middle">
          <div className="throne-middle-left"></div>
          <div className="throne-middle-middle"></div>
          <div className="throne-middle-right"></div>
        </div>
        <div className="throne-bottom">
          <div className="throne-bottom-left"></div>
          <div className="throne-bottom-middle">
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
            <div className="throne-castle" onClick={toggleGoDown}>
              <h2>Castle</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="throne-bottom-right"></div>
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
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getInventory, logoutUser })(
  Throne
);
