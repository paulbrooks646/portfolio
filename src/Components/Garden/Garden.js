import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Garden.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import Fairy from "../../Images/Fairy.png";

function Garden(props) {
  const [rightCharacter, setRightCharacter] = useState(false);
  const [rightRight, setRightRight] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fairy, setFairy] = useState(false);
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [rejectionCardTwo, setRejectionCardTwo] = useState(false);
  const [flowerRetrievalCard, setFlowerRetrievalCard] = useState(false);
  const [gardenData, setGardenData] = useState()
  const [inventoryOpen, setInventoryOpen] = useState(false)

  useEffect(() => {
    axios.get("/api/garden").then((res) => {
      setGardenData(res.data[0]);
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
    if (item === "flute") {
      if (props.location.pathname === "/Tower") {
        axios.post("/api/useFlute").then((res) => {
          setGardenData(res.data[0]);
          ;
        });
      } else {
        setRejectionCard(true);
      }
    }
  };

  const toggleRight = () => {
    axios.post("/api/changeLast", { last: "garden" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Castle");
      });
    });
  };

  const toggleFairy = () => {
    if (gardenData.manure_given === true) {
      setFairy(!fairy);
    } else {
      setRejectionCardTwo(true);
    }
  };

  const toggleAnswerOne = () => {
    toggleFairy();
    setAnswerOne(!answerOne);
  };

  const toggleAnswerTwo = () => {
    toggleFairy();
    setAnswerTwo(!answerTwo);
  };

  const toggleAnswerThree = () => {
    toggleFairy();
    setAnswerThree(!answerThree);
  };

  const toggleAnswerFour = () => {
    toggleFairy();
    setAnswerFour(!answerFour);
  };

  const toggleRejectionCard = () => {
    if (
      gardenData.manure_given === true &&
      gardenData.flowers_taken === false
    ) {
      axios.post("/api/flowers").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/garden").then((res) => {
          setGardenData(res.data[0]);
          setFlowerRetrievalCard(true);
        });
      });
    } else {
      setRejectionCard(true);
    }
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
      <div className="garden-body">
        <div className="garden-top" onClick={toggleRejectionCard}>
          <div className="garden-top-left"></div>
          <div className="garden-top-middle"></div>
          <div className="garden-top-right"></div>
        </div>
        <div className="garden-middle">
          <div className="garden-middle-left"></div>
          <div className="garden-middle-middle">
            <img
              src={Fairy}
              className="garden-fairy"
              alt="fairy"
              onClick={toggleFairy}
            />
          </div>
          <div className="garden-middle-right">
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
            <div className="garden-castle" onClick={toggleGoRight}>
              <h2>Castle</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="garden-bottom" onClick={toggleRejectionCard}>
          <div className="garden-bottom-left"></div>
          <div className="garden-bottom-middle"></div>
          <div className="garden-bottom-right"></div>
        </div>
      </div>
      <Card className={`${fairy ? "component-card" : "component-card-closed"}`}>
        <Typography variant="h5" color="primary">
          What would you like to know about?
        </Typography>
        <List className="component-list">
          <ListItem onClick={toggleAnswerOne}>The Dragon</ListItem>
          <ListItem onClick={toggleAnswerTwo}>Faeries</ListItem>
          <ListItem onClick={toggleAnswerThree}>Flowers</ListItem>
          <ListItem onClick={toggleAnswerFour}>Magical Creatures</ListItem>
        </List>
        <Button onClick={toggleFairy} variant="contained" color="primary">
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
          Unlike most magical creatures, dragons are destructive.
        </Typography>
        <Button onClick={toggleAnswerOne} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Fairies
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Unlike humans, fairies take care of nature.
        </Typography>
        <Button onClick={toggleAnswerTwo} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Flowers
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I'm warning you. These flowers are to look at, not to touch!
        </Typography>
        <Button onClick={toggleAnswerThree} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Magical Creatures
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          There are many magical creatures. If you want to meet more of them go
          to the magical glade.
        </Typography>
        <Button onClick={toggleAnswerFour} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${rejectionCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Don't touch the flowers!!!
        </Typography>
        <Button
          onClick={() => setRejectionCard(false)}
          className="castle-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${rejectionCardTwo ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          In case you hadn't noticed, I am far too busy to talk to you.
        </Typography>
        <Button
          onClick={() => setRejectionCardTwo(false)}
          className="castle-card-button"
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          flowerRetrievalCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You quickly pick the most beautiful flowers you can find before the
          fairy changes her mind.
        </Typography>
        <Button
          onClick={() => setFlowerRetrievalCard(false)}
          className="castle-card-button"
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
export default connect(mapStateToProps, { getUser, getInventory })(
  Garden
);
