import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import { getTower} from "../../redux/towerReducer"
import axios from "axios";
import "./Tower.scss";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Character from "../Character/Character";
import Weasel from "../../Images/Weasel.png";
import Princess from "../../Images/Princess.png";
import Loading from "../Loading/Loading"

function Tower(props) {
  const [left, setLeft] = useState(false);
  const [weasel, setWeasel] = useState(false);
  const [princess, setPrincess] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    axios.get("/api/tower").then((res) => {
      props.getTower(res.data[0]);
      setIsLoading(false);
    });
  }, []);

  const toggleLeft = () => {
    setLeft(!left);
    props.history.push("/Castle");
  };

  const togglePrincess = () => {
    setPrincess(!princess);
  };

  return (

    isLoading ? <Loading/> :
    <div className="tower-main">
      <Nav />
      <div className="tower-body">
        <div className="tower-top">
          <div className="tower-top-left">
            <div className="tower-top-left-up"></div>
            <div className="tower-top-left-down">
              <div className="tower-castle" onClick={toggleLeft}>
                <ArrowBack />
                <h2>Castle</h2>
              </div>
              <Character />
              <img
                src={Weasel}
                className="tower-weasel"
                onClick={() => setWeasel(true)}
                alt="weasel"
              />
            </div>
          </div>

          <div className="tower-top-right"></div>
        </div>

        <div className="tower-bottom">
          <div className="tower-bottom-left"></div>
          <div className="tower-bottom-middle">
            <div className="tower-bottom-middle-up"></div>
            <div className="tower-bottom-middle-down"></div>
          </div>
          <div className="tower-bottom-right">
            <div className="tower-bottom-right-up">
              <img
                src={Princess}
                className="tower-princess"
                alt="princess"
                onClick={togglePrincess}
              />
            </div>
            <div className="tower-bottom-right-down"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getInventory, getTower })(Tower);
