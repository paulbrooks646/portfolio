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
  const [inventoryArray, setInventoryArray] = useState([]);
  const [rejectionCard, setRejectionCard] = useState(false);

  useEffect(() => {
    getUser();
    inventoryToArray();
  }, []);

  const toggleInventoryOpen = () => setInentoryOpen(!inventoryOpen);

  const logout = () => {
    axios.delete("/api/logout").then(() => {
      props.logoutUser();
      props.history.push("/Auth");
    });
  };

  const inventoryToArray = () => {
    let arr = [];
    for (let key in props.inventory.inventory) {
      if (props.inventory.inventory[key] === true) {
        arr.push(key);
      }
    }
    setInventoryArray(arr);
  };

  const inventoryList = inventoryArray.map((e, index) => {
    return (
      <h4 key={index} className="nav-list-item" onClick={() => toggleItem(e)}>
        {e}
      </h4>
    );
  });

  const toggleItem = (item) => {
    if (item === "bottle") {
      if (props.location.pathname === "/Garden") {
        alert("blah blah blah");
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "flute") {
      if (props.location.pathname === "/Tower") {
        alert("blah blah blah");
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "rope") {
      if (props.location.pathname === "/Nest") {
        alert("blah blah blah");
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "meat") {
      if (props.location.pathname === "/Cave") {
        alert("blah blah blah");
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "cake") {
      if (props.location.pathname === "/Pass") {
        alert("blah blah blah");
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "ribbon") {
      if (props.location.pathname === "/Tower") {
        alert("blah blah blah");
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "flowers") {
      if (props.location.pathname === "/Tower") {
        alert("blah blah blah");
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "dagger") {
      if (props.location.pathname === "/Alley") {
        alert("blah blah blah");
      } else {
        setRejectionCard(true);
      }
    }
    if (item === "sword") {
      if (props.location.pathname === "/Swamp") {
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
    if (item === "manure") {
      if (props.location.pathname === "/Garden") {
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
      <Card id={`${rejectionCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          That item is not useful here.
        </Typography>
        <Button
          onClick={() => setRejectionCard(false)}
          className="stables-card-button"
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
  connect(mapStateToProps, { logoutUser, getUser, getInventory })(Nav)
);
