import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import axios from "axios";
import "./Nav.scss";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

function Nav(props) {
  const [inventoryOpen, setInentoryOpen] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
 
  const [fluteCard, setFluteCard] = useState(false);
  const [flowerCard, setFlowerCard] = useState(false);
  const [ribbonCard, setRibbonCard] = useState(false);

  useEffect(() => {
    axios.get("/api/getUser").then((res) => {
      getUser(res.data);
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
          props.getTower(res.data[0]);
          setFluteCard(true);
        });
      } else {
        setRejectionCard(true);
      }
    }

    if (item === "ribbon") {
      if (props.location.pathname === "/Tower") {
        axios.post("/api/giveRibbon").then((res) => {
          props.getInventory(res.data);
          axios.get("/api/tower").then((res) => {
            props.getTower(res.data[0]);
            setRibbonCard(true);
          });
        });
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "flowers") {
      if (props.location.pathname === "/Tower") {
        axios.post("/api/giveFlowers").then((res) => {
          props.getInventory(res.data);
          axios.post("/api/coin").then((res) => {
            props.getUser(res.data);
            axios.get("/api/tower").then((res) => {
              props.getTower(res.data[0]);
              setFlowerCard(true);
            });
          });
        });
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "dagger") {
      if (props.location.pathname === "/Clearing") {
        alert("blah blah blah");
      } else {
        setRejectionCard(true);
      }
    }

    if (item === "shield") {
      if (props.location.pathname === "/Valley") {
        alert("blah blah blah");
      } else {
        setRejectionCard(true);
      }
    }
   
    
  };

  return (
    <div className="nav-main">
      <div className="inventory-div">
        <BusinessCenter
          className="inventory-icon"
          onClick={toggleInventoryOpen}
        />
        <div
          className={`${inventoryOpen ? "inventory-open" : "inventory-closed"}`}
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
      
      <Card className={`${bottleCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="primary"
          className="answer-card-description"
        >
          You succeed in filling your bottle with smelly, rancid manure.
          Congratulations?
        </Typography>
        <Button
          onClick={() => setBottleCard(false)}
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

export default withRouter(
  connect(mapStateToProps, {
    logoutUser,
    getUser,
    getInventory,
  })(Nav)
);
