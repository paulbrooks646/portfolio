import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Magic.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

function Magic(props) {
  const [exit, setExit] = useState(false);
  const [magicCard, setMagicCard] = useState(false);
  const [healCard, setHealCard] = useState(false);
  const [fireCard, setFireCard] = useState(false);
  const [iceCard, setIceCard] = useState(false);
  const [protectionCard, setProtectionCard] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [strengthCard, setStrengthCard] = useState(false);
  const [poorCard, setPoorCard] = useState(false);
  const [boughtCard, setBoughtCard] = useState(false);
  const [thanksCard, setThanksCard] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [magicData, setMagicData] = useState();

  useEffect(() => {
    axios.get("/api/magic").then((res) => {
      setMagicData(res.data[0]);
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
    setRejectionCard(true);
  };

  const toggleExit = () => {
    setExit(!exit);
    props.history.push("/Market");
  };

  const togglePurchaseFire = () => {
    setFireCard(!fireCard);
    setMagicCard(!magicCard);
  };

  const togglePurchaseHeal = () => {
    setHealCard(!healCard);
    setMagicCard(!magicCard);
  };

  const togglePurchaseIce = () => {
    setIceCard(!iceCard);
    setMagicCard(!magicCard);
  };

  const togglePurchaseOpen = () => {
    setOpenCard(!openCard);
    setMagicCard(!magicCard);
  };

  const togglePurchaseProtection = () => {
    setProtectionCard(!protectionCard);
    setMagicCard(!magicCard);
  };

  const togglePurchaseStrength = () => {
    setStrengthCard(!strengthCard);
    setMagicCard(!magicCard);
  };

  const toggleBuyFire = () => {
    if (magicData.fire_bought) {
      setFireCard(!fireCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setFireCard(!fireCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/fire").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/magic").then((res) => {
            setMagicData(res.data[0]);
            setFireCard(!fireCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyHeal = () => {
    if (magicData.heal_bought) {
      setHealCard(!healCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setHealCard(!healCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/heal").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/magic").then((res) => {
            setMagicData(res.data[0]);
            setHealCard(!healCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyIce = () => {
    if (magicData.ice_bought) {
      setIceCard(!iceCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setIceCard(!iceCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/ice").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/magic").then((res) => {
            setMagicData(res.data[0]);
            setIceCard(!iceCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyOpen = () => {
    if (magicData.open_bought) {
      setOpenCard(!openCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setOpenCard(!openCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/open").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/magic").then((res) => {
            setMagicData(res.data[0]);
            setOpenCard(!openCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyProtection = () => {
    if (magicData.protection_bought) {
      setProtectionCard(!protectionCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setProtectionCard(!protectionCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/protection").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/magic").then((res) => {
            setMagicData(res.data[0]);
            setProtectionCard(!protectionCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyStrength = () => {
    if (magicData.strength_bought) {
      setStrengthCard(!strengthCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setStrengthCard(!strengthCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/strength").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/magic").then((res) => {
            setMagicData(res.data[0]);
            setStrengthCard(!strengthCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBoughtCard = () => {
    setBoughtCard(!boughtCard);
    setMagicCard(!magicCard);
  };

  const togglePoorCard = () => {
    setPoorCard(!poorCard);
    setMagicCard(!magicCard);
  };

  const toggleThanksCard = () => setThanksCard(!thanksCard);

  const toggleThanksCardClosed = () => {
    setThanksCard(!thanksCard);
    setMagicCard(!magicCard);
  };

  return magicData.magic_user ? (
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
      <div className="magic-body">
        <Card
          className={`${
            !magicCard ? "component-card" : "component-card-closed"
          }`}
        >
          <Typography variant="h4" color="primary">
            Good day! What kind of scroll do you need?
          </Typography>
          <List className="component-list">
            <ListItem onClick={togglePurchaseFire}>Fire</ListItem>
            <ListItem onClick={togglePurchaseHeal}>Heal</ListItem>
            <ListItem onClick={togglePurchaseIce}>Ice</ListItem>
            <ListItem onClick={togglePurchaseOpen}>Open</ListItem>
            <ListItem onClick={togglePurchaseProtection}>Protection</ListItem>
            <ListItem onClick={togglePurchaseStrength}>Strength</ListItem>
          </List>
          <Button onClick={toggleExit} variant="contained" color="primary">
            EXIT SHOP
          </Button>
        </Card>
        <Card
          className={`${fireCard ? "component-card" : "component-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy a fire scroll for 1 coin?
          </Typography>
          <div className="button-div">
            <Button onClick={toggleBuyFire} variant="contained" color="primary">
              YES
            </Button>
            <Button
              onClick={togglePurchaseFire}
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${iceCard ? "component-card" : "component-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy an ice scroll for 1 coin?
          </Typography>
          <div className="button-div">
            <Button onClick={toggleBuyIce} variant="contained" color="primary">
              YES
            </Button>
            <Button
              onClick={togglePurchaseIce}
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${healCard ? "component-card" : "component-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy a healing scroll for 1 coin?
          </Typography>
          <div className="button-div">
            <Button onClick={toggleBuyHeal} variant="contained" color="primary">
              YES
            </Button>
            <Button
              onClick={togglePurchaseHeal}
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${openCard ? "component-card" : "component-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy an open scroll for 1 coin?
          </Typography>
          <div className="button-div">
            <Button onClick={toggleBuyOpen} variant="contained" color="primary">
              YES
            </Button>
            <Button
              onClick={togglePurchaseOpen}
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${
            protectionCard ? "component-card" : "component-card-closed"
          }`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy a protection scroll for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyProtection}
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseProtection}
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${
            strengthCard ? "component-card" : "component-card-closed"
          }`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy a strength scroll for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyStrength}
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseStrength}
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${poorCard ? "component-card" : "component-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            I'm sorry. You appear not to have enough coins to buy this item.
          </Typography>
          <div className="button-div">
            <Button
              onClick={togglePoorCard}
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${
            boughtCard ? "component-card" : "component-card-closed"
          }`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            I'm sorry. I appear to be out of stock of that item. You must have
            bought my last one.
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBoughtCard}
              variant="contained"
              color="primary"
            >
              CLOSE
            </Button>
          </div>
        </Card>
        <Card
          className={`${
            thanksCard ? "component-card" : "component-card-closed"
          }`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Here you go. Thanks for your business!
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleThanksCardClosed}
              variant="contained"
              color="primary"
            >
              CLOSE
            </Button>
          </div>
        </Card>
      </div>
    </div>
  ) : (
    <div className="magic-main">
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
      <div className="magic-body">
        <Card
          className={`${
            !magicCard ? "component-card" : "component-card-closed"
          }`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            I only do business with magic users. Come back when you are one.
          </Typography>

          <Button onClick={toggleExit} variant="contained" color="primary">
            EXIT SHOP
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
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getInventory, logoutUser })(
  Magic
);
