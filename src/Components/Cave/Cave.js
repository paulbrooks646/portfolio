import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import { getCave } from "../../redux/caveReducer";
import axios from "axios";
import "./Cave.scss";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Loading from "../Loading/Loading";
import Character from "../Character/Character";

function Cave(props) {
  const [up, setUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get("/api/cave").then((res) => {
      props.getCave(res.data[0]);
      setIsLoading(false);
    });
  }, []);

  const toggleUp = () => {
    setUp(!up);
    props.history.push("/Forest");
  };

  return (

    isLoading ? <Loading/> :
    <div className="cave-main">
      <Nav />
      <div className="cave-body">
        <div className="cave-top">
          <div className="cave-top-left"></div>
          <div className="cave-top-middle">
            <div className="cave-forest" onClick={toggleUp}>
              <ArrowUpward />
              <h2>Forest</h2>
              <Character/>
            </div>
          </div>
          <div className="cave-top-right"></div>
        </div>

        <div className="cave-bottom">
          <div className="cave-bottom-left">
            <div className="cave-wolf"></div>
          </div>
          <div className="cave-bottom-middle"></div>
          <div className="cave-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getUser, getInventory, getCave })(Cave);
