import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
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
  const [rejectionCard, setRejectionCard] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [storeData, setStoreData] = useState();

  useEffect(() => {
    axios.get("/api/store").then((res) => {
      setStoreData(res.data[0]);
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
    if (storeData.shoes_bought) {
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
            setStoreData(res.data[0]);
            setShoesCard(!shoesCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyRope = () => {
    if (storeData.rope_bought) {
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
            setStoreData(res.data[0]);
            setRopeCard(!ropeCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyFlute = () => {
    if (storeData.flute_bought) {
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
            setStoreData(res.data[0]);
            setFluteCard(!fluteCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyOil = () => {
    if (storeData.oil_bought) {
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
            setStoreData(res.data[0]);
            setOilCard(!oilCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyWood = () => {
    if (storeData.wood_bought) {
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
            setStoreData(res.data[0]);
            setWoodCard(!woodCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyBottle = () => {
    if (storeData.bottle_bought) {
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
            setStoreData(res.data[0]);
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
      <div className="store-body">
        <Card
          className={`${
            !storeCard ? "component-card" : "component-card-closed"
          }`}
        >
          <Typography variant="h4" color="primary">
            Good day! Can I help you?
          </Typography>
          <List className="component-list">
            <ListItem onClick={togglePurchaseBottle}>Bottle</ListItem>
            <ListItem onClick={togglePurchaseFlute}>Flute</ListItem>
            <ListItem onClick={togglePurchaseOil}>Oil</ListItem>
            <ListItem onClick={togglePurchaseRope}>Rope</ListItem>
            <ListItem onClick={togglePurchaseShoes}>Shoes</ListItem>
            <ListItem onClick={togglePurchaseWood}>Wood</ListItem>
          </List>
          <Button onClick={toggleExit} variant="contained" color="primary">
            EXIT SHOP
          </Button>
        </Card>
        <Card
          className={`${
            shoesCard ? "component-card" : "component-card-closed"
          }`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy some shoes for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyShoes}
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseShoes}
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${
            fluteCard ? "component-card" : "component-card-closed"
          }`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy a flute for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyFlute}
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseFlute}
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${ropeCard ? "component-card" : "component-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy a rope for 1 coin?
          </Typography>
          <div className="button-div">
            <Button onClick={toggleBuyRope} variant="contained" color="primary">
              YES
            </Button>
            <Button
              onClick={togglePurchaseRope}
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${oilCard ? "component-card" : "component-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy some oil for 1 coin?
          </Typography>
          <div className="button-div">
            <Button onClick={toggleBuyOil} variant="contained" color="primary">
              YES
            </Button>
            <Button
              onClick={togglePurchaseOil}
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${woodCard ? "component-card" : "component-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy a block of wood for 1 coin?
          </Typography>
          <div className="button-div">
            <Button onClick={toggleBuyWood} variant="contained" color="primary">
              YES
            </Button>
            <Button
              onClick={togglePurchaseWood}
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${
            bottleCard ? "component-card" : "component-card-closed"
          }`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy a bottle for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyBottle}
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseBottle}
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
  Store
);
