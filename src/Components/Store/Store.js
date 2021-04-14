import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import { getStore } from "../../redux/storeReducer";
import axios from "axios";
import "./Store.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

function Store(props) {
  const [exit, setExit] = useState(false);
  const [item, setItem] = useState("");
  const [storeCard, setStoreCard] = useState(false);
  const [candy, setCandy] = useState("")

  useEffect(() => {
    axios.get("/api/store").then((res) => {
      props.getStore(res.data[0]);
    });
  }, []);

  const toggleExit = () => {
    setExit(!exit);
    props.history.push("/Market");
  };

  const togglePurchaseCake = () => {};

  const togglePurchaseCandy = () => {};

  const togglePurchaseCheese = () => {};

  const togglePurchaseMeat = () => {};

  const togglePurchaseNuts = () => {};

  const togglePurchasePotatoes = () => {};

  const togglePurchase = product => {
    setItem(product);
    setStoreCard(!storeCard);
  };

  const toggleBuy = product => {
    

    if (!product ) {
console.log(false)
      // axios.post(`/api/${item.toLowerCase()}`).then((res) => {
      //   props.getInventory(res.data);
      //   axios.post(`/api/giveCoin`).then((res) => {
      //     props.getUser(res.data);
      //     axios.get("/api/store").then((res) => {
      //       props.getStore(res.data[0]);
      //     });
      //   });
      //   setStoreCard(false);
      // });
    } else {
      alert("already bought");
    }
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
              onClick={() => togglePurchase("Cake")}
            >
              Cake
            </ListItem>
            <ListItem
              className="store-list-item"
              onClick={() => togglePurchase("Candy")}
            >
              Candy
            </ListItem>
            <ListItem
              className="store-list-item"
              onClick={() => togglePurchase("Cheese")}
            >
              Cheese
            </ListItem>
            <ListItem
              className="store-list-item"
              onClick={() => togglePurchase("Meat")}
            >
              Meat
            </ListItem>
            <ListItem
              className="store-list-item"
              onClick={() => togglePurchase("Nuts")}
            >
              Nuts
            </ListItem>
            <ListItem
              className="store-list-item"
              onClick={() => togglePurchase("Potatoes")}
            >
              Potatoes
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
        <Card className={`${storeCard ? "store-card" : "store-card-closed"}`}>
          <Typography
            variant="h4"
            color="secondary"
            className="store-card-description"
          >
            Would you like to buy {item} for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={() => toggleBuy(item.toLowerCase())}
              className="store-card-button"
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={() => setStoreCard(false)}
              className="store-card-button"
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getInventory, getStore })(
  Store
);
