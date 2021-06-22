import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Market.scss";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Casa from "../../Images/Casa/Casa";
import Loading from "../Loading/Loading";
import Character from "../Character/Character";

function Market(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [rightLeft, setRightLeft] = useState(false);
  const [leftLeft, setLeftLeft] = useState(false);
  const [rightRight, setRightRight] = useState(false);
  const [leftRight, setLeftRight] = useState(false);
  const [leftCharacter, setLeftCharacter] = useState(false);
  const [rightCharacter, setRightCharacter] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [marketData, setMarketData] = useState({});
  const [firstTimeCard, setFirstTimeCard] = useState(false);
  const [coinCard, setCoinCard] = useState(false);

  useEffect(() => {
    axios.get("/api/market").then((res) => {
      if (res.data[0].first_time) {
        setFirstTimeCard(true);
      }
      setMarketData(res.data[0]);
      if (props.user.user.last === "town") {
        setLeftCharacter(true);
      } else if (props.user.user.last === "alley") {
        setRightCharacter(true);
      }
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

  const toggleFirst = () => {
    axios.post("/api/marketFirst").then((res) => {
      setMarketData(res.data[0]);
      setFirstTimeCard(false);
    });
  };

  const toggleCoin = () => {
    axios.post("/api/marketCoin").then((res) => {
      setMarketData(res.data[0]);
      axios.post("/api/coin").then((res) => {
        props.getUser(res.data);
        setCoinCard(true);
      });
    });
  };

  const toggleCoinTwo = () => {
    axios.post("/api/marketCoinTwo").then((res) => {
      setMarketData(res.data[0]);
      axios.post("/api/coin").then((res) => {
        props.getUser(res.data);
        setCoinCard(true);
      });
    });
  };

  const toggleItem = (item) => {
    setRejectionCard(true);
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
      <div className="market-body">
        <div className="market-top">
          <div
            className={!marketData.coin_taken ? "sky-coin" : "sky-coin-closed"}
            onClick={toggleCoin}
          ></div>
          <div className="blacksmith-div" onClick={toggleBlack}>
            <Casa />
            <h2 className="store-sign">Blacksmith</h2>
          </div>
          <div className="magic-store-div" onClick={toggleMagic}>
            <Casa />
            <h2 className="store-sign">Magic Shop</h2>
          </div>
          <div className="grocer-div" onClick={toggleGrocer}>
            <Casa />
            <h2 className="store-sign">Grocer</h2>
          </div>

          <div className="store-div" onClick={toggleGeneral}>
            <Casa />
            <h2 className="store-sign">General Store</h2>
          </div>
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
          <div className="market-middle-middle">
            <div
              className={
                !marketData.coin_two_taken ? "dirt-coin" : "dirt-coin-closed"
              }
              onClick={toggleCoinTwo}
            ></div>
          </div>
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
        <div className="market-bottom"></div>
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
      <Card className={`${coinCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You find a shiny gold coin.
        </Typography>
        <Button
          onClick={() => setCoinCard(false)}
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
          The market is surprisingly quiet. I guess its hard for people to buy anything
          if they don't have coins.
        </Typography>
        <Button onClick={toggleFirst} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getInventory, logoutUser })(
  Market
);
