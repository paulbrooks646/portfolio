import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
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

function Garden(props) {
  const [rightCharacter, setRightCharacter] = useState(false);
  const [rightRight, setRightRight] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gardener, setGardener] = useState(false);
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [rejectionCardTwo, setRejectionCardTwo] = useState(false);
  const [rejectionCardThree, setRejectionCardThree] = useState(false);
  const [flowerRetrievalCard, setFlowerRetrievalCard] = useState(false);
  const [gardenData, setGardenData] = useState({});
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [firstTimeCard, setFirstTimeCard] = useState(false);
  const [manureCard, setManureCard] = useState(false);
  const [coinCard, setCoinCard] = useState(false);

  useEffect(() => {
    axios.get("/api/garden").then((res) => {
      if (res.data[0].first_time) {
        setFirstTimeCard(true);
      }
      setGardenData(res.data[0]);
      setRightCharacter(true);
      setIsLoading(false);
    });
  }, []);

  const toggleFirst = () => {
    axios.post("/api/gardenFirst").then((res) => {
      setGardenData(res.data[0]);
      setFirstTimeCard(false);
    });
  };

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
    if (item === "manure") {
      axios.post("/api/manureGiven").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/garden").then((res) => {
          setGardenData(res.data[0]);
          axios.post("/api/coin").then((res) => {
            props.getUser(res.data);
            setManureCard(true);
          });
        });
      });
    } else {
      setRejectionCard(true);
    }
  };

  const toggleRight = () => {
    axios.post("/api/changeLast", { last: "garden" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Castle");
      });
    });
  };

  const toggleGardener = () => {
    if (gardenData.manure_given === true) {
      setGardener(!gardener);
    } else {
      setRejectionCardTwo(true);
    }
  };

  const toggleAnswerOne = () => {
    toggleGardener();
    setAnswerOne(!answerOne);
  };

  const toggleAnswerTwo = () => {
    toggleGardener();
    setAnswerTwo(!answerTwo);
  };

  const toggleAnswerThree = () => {
    toggleGardener();
    setAnswerThree(!answerThree);
  };

  const toggleAnswerFour = () => {
    toggleGardener();
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
      setRejectionCardThree(true);
    }
  };

  const toggleGoRight = () => {
    setRightCharacter(false);
    setRightRight(true);
  };

  const toggleRose = () => {
    if (gardenData.manure_given) {
      axios.post("/api/flowers").then(res => {
        props.getInventory(res.data)
        axios.get("/api/garden").then(res => {
          setGardenData(res.data[0])
          setFlowerRetrievalCard(true)
        })
      })
    } else {
      setRejectionCardThree(true)
    }
  };
  const toggleCoin = () => {
    axios.post("/api/gardenCoin").then(res => {
      setGardenData(res.data[0])
      axios.post("/api/coin").then(res => {
        props.getUser(res.data)
        setCoinCard(true)
      })
    })
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
          <div className="garden-top-left">
            <div
              className="watermelon-plot"
              onClick={() => setRejectionCardThree(true)}
            >
              <div className="watermelon-top-row">
                <div className="watermelon"></div>
                <div className="watermelon"></div>
                <div className="watermelon"></div>
              </div>
              <div className="watermelon-bottom-row">
                <div className="watermelon"></div>
                <div className="watermelon"></div>
                <div className="watermelon"></div>
              </div>
            </div>
          </div>
          <div className="garden-top-middle">
            <div
              className="pea-plot"
              onClick={() => setRejectionCardThree(true)}
            >
              <div className="pea-top-row">
                <div className="pea"></div>
                <div className="pea"></div>
                <div className="pea"></div>
              </div>
              <div className="pea-bottom-row">
                <div className="pea"></div>
                <div className="pea"></div>
                <div className="pea"></div>
              </div>
            </div>
          </div>
          <div className="garden-top-right">
            <div
              className="carrot-plot"
              onClick={() => setRejectionCardThree(true)}
            >
              <div className="carrot-top-row">
                <div className="carrot-div">
                  <div className="carrot">
                    <div className="carrot-leaf-one"></div>
                    <div className="carrot-leaf-two"></div>
                    <div className="carrot-leaf-three"></div>
                    <div className="carrot-leaf-four"></div>
                  </div>
                </div>
                <div className="carrot-div">
                  <div className="carrot">
                    <div className="carrot-leaf-one"></div>
                    <div className="carrot-leaf-two"></div>
                    <div className="carrot-leaf-three"></div>
                    <div className="carrot-leaf-four"></div>
                  </div>
                </div>
                <div className="carrot-div">
                  <div className="carrot">
                    <div className="carrot-leaf-one"></div>
                    <div className="carrot-leaf-two"></div>
                    <div className="carrot-leaf-three"></div>
                    <div className="carrot-leaf-four"></div>
                  </div>
                </div>
              </div>
              <div className="carrot-bottom-row">
                <div className="carrot-div">
                  <div className="carrot">
                    <div className="carrot-leaf-one"></div>
                    <div className="carrot-leaf-two"></div>
                    <div className="carrot-leaf-three"></div>
                    <div className="carrot-leaf-four"></div>
                  </div>
                </div>
                <div className="carrot-div">
                  <div className="carrot">
                    <div className="carrot-leaf-one"></div>
                    <div className="carrot-leaf-two"></div>
                    <div className="carrot-leaf-three"></div>
                    <div className="carrot-leaf-four"></div>
                  </div>
                </div>
                <div className="carrot-div">
                  <div className="carrot">
                    <div className="carrot-leaf-one"></div>
                    <div className="carrot-leaf-two"></div>
                    <div className="carrot-leaf-three"></div>
                    <div className="carrot-leaf-four"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="garden-middle">
          <div className="garden-middle-left">
            <div className="rose-plot">
              <div className="rose-top-row">
                <div className="rose-div">
                  <div className="rose"></div>
                  <div className="rose-stem"></div>
                </div>
                <div className="rose-div">
                  <div className="rose"></div>
                  <div className="rose-stem"></div>
                </div>
                <div className="rose-div">
                  <div className="rose"></div>
                  <div className="rose-stem"></div>
                </div>
              </div>
              <div className="rose-bottom-row">
                <div className="rose-div">
                  <div className="rose"></div>
                  <div className="rose-stem"></div>
                </div>
                <div
                  className={`${
                    !gardenData.flowers_taken
                      ? "special-rose-div"
                      : "rose-div-closed"
                  }`}
                  onClick={toggleRose}
                >
                  <div className="rose"></div>
                  <div className="rose-stem"></div>
                </div>
                <div
                  className={`${
                    gardenData.flowers_taken && !gardenData.coin_taken
                      ? "coin"
                      : "coin-closed"
                  }`}
                  onClick={toggleCoin}
                ></div>
                <div className="rose-div">
                  <div className="rose"></div>
                  <div className="rose-stem"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="garden-middle-middle">
            <div className="gardener" onClick={toggleGardener}>
              <div className="gardener-head">
                <div className="gardener-hair-left"></div>
                <div className="gardener-face">
                  <div className="gardener-hair-top-left"></div>
                  <div className="gardener-hair-top-right"></div>
                  <div className="gardener-eyes">
                    <div className="gardener-eye">
                      <div className="gardener-iris"></div>
                    </div>
                    <div className="gardener-eye">
                      <div className="gardener-iris"></div>
                    </div>
                  </div>
                  <div className="gardener-nose"></div>
                  <div className="gardener-mouth"></div>
                </div>
                <div className="gardener-hair-right"></div>
              </div>
              <div className="gardener-body">
                <div className="gardener-upper-neck"></div>
                <div className="gardener-neck"></div>
                <div className="gardener-dress">
                  <div className="gardener-shirt"></div>
                  <div className="gardener-pants-div"></div>
                </div>
                <div className="gardener-legs">
                  <div className="gardener-leg-left">
                    <div className="gardener-foot"></div>
                  </div>
                  <div className="gardener-leg-right">
                    <div className="gardener-foot"></div>
                  </div>
                </div>
              </div>
              <div className="gardener-left-arm">
                <div className="gardener-left-hand"></div>
              </div>
              <div className="gardener-right-arm">
                <div className="gardener-right-hand"></div>
              </div>
            </div>
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
          <div className="garden-bottom-left">
            <div
              className="daisy-plot"
              onClick={() => setRejectionCardThree(true)}
            >
              <div className="daisy-top-row">
                <div className="daisy-div">
                  <div className="daisy">
                    <div className="daisy-petal-one"></div>
                    <div className="daisy-petal-two"></div>
                    <div className="daisy-petal-three"></div>
                    <div className="daisy-petal-four"></div>
                    <div className="daisy-petal-five"></div>
                  </div>
                  <div className="daisy-stem"></div>
                </div>
                <div className="daisy-div">
                  <div className="daisy">
                    <div className="daisy-petal-one"></div>
                    <div className="daisy-petal-two"></div>
                    <div className="daisy-petal-three"></div>
                    <div className="daisy-petal-four"></div>
                    <div className="daisy-petal-five"></div>
                  </div>
                  <div className="daisy-stem"></div>
                </div>
                <div className="daisy-div">
                  <div className="daisy">
                    <div className="daisy-petal-one"></div>
                    <div className="daisy-petal-two"></div>
                    <div className="daisy-petal-three"></div>
                    <div className="daisy-petal-four"></div>
                    <div className="daisy-petal-five"></div>
                  </div>
                  <div className="daisy-stem"></div>
                </div>
              </div>
              <div className="daisy-bottom-row">
                <div className="daisy-div">
                  <div className="daisy">
                    <div className="daisy-petal-one"></div>
                    <div className="daisy-petal-two"></div>
                    <div className="daisy-petal-three"></div>
                    <div className="daisy-petal-four"></div>
                    <div className="daisy-petal-five"></div>
                  </div>
                  <div className="daisy-stem"></div>
                </div>
                <div className="daisy-div">
                  <div className="daisy">
                    <div className="daisy-petal-one"></div>
                    <div className="daisy-petal-two"></div>
                    <div className="daisy-petal-three"></div>
                    <div className="daisy-petal-four"></div>
                    <div className="daisy-petal-five"></div>
                  </div>
                  <div className="daisy-stem"></div>
                </div>
                <div className="daisy-div">
                  <div className="daisy">
                    <div className="daisy-petal-one"></div>
                    <div className="daisy-petal-two"></div>
                    <div className="daisy-petal-three"></div>
                    <div className="daisy-petal-four"></div>
                    <div className="daisy-petal-five"></div>
                  </div>
                  <div className="daisy-stem"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="garden-bottom-middle">
            <div
              className="purple-plot"
              onClick={() => setRejectionCardThree(true)}
            >
              <div className="purple-top-row">
                <div className="purple-div">
                  <div className="purple">
                    <div className="purple-petal-one"></div>
                    <div className="purple-petal-two"></div>
                    <div className="purple-petal-three"></div>
                    <div className="purple-petal-four"></div>
                    <div className="purple-petal-five"></div>
                  </div>
                  <div className="purple-stem"></div>
                </div>
                <div className="purple-div">
                  <div className="purple">
                    <div className="purple-petal-one"></div>
                    <div className="purple-petal-two"></div>
                    <div className="purple-petal-three"></div>
                    <div className="purple-petal-four"></div>
                    <div className="purple-petal-five"></div>
                  </div>
                  <div className="purple-stem"></div>
                </div>
                <div className="purple-div">
                  <div className="purple">
                    <div className="purple-petal-one"></div>
                    <div className="purple-petal-two"></div>
                    <div className="purple-petal-three"></div>
                    <div className="purple-petal-four"></div>
                    <div className="purple-petal-five"></div>
                  </div>
                  <div className="purple-stem"></div>
                </div>
              </div>
              <div className="purple-bottom-row">
                <div className="purple-div">
                  <div className="purple">
                    <div className="purple-petal-one"></div>
                    <div className="purple-petal-two"></div>
                    <div className="purple-petal-three"></div>
                    <div className="purple-petal-four"></div>
                    <div className="purple-petal-five"></div>
                  </div>
                  <div className="purple-stem"></div>
                </div>
                <div className="purple-div">
                  <div className="purple">
                    <div className="purple-petal-one"></div>
                    <div className="purple-petal-two"></div>
                    <div className="purple-petal-three"></div>
                    <div className="purple-petal-four"></div>
                    <div className="purple-petal-five"></div>
                  </div>
                  <div className="purple-stem"></div>
                </div>
                <div className="purple-div">
                  <div className="purple">
                    <div className="purple-petal-one"></div>
                    <div className="purple-petal-two"></div>
                    <div className="purple-petal-three"></div>
                    <div className="purple-petal-four"></div>
                    <div className="purple-petal-five"></div>
                  </div>
                  <div className="purple-stem"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="garden-bottom-right">
            <div
              className="sun-plot"
              onClick={() => setRejectionCardThree(true)}
            >
              <div className="sun-top-row">
                <div className="sun-div">
                  <div className="sun">
                    <div className="sun-petal-one"></div>
                    <div className="sun-petal-two"></div>
                    <div className="sun-petal-three"></div>
                    <div className="sun-petal-four"></div>
                    <div className="sun-petal-five"></div>
                  </div>
                  <div className="sun-stem"></div>
                </div>
                <div className="sun-div">
                  <div className="sun">
                    <div className="sun-petal-one"></div>
                    <div className="sun-petal-two"></div>
                    <div className="sun-petal-three"></div>
                    <div className="sun-petal-four"></div>
                    <div className="sun-petal-five"></div>
                  </div>
                  <div className="sun-stem"></div>
                </div>
                <div className="sun-div">
                  <div className="sun">
                    <div className="sun-petal-one"></div>
                    <div className="sun-petal-two"></div>
                    <div className="sun-petal-three"></div>
                    <div className="sun-petal-four"></div>
                    <div className="sun-petal-five"></div>
                  </div>
                  <div className="sun-stem"></div>
                </div>
              </div>
              <div className="sun-bottom-row">
                <div className="sun-div">
                  <div className="sun">
                    <div className="sun-petal-one"></div>
                    <div className="sun-petal-two"></div>
                    <div className="sun-petal-three"></div>
                    <div className="sun-petal-four"></div>
                    <div className="sun-petal-five"></div>
                  </div>
                  <div className="sun-stem"></div>
                </div>
                <div className="sun-div">
                  <div className="sun">
                    <div className="sun-petal-one"></div>
                    <div className="sun-petal-two"></div>
                    <div className="sun-petal-three"></div>
                    <div className="sun-petal-four"></div>
                    <div className="sun-petal-five"></div>
                  </div>
                  <div className="sun-stem"></div>
                </div>
                <div className="sun-div">
                  <div className="sun">
                    <div className="sun-petal-one"></div>
                    <div className="sun-petal-two"></div>
                    <div className="sun-petal-three"></div>
                    <div className="sun-petal-four"></div>
                    <div className="sun-petal-five"></div>
                  </div>
                  <div className="sun-stem"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Card
        className={`${gardener ? "component-card" : "component-card-closed"}`}
      >
        <Typography variant="h5" color="primary">
          What would you like to know about?
        </Typography>
        <List className="component-list">
          <ListItem onClick={toggleAnswerOne}>Flowers</ListItem>
          <ListItem onClick={toggleAnswerTwo}>Fruits</ListItem>
          <ListItem onClick={toggleAnswerThree}>The Princess</ListItem>
          <ListItem onClick={toggleAnswerFour}>Vegetables</ListItem>
        </List>
        <Button onClick={toggleGardener} variant="contained" color="primary">
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Flowers
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I am well aware the flowers are beautiful. No you may not have any.
          Only the king may take any. He gives them to the queen and princess.
        </Typography>
        <Button onClick={toggleAnswerOne} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Fruits
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I know the fruit looks delicious. No you may not have any. They are
          strictly to feed the royal family.
        </Typography>
        <Button onClick={toggleAnswerTwo} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Princess
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          She loves flowers. As is common she and the king are at odds. The king doesn't get her flowers when they are fighting.
        </Typography>
        <Button onClick={toggleAnswerThree} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Vegetables
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I know the vegetables look delicious. No you may not have any. They are
          strictly to feed the royal family.
        </Typography>
        <Button onClick={toggleAnswerFour} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          rejectionCardThree ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Don't touch anything!!!
        </Typography>
        <Button
          onClick={() => setRejectionCardThree(false)}
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
          gardener changes her mind.
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
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You pick up the shiny gold coin.
        </Typography>
        <Button
          onClick={() => setCoinCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${manureCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          That gardener sniffs the manure excitedly. My plants need manure. I'll
          talk to you, give you a coin, and let you pick a rose in exchange.
        </Typography>
        <Button
          onClick={() => setManureCard(false)}
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
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You enter garden with beautiful flowers and plump fruits and
          vegetables. A gardener glares at you sternly.
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
  Garden
);
