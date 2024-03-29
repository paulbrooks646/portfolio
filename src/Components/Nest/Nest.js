import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Nest.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowForward from "@material-ui/icons/ArrowForward";

function Nest(props) {
  const [failure, setFailure] = useState(false);
  const [coinSuccess, setCoinSuccess] = useState(false);
  const [ribbonSuccess, setRibbonSuccess] = useState(false);
  const [featherSuccess, setFeatherSuccess] = useState(false);
  const [griffin, setGriffin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rightCharacter, setRightCharacter] = useState(false);
  const [rightRight, setRightRight] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [nestData, setNestData] = useState();
  const [ropeCard, setRopeCard] = useState(false);
  const [firstTimeCard, setFirstTimeCard] = useState(false);

  useEffect(() => {
    axios.get("/api/nest").then((res) => {
      if (res.data[0].first_time) {
        setFirstTimeCard(true);
      }
      setNestData(res.data[0]);
      setRightCharacter(true);
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
    if (item === "rope") {
      axios.post("/api/useRope").then((res) => {
        props.getInventory(res.data);
      });
      axios.get("/api/nest").then((res) => {
        setNestData(res.data[0]);
        setRopeCard(true);
      });
    } else {
      setRejectionCard(true);
    }
  };

  const toggleRight = () => {
    axios.post("/api/changeLast", { last: "nest" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Mountain");
      });
    });
  };

  const toggleFirst = () => {
    axios.post("/api/nestFirst").then((res) => {
      setNestData(res.data[0]);
      setFirstTimeCard(false);
    });
  };

  const toggleCoin = () => {
    if (nestData.rope_used) {
      axios.post("/api/coin").then((res) => {
        props.getUser(res.data);
        axios.post("/api/nestCoin").then((res) => {
          setNestData(res.data[0]);
          setCoinSuccess(true);
        });
      });
    } else {
      setGriffin(true);
    }
  };

  const toggleRibbon = () => {
    if (nestData.rope_used) {
      axios.post("/api/ribbon").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/nest").then((res) => {
          setNestData(res.data[0]);
          setRibbonSuccess(true);
        });
      });
    } else {
      setGriffin(true);
    }
  };

  const toggleFeather = () => {
    if (nestData.rope_used) {
      axios.post("/api/feather").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/nest").then((res) => {
          setNestData(res.data[0]);
          setFeatherSuccess(true);
        });
      });
    } else {
      setGriffin(true);
    }
  };

  const toggleAnimationEnd = () => {
    setGriffin(false);
    setFailure(true);
  };

  const toggleGoRight = () => {
    setRightCharacter(false);
    setRightRight(true);
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
      <div className="nest-body">
        <div className="nest-top">
          <div className="nest-top-left">
            <div
              className={`${griffin ? "griffin-open" : "griffin-closed"}`}
              onAnimationEnd={toggleAnimationEnd}
            ></div>
          </div>
          <div className="nest-top-middle"></div>
          <div className="nest-top-right"></div>
        </div>
        <div className="nest-middle">
          <div className="nest-middle-left">
            <div className="nest-twig-div">
              <div className="nest-twig-horizontal">
                <div className="nest-twig-one"></div>
                <div className="nest-twig-two"></div>
                <div className="nest-twig-three"></div>
                <div className="nest-twig-four"></div>
                <div className="nest-twig-five"></div>
                <div className="nest-twig-six"></div>
                <div className="nest-twig-seven"></div>
                <div className="nest-twig-eight"></div>
                <div className="nest-twig-nine"></div>
                <div className="nest-twig-ten"></div>
              </div>
              <div className="nest-twig-vertical">
                <div className="nest-twig-eleven"></div>
                <div className="nest-twig-twelve"></div>
                <div className="nest-twig-thirteen"></div>
                <div className="nest-twig-fourteen"></div>
                <div className="nest-twig-fifteen"></div>
                <div className="nest-twig-sixteen"></div>
                <div className="nest-twig-seventeen"></div>
                <div className="nest-twig-eighteen"></div>
                <div className="nest-twig-nineteen"></div>
                <div className="nest-twig-twenty"></div>
              </div>
              <div className="nest-twig-diagonal">
                <div className="nest-twig-eleven"></div>
                <div className="nest-twig-twelve"></div>
                <div className="nest-twig-thirteen"></div>
                <div className="nest-twig-fourteen"></div>
                <div className="nest-twig-fifteen"></div>
                <div className="nest-twig-sixteen"></div>
                <div className="nest-twig-seventeen"></div>
                <div className="nest-twig-eighteen"></div>
                <div className="nest-twig-nineteen"></div>
                <div className="nest-twig-twenty"></div>
              </div>
              <div className="nest-twig-diagonal-two">
                <div className="nest-twig-eleven"></div>
                <div className="nest-twig-twelve"></div>
                <div className="nest-twig-thirteen"></div>
                <div className="nest-twig-fourteen"></div>
                <div className="nest-twig-fifteen"></div>
                <div className="nest-twig-sixteen"></div>
                <div className="nest-twig-seventeen"></div>
                <div className="nest-twig-eighteen"></div>
                <div className="nest-twig-nineteen"></div>
                <div className="nest-twig-twenty"></div>
              </div>
            </div>
            <div className="feather-div">
              <div
                className={`${
                  nestData.feather_taken
                    ? "nest-feather-closed"
                    : "nest-feather"
                }`}
                onClick={toggleFeather}
              >
                <div className="feather-main">
                  <div className="feather-left">
                    <div className="feather-line"></div>
                    <div className="feather-line"></div>
                    <div className="feather-line"></div>
                    <div className="feather-line"></div>
                    <div className="feather-line"></div>
                  </div>
                  <div className="feather-middle"></div>
                  <div className="feather-right">
                    <div className="feather-line"></div>
                    <div className="feather-line"></div>
                    <div className="feather-line"></div>
                    <div className="feather-line"></div>
                    <div className="feather-line"></div>
                  </div>
                </div>
                <div className="feather-bottom"></div>
              </div>
            </div>
            <div className="coin-div">
              <div
                className={`${
                  nestData.coin_taken ? "nest-coin-closed" : "nest-coin"
                }`}
                onClick={toggleCoin}
              ></div>
            </div>
            <div className="ribbon-div">
              <div
                className={`${
                  nestData.ribbon_taken ? "nest-ribbon-closed" : "nest-ribbon"
                }`}
                onClick={toggleRibbon}
              ></div>
            </div>
          </div>
          <div className="nest-middle-middle"></div>
          <div className="nest-middle-right">
            <div
              className={`${
                rightCharacter ? "character-right" : "character-right-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${rightRight ? "right-right" : "right-right-closed"}`}
              onAnimationEnd={toggleRight}
            >
              <Character />
            </div>
            <div className="nest-mountains" onClick={toggleGoRight}>
              <h2>Mountains</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="nest-bottom">
          <div className="nest-bottom-left"></div>
          <div className="nest-bottom-middle"></div>
          <div className="nest-bottom-right"></div>
        </div>
      </div>
      <Card
        className={`${firstTimeCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You climb the steep cliff. Up ahead you see the massive griffin's
          nest. You look around tenatively for the owner of the nest.
        </Typography>
        <Button onClick={toggleFirst} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${coinSuccess ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You pick up the shiny gold coin.
        </Typography>
        <Button
          onClick={() => setCoinSuccess(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${ribbonSuccess ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You pick up the beautiful blue ribbon.
        </Typography>
        <Button
          onClick={() => setRibbonSuccess(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${featherSuccess ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You pick up the large griffin feather.
        </Typography>
        <Button
          onClick={() => setFeatherSuccess(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${failure ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          A huge Griffin swoops out of the air. You barely manage to dodge its
          attack. You need to find something to help you climb to the nest more
          quickly.
        </Typography>
        <Button
          onClick={() => setFailure(false)}
          variant="contained"
          color="primary"
        >
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
      <Card className={`${ropeCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          You tie one end of your rope into a knot and hurl it at the nest. The
          knot gets wedged amid the branches. Using the rope you might be able
          to get to the nest before the griffin can attack.
        </Typography>
        <Button
          onClick={() => setRopeCard(false)}
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
  Nest
);
