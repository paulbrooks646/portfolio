import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getBlacksmith } from "../../redux/blacksmithReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Blacksmith.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

function Blacksmith(props) {
  const [exit, setExit] = useState(false);
  const [blacksmithCard, setBlacksmithCard] = useState(false);
  const [bowCard, setBowCard] = useState(false);
  const [armorCard, setArmorCard] = useState(false);
  const [daggerCard, setDaggerCard] = useState(false);
  const [shieldCard, setShieldCard] = useState(false);
  const [knifeCard, setKnifeCard] = useState(false);
  const [swordCard, setSwordCard] = useState(false);
  const [poorCard, setPoorCard] = useState(false);
  const [boughtCard, setBoughtCard] = useState(false);
  const [thanksCard, setThanksCard] = useState(false);

  useEffect(() => {
    axios.get("/api/blacksmith").then((res) => {
      props.getBlacksmith(res.data[0]);
    });
  }, []);

  const toggleExit = () => {
    setExit(!exit);
    props.history.push("/Market");
  };

  const togglePurchaseArmor = () => {
    setArmorCard(!armorCard);
    setBlacksmithCard(!blacksmithCard);
  };

  const togglePurchaseBow = () => {
    setBowCard(!bowCard);
    setBlacksmithCard(!blacksmithCard);
  };

  const togglePurchaseDagger = () => {
    setDaggerCard(!daggerCard);
    setBlacksmithCard(!blacksmithCard);
  };

  const togglePurchaseKnife = () => {
    setKnifeCard(!knifeCard);
    setBlacksmithCard(!blacksmithCard);
  };

  const togglePurchaseShield = () => {
    setShieldCard(!shieldCard);
    setBlacksmithCard(!blacksmithCard);
  };

  const togglePurchaseSword = () => {
    setSwordCard(!swordCard);
    setBlacksmithCard(!blacksmithCard);
  };

  const toggleBuyArmor = () => {
    if (props.blacksmith.blacksmith.armor_bought) {
      setArmorCard(!armorCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setArmorCard(!armorCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/armor").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/blacksmith").then((res) => {
            props.getBlacksmith(res.data[0]);
            setArmorCard(!armorCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyBow = () => {
    if (props.blacksmith.blacksmith.bow_bought) {
      setBowCard(!bowCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setBowCard(!bowCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/bow").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/blacksmith").then((res) => {
            props.getBlacksmith(res.data[0]);
            setBowCard(!bowCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyDagger = () => {
    if (props.blacksmith.blacksmith.dagger_bought) {
      setDaggerCard(!daggerCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setDaggerCard(!daggerCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/dagger").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/blacksmith").then((res) => {
            props.getBlacksmith(res.data[0]);
            setDaggerCard(!daggerCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyKnife = () => {
    if (props.blacksmith.blacksmith.knife_bought) {
      setKnifeCard(!knifeCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setKnifeCard(!knifeCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/knife").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/blacksmith").then((res) => {
            props.getBlacksmith(res.data[0]);
            setKnifeCard(!knifeCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyShield = () => {
    if (props.blacksmith.blacksmith.shield_bought) {
      setShieldCard(!shieldCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setShieldCard(!shieldCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/shield").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/blacksmith").then((res) => {
            props.getBlacksmith(res.data[0]);
            setShieldCard(!shieldCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuySword = () => {
    if (props.blacksmith.blacksmith.sword_bought) {
      setSwordCard(!swordCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setSwordCard(!swordCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/sword").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/blacksmith").then((res) => {
            props.getBlacksmith(res.data[0]);
            setSwordCard(!swordCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBoughtCard = () => {
    setBoughtCard(!boughtCard);
    setBlacksmithCard(!blacksmithCard);
  };

  const togglePoorCard = () => {
    setPoorCard(!poorCard);
    setBlacksmithCard(!blacksmithCard);
  };

  const toggleThanksCard = () => setThanksCard(!thanksCard);

  const toggleThanksCardClosed = () => {
    setThanksCard(!thanksCard);
    setBlacksmithCard(!blacksmithCard);
  };

  return (
    <div className="blacksmith-main">
      <Nav />
      <div className="blacksmith-body">
        <Card
          className={`${!blacksmithCard ? "blacksmith-card" : "blacksmith-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="primary"
            className="blacksmith-card-title"
          >
            Good day! Can I help you?
          </Typography>
          <List className="blacksmith-list">
            <ListItem className="blacksmith-list-item" onClick={togglePurchaseArmor}>
              Armor
            </ListItem>
            <ListItem
              className="blacksmith-list-item"
              onClick={togglePurchaseBow}
            >
              Bow
            </ListItem>
            <ListItem
              className="blacksmith-list-item"
              onClick={togglePurchaseDagger}
            >
              Dagger
            </ListItem>
            <ListItem className="blacksmith-list-item" onClick={togglePurchaseKnife}>
              Knife
            </ListItem>
            <ListItem className="blacksmith-list-item" onClick={togglePurchaseShield}>
              Shield
            </ListItem>
            <ListItem
              className="blacksmith-list-item"
              onClick={togglePurchaseSword}
            >
              Sword
            </ListItem>
          </List>
          <Button
            onClick={toggleExit}
            className="blacksmith-card-button"
            variant="contained"
            color="primary"
          >
            EXIT SHOP
          </Button>
        </Card>
        <Card className={`${armorCard ? "blacksmith-card" : "blacksmith-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="blacksmith-card-description"
          >
            Would you like to buy armor for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyArmor}
              className="blacksmith-card-button"
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseArmor}
              className="blacksmith-card-button"
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${daggerCard ? "blacksmith-card" : "blacksmith-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="blacksmith-card-description"
          >
            Would you like to buy dagger for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyDagger}
              className="blacksmith-card-button"
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseDagger}
              className="blacksmith-card-button"
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card className={`${bowCard ? "blacksmith-card" : "blacksmith-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="blacksmith-card-description"
          >
            Would you like to buy bow for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyBow}
              className="blacksmith-card-button"
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseBow}
              className="blacksmith-card-button"
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card className={`${knifeCard ? "blacksmith-card" : "blacksmith-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="blacksmith-card-description"
          >
            Would you like to buy knife for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyKnife}
              className="blacksmith-card-button"
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseKnife}
              className="blacksmith-card-button"
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card className={`${shieldCard ? "blacksmith-card" : "blacksmith-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="blacksmith-card-description"
          >
            Would you like to buy shield for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyShield}
              className="blacksmith-card-button"
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseShield}
              className="blacksmith-card-button"
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${swordCard ? "blacksmith-card" : "blacksmith-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="blacksmith-card-description"
          >
            Would you like to buy sword for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuySword}
              className="blacksmith-card-button"
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseSword}
              className="blacksmith-card-button"
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card className={`${poorCard ? "blacksmith-card" : "blacksmith-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="blacksmith-card-description"
          >
            I'm sorry. You appear not to have enough coins to buy this item.
          </Typography>
          <div className="button-div">
            <Button
              onClick={togglePoorCard}
              className="blacksmith-card-button"
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${boughtCard ? "blacksmith-card" : "blacksmith-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="blacksmith-card-description"
          >
            I'm sorry. I appear to be out of stock of that item. You must have
            bought my last one.
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBoughtCard}
              className="blacksmith-card-button"
              variant="contained"
              color="primary"
            >
              CLOSE
            </Button>
          </div>
        </Card>
        <Card
          className={`${thanksCard ? "blacksmith-card" : "blacksmith-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="blacksmith-card-description"
          >
            Here you go. Thanks for your business!
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleThanksCardClosed}
              className="blacksmith-card-button"
              variant="contained"
              color="primary"
            >
              CLOSE
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getBlacksmith, getInventory })(
  Blacksmith
);
