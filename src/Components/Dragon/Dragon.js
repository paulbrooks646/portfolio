import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Dragon.scss";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";

function Dragon(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [upUp, setUpUp] = useState(false);
  const [upCharacter, setUpCharacter] = useState(false);
  const [firstTimeCard, setFirstTimeCard] = useState(false);
  const [charcoalCard, setCharcoalCard] = useState(false);
  const [charcoalRejectionCard, setCharcoalRejectionCard] = useState(false);
  const [charcoalRejectionCardTwo, setCharcoalRejectionCardTwo] =
    useState(false);
  const [seedCard, setSeedCard] = useState(false);
  const [seedRejectionCard, setSeedRejectionCard] = useState(false);
  const [dragonCard, setDragonCard] = useState(false);
  const [cloakRejectionCard, setCloakRejectionCard] = useState(false);
  const [armorRejectionCard, setArmorRejectionCard] = useState(false);
  const [speedRejectionCard, setSpeedRejectionCard] = useState(false);
  const [axeRejectionCard, setAxeRejectionCard] = useState(false);
  const [growRejectionCard, setGrowRejectionCard] = useState(false);
  const [scrollCard, setScrollCard] = useState(false);
  const [coinSuccess, setCoinSuccess] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [dragonData, setDragonData] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [iceCard, setIceCard] = useState(false);
  const [armorCard, setArmorCard] = useState(false);
  const [cloakCard, setCloakCard] = useState(false);
  const [speedCard, setSpeedCard] = useState(false);
  const [axeCard, setAxeCard] = useState(false);

  useEffect(() => {
    axios.get("/api/dragon").then((res) => {
      if (res.data[0].first_time) {
        setFirstTimeCard(true);
      }
      setDragonData(res.data[0]);
      setUpCharacter(true);
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
    if (item === "ice") {
      axios.post("/api/useIce").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/dragon").then((res) => {
          setDragonData(res.data[0]);
          setIceCard(true);
        });
      });
    } else if (item === "armor") {
      axios.post("/api/useArmor").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/dragon").then((res) => {
          setDragonData(res.data[0]);
          setArmorCard(true);
        });
      });
    } else if (item === "cloak") {
      axios.post("/api/useCloak").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/dragon").then((res) => {
          setDragonData(res.data[0]);
          setCloakCard(true);
        });
      });
    } else if (item === "speed") {
      axios.post("/api/useSpeed").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/dragon").then((res) => {
          setDragonData(res.data[0]);
          setSpeedCard(true);
        });
      });
    } else if (item === "axe") {
      axios.post("/api/useAxe").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/dragon").then((res) => {
          setDragonData(res.data[0]);
          setAxeCard(true);
        });
      });
    } else {
      setRejectionCard(true);
    }
  };

  const toggleUp = () => {
    axios.post("/api/changeLast", { last: "dragon" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Dashboard");
      });
    });
  };

  const toggleGoUp = () => {
    setUpCharacter(false);
    setUpUp(true);
  };

  const toggleSeed = () => {
    if (dragonData.ice_used) {
      axios.post("/api/seed").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/dragon").then((res) => {
          setDragonData(res.data[0]);
          setSeedCard(true);
        });
      });
    } else {
      setSeedRejectionCard(true);
    }
  };

  const toggleCharcoal = () => {
    if (dragonData.ice_used && !dragonData.charcoal_taken) {
      axios.post("/api/charcoal").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/dragon").then((res) => {
          setDragonData(res.data[0]);
          setCharcoalCard(true);
        });
      });
    } else if (dragonData.ice_used && dragonData.charcoal_taken) {
      setCharcoalRejectionCardTwo(true);
    } else if (!dragonData.ice_used) {
      setCharcoalRejectionCard(true);
    }
  };

  const toggleDragon = () => {
    if (!dragonData.armor_used) {
      setArmorRejectionCard(true);
    } else if (!dragonData.cloak_used) {
      setCloakRejectionCard(true);
    } else if (!dragonData.speed_used) {
      setSpeedRejectionCard(true);
    } else if (!dragonData.axe_used) {
      setAxeRejectionCard(true);
    } else {
      axios.post("/api/killDragon").then((res) => {
        setDragonData(res.data[0]);
        setDragonCard(true);
      });
    }
  };

  const toggleScroll = () => {
    if (dragonData.dragon_killed) {
      axios.post("/api/grow").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/dragon").then((res) => {
          setDragonData(res.data[0]);
          setScrollCard(true);
        });
      });
    } else {
      setGrowRejectionCard(true);
    }
  };

  const toggleCoin = () => {
    if (dragonData.ice_used) {
      axios.post("/api/coin").then((res) => {
        props.getUser(res.data);
        axios.post("/api/dragonCoin").then((res) => {
          setDragonData(res.data[0]);
          setCoinSuccess(true);
        });
      });
    } else {
      setSeedRejectionCard(true);
    }
  };

  const toggleFirstTime = () => {
    axios.post("/api/dragonFirst").then((res) => {
      setDragonData(res.data[0]);
      setFirstTimeCard(false);
    });
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
      <div className="dragon-body">
        <div className="dragon-top">
          <div className="dragon-top-left">
            <div className="dirt">
              <div className="seed-div">
                <div
                  className={`${
                    !dragonData.seed_taken ? "seed" : "seed-closed"
                  }`}
                  onClick={toggleSeed}
                ></div>
              </div>
              <div className="coin-div">
                <div
                  className={`${
                    !dragonData.coin_taken ? "coin" : "coin-closed"
                  }`}
                  onClick={toggleCoin}
                ></div>
              </div>
            </div>
            <div
              className={`${dragonData.ice_used ? "ice" : "cinders"}`}
              onClick={toggleCharcoal}
            ></div>
          </div>
          <div className="dragon-top-middle">
            <div className="dragon-home" onClick={toggleGoUp}>
              <ArrowUpward />
              <h2>Home</h2>
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
          </div>
          <div className="dragon-top-right"></div>
        </div>
        <div className="dragon-middle">
          <div className="dragon-middle-left"></div>
          <div className="dragon-middle-middle"></div>
          <div className="dragon-middle-right"></div>
        </div>
        <div className="dragon-bottom">
          <div className="dragon-bottom-left"></div>
          <div className="dragon-bottom-middle">
            <div
              className={`${
                !dragonData.dragon_killed ? "dragon" : "dragon-closed"
              }`}
              onClick={toggleDragon}
            />
            <div
              className={`${
                !dragonData.grow_taken ? "scroll" : "scroll-closed"
              }`}
              onClick={toggleScroll}
            >
              <div className="scroll-top"></div>
              <div className="scroll-bottom"></div>
            </div>
          </div>
          <div className="dragon-bottom-right"></div>
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
          You perspire profusely as you enter the sweltering dragon's lair. The
          smell of smoke fills your nostrils and all around you everything is
          burnt. You see the dragon in the distance and rage overcomes you.
        </Typography>
        <Button onClick={toggleFirstTime} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${seedCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You look down at the magic seed. It seems to glow. You pick it up, it
          feels warm and alive in your hands. You put it in your pack and take
          it with you.
        </Typography>
        <Button
          onClick={() => setSeedCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          seedRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The ground is far too hot for you to cross.
        </Typography>
        <Button
          onClick={() => setSeedRejectionCard(false)}
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
          You lean over and pick up a big piece of charcoal from the cooled
          section of the embers.
        </Typography>
        <Button
          onClick={() => setCharcoalCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          charcoalRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You would burn your hand if you tried to pick up a piece of this hot
          charcoal.
        </Typography>
        <Button
          onClick={() => setCharcoalRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          armorRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You start to walk towards the dragon but quickly change your mind as
          you notice how sharp the dragon's teeth and claws are. You should find
          something to protect you first.
        </Typography>
        <Button
          onClick={() => setArmorRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          cloakRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          With your armor to protect you, you head towards the dragon. It gets
          so hot you can't take another step. You need to find something to
          protect you from the heat.
        </Typography>
        <Button
          onClick={() => setCloakRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          speedRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          With armor and your cloak you consider approaching the dragon but when
          you see how quickly it moves you decide you better find a way to match
          its speed first.
        </Typography>
        <Button
          onClick={() => setSpeedRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${axeRejectionCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You protected by your armor and cloak and are just as quick as the
          dragon but unless you are wielding something that can hurt the dragon
          attacking it would be pointless.
        </Typography>
        <Button
          onClick={() => setAxeRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${dragonCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Finally! You charge, screaming as you go. The dragon meets your
          charge. Its flames don't harm you. Its claws can't penetrate your
          armor. You are too quick for the dragon to flee. With a mighty swing
          of your axe, you sever the dragon's head from its body.
        </Typography>
        <Button
          onClick={() => setDragonCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          charcoalRejectionCardTwo ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You have taken as much charcoal as you will ever need.
        </Typography>
        <Button
          onClick={() => setCharcoalRejectionCardTwo(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          growRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          There is a massive dragon between you and the scroll. You will have to
          deal with it before you think about getting that scroll.
        </Typography>
        <Button
          onClick={() => setGrowRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${scrollCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Fortunately this magic scroll seems to be immune to fire. Looking over
          the scroll you see that it has the ability to make an inanimate object
          grow to a size of the readers choosing.
        </Typography>
        <Button
          onClick={() => setScrollCard(false)}
          variant="contained"
          color="primary"
        >
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
      <Card className={`${iceCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          As you read the scroll it disappears. A small segment of coals turns
          slightly blue.
        </Typography>
        <Button
          onClick={() => setIceCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${armorCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          You put on your armor.
        </Typography>
        <Button
          onClick={() => setArmorCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${cloakCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          You put on your cloak. The heat in the area no longer bothers you.
        </Typography>
        <Button
          onClick={() => setCloakCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${speedCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          As you read the scroll you feel significantly quicker.
        </Typography>
        <Button
          onClick={() => setSpeedCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${axeCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          Weilding the ultimate axe, you feel very powerful.
        </Typography>
        <Button
          onClick={() => setAxeCard(false)}
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
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getInventory, logoutUser })(
  Dragon
);
