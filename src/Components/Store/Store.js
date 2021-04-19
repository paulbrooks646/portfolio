import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getStore } from "../../redux/storeReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Store.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

function Store(props) {
  const [exit, setExit] = useState(false);
  const [storeCard, setStoreCard] = useState(false);
  const [ropeCard, setRopeCard] = useState(false);
  const [shoesCard, setShoesCard] = useState(false);
  const [fluteCard, setFluteCard] = useState(false);
  const [woodCard, setWoodCard] = useState(false);
  const [oilCard, setOilCard] = useState(false);
  const [bottleCard, setBottleCard] = useState(false);
  const [poorCard, setPoorCard] = useState(false);
  const [boughtCard, setBoughtCard] = useState(false);
  const [thanksCard, setThanksCard] = useState(false);

  useEffect(() => {
    axios.get("/api/store").then((res) => {
      props.getStore(res.data[0]);
    });
  }, []);

  const toggleExit = () => {
    setExit(!exit);
    props.history.push("/Market");
  };

  const togglePurchaseShoes = () => {
    setShoesCard(!shoesCard);
    setStoreCard(!storeCard);
  };

  const togglePurchaseRope = () => {
    setRopeCard(!ropeCard);
    setStoreCard(!storeCard);
  };

  const togglePurchaseFlute = () => {
    setFluteCard(!fluteCard);
    setStoreCard(!storeCard);
  };

  const togglePurchaseOil = () => {
    setOilCard(!oilCard);
    setStoreCard(!storeCard);
  };

  const togglePurchaseWood = () => {
    setWoodCard(!woodCard);
    setStoreCard(!storeCard);
  };

  const togglePurchaseBottle = () => {
    setBottleCard(!bottleCard);
    setStoreCard(!storeCard);
  };

  const toggleBuyShoes = () => {
    if (props.store.store.shoes_bought) {
      setShoesCard(!shoesCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setShoesCard(!shoesCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/shoes").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/store").then((res) => {
            props.getStore(res.data[0]);
            setShoesCard(!shoesCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyRope = () => {
    if (props.store.store.rope_bought) {
      setRopeCard(!ropeCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setRopeCard(!ropeCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/rope").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/store").then((res) => {
            props.getStore(res.data[0]);
            setRopeCard(!ropeCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyFlute = () => {
    if (props.store.store.flute_bought) {
      setFluteCard(!fluteCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setFluteCard(!fluteCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/flute").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/store").then((res) => {
            props.getStore(res.data[0]);
            setFluteCard(!fluteCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyOil = () => {
    if (props.store.store.oil_bought) {
      setOilCard(!oilCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setOilCard(!oilCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/oil").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/store").then((res) => {
            props.getStore(res.data[0]);
            setOilCard(!oilCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyWood = () => {
    if (props.store.store.wood_bought) {
      setWoodCard(!woodCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setWoodCard(!woodCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/wood").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/store").then((res) => {
            props.getStore(res.data[0]);
            setWoodCard(!woodCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyBottle = () => {
    if (props.store.store.bottle_bought) {
      setBottleCard(!bottleCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setBottleCard(!bottleCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/bottle").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/store").then((res) => {
            props.getStore(res.data[0]);
            setBottleCard(!bottleCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBoughtCard = () => {
    setBoughtCard(!boughtCard);
    setStoreCard(!storeCard);
  };

  const togglePoorCard = () => {
    setPoorCard(!poorCard);
    setStoreCard(!storeCard);
  };

  const toggleThanksCard = () => setThanksCard(!thanksCard);

  const toggleThanksCardClosed = () => {
    setThanksCard(!thanksCard);
    setStoreCard(!storeCard);
  };

  return (
    <div className="store-main">
      <Nav />
      <div className="store-body">
        <Card className={`${!storeCard ? "store-card" : "store-card-closed"}`}>
          <Typography variant="h4" color="primary" className="store-card-title">
            Good day! Can I help you?
          </Typography>
          <List className="store-list">
            <ListItem
              className="store-list-item"
              onClick={togglePurchaseBottle}
            >
              Bottle
            </ListItem>
            <ListItem className="store-list-item" onClick={togglePurchaseFlute}>
              Flute
            </ListItem>
            <ListItem className="store-list-item" onClick={togglePurchaseOil}>
              Oil
            </ListItem>
            <ListItem className="store-list-item" onClick={togglePurchaseRope}>
              Rope
            </ListItem>
            <ListItem className="store-list-item" onClick={togglePurchaseShoes}>
              Shoes
            </ListItem>
            <ListItem className="store-list-item" onClick={togglePurchaseWood}>
              Wood
            </ListItem>
          </List>
          <Button
            onClick={toggleExit}
            className="store-card-button"
            variant="contained"
            color="primary"
          >
            EXIT SHOP
          </Button>
        </Card>
        <Card className={`${shoesCard ? "store-card" : "store-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="store-card-description"
          >
            Would you like to buy some shoes for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyShoes}
              className="store-card-button"
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseShoes}
              className="store-card-button"
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card className={`${fluteCard ? "store-card" : "store-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="store-card-description"
          >
            Would you like to buy a flute for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyFlute}
              className="store-card-button"
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseFlute}
              className="store-card-button"
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card className={`${ropeCard ? "store-card" : "store-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="store-card-description"
          >
            Would you like to buy a rope for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyRope}
              className="store-card-button"
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseRope}
              className="store-card-button"
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card className={`${oilCard ? "store-card" : "store-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="store-card-description"
          >
            Would you like to buy some oil for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyOil}
              className="store-card-button"
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseOil}
              className="store-card-button"
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card className={`${woodCard ? "store-card" : "store-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="store-card-description"
          >
            Would you like to buy a block of wood for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyWood}
              className="store-card-button"
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseWood}
              className="store-card-button"
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card className={`${bottleCard ? "store-card" : "store-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="store-card-description"
          >
            Would you like to buy a bottle for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyBottle}
              className="store-card-button"
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseBottle}
              className="store-card-button"
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card className={`${poorCard ? "store-card" : "store-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="store-card-description"
          >
            I'm sorry. You appear not to have enough coins to buy this item.
          </Typography>
          <div className="button-div">
            <Button
              onClick={togglePoorCard}
              className="store-card-button"
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card className={`${boughtCard ? "store-card" : "store-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="store-card-description"
          >
            I'm sorry. I appear to be out of stock of that item. You must have
            bought my last one.
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBoughtCard}
              className="store-card-button"
              variant="contained"
              color="primary"
            >
              CLOSE
            </Button>
          </div>
        </Card>
        <Card className={`${thanksCard ? "store-card" : "store-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="store-card-description"
          >
            Here you go. Thanks for your business!
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleThanksCardClosed}
              className="store-card-button"
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
export default connect(mapStateToProps, { getUser, getStore, getInventory })(
  Store
);
