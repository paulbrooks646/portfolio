import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getMagic } from "../../redux/magicReducer";
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

  useEffect(() => {
    axios.get("/api/magic").then((res) => {
      props.getMagic(res.data[0]);
    });
  }, []);

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
    if (props.magic.magic.fire_bought) {
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
            props.getMagic(res.data[0]);
            setFireCard(!fireCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyHeal = () => {
    if (props.magic.magic.heal_bought) {
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
            props.getMagic(res.data[0]);
            setHealCard(!healCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyIce = () => {
    if (props.magic.magic.ice_bought) {
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
            props.getMagic(res.data[0]);
            setIceCard(!iceCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyOpen = () => {
    if (props.magic.magic.open_bought) {
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
            props.getMagic(res.data[0]);
            setOpenCard(!openCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyProtection = () => {
    if (props.magic.magic.protection_bought) {
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
            props.getMagic(res.data[0]);
            setProtectionCard(!protectionCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyStrength = () => {
    if (props.magic.magic.strength_bought) {
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
            props.getMagic(res.data[0]);
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

  return props.user.user.magic ? (
    <div className="magic-main">
      <Nav />
      <div className="magic-body">
        <Card className={`${!magicCard ? "magic-card" : "magic-card-closed"}`}>
          <Typography variant="h4" color="primary" className="magic-card-title">
            Good day! What kind of scroll do you need?
          </Typography>
          <List className="magic-list">
            <ListItem className="magic-list-item" onClick={togglePurchaseFire}>
              Fire
            </ListItem>
            <ListItem className="magic-list-item" onClick={togglePurchaseHeal}>
              Heal
            </ListItem>
            <ListItem className="magic-list-item" onClick={togglePurchaseIce}>
              Ice
            </ListItem>
            <ListItem className="magic-list-item" onClick={togglePurchaseOpen}>
              Open
            </ListItem>
            <ListItem
              className="magic-list-item"
              onClick={togglePurchaseProtection}
            >
              Protection
            </ListItem>
            <ListItem
              className="magic-list-item"
              onClick={togglePurchaseStrength}
            >
              Strength
            </ListItem>
          </List>
          <Button
            onClick={toggleExit}
            className="magic-card-button"
            variant="contained"
            color="primary"
          >
            EXIT SHOP
          </Button>
        </Card>
        <Card className={`${fireCard ? "magic-card" : "magic-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="magic-card-description"
          >
            Would you like to buy a fire scroll for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyFire}
              className="magic-card-button"
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseFire}
              className="magic-card-button"
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card className={`${iceCard ? "magic-card" : "magic-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="magic-card-description"
          >
            Would you like to buy an ice scroll for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyIce}
              className="magic-card-button"
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseIce}
              className="magic-card-button"
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card className={`${healCard ? "magic-card" : "magic-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="magic-card-description"
          >
            Would you like to buy a healing scroll for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyHeal}
              className="magic-card-button"
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseHeal}
              className="magic-card-button"
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card className={`${openCard ? "magic-card" : "magic-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="magic-card-description"
          >
            Would you like to buy an open scroll for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyOpen}
              className="magic-card-button"
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseOpen}
              className="magic-card-button"
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${protectionCard ? "magic-card" : "magic-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="magic-card-description"
          >
            Would you like to buy a protection scroll for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyProtection}
              className="magic-card-button"
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseProtection}
              className="magic-card-button"
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${strengthCard ? "magic-card" : "magic-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="magic-card-description"
          >
            Would you like to buy a strength scroll for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyStrength}
              className="magic-card-button"
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseStrength}
              className="magic-card-button"
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card className={`${poorCard ? "magic-card" : "magic-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="magic-card-description"
          >
            I'm sorry. You appear not to have enough coins to buy this item.
          </Typography>
          <div className="button-div">
            <Button
              onClick={togglePoorCard}
              className="magic-card-button"
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card className={`${boughtCard ? "magic-card" : "magic-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="magic-card-description"
          >
            I'm sorry. I appear to be out of stock of that item. You must have
            bought my last one.
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBoughtCard}
              className="magic-card-button"
              variant="contained"
              color="primary"
            >
              CLOSE
            </Button>
          </div>
        </Card>
        <Card className={`${thanksCard ? "magic-card" : "magic-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="magic-card-description"
          >
            Here you go. Thanks for your business!
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleThanksCardClosed}
              className="magic-card-button"
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
      <Nav />
      <div className="magic-body">
        <Card className={`${!magicCard ? "magic-card" : "magic-card-closed"}`}>
          <Typography variant="h4" color="primary" className="magic-card-title">
            I only do business with magic users. Come back when you are one.
          </Typography>
          
          <Button
            onClick={toggleExit}
            className="magic-card-button"
            variant="contained"
            color="primary"
          >
            EXIT SHOP
          </Button>
        </Card>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getMagic, getInventory })(
  Magic
);
