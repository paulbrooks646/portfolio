import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import axios from "axios";
import "./Glade.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import { getInventory } from "../../redux/inventoryReducer";

function Glade(props) {
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [answerFive, setAnswerFive] = useState(false);
  const [answerSix, setAnswerSix] = useState(false);
  const [answerSeven, setAnswerSeven] = useState(false);
  const [answerEight, setAnswerEight] = useState(false);
  const [answerNine, setAnswerNine] = useState(false);
  const [answerTen, setAnswerTen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [upCharacter, setUpCharacter] = useState(false);
  const [rightCharacter, setRightCharacter] = useState(false);
  const [rightUp, setRightUp] = useState(false);
  const [rightRight, setRightRight] = useState(false);
  const [upUp, setUpUp] = useState(false);
  const [upRight, setUpRight] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [gladeData, setGladeData] = useState();
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [firstTimeCard, setFirstTimeCard] = useState(false);
  const [druid, setDruid] = useState(false);
  const [coinCard, setCoinCard] = useState(false);
  const [speedCard, setSpeedCard] = useState(false);
  const [mushroomCard, setMushroomCard] = useState(false);
  const [appleCard, setAppleCard] = useState(false);
  const [sulfurCard, setSulfurCard] = useState(false);
  const [magicUserCard, setMagicUserCard] = useState(false);
  const [druidRejectionCard, setDruidRejectionCard] = useState(false);
  const [grassRejectionCard, setGrassRejectionCard] = useState(false);
  const [doorRejectionCard, setDoorRejectionCard] = useState(false);

  useEffect(() => {
    axios.get("/api/glade").then((res) => {
      if (res.data[0].first_time) {
        setFirstTimeCard(true);
      }
      setGladeData(res.data[0]);

      if (props.user.user.last === "valley") {
        setRightCharacter(true);
      } else if (props.user.user.last === "maze") {
        setUpCharacter(true);
      }
      setIsLoading(false);
    });
  }, []);

  const toggleFirst = () => {
    axios.post("/api/gladeFirst").then((res) => {
      setGladeData(res.data[0]);
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
    if (item === "sulfur") {
      axios.post("/api/useSulfur").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/glade").then((res) => {
          setGladeData(res.data[0]);
          setSulfurCard(true);
        });
      });
    } else if (item === "mushroom") {
      axios.post("/api/useMushroom").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/glade").then((res) => {
          setGladeData(res.data[0]);
          setMushroomCard(true);
        });
      });
    } else if (item === "apple") {
      axios.post("/api/useApple").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/glade").then((res) => {
          setGladeData(res.data[0]);
          setAppleCard(true);
        });
      });
    } else {
      setRejectionCard(true);
    }
  };

  const toggleRight = () => {
    axios.post("/api/changeLast", { last: "glade" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Valley");
      });
    });
  };

  const toggleUp = () => {
    axios.post("/api/changeLast", { last: "glade" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Maze");
      });
    });
  };

  const toggleGoRight = () => {
    if (props.user.user.last === "valley") {
      setRightCharacter(false);
      setRightRight(true);
    } else if (props.user.user.last === "maze") {
      setUpCharacter(false);
      setUpRight(true);
    }
  };

  const toggleGoUp = () => {
    if (props.user.user.last === "valley") {
      setRightCharacter(false);
      setRightUp(true);
    } else if (props.user.user.last === "maze") {
      setUpCharacter(false);
      setUpUp(true);
    }
  };

  const toggleDruid = () => {
    if (!gladeData.cake_given) {
      setDruidRejectionCard(true);
    } else if (
      gladeData.use_sulfur &&
      gladeData.use_apple &&
      gladeData.use_mushroom &&
      !gladeData.magic_user
    ) {
      axios.post("/api/magicUser").then((res) => {
        setGladeData(res.data[0]);
        setMagicUserCard(true);
      });
    } else if (gladeData.unicorn_freed && !gladeData.speed_received) {
      axios.post("/api/speed").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/glade").then((res) => {
          setGladeData(res.data[0]);
          setSpeedCard(true);
        });
      });
    } else {
      setDruid(!druid);
    }
  };

  const toggleCoin = () => {
    if (!gladeData.coin_taken) {
      axios.post("/api/gladeCoin").then((res) => {
        setGladeData(res.data[0]);
        axios.post("/api/coin").then((res) => {
          props.getUser(res.data);
          setCoinCard(true);
        });
      });
    } else {
      setGrassRejectionCard(true);
    }
  };

  const toggleAnswerOne = () => {
    toggleDruid();
    setAnswerOne(!answerOne);
  };

  const toggleAnswerTwo = () => {
    toggleDruid();
    setAnswerTwo(!answerTwo);
  };

  const toggleAnswerThree = () => {
    toggleDruid();
    setAnswerThree(!answerThree);
  };

  const toggleAnswerFour = () => {
    toggleDruid();
    setAnswerFour(!answerFour);
  };

  const toggleAnswerFive = () => {
    toggleDruid();
    setAnswerFive(!answerFive);
  };

  const toggleAnswerSix = () => {
    toggleDruid();
    setAnswerSix(!answerSix);
  };

  const toggleAnswerSeven = () => {
    toggleDruid();
    setAnswerSeven(!answerSeven);
  };

  const toggleAnswerEight = () => {
    toggleDruid();
    setAnswerEight(!answerEight);
  };

  const toggleAnswerNine = () => {
    toggleDruid();
    setAnswerNine(!answerNine);
  };

  const toggleAnswerTen = () => {
    toggleDruid();
    setAnswerTen(!answerTen);
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
      <div className="glade-body">
        <div className="glade-top">
          <div className="glade-top-left">
            <div className="glade-upper-wall-div">
              <div className="glade-upper-wall-top"></div>
              <div className="glade-upper-wall-front"></div>
            </div>
          </div>

          <div className="glade-top-middle">
            <div className="glade-maze" onClick={toggleGoUp}>
              <ArrowUpward />
              <h2>Maze</h2>
            </div>
            <div
              className={`${
                upCharacter ? "character-up" : "character-up-closed"
              }`}
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
          </div>
          <div className="glade-top-right">
            <div className="glade-grass" onClick={toggleCoin}></div>
          </div>
        </div>
        <div className="glade-middle">
          <div className="glade-middle-left">
            <div className="glade-middle-wall-div">
              <div className="glade-middle-wall-top"></div>
              <div
                className="glade-middle-wall-front"
                onClick={() => setDoorRejectionCard(true)}
              ></div>
            </div>
          </div>
          <div className="glade-middle-middle">
            <div className="druid" onClick={toggleDruid}>
              <div className="druid-hat"></div>
              <div className="druid-head">
                <div className="druid-hair-left"></div>
                <div className="druid-face">
                  <div className="druid-hair-top-left"></div>
                  <div className="druid-hair-top-right"></div>
                  <div className="druid-eyes">
                    <div className="druid-eye">
                      <div className="druid-iris"></div>
                    </div>
                    <div className="druid-eye">
                      <div className="druid-iris">
                        <div className="druid-pupil"></div>
                      </div>
                    </div>
                  </div>
                  <div className="druid-nose"></div>
                  <div className="druid-mouth"></div>
                </div>
                <div className="druid-hair-right"></div>
              </div>
              <div className="druid-body">
                <div className="druid-upper-neck"></div>
                <div className="druid-neck"></div>
                <div className="druid-dress">
                  <div className="druid-shirt">
                    <div className="druid-arm">
                      <div className="driud-staff-div">
                        <div className="druid-staff-top"></div>
                        <div className="druid-staff-middle"></div>
                        <div className="druid-staff-bottom"></div>
                      </div>
                      <div className="druid-finger-div">
                        <div className="druid-finger-one"></div>
                        <div className="druid-finger-two"></div>
                        <div className="druid-finger-three"></div>
                        <div className="druid-finger-four"></div>
                        <div className="druid-finger-five"></div>
                      </div>
                    </div>
                  </div>
                  <div className="druid-pants-div"></div>
                </div>
                <div className="druid-legs">
                  <div className="druid-leg-left">
                    <div className="druid-foot"></div>
                  </div>
                  <div className="druid-leg-right">
                    <div className="druid-foot"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="glade-middle-right">
            <div
              className={`${
                rightCharacter ? "character-right" : "character-right-closed"
              }`}
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
            <div className="glade-valley" onClick={toggleGoRight}>
              <h2>Valley</h2>
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="glade-bottom">
          <div className="glade-bottom-left">
            <div className="glade-lower-wall-div">
              <div className="glade-lower-wall-top"></div>
              <div className="glade-lower-wall-front"></div>
            </div>
          </div>
          <div className="glade-bottom-middle"></div>
          <div className="glade-bottom-right"></div>
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
      <Card className={`${druid ? "component-card" : "component-card-closed"}`}>
        <Typography variant="h5" color="primary">
          What knowledge do you seek?
        </Typography>
        <List className="component-list">
          <ListItem onClick={toggleAnswerOne}>Dragon</ListItem>
          <ListItem onClick={toggleAnswerTwo}>Druid</ListItem>
          <ListItem onClick={toggleAnswerThree}>Sanctuary</ListItem>
          <ListItem onClick={toggleAnswerFour}>Scrolls</ListItem>
          <ListItem onClick={toggleAnswerFive}>Speed Scroll</ListItem>
          <ListItem onClick={toggleAnswerSix}>Unicorn</ListItem>
          <ListItem onClick={toggleAnswerSeven}>Witch</ListItem>
          <ListItem onClick={toggleAnswerEight}>
            Powerful Magical Beings
          </ListItem>
          <ListItem onClick={toggleAnswerNine}>Becoming a Magic User</ListItem>
          <ListItem onClick={toggleAnswerTen}>Ingredients</ListItem>
        </List>
        <Button onClick={toggleDruid} variant="contained" color="primary">
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Dragon
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The dragon is one of the three most powerful beings in the area. He
          hoards treasure, and has a seed that grows a giant
          carnivourous plant. My speed scroll could help slay him.
        </Typography>
        <Button onClick={toggleAnswerOne} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Druid
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Although humanoid, I am no human. I am a druid, a magical being, and
          one of the three most powerful beings in the area. My primary
          responsibility is the protection magical creatures.
        </Typography>
        <Button onClick={toggleAnswerTwo} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Sanctuary
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          This is a safe place for magical creatures. Here my power is at its
          strongest. No humans may enter the sanctuary, no exceptions.
        </Typography>
        <Button onClick={toggleAnswerThree} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Scroll
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          A scroll is a one time use type of magic. You recite the words of the
          scroll out loud. The scroll will disappear and the magic will occur.
          Of course you need to be a magic user to use one.
        </Typography>
        <Button onClick={toggleAnswerFour} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFive ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Speed Scroll
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The speed scroll enhances the casters speed briefly but immensely. It
          is the only way I know that one could match the Dragon's speed in his
          home. It is precious. Perhaps if you found the missing unicorn I could
          give it to you.
        </Typography>
        <Button onClick={toggleAnswerFive} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerSix ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Unicorn
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Magical creatures are free to leave this sanctuary but lose my
          protection while they are away. A young unicorn chose to do so and
          disappeared. I fear she may have been captured by the witch, or worse.
        </Typography>
        <Button onClick={toggleAnswerSix} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>

      <Card className={`${answerSeven ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Witch
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The witch is one of the three most powerful magic beings in the area.
          She lives in a cottage in the forest past the caves. Her cottage is
          protected by magical barriers. In her home only her own magic could
          defeat her.
        </Typography>
        <Button onClick={toggleAnswerSeven} variant="contained" color="primary">
          NEXT
        </Button>
      </Card>
      <Card className={`${answerEight ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Powerful Magical Beings
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The destructive dragon, the evil witch, and I are the most powerful
          magical beings in the area. On neutral ground, we are evenly matched.
          In our home, the root of our power, we are drastically more powerful.
        </Typography>
        <Button onClick={toggleAnswerEight} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerNine ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Becoming a Magic User
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Making a human a magic user is highly irregular but as you have helped
          us, if you gather some ingredients I need to make healing potions I
          will make an exception.
        </Typography>
        <Button onClick={toggleAnswerNine} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTen ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Ingredients
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I need an apple from the highest tree in the forest, mushroom from the
          far side of the mountain and some sulfur from the Hydra's bog.
        </Typography>
        <Button onClick={toggleAnswerTen} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          druidRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          I associate not with humans. The way they live harms magical
          creatures. Yet, if you can unblock the mountain runoff, we may speak.
          Lack of water is hurtful to humans, animals and magical creatures.
        </Typography>
        <Button
          onClick={() => setDruidRejectionCard(false)}
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
          In the deep grass you find a shiny gold coin.
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
        className={`${
          grassRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You find nothing else in the deep grass.
        </Typography>
        <Button
          onClick={() => setGrassRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${appleCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You give the druid the shiny apple.
        </Typography>
        <Button
          onClick={() => setAppleCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${mushroomCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You give the druid the plump mushroom.
        </Typography>
        <Button
          onClick={() => setMushroomCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${sulfurCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You give the druid the stinky sulfur. Good riddance!
        </Typography>
        <Button
          onClick={() => setSulfurCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${speedCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          Thank you for freeing the baby unicorn. She told me how you defeated
          the witch. On behalf of all magical creatures I thank you. Here is the
          speed scroll as promised, good luck in your quest to slay the dragon.
        </Typography>
        <Button
          onClick={() => setSpeedCard(false)}
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
          As you continue along the path you come a cross a tall imposing
          figure. She glares at you condescendingly. Behind her is a door, you
          squint your eyes and see a force field as well.
        </Typography>
        <Button onClick={toggleFirst} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          doorRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          No human shall ever enter this sanctuary for magical creatures.
        </Typography>
        <Button
          onClick={() => setDoorRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${magicUserCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          Thank you for acquiring the ingredients. As promised I will give you
          the ability to use magic. The orb on her staff glows and a small ball
          of blue energy shoots at you. You feel new power course through your
          veins.
        </Typography>
        <Button
          onClick={() => setMagicUserCard(false)}
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
  Glade
);
