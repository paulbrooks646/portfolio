import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { getInventory } from "../../redux/inventoryReducer";
import { getBog } from "../../redux/bogReducer";
import axios from "axios";
import "./Bog.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";

function Bog(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const [leftCharacter, setLeftCharacter] = useState(false);
  const [leftLeft, setLeftLeft] = useState(false);
  const [sulfurCard, setSulfurCard] = useState(false)
  const [coinCard, setCoinCard] = useState(false)
  const [coinRejectionCard, setCoinRejectionCard] = useState(false)
  const [scalesCard, setScalesCard] = useState(false)
  const [hydraCard, setHydraCard] = useState(false)

  useEffect(() => {

    axios.get("/api/bog").then((res) => {
      props.getBog(res.data[0]);
      if (res.data[0].first_time) {
        setFirstTime(true)
      }
      setLeftCharacter(true);
      setIsLoading(false);
    });
  }, []);

  const toggleLeft = () => {
    axios.post("/api/changeLast", { last: "bog" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Swamp");
      });
    });
  };

  const toggleGoLeft = () => {
    setLeftCharacter(false);
    setLeftLeft(true);
  };

  const toggleFirst = () => {
    axios.post("/api/bogFirst").then(res => {
      props.getBog(res.data[0])
      setFirstTime(false)
    })
  }

  const toggleSulfur = () => {
    axios.post("/api/sulfur").then(res => {
      props.getInventory(res.data)
      axios.get("/api/bog").then(res => {
        props.getBog(res.data[0])
        setSulfurCard(true)
      })
    })
  }

  const toggleHydra = () => {
    setHydraCard(true)
  }

  const toggleCoin = () => {
    if (props.bog.bog.hydra_dead) {
      axios.post("/api/coin").then(res => {
        props.getUser(res.data)
        axios.post("/api/coin").then(res => {
          props.getUser(res.data)
          axios.post("/api/coin").then(res => {
            props.getUser(res.data)
            axios.post("/api/bogCoins").then(res => {
              props.getBog(res.data[0])
              setCoinCard(true)
            })
          })
        })
      })
    } else {
      setCoinRejectionCard(true)
    }
  }

  const toggleScales = () => {
    axios.post("/api/scales").then(res => {
      props.getInventory(res.data)
      axios.get("/api/bog").then(res => {
        props.getBog(res.data[0])
        setScalesCard(true)
      })
    })
  }

  const togglePodAnimation = () => {
    
    axios.post("/api/hydraExploding").then(res => {
    
      props.getBog(res.data[0])
    })
    
  }

  const toggleExplosion = () => {
    axios.post("/api/hydraDead").then(res => {
      props.getBog(res.data[0])
    })
  }



  return isLoading ? (
    <Loading />
  ) : (
    <div className="main">
      <Nav />
      <div className="bog-body">
        <div className="bog-top"></div>
        <div className="bog-middle">
          <div className="bog-middle-left">
            <div className="bog-swamp" onClick={toggleGoLeft}>
              <ArrowBack />
              <h2>Swamp</h2>
            </div>
            <div
              className={`${
                leftCharacter ? "character-left" : "character-left-closed"
              }`}
            >
              <Character />
              <div
                className={`${
                  props.bog.bog.pod_thrown && !props.bog.bog.hydra_exploding
                    ? "pod"
                    : "pod-closed"
                }`}
                onAnimationEnd={togglePodAnimation}
              ></div>
            </div>
            <div
              className={`${leftLeft ? "left-left" : "left-left-closed"}`}
              onAnimationEnd={toggleLeft}
            >
              <Character />
            </div>
          </div>
          <div className="bog-middle-right">
            <div
              className={`${
                !props.bog.bog.hydra_dead ? "hydra" : "hydra-closed"
              }`}
              onClick={toggleHydra}
            ></div>
            <div
              className={`${
                props.bog.bog.hydra_exploding && !props.bog.bog.hydra_dead
                  ? "explosion"
                  : "explosion-closed"
              }`}
              onAnimationEnd={toggleExplosion}
            ></div>
            <div
              className={`${
                props.bog.bog.hydra_dead && !props.bog.bog.scales_taken
                  ? "scales"
                  : "scales-closed"
              }`}
              onClick={toggleScales}
            ></div>
            <div
              className={`${
                !props.bog.bog.coins_taken ? "coins" : "coins-closed"
              }`}
              onClick={toggleCoin}
            >
              <div className="coin"></div>
              <div className="coin"></div>
              <div className="coin"></div>
            </div>
          </div>
        </div>
        <div className="bog-bottom">
          <div className="bog-bottom-left">
            <div
              className={`${
                !props.bog.bog.sulfur_taken ? "sulfur" : "sulfur-closed"
              }`}
              onClick={toggleSulfur}
            ></div>
          </div>
          <div className="bog-bottom-middle"></div>
          <div className="bog-bottom-right"></div>
        </div>
      </div>
      <Card
        className={`${
          coinRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You have to be joking. The hydra would eat you if you tried to take
          those coins right now.
        </Typography>
        <Button
          onClick={() => setCoinRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${coinCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You pick up three shiny gold coins.
        </Typography>
        <Button
          onClick={() => setCoinCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>

      <Card className={`${firstTime ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          As your approach the fetid bog deep in the swamp the putrid smell of
          sulfur engulfs you. You are eager to be gone from this place. You are
          even more excited to leave when you see the massive hissing hydra in
          the distance.
        </Typography>
        <Button onClick={toggleFirst} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${hydraCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          Unless your goal is to get eaten, I suggest you stay as far away from
          the hydra as possible.
        </Typography>
        <Button
          onClick={() => setHydraCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${sulfurCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You hold your breath as you pick up the nasty smelling sulfur. Try to
          get rid of it as soon as posiible.
        </Typography>
        <Button
          onClick={() => setSulfurCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${scalesCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          You pick up a few hydra scales, which is all that is left of the hydra after the explosion.
        </Typography>
        <Button
          onClick={() => setScalesCard(false)}
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
export default connect(mapStateToProps, { getUser, getInventory, getBog })(Bog);
