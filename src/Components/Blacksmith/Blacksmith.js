import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
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
   const [inventoryOpen, setInentoryOpen] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [blacksmithData, setBlacksmithData] = useState();
   
   useEffect(() => {
     axios.get("/api/blacksmith").then((res) => {
       setBlacksmithData(res.data[0]);
     });
   }, []);
  
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
     if (item === "flute") {
       if (props.location.pathname === "/Tower") {
         axios.post("/api/useFlute").then((res) => {
           setBlacksmithData(res.data[0]);
           ;
         });
       } else {
         setRejectionCard(true);
       }
     }
   };


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
    if (blacksmithData.armor_bought) {
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
            setBlacksmithData(res.data[0]);
            setArmorCard(!armorCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyBow = () => {
    if (blacksmithData.bow_bought) {
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
            setBlacksmithData(res.data[0]);
            setBowCard(!bowCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyDagger = () => {
    if (blacksmithData.dagger_bought) {
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
            setBlacksmithData(res.data[0]);
            setDaggerCard(!daggerCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyKnife = () => {
    if (blacksmithData.knife_bought) {
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
            setBlacksmithData(res.data[0]);
            setKnifeCard(!knifeCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuyShield = () => {
    if (blacksmithData.shield_bought) {
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
            setBlacksmithData(res.data[0]);
            setShieldCard(!shieldCard);
            toggleThanksCard();
          });
        });
      });
    }
  };

  const toggleBuySword = () => {
    if (blacksmithData.sword_bought) {
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
            setBlacksmithData(res.data[0]);
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
      <div className="blacksmith-body">
        <Card
          className={`${
            !blacksmithCard ? "component-card" : "component-card-closed"
          }`}
        >
          <Typography variant="h4" color="primary">
            Good day! Can I help you?
          </Typography>
          <List className="component-list">
            <ListItem onClick={togglePurchaseArmor}>Armor</ListItem>
            <ListItem onClick={togglePurchaseBow}>Bow</ListItem>
            <ListItem onClick={togglePurchaseDagger}>Dagger</ListItem>
            <ListItem onClick={togglePurchaseKnife}>Knife</ListItem>
            <ListItem onClick={togglePurchaseShield}>Shield</ListItem>
            <ListItem onClick={togglePurchaseSword}>Sword</ListItem>
          </List>
          <Button onClick={toggleExit} variant="contained" color="primary">
            EXIT SHOP
          </Button>
        </Card>
        <Card
          className={`${
            armorCard ? "component-card" : "component-card-closed"
          }`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy armor for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyArmor}
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseArmor}
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${
            daggerCard ? "component-card" : "component-card-closed"
          }`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy a dagger for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyDagger}
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseDagger}
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${bowCard ? "component-card" : "component-card-closed"}`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy a bow with my last arrow for 1 coin?
          </Typography>
          <div className="button-div">
            <Button onClick={toggleBuyBow} variant="contained" color="primary">
              YES
            </Button>
            <Button
              onClick={togglePurchaseBow}
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${
            knifeCard ? "component-card" : "component-card-closed"
          }`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy a knife for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyKnife}
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseKnife}
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${
            shieldCard ? "component-card" : "component-card-closed"
          }`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy a shield for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuyShield}
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseShield}
              variant="contained"
              color="primary"
            >
              NO
            </Button>
          </div>
        </Card>
        <Card
          className={`${
            swordCard ? "component-card" : "component-card-closed"
          }`}
        >
          <Typography
            variant="h4"
            color="secondary"
            className="component-card-description"
          >
            Would you like to buy a sword for 1 coin?
          </Typography>
          <div className="button-div">
            <Button
              onClick={toggleBuySword}
              variant="contained"
              color="primary"
            >
              YES
            </Button>
            <Button
              onClick={togglePurchaseSword}
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
export default connect(mapStateToProps, {
  getUser,
  getInventory,
})(Blacksmith);
