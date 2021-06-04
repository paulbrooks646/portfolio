import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import axios from "axios";
import "./Clearing.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import { getInventory } from "../../redux/inventoryReducer";

function Clearing(props) {
  const [downCharacter, setDownCharacter] = useState(false);
  const [downDown, setDownDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [clearingData, setClearingData] = useState();

  useEffect(() => {
    axios.get("/api/clearing").then((res) => {
      setClearingData(res.data[0]);

      setDownCharacter(true);

      setIsLoading(false);
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
    if (item === "flute") {
      if (props.location.pathname === "/Tower") {
        axios.post("/api/useFlute").then((res) => {
          setClearingData(res.data[0]);
        });
      } else {
        setRejectionCard(true);
      }
    }
  };

  const toggleDown = () => {
    axios.post("/api/changeLast", { last: "clearing" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Maze");
      });
    });
  };

  const toggleFirst = () => {
    axios.post("/api/clearingFirst").then((res) => {
      setClearingData(res.data[0]);
    });
  };

  const toggleGoDown = () => {
    setDownDown(true);
    setDownCharacter(false);
  };

  return isLoading ? (
    <Loading />
  ) : (
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
      <div className="clearing-body">
        <div className="clearing-top">
          <div className="clearing-top-left">
            <div className="clearing-cottage">
              <div className="clearing-left"></div>
              <div className="clearing-cottage-middle">
                <div className="clearing-chimney-div">
                  <div className="clearing-smoke"></div>
                  <div className="clearing-smoke-middle"></div>
                  <div className="clearing-smoke"></div>
                  <div className="clearing-chimney"></div>
                </div>
                <div className="clearing-short-log"></div>
                <div className="clearing-medium-log"></div>
                <div className="clearing-window-div">
                  <div className="clearing-window-div-side">
                    <div className="clearing-short-log"></div>
                    <div className="clearing-short-log"></div>
                  </div>
                  <div className="clearing-window">
                    <div className="clearing-window-row">
                      <div className="clearing-window-pane"></div>
                      <div className="clearing-window-line"></div>
                      <div className="clearing-window-pane"></div>
                    </div>
                    <div className="clearing-window-middle"></div>
                    <div className="clearing-window-row">
                      <div className="clearing-window-pane"></div>
                      <div className="clearing-window-line"></div>
                      <div className="clearing-window-pane"></div>
                    </div>
                  </div>
                  <div className="clearing-window-div-side">
                    <div className="clearing-short-log"></div>
                    <div className="clearing-short-log"></div>
                  </div>
                </div>
                <div className="clearing-long-log"></div>
                <div className="clearing-long-log"></div>
                <div className="clearing-door-div">
                  <div className="clearing-door-div-side">
                    <div className="clearing-short-log"></div>
                    <div className="clearing-short-log"></div>
                    <div className="clearing-short-log"></div>
                  </div>
                  <div className="clearing-door">
                    <div className="clearing-door-knob"></div>
                    <div className="clearing-lock-div">
                      <div className="clearing-lock-top"></div>
                      <div className="clearing-lock-bottom"></div>
                    </div>
                  </div>
                  <div className="clearing-door-div-side">
                    <div className="clearing-short-log"></div>
                    <div className="clearing-short-log"></div>
                    <div className="clearing-short-log"></div>
                  </div>
                </div>
              </div>
              <div className="clearing-right"></div>
            </div>
          </div>
          <div className="clearing-top-middle"></div>
          <div className="clearing-top-right">
            <div className="druid">
              <div className="druid-head">
                <div className="druid-hair-left"></div>
                <div className="druid-face">
                  <div className="druid-hair-top-left"></div>
                  <div className="druid-hair-top-right"></div>
                  <div className="druid-eyes">
                    <div className="druid-eye">
                      <div className="druid-iris"></div>
                    </div>
                    <div className="druid-eye">
                      <div className="druid-iris">
                        <div className="druid-pupil"></div>
                      </div>
                    </div>
                  </div>
                  <div className="druid-nose"></div>
                  <div className="druid-mouth"></div>
                </div>
                <div className="druid-hair-right"></div>
              </div>
              <div className="druid-body">
                <div className="druid-upper-neck"></div>
                <div className="druid-neck"></div>
                <div className="druid-dress">
                  <div className="druid-arm-left">
                    <div className="druid-finger-div">
                      <div className="druid-finger-one"></div>
                      <div className="druid-finger-two"></div>
                      <div className="druid-finger-three"></div>
                      <div className="druid-finger-four"></div>
                      <div className="druid-finger-five"></div>
                    </div>
                    </div>
                    <div className="druid-rope"></div>
                    <div className="druid-dress-crease"></div>

                  <div className="druid-arm-right">
                    <div className="druid-finger-div">
                      <div className="druid-finger-one"></div>
                      <div className="druid-finger-two"></div>
                      <div className="druid-finger-three"></div>
                      <div className="druid-finger-four"></div>
                      <div className="druid-finger-five"></div>
                    </div>
                  </div>
                </div>
                <div className="druid-legs">
                  <div className="druid-leg-left">
                    <div className="druid-foot"></div>
                  </div>
                  <div className="druid-leg-right">
                    <div className="druid-foot"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="chair-div">
              <div className="chair-top-div">
                <div className="chair-top"></div>
              </div>
              <div className="chair-seat"></div>
              <div className="chair-leg-div">
                <div className="chair-leg"></div>
                <div className="chair-leg"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="clearing-middle">
          <div className="clearing-middle-left">
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
          </div>
          <div className="clearing-middle-middle">
            <div className="clearing-gate">
              <div className="clearing-gate-top">
                <div className="clearing-gate-bolt"></div>
                <div className="clearing-gate-bolt"></div>
              </div>
              <div className="clearing-gate-middle">
                <div className="clearing-gate-bar-div">
                  <div className="clearing-gate-support"></div>
                  <div className="clearing-gate-support"></div>
                </div>
                <div className="clearing-gate-handle-div">
                  <div className="clearing-gate-handle"></div>
                </div>
              </div>
              <div className="clearing-gate-bottom">
                <div className="clearing-gate-bolt"></div>
                <div className="clearing-gate-bolt"></div>
              </div>
            </div>
          </div>
          <div className="clearing-middle-right">
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
            <div className="clearing-spike-div">
              <div className="clearing-spike-top"></div>
              <div className="clearing-spike-bottom"></div>
            </div>
          </div>
        </div>
        <div className="clearing-bottom">
          <div className="clearing-bottom-left"></div>
          <div className="clearing-bottom-middle">
            <div
              className={`${
                downCharacter ? "character-down" : "character-down-closed"
              }`}
            >
              <Character />
            </div>
            <div
              className={`${downDown ? "down-down" : "down-down-closed"}`}
              onAnimationEnd={toggleDown}
            >
              <Character />
            </div>
            <div className="clearing-maze" onClick={toggleGoDown}>
              <h2>Maze</h2>
              <ArrowDownward />
            </div>
          </div>
          <div className="clearing-bottom-right"></div>
        </div>
      </div>
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
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getInventory, logoutUser })(
  Clearing
);
