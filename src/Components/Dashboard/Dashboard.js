import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Dashboard.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Character from "../Character/Character";
import Oldman from "../../Images/Oldman.jpg";
import Loading from "../Loading/Loading";

function Dashboard(props) {
  const [house, setHouse] = useState(false);
  const [newGameCardTwo, setNewGameCardTwo] = useState(false);
  const [oldmanCard, setOldmanCard] = useState(false);
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dragonAnimation, setDragonAnimation] = useState(false);
  const [dragonAnimationTwo, setDragonAnimationTwo] = useState(false);
  const [fireballAnimation, setFireballAnimation] = useState(false);
  const [downCharacter, setDownCharacter] = useState(false);
  const [upCharacter, setUpCharacter] = useState(false);
  const [leftCharacter, setLeftCharacter] = useState(false);
  const [rightCharacter, setRightCharacter] = useState(false);
  const [initialCharacter, setInitialCharacter] = useState(false);
  const [downLeft, setDownLeft] = useState(false);
  const [upLeft, setUpLeft] = useState(false);
  const [rightLeft, setRightLeft] = useState(false);
  const [leftLeft, setLeftLeft] = useState(false);
  const [downUp, setDownUp] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [downRight, setDownRight] = useState(false);
  const [upUp, setUpUp] = useState(false);
  const [upRight, setUpRight] = useState(false);
  const [upDown, setUpDown] = useState(false);
  const [rightUp, setRightUp] = useState(false);
  const [rightRight, setRightRight] = useState(false);
  const [rightDown, setRightDown] = useState(false);
  const [leftUp, setLeftUp] = useState(false);
  const [leftRight, setLeftRight] = useState(false);
  const [leftDown, setLeftDown] = useState(false);
  const [growCard, setGrowCard] = useState(true);
  const [screamCard, setScreamCard] = useState(false);
  const [maiden, setMaiden] = useState(false);
  const [phoenix, setPhoenix] = useState(false);
  const [miniHome, setMiniHome] = useState(false);
  const [burnt, setBurnt] = useState(true);
  const [lastCard, setLastCard] = useState(false);
  const [phoenixAnimationTwo, setPhoenixAnimationTwo] = useState(false);
  const [fireballAnimationTwo, setFireballAnimationTwo] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState();
  const [rejectionCard, setRejectionCard] = useState(false);
  const [homeCard, setHomeCard] = useState(false);

  useEffect(() => {
    axios.get("/api/dashboard").then((res) => {
      setDashboardData(res.data[0]);
      if (res.data[0].first_time) {
        setHouse(true);
        setBurnt(false);
      } else if (res.data[0].home_placed && !res.data[0].grow_used) {
        setMiniHome(true);
        setBurnt(false);
      } else if (res.data[0].grow_used) {
        setHouse(true);
        setBurnt(false);
      }
      axios.get("/api/inventory").then((res) => {
        props.getInventory(res.data);

        if (props.user.user.last === "login") {
          setInitialCharacter(true);
          setIsLoading(false);
        } else if (props.user.user.last === "dragon") {
          setDownCharacter(true);
          setIsLoading(false);
        } else if (props.user.user.last === "mountain") {
          setLeftCharacter(true);
          setIsLoading(false);
        } else if (props.user.user.last === "forest") {
          setRightCharacter(true);
          setIsLoading(false);
        } else if (props.user.user.last === "town") {
          setUpCharacter(true);
          setIsLoading(false);
        } else {
          axios.post("/api/changeLast", { last: "login" }).then((res) => {
            props.getUser(res.data);
            setInitialCharacter(true);
            setIsLoading(false);
          });
        }
      });
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
    if (item === "home") {
      axios.post("/api/placeHome").then(() => {
        axios.get("/api/dashboard").then((res) => {
          setDashboardData(res.data[0]);
          axios.get("/api/inventory").then((res) => {
            props.getInventory(res.data);
            setHomeCard(true);
          });
        });
      });
    } else if (item === "grow") {
      if (dashboardData.home_placed) {
        axios.post("/api/castGrow").then(() => {
          axios.get("/api/dashboard").then((res) => {
            setDashboardData(res.data[0]);
            axios.get("/api/inventory").then((res) => {
              props.getInventory(res.data);
            });
          });
        });
      } else {
        setRejectionCard(true);
      }
    } else {
      setRejectionCard(true);
    }
  };

  const toggleRight = () => {
    axios.post("/api/changeLast", { last: "home" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Forest");
      });
    });
  };

  const toggleLeft = () => {
    axios.post("/api/changeLast", { last: "home" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Mountain");
      });
    });
  };

  const toggleUp = () => {
    axios.post("/api/changeLast", { last: "home" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Town");
      });
    });
  };

  const toggleDown = () => {
    axios.post("/api/changeLast", { last: "home" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Dragon");
      });
    });
  };

  const toggleNewgame = () => {
    setBurnt(false);
    axios.post("/api/dashboardFirst").then((res) => {
      setDashboardData(res.data[0]);
      setDragonAnimation(true);
    });
  };

  const toggleGrowCard = () => {
    setGrowCard(false);
    setScreamCard(true);
  };

  const toggleScreamCard = () => {
    setScreamCard(false);
    setMaiden(true);
  };

  const toggleMaiden = () => {
    setMaiden(false);
    setPhoenix(true);
  };

  const toggleOldmanCard = () => {
    setOldmanCard(!oldmanCard);
  };

  const toggleAnswerOne = () => {
    toggleOldmanCard();
    setAnswerOne(!answerOne);
  };

  const toggleAnswerTwo = () => {
    toggleOldmanCard();
    setAnswerTwo(!answerTwo);
  };

  const toggleAnswerThree = () => {
    toggleOldmanCard();
    setAnswerThree(!answerThree);
  };

  const toggleAnswerFour = () => {
    toggleOldmanCard();
    setAnswerFour(!answerFour);
  };

  const toggleDragonAnimationEnd = () => {
    setFireballAnimation(true);
  };

  const togglePhoenixOne = () => {
    setFireballAnimationTwo(true);
  };

  const togglePhoenixAnimationTwoEnd = () => {
    setPhoenixAnimationTwo(false);
    setLastCard(true);
  };

  const toggleDragonAnimationTwoEnd = () => {
    setDragonAnimationTwo(false);
    setNewGameCardTwo(true);
  };

  const toggleFireballAnimation = () => {
    setFireballAnimation(false);
    setDragonAnimationTwo(true);
    setDragonAnimation(false);

    setHouse(false);
    setBurnt(true);
  };

  const toggleFireballAnimationTwo = () => {
    axios.post("/api/removeHome").then((res) => {
      setDashboardData(res.data[0]);
      setFireballAnimationTwo(false);
      setPhoenixAnimationTwo(true);
      setPhoenix(false);

      setHouse(false);
      setBurnt(true);
    });
  };

  const finalLogout = () => {
    axios.post("/api/removeGrow").then(() => {
      axios.delete("/api/logout").then(() => {
        props.logoutUser();
        props.history.push("/Auth");
      });
    });
  };

  const toggleGoLeft = () => {
    if (props.user.user.last === "login" || props.user.user.last === "dragon") {
      setDownLeft(true);
      setInitialCharacter(false);
      setDownCharacter(false);
    } else if (props.user.user.last === "mountain") {
      setLeftCharacter(false);
      setLeftLeft(true);
    } else if (props.user.user.last === "forest") {
      setRightCharacter(false);
      setRightLeft(true);
    } else if (props.user.user.last === "town") {
      setUpCharacter(false);
      setUpLeft(true);
    }
  };

  const toggleGoRight = () => {
    if (props.user.user.last === "login" || props.user.user.last === "dragon") {
      setDownRight(true);
      setInitialCharacter(false);
      setDownCharacter(false);
    } else if (props.user.user.last === "mountain") {
      setLeftCharacter(false);
      setLeftRight(true);
    } else if (props.user.user.last === "forest") {
      setRightCharacter(false);
      setRightRight(true);
    } else if (props.user.user.last === "town") {
      setUpCharacter(false);
      setUpRight(true);
    }
  };

  const toggleGoUp = () => {
    if (props.user.user.last === "login" || props.user.user.last === "dragon") {
      setDownUp(true);
      setInitialCharacter(false);
      setDownCharacter(false);
    } else if (props.user.user.last === "mountain") {
      setLeftCharacter(false);
      setLeftUp(true);
    } else if (props.user.user.last === "forest") {
      setRightCharacter(false);
      setRightUp(true);
    } else if (props.user.user.last === "town") {
      setUpCharacter(false);
      setUpUp(true);
    }
  };

  const toggleGoDown = () => {
    if (props.user.user.last === "login" || props.user.user.last === "dragon") {
      setDownDown(true);
      setInitialCharacter(false);
      setDownCharacter(false);
    } else if (props.user.user.last === "mountain") {
      setLeftCharacter(false);
      setLeftDown(true);
    } else if (props.user.user.last === "forest") {
      setRightCharacter(false);
      setRightDown(true);
    } else if (props.user.user.last === "town") {
      setUpCharacter(false);
      setUpDown(true);
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
      <div className="dashboard-body">
        <div className="dashboard-top">
          <div className="dashboard-top-left">
            <div className="triangle"></div>
          </div>
          <div className="dashboard-top-middle">
            <div className="dashboard-town" onClick={toggleGoUp}>
              <ArrowUpward />
              <h2>Town</h2>
            </div>
            <div
              className={`${
                upCharacter ? "character-up" : "character-up-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${upLeft ? "up-left" : "up-left-closed"}`}
              onAnimationEnd={toggleLeft}
            >
              <Character />
            </div>
            <div
              className={`${upUp ? "up-up" : "up-up-closed"}`}
              onAnimationEnd={toggleUp}
            >
              <Character />
            </div>
            <div
              className={`${upRight ? "up-right" : "up-right-closed"}`}
              onAnimationEnd={toggleRight}
            >
              <Character />
            </div>
            <div
              className={`${upDown ? "up-down" : "up-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
          </div>
          <div className="dashboard-top-right">
            <img
              src={Oldman}
              alt="Old man"
              className="dashboard-old-man"
              onClick={toggleOldmanCard}
            />
          </div>
        </div>
        <div className="dashboard-middle">
          <div className="dashboard-middle-left">
            <div className="dashboard-mountains" onClick={toggleGoLeft}>
              <ArrowBack />
              <h2>Mountains</h2>
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
              className={`${leftUp ? "left-up" : "left-up-closed"}`}
              onAnimationEnd={toggleUp}
            >
              <Character />
            </div>
            <div
              className={`${leftRight ? "left-right" : "left-right-closed"}`}
              onAnimationEnd={toggleRight}
            >
              <Character />
            </div>
            <div
              className={`${leftDown ? "left-down" : "left-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
          </div>
          <div
            className={`${
              burnt && !dashboardData.home_placed
                ? "burned-house"
                : "burned-house-closed"
            }`}
          ></div>
          <div
            className={`${
              house || (dashboardData.grow_used && dashboardData.home_placed)
                ? "house"
                : "house-closed"
            }`}
          ></div>
          <div
            className={`${
              (miniHome || dashboardData.home_placed) &&
              !dashboardData.grow_used
                ? "mini-house"
                : "mini-house-closed"
            }`}
          ></div>

          <div className="dashboard-middle-right">
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
              className={`${rightUp ? "right-up" : "right-up-closed"}`}
              onAnimationEnd={toggleUp}
            >
              <Character />
            </div>
            <div
              className={`${rightRight ? "right-right" : "right-right-closed"}`}
              onAnimationEnd={toggleRight}
            >
              <Character />
            </div>
            <div
              className={`${rightDown ? "right-down" : "right-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
            <div className="dashboard-forest" onClick={toggleGoRight}>
              <h2>Forest</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="dashboard-bottom">
          <div className="dashboard-bottom-left">
            <div
              className={`${dragonAnimation ? "dragon" : "dragon-closed"}`}
              onAnimationEnd={toggleDragonAnimationEnd}
            >
              <div
                className={`${
                  fireballAnimation ? "fireball" : "fireball-closed"
                }`}
                onAnimationEnd={toggleFireballAnimation}
              ></div>
            </div>

            <div
              className={`${
                dragonAnimationTwo ? "dragonTwo" : "dragonTwo-closed"
              }`}
              onAnimationEnd={toggleDragonAnimationTwoEnd}
            ></div>
            <div
              className={`${phoenix ? "phoenix" : "phoenix-closed"}`}
              onAnimationEnd={togglePhoenixOne}
            >
              <div
                className={`${
                  fireballAnimationTwo ? "fireballTwo" : "fireballTwo-closed"
                }`}
                onAnimationEnd={toggleFireballAnimationTwo}
              ></div>
            </div>
            <div
              className={`${
                phoenixAnimationTwo ? "phoenixTwo" : "phoenixTwo-closed"
              }`}
              onAnimationEnd={togglePhoenixAnimationTwoEnd}
            ></div>
          </div>
          <div className="dashboard-bottom-middle">
            <div
              className={`${
                downCharacter ? "character-down" : "character-down-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${
                initialCharacter
                  ? "character-initial"
                  : "character-initial-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${downLeft ? "down-left" : "down-left-closed"}`}
              onAnimationEnd={toggleLeft}
            >
              <Character />
            </div>
            <div
              className={`${downUp ? "down-up" : "down-up-closed"}`}
              onAnimationEnd={toggleUp}
            >
              <Character />
            </div>
            <div
              className={`${downRight ? "down-right" : "down-right-closed"}`}
              onAnimationEnd={toggleRight}
            >
              <Character />
            </div>
            <div
              className={`${downDown ? "down-down" : "down-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
            <div className="dashboard-dragon" onClick={toggleGoDown}>
              <h2>Dragon's Lair</h2>
              <ArrowDownward />
            </div>
            <div
              className={`${maiden ? "maiden" : "maiden-closed"}`}
              onAnimationEnd={toggleMaiden}
            ></div>
          </div>
          <div className="dashboard-bottom-right"></div>
        </div>
      </div>
      <Card
        className={`${
          dashboardData.first_time ? "component-card" : "component-card-closed"
        }`}
      >
        <Typography variant="h4" color="primary">
          Welcome to {props.user.user.name}'s Quest
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="component-card-description"
        >
          {props.user.user.name}, you have recently come of age and have
          ventured far from your parents and the home of your youth to make a
          name for yourself. Using all the coins you have saved up in life you
          have bought a surprisingly cheap home. Everything seems perfect.
        </Typography>
        <Button onClick={toggleNewgame} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          newGameCardTwo ? "component-card" : "component-card-closed"
        }`}
      >
        <Typography variant="h4" color="primary">
          Oh boy!!!
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="component-card-description"
        >
          What are you supposed to do now? You have no home, no coins, and no
          friends. How will you survive? More importantly, how will you slay the
          cursed dragon that ruined your life?
        </Typography>
        <Button
          onClick={() => setNewGameCardTwo(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>

      <Card
        className={`${oldmanCard ? "component-card" : "component-card-closed"}`}
      >
        <Typography variant="h4" color="primary">
          I saw the dragon burn your house poor boy. What would you like to know
          about?
        </Typography>
        <List className="component-list">
          <ListItem onClick={toggleAnswerOne}>The Dragon</ListItem>
          <ListItem onClick={toggleAnswerTwo}>The Forest</ListItem>
          <ListItem onClick={toggleAnswerThree}>The Mountains</ListItem>
          <ListItem onClick={toggleAnswerFour}>The Town</ListItem>
        </List>
        <Button onClick={toggleOldmanCard} variant="contained" color="primary">
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Dragon
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The cursed dragon has plagued this realm for far too long. Many have
          tried to slay him but they all ended up the dragon's lunch. If you
          want my advice, stay away.
        </Typography>
        <Button onClick={toggleAnswerOne} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Forest
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The forest is a scary place full of ravenous beasts and other dangers.
          You'd be wise to avoid it.
        </Typography>
        <Button onClick={toggleAnswerTwo} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Mountains
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The Mountains are cold and treacherous. Do not go there unless you are
          prepared.
        </Typography>
        <Button onClick={toggleAnswerThree} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Town
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The town is as unfriendly as the rest of this realm. If you don't have
          coins there is no place for you there.
        </Typography>
        <Button onClick={toggleAnswerFour} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          dashboardData.grow_used && growCard
            ? "answer-card"
            : "answer-card-closed"
        }`}
      >
        <Typography variant="h4" color="primary">
          As you read the scroll it disappears. The home grows until it is the perfect size for you!
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Not only have you slain the dragon, you have a beautiful new
          home. You are free to start the peaceful life you long
          for. You win! Right?
        </Typography>
        <Button onClick={toggleGrowCard} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${screamCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Aaaaahhh!
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Help!!! Our village has been overrun by phoenixes!
        </Typography>
        <Button onClick={toggleScreamCard} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${lastCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Here we go again!
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The end?
        </Typography>
        <Button onClick={finalLogout} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
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
      <Card className={`${homeCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          You place the model of a home where your home used to be. Now what?
        </Typography>
        <Button
          onClick={() => setHomeCard(false)}
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
export default connect(mapStateToProps, {
  getUser,
  getInventory,
  logoutUser,
})(Dashboard);
