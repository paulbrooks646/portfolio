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
  const [answerFive, setAnswerFive] = useState(false)
  const [answerSix, setAnswerSix] = useState(false)
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
  const [firstTimeCard, setFirstTimeCard] = useState(false);
  const [catRejectionCard, setCatRejectionCard] = useState(false)
  const [catCard, setCatCard] = useState(false)
  const [mouseCard, setMouseCard] = useState(false);
  const [beggarCard, setBeggarCard] = useState(false);
  const [pictureCard, setPictureCard] = useState(false);
  const [beggingCard, setBeggingCard] = useState(false);
  const [rockCard, setRockCard] = useState(false);
  const [glassesCard, setGlassesCard] = useState(false);
  const [charcoalCard, setCharcoalCard] = useState(false);
  const [cheeseCard, setCheeseCard] = useState(false);
  const [coinCard, setCoinCard] = useState(false);
  const [goatPicture, setGoatPicture] = useState(false)
  const [sympathyCard, setSympathyCard] = useState(false)


  useEffect(() => {
    axios.get("/api/alley").then((res) => {
      if (res.data[0].first_time) {
        setFirstTimeCard(true);
      }
      setAlleyData(res.data[0]);

      if (props.user.user.last === "market") {
        setLeftCharacter(true);
      } else if (props.user.user.last === "thieves") {
        setRightCharacter(true);
      }
      setIsLoading(false);
    });
  }, []);

  const toggleFirst = () => {
    axios.post("/api/alleyFirst").then((res) => {
      setAlleyData(res.data[0]);
      setFirstTimeCard(false);
    });
  };

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
      axios.post("/api/useRock").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/alley").then((res) => {
          setAlleyData(res.data[0]);
        });
      });
    } else if (item === "charcoal") {
      axios.post("/api/useCharcoal").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/alley").then((res) => {
          setAlleyData(res.data[0]);
        });
      })
    } else if (item === "glasses") {
      axios.post("/api/useGlassesAlley").then(res => {
        setAlleyData(res.data[0])
      })
    } else if (item === "cheese") {
      axios.post("/api/useCheese").then(res => {
        props.getInventory(res.data)
        axios.get("/api/alley").then(res => {
          setAlleyData(res.data[0])
        })
      })
    }
      else {
      setRejectionCard(true);
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

  const toggleCoin = () => {
    if (props.user.user.coins < 1) {
      setSympathyCard(true)
    } else {
      axios.post("/api/alleyCoin").then(res => {
        props.getUser(res.data)
        axios.get("/api/alley").then(res => {
          setAlleyData(res.data[0])
          setCoinCard(true)
        })
      })
    }
  }

  const togglePicture = () => {
    if (alleyData.rock_used) {
      setPictureCard(true)
    } else {
      setCatRejectionCard(true)
    }
  }

  const toggleMouse = () => {
    if (alleyData.rock_used) {
      setMouseCard(true)
    } else {
      setCatRejectionCard(true)
    }
  }

  const toggleBeggar = () => {
    if (alleyData.charcoal_given && !alleyData.picture_received) {
      axios.post("/api/pictureReceived").then(res => {
        props.getInventory(res.data)
        axios.get("/api/alley").then(res => {
          setAlleyData(res.data[0])
          setGoatPicture(true)
        })
      })
    }
   else if (alleyData.rock_used && !alleyData.coin_given) {
      setBeggingCard(true)
    } else if (alleyData.rock_used && alleyData.coin_given) {
      setBeggarCard(true)
    } else {
      setCatRejectionCard(true)
    }
  }

  const toggleAnswerOne = () => {
    setBeggarCard(!beggarCard)
    setAnswerOne(!answerOne);
  };

  const toggleAnswerTwo = () => {
    setBeggarCard(!beggarCard);
    setAnswerTwo(!answerTwo);
  };

  const toggleAnswerThree = () => {
   setBeggarCard(!beggarCard);
    setAnswerThree(!answerThree);
  };

  const toggleAnswerFour = () => {
    setBeggarCard(!beggarCard);
    setAnswerFour(!answerFour);
  };

  const toggleAnswerFive = () => {
    setBeggarCard(!beggarCard);
    setAnswerFive(!answerFive);
  };

  const toggleAnswerSix = () => {
   setBeggarCard(!beggarCard);
    setAnswerSix(!answerSix);
  };

  const toggleGiveCoin = () => {
    axios.post("/api/useCoin").then(res => {
      props.getUser(res.data)
      axios.get("/api/alley").then(res => {
        setAlleyData(res.data[0])
        setBeggingCard(false)
      })
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
              <div
                className={`${!alleyData.rock_used ? "cat" : "cat-closed"}`}
                onClick={() => setCatCard(true)}
              >
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
              <div
                className={`${
                  alleyData.rock_used && !alleyData.coin_taken
                    ? "coin"
                    : "coin-closed"
                }`}
                onClick={toggleCoin}
              ></div>
            </div>
            <div className="beggar-div">
              <div className="picture" onClick={() => setPictureCard(true)}>
                <div className="picture-roof"></div>
                <div className="picture-main">
                  <div className="picture-door">
                    <div className="picture-door-knob"></div>
                  </div>
                </div>
              </div>
              <div className="beggar" onClick={toggleBeggar}>
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
              <div className="mouse" onClick={() => setMouseCard(true)}>
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
            <div
              className={`${
                alleyData.glasses_used
                  ? "thieves-guild-div"
                  : "thieves-guild-div-closed"
              }`}
            >
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
      <Card
        className={`${beggarCard ? "component-card" : "component-card-closed"}`}
      >
        <Typography variant="h5" color="primary">
          How can I help?
        </Typography>
        <List className="component-list">
          <ListItem onClick={toggleAnswerOne}>Beggar</ListItem>
          <ListItem onClick={toggleAnswerTwo}>Brigands</ListItem>
          <ListItem onClick={toggleAnswerThree}>Mouse</ListItem>
          <ListItem
            onClick={toggleAnswerFive}
            id={`${
              alleyData.picture_viewed && !alleyData.picture_received
                ? "list-item"
                : "list-item-closed"
            }`}
          >
            Picture
          </ListItem>
          <ListItem onClick={toggleAnswerFour}>Thieves</ListItem>
          <ListItem
            onClick={toggleAnswerSix}
            id={`${alleyData.glasses_used ? "list-item" : "list-item-closed"}`}
          >
            Thieves Guild
          </ListItem>
        </List>
        <Button
          onClick={() => setBeggarCard(false)}
          variant="contained"
          color="primary"
        >
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Beggar
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Hard times for a beggar. Brigands rob citizens blind so they have no
          money to give.
        </Typography>
        <Button onClick={toggleAnswerOne} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Brigands
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Bringands are awful. They rob mercilessly and violently, even from the
          poor. The king is doing nothing to stop or help them.
        </Typography>
        <Button onClick={toggleAnswerTwo} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Mouse
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          This is my best friend Squeaky. We take care of each other. He's as
          hungry as I am.
        </Typography>
        <Button onClick={toggleAnswerThree} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Thieves
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Thieves aren't violent like brigands. Some thieves are even kind. The
          Magic Thief grants wishes to good children if they truly believe.
        </Typography>
        <Button onClick={toggleAnswerFour} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFive ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Picture
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Its a picture of the home I want someday. Do you like it? I can draw
          you a picture if you find me something to draw with.
        </Typography>
        <Button onClick={toggleAnswerFive} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerSix ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Thieves Guild
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          How did you find the door? Please don't tell anyone. The thief who
          lives there has always been kind and generous to me.
        </Typography>
        <Button onClick={toggleAnswerSix} variant="contained" color="primary">
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
      <Card className={`${catCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Trying to pet the angry cat is a really bad idea.
        </Typography>
        <Button
          onClick={() => setCatCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${catRejectionCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You'll have to get by the angry cat before you interact with anything
          beyond.
        </Typography>
        <Button
          onClick={() => setCatRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${mouseCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Squeak squeak!
        </Typography>
        <Button
          onClick={() => setMouseCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${rockCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You throw the rock full force at the wall by the cat. The noise is so
          loud that cat bolts by you and out of the alley.
        </Typography>
        <Button
          onClick={() => setRockCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${glassesCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You put on the glasses and clearly see a door at the end of the alley
          that was disguied before.
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
        className={`${charcoalCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Thank you! Now I can draw you that picture I promised.
        </Typography>
        <Button
          onClick={() => setCharcoalCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${cheeseCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The mouse devours the cheese. The little beggar girl gives you a
          filthy rag in thanks. Not wanting to offend her you tell her "thanks"
          and accept the gift.
        </Typography>
        <Button
          onClick={() => setCheeseCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${beggingCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Thanks for scaring the cat off. May I have a coin please?
        </Typography>
        <div className="button-div">
          <Button onClick={toggleGiveCoin} variant="contained" color="primary">
            YES
          </Button>
          <Button
            onClick={() => setBeggingCard(false)}
            variant="contained"
            color="primary"
          >
            NO
          </Button>
        </div>
      </Card>
      <Card
        className={`${sympathyCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I'm sorry. It appears you are just as poor as I am.
        </Typography>
        <Button
          onClick={() => setSympathyCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${goatPicture ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Here's you picture. She hands you an impressive picture of a goat.
        </Typography>
        <Button
          onClick={() => setGoatPicture(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${pictureCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Its a very impressive picture of a house.
        </Typography>
        <Button
          onClick={() => setPictureCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${firstTimeCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You enter the alley. A furious cat has trapped a little beggar girl and a mouse at the end of the alley.
        </Typography>
        <Button
          onClick={toggleFirst}
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
