import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getGrocer } from "../../redux/grocerReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Grocer.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

function Grocer(props) {
  const [exit, setExit] = useState(false);
  const [grocerCard, setGrocerCard] = useState(false);
  const [candyCard, setCandyCard] = useState(false);
  const [cakeCard, setCakeCard] = useState(false);
  const [cheeseCard, setCheeseCard] = useState(false);
  const [nutsCard, setNutsCard] = useState(false);
  const [meatCard, setMeatCard] = useState(false);
  const [potatoesCard, setPotatoesCard] = useState(false);
  const [poorCard, setPoorCard] = useState(false);
  const [boughtCard, setBoughtCard] = useState(false);
  const [thanksCard, setThanksCard] = useState(false);

  useEffect(() => {
    axios.get("/api/grocer").then((res) => {
      props.getGrocer(res.data[0]);
    });
  }, []);

  const toggleExit = () => {
    setExit(!exit);
    props.history.push("/Market");
  };

  const togglePurchaseCake = () => {
    setCakeCard(!cakeCard);
    setGrocerCard(!grocerCard);
  };

  const togglePurchaseCandy = () => {
    setCandyCard(!candyCard);
    setGrocerCard(!grocerCard);
  };

  const togglePurchaseCheese = () => {
    setCheeseCard(!cheeseCard);
    setGrocerCard(!grocerCard);
  };

  const togglePurchaseMeat = () => {
    setMeatCard(!meatCard);
    setGrocerCard(!grocerCard);
  };

  const togglePurchaseNuts = () => {
    setNutsCard(!nutsCard);
    setGrocerCard(!grocerCard);
  };

  const togglePurchasePotatoes = () => {
    setPotatoesCard(!potatoesCard);
    setGrocerCard(!grocerCard);
  };

  const toggleBuyCake = () => {
    if (props.grocer.grocer.cake_bought) {
      setCakeCard(!cakeCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setCakeCard(!cakeCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/cake").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/grocer").then((res) => {
            props.getGrocer(res.data[0]);
            setCakeCard(!cakeCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyCandy = () => {
    if (props.grocer.grocer.candy_bought) {
      setCandyCard(!candyCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setCandyCard(!candyCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/candy").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/grocer").then((res) => {
            props.getGrocer(res.data[0]);
            setCandyCard(!candyCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyCheese = () => {
    if (props.grocer.grocer.cheese_bought) {
      setCheeseCard(!cheeseCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setCheeseCard(!cheeseCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/cheese").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/grocer").then((res) => {
            props.getGrocer(res.data[0]);
            setCheeseCard(!cheeseCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyMeat = () => {
    if (props.grocer.grocer.meat_bought) {
      setMeatCard(!meatCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setMeatCard(!meatCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/meat").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/grocer").then((res) => {
            props.getGrocer(res.data[0]);
            setMeatCard(!meatCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyNuts = () => {
    if (props.grocer.grocer.nuts_bought) {
      setNutsCard(!nutsCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setNutsCard(!nutsCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/nuts").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/grocer").then((res) => {
            props.getGrocer(res.data[0]);
            setNutsCard(!nutsCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyPotatoes = () => {
    if (props.grocer.grocer.potatoes_bought) {
      setPotatoesCard(!potatoesCard);
      setBoughtCard(!boughtCard);
    } else if (props.user.user.coins < 1) {
      setPotatoesCard(!potatoesCard);
      setPoorCard(!poorCard);
    } else {
      axios.post("/api/potatoes").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/user").then((res) => {
          props.getUser(res.data);
          axios.get("/api/grocer").then((res) => {
            props.getGrocer(res.data[0]);
            setPotatoesCard(!potatoesCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBoughtCard = () => {
    setBoughtCard(!boughtCard);
    setGrocerCard(!grocerCard);
  };

  const togglePoorCard = () => {
    setPoorCard(!poorCard);
    setGrocerCard(!grocerCard);
  };

  const toggleThanksCard = () => setThanksCard(!thanksCard);

  const toggleThanksCardClosed = () => {
    setThanksCard(!thanksCard);
    setGrocerCard(!grocerCard);
  };

  return (
    <div className="main">
      <Nav />
      <div className="grocer-body">
        <Card
          className={`${
            !grocerCard ? "component-card" : "component-card-closed"
          }`}
        >
          <Typography variant="h4" color="primary">
            Good day! Can I help you?
          </Typography>
          <List className="component-list">
            <ListItem onClick={togglePurchaseCake}>Cake</ListItem>
            <ListItem onClick={togglePurchaseCandy}>Candy</ListItem>
            <ListItem onClick={togglePurchaseCheese}>Cheese</ListItem>
            <ListItem onClick={togglePurchaseMeat}>Meat</ListItem>
            <ListItem onClick={togglePurchaseNuts}>Nuts</ListItem>
            <ListItem onClick={togglePurchasePotatoes}>Potatoes</ListItem>
          </List>
          <Button onClick={toggleExit} variant="contained" color="primary">
            EXIT SHOP
          </Button>
        </Card>
        <Card
          className={`${cakeCard ? "component-card" : "component-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy a cake for 1 coin?
          </Typography>
          <div className="button-div">
            <Button onClick={toggleBuyCake} variant="contained" color="primary">
              YES
            </Button>
            <Button
              onClick={togglePurchaseCake}
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${
            cheeseCard ? "component-card" : "component-card-closed"
          }`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy some cheese for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyCheese}
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseCheese}
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${
            candyCard ? "component-card" : "component-card-closed"
          }`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy some candy for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyCandy}
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseCandy}
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${meatCard ? "component-card" : "component-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy some meat for 1 coin?
          </Typography>
          <div className="button-div">
            <Button onClick={toggleBuyMeat} variant="contained" color="primary">
              YES
            </Button>
            <Button
              onClick={togglePurchaseMeat}
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${nutsCard ? "component-card" : "component-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy some nuts for 1 coin?
          </Typography>
          <div className="button-div">
            <Button onClick={toggleBuyNuts} variant="contained" color="primary">
              YES
            </Button>
            <Button
              onClick={togglePurchaseNuts}
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${
            potatoesCard ? "component-card" : "component-card-closed"
          }`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy some potatoes for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyPotatoes}
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchasePotatoes}
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
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getGrocer, getInventory })(
  Grocer
);
