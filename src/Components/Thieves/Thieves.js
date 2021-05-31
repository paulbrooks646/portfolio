import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import axios from "axios";
import "./Thieves.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import House from "../House/House";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { getInventory } from "../../redux/inventoryReducer";

function Thieves(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
   const [answerFive, setAnswerFive] = useState(false);
   const [answerSix, setAnswerSix] = useState(false);
   const [answerSeven, setAnswerSeven] = useState(false);
   const [answerEight, setAnswerEight] = useState(false);
   const [answerNine, setAnswerNine] = useState(false);
  const [leftCharacter, setLeftCharacter] = useState(false);
  const [leftLeft, setLeftLeft] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [thievesData, setThievesData] = useState();

  useEffect(() => {
    // if (!props.user.user.newgame) {
    //   setNewgameCard(false);

    // }
    axios.get("/api/nest").then((res) => {
      setThievesData(res.data[0]);
      setLeftCharacter(true);
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
          setThievesData(res.data[0]);
        });
      } else {
        setRejectionCard(true);
      }
    }
  };

  const toggleLeft = () => {
    axios.post("/api/changeLast", { last: "thieves" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Alley");
      });
    });
  };

  const toggleGoLeft = () => {
    setLeftCharacter(false);
    setLeftLeft(true);
  };

  const toggleAnswerOne = () => {
    toggleGuard();
    setAnswerOne(!answerOne);
  };

  const toggleAnswerTwo = () => {
    toggleGuard();
    setAnswerTwo(!answerTwo);
  };

  const toggleAnswerThree = () => {
    toggleGuard();
    setAnswerThree(!answerThree);
  };

  const toggleAnswerFour = () => {
    toggleGuard();
    setAnswerFour(!answerFour);
  };

  const toggleAnswerFive = () => {
    toggleGuard();
    setAnswerFive(!answerFive);
  };

  const toggleAnswerSix = () => {
    toggleGuard();
    setAnswerSix(!answerSix);
  };

  const toggleAnswerSeven = () => {
    toggleGuard();
    setAnswerSeven(!answerSeven);
  };

  const toggleAnswerEight = () => {
    toggleGuard();
    setAnswerEight(!answerEight);
  };

  const toggleAnswerNine = () => {
    toggleGuard();
    setAnswerNine(!answerNine);
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
      <House />
      <div className="thieves-middle-left">
        <div className="thieves-alley" onClick={toggleGoLeft}>
          <ArrowBack />
          <h2>Alley</h2>
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
      </div>
      <div className="thieves-middle-middle"></div>
      <div className="thieves-middle-right">
        <div className="thief">
          <div className="thief-hat"></div>
          <div className="thief-head">
            <div className="thief-hair-left"></div>
            <div className="thief-face">
              <div className="thief-hair-top-left"></div>
              <div className="thief-hair-top-right"></div>
              <div className="thief-eyes">
                <div className="thief-eye">
                  <div className="thief-iris">
                    <div className="thief-pupil"></div>
                  </div>
                </div>
                <div className="thief-eye">
                  <div className="thief-iris">
                    <div className="thief-pupil"></div>
                  </div>
                </div>
              </div>
              <div className="thief-nose"></div>
              <div className="thief-mouth"></div>
            </div>
            <div className="thief-hair-right"></div>
          </div>

          <div className="thief-body">
            <div className="thief-upper-neck"></div>
            <div className="thief-neck"></div>
            <div className="thief-dress">
              <div className="thief-shirt"></div>
              <div className="thief-pants-div"></div>
            </div>
            <div className="thief-legs">
              <div className="thief-leg-left">
                <div className="thief-foot"></div>
              </div>
              <div className="thief-leg-right">
                <div className="thief-foot"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="thieves-bottom-left"></div>
      <div className="thieves-bottom-middle"></div>
      <div className="thieves-bottom-right"></div>

      <div className="thieves-sign">
        THIEVES GUILD<h2 className="thieves-anti">ANTI</h2>
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
  Thieves
);
