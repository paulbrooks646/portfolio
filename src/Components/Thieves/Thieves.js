import React, { useState, useEffect } from "react";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/userReducer";
import axios from "axios";
import "./Thieves.scss";
import Character from "../Character/Character";
import Loading from "../Loading/Loading";
import House from "../House/House";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { getInventory } from "../../redux/inventoryReducer";

function Thieves(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [answerOne, setAnswerOne] = useState(false);
  const [answerTwo, setAnswerTwo] = useState(false);
  const [answerThree, setAnswerThree] = useState(false);
  const [answerFour, setAnswerFour] = useState(false);
  const [answerFive, setAnswerFive] = useState(false);
  const [answerSix, setAnswerSix] = useState(false);
  const [answerSeven, setAnswerSeven] = useState(false);
  const [answerSevenA, setAnswerSevenA] = useState(false);
  const [answerEight, setAnswerEight] = useState(false);
  const [answerNine, setAnswerNine] = useState(false);
  const [answerTen, setAnswerTen] = useState(false);
  const [thief, setThief] = useState(false);
  const [ragCard, setRagCard] = useState(false);
  const [chestCard, setChestCard] = useState(false);
  const [pickCard, setPickCard] = useState(false);
  const [masterThiefCard, setMasterThiefCard] = useState(false);
  const [cloakCard, setCloakCard] = useState(false);
  const [firstTimeCard, setFirstTimeCard] = useState(false);
  const [thiefRejectionCard, setThiefRejectionCard] = useState(false);
  const [leftCharacter, setLeftCharacter] = useState(false);
  const [leftLeft, setLeftLeft] = useState(false);
  const [rejectionCard, setRejectionCard] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [thievesData, setThievesData] = useState();

  useEffect(() => {
    
    axios.get("/api/thieves").then((res) => {
      if (res.data[0].first_time) {
        setFirstTimeCard(true)
      }
      setThievesData(res.data[0]);
      setLeftCharacter(true);
      setIsLoading(false);
    });
  }, []);

   const toggleFirst = () => {
     axios.post("/api/thievesFirst").then((res) => {
       setThievesData(res.data[0]);
       setFirstTimeCard(false);
     });
   };

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
    if (item === "rag") {
      axios.post("/api/useRag").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/thieves").then((res) => {
          setThievesData(res.data[0]);
          setRagCard(true);
        });
      });
    } else if (item === "chest") {
      axios.post("/api/useChest").then((res) => {
        props.getInventory(res.data);
        axios.get("/api/thieves").then((res) => {
          setThievesData(res.data[0]);
          setChestCard(true);
        });
      });
    } else {
      setRejectionCard(true);
    }
  };

  const toggleLeft = () => {
    axios.post("/api/changeLast", { last: "thieves" }).then((res) => {
      props.getUser(res.data).then(() => {
        props.history.push("/Alley");
      });
    });
  };

  const toggleGoLeft = () => {
    setLeftCharacter(false);
    setLeftLeft(true);
  };

  const toggleThief = () => {
    if (!thievesData.rag_used) {
      setThiefRejectionCard(true)
    } else if (thievesData.blanket_used && thievesData.candy_used && thievesData.toy_used && thievesData.shoes_used && !thievesData.master_thief) {
      axios.post("/api/masterThief").then(res => {
        setThievesData(res.data[0])
        setMasterThiefCard(true)
      })
    } else if (thievesData.chest_used && thievesData.brigands_stopped && !thievesData.cloak_received) {
      axios.post("/api/cloak").then(res => {
        props.getInventory(res.data)
        axios.get("/api/thieves").then(res => {
          setThievesData(res.data[0])
          setCloakCard(true)
        })
      })
    } else {
      setThief(!thief);
    }
  };

  const toggleAnswerOne = () => {
    toggleThief();
    setAnswerOne(!answerOne);
  };

  const toggleAnswerTwo = () => {
    toggleThief();
    setAnswerTwo(!answerTwo);
  };

  const toggleAnswerThree = () => {
    toggleThief();
    setAnswerThree(!answerThree);
  };

  const toggleAnswerFour = () => {
    toggleThief();
    setAnswerFour(!answerFour);
  };

  const toggleAnswerFive = () => {
    toggleThief();
    setAnswerFive(!answerFive);
  };

  const toggleAnswerSix = () => {
    toggleThief();
    setAnswerSix(!answerSix);
  };

  const toggleAnswerSeven = () => {
    toggleThief();
    setAnswerSeven(!answerSeven);
  };

  const toggleAnswerSevenA = () => {
    setAnswerSeven(false);
    setAnswerSevenA(true);
  };

  const toggleAnswerEight = () => {
    toggleThief();
    setAnswerEight(!answerEight);
  };

  const toggleAnswerNine = () => {
   
    toggleThief();
    setAnswerNine(!answerNine);
  };

  const togglePick = () => {
     if (!thievesData.pick_received) {
       axios.post("/api/pick").then((res) => {
         props.getInventory(res.data);
         axios.get("/api/thieves").then((res) => {
           setThievesData(res.data[0]);
           axios.post("/api/coin").then(res => {
             props.getUser(res.data)
             axios.post("/api/coin").then((res) => {
               props.getUser(res.data);
               axios.post("/api/coin").then((res) => {
                 props.getUser(res.data);
                 axios.post("/api/coin").then((res) => {
                   props.getUser(res.data);
                   axios.post("/api/coin").then((res) => {
                     props.getUser(res.data);
                     axios.post("/api/coin").then((res) => {
                       props.getUser(res.data);
                       setAnswerNine(false)
                       setPickCard(true)
                       
                     });
                   });
                 });
               });
             });
           })
         });
       });
     } else {
       setAnswerNine(false)
       setThief(true)
     }
  }

  const toggleAnswerTen = () => {
    toggleThief();
    setAnswerTen(!answerTen);
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
      <House />
      <div className="thieves-middle-left">
        <div className="thieves-alley" onClick={toggleGoLeft}>
          <ArrowBack />
          <h2>Alley</h2>
        </div>
        <div
          className={`${
            leftCharacter ? "character-left" : "character-left-closed"
          }`}
        >
          <Character />
        </div>
        <div
          className={`${leftLeft ? "left-left" : "left-left-closed"}`}
          onAnimationEnd={toggleLeft}
        >
          <Character />
        </div>
      </div>
      <div className="thieves-middle-middle"></div>
      <div className="thieves-middle-right">
        <div className="thief" onClick={toggleThief}>
          <div className="thief-hat"></div>
          <div className="thief-head">
            <div className="thief-hair-left"></div>
            <div className="thief-face">
              <div className="thief-hair-top-left"></div>
              <div className="thief-hair-top-right"></div>
              <div className="thief-eyes">
                <div className="thief-eye">
                  <div className="thief-iris">
                    <div className="thief-pupil"></div>
                  </div>
                </div>
                <div className="thief-eye">
                  <div className="thief-iris">
                    <div className="thief-pupil"></div>
                  </div>
                </div>
              </div>
              <div className="thief-nose"></div>
              <div className="thief-mouth"></div>
            </div>
            <div className="thief-hair-right"></div>
          </div>
          <div className="thief-body">
            <div className="thief-upper-neck"></div>
            <div className="thief-neck"></div>
            <div className="thief-dress">
              <div className="thief-shirt"></div>
              <div className="thief-pants-div"></div>
            </div>
            <div className="thief-legs">
              <div className="thief-leg-left">
                <div className="thief-foot"></div>
              </div>
              <div className="thief-leg-right">
                <div className="thief-foot"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="thieves-bottom-left"></div>
      <div className="thieves-bottom-middle"></div>
      <div className="thieves-bottom-right"></div>

      <div className="thieves-sign">
        THIEVES GUILD<h2 className="thieves-anti">ANTI</h2>
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
      <Card className={`${thief ? "component-card" : "component-card-closed"}`}>
        <Typography variant="h5" color="primary">
          What do you need to know?
        </Typography>
        <List className="component-list">
          <ListItem onClick={toggleAnswerOne}>Beggar</ListItem>
          <ListItem onClick={toggleAnswerTwo}>Brigands</ListItem>
          <ListItem onClick={toggleAnswerThree}>Dragon</ListItem>
          <ListItem onClick={toggleAnswerFour}>Fire Cloak</ListItem>
          <ListItem onClick={toggleAnswerFive}>Magic Thief</ListItem>
          <ListItem onClick={toggleAnswerSix}>Master Thief</ListItem>
          <ListItem onClick={toggleAnswerSeven}>Thief</ListItem>
          <ListItem onClick={toggleAnswerEight}>Thieves</ListItem>
          <ListItem onClick={toggleAnswerNine}>Becoming a Thief</ListItem>
          <ListItem onClick={toggleAnswerTen}>Quest</ListItem>
        </List>
        <Button onClick={toggleThief} variant="contained" color="primary">
          Say Goodbye
        </Button>
      </Card>
      <Card className={`${answerOne ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Beggar
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          She keeps an eye on my entrance and signals me if there is a threat to
          me or her. I feed her and she sleeps in here at night. She must have
          liked you if she didn't warn me about you.
        </Typography>
        <Button onClick={toggleAnswerOne} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTwo ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Brigand
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          How dare you! I am no brigand. I hurt no one unless threatened.
          Brigands do not care who they hurt or rob.
        </Typography>
        <Button onClick={toggleAnswerTwo} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerThree ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Dragon
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I don't know how to slay the dragon but I do possess the Fire Cloak.
          It could definitely help.
        </Typography>
        <Button onClick={toggleAnswerThree} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFour ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Fire Cloak
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          It protects the user from heat and fire. I would only give it to a
          master thief who has completed a quest.
        </Typography>
        <Button onClick={toggleAnswerFour} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerFive ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          The Magic Thief
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          If a child writes something they wish for on a piece of paper, the
          Magic Thief grants their wish and leaves what they wished for on the
          piece of paper.
        </Typography>
        <Button onClick={toggleAnswerFive} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerSix ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Master Thief
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          A master thief can open locks an ordinary thief can't and are eligible
          for quests. One must prove themself before I would delcare them a
          master thief.
        </Typography>
        <Button onClick={toggleAnswerSix} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>

      <Card className={`${answerSeven ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Thief
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I come from a long line of thieves. I was trained young and loved what
          I did until I saw the poverty of some targets. Once the brigand's
          arrived in the area everyone got poorer. I couldn't take from those
          who had so little. My parents died sometime ago. The other thieves
          left when people had nothing to steal.
        </Typography>
        <Button
          onClick={toggleAnswerSevenA}
          variant="contained"
          color="primary"
        >
          NEXT
        </Button>
      </Card>
      <Card
        className={`${answerSevenA ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography variant="h4" color="primary">
          Thief
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          I still loved the thrill of sneaking around undetected. The idea of
          the Magic Thief came to me. I had coins stockpiled. I could sneak but
          give to those who needed. Sadly, I am almost out of coins and recently
          injured my foot.
        </Typography>
        <Button
          onClick={() => setAnswerSevenA(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerEight ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Thieves
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The thieves of this guild have never been violent. Used to be that
          thieves would rob from anybody but things have changed.
        </Typography>
        <Button onClick={toggleAnswerEight} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerNine ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Becoming a Thief
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          If you will take on the mantel of Magic Thief. I will dub you a thief,
          and give you a lock pick and coins. If you grant four wishes without
          being heard, I will dub you master thief and give you a quest.
        </Typography>
        <Button onClick={togglePick} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${answerTen ? "answer-card" : "answer-card-closed"}`}>
        <Typography variant="h4" color="primary">
          Quest
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          className="answer-card-description"
        >
          The quest is two-fold. Bring me the gold the brigand's have stolen so
          I may distribute it to the poor. Then make sure the Brigand's can
          pillage no more. Do this and I will give you the Fire Cloak.
        </Typography>
        <Button onClick={toggleAnswerTen} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${
          thiefRejectionCard ? "answer-card" : "answer-card-closed"
        }`}
      >
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          I don't know how you found this place but unless you can prove
          yourself worthy to be here, if you value life, Leave.
        </Typography>
        <Button
          onClick={() => setThiefRejectionCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${ragCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          If she gave you this, it means you have compassion for all. I suppose
          we can talk.
        </Typography>
        <Button onClick={() => setRagCard(false)} variant="contained" color="primary">
          CLOSE
        </Button>
      </Card>
      <Card className={`${pickCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          She hands you a pick and five coins.
        </Typography>
        <Button
          onClick={() => setPickCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${cloakCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          She gives you black cloak with red around the edges.
        </Typography>
        <Button
          onClick={() => setCloakCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card className={`${chestCard ? "answer-card" : "answer-card-closed"}`}>
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You hand her the chest of coins. It brings you great joy knowing all
          the good she will do with it.
        </Typography>
        <Button
          onClick={() => setChestCard(false)}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${firstTimeCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          You enter a fairly simple room. On the far side of the room you see a woman.
          Although she is slight in build you get the feeling that she is not
          someone to be trifled with.
        </Typography>
        <Button
          onClick={toggleFirst}
          variant="contained"
          color="primary"
        >
          CLOSE
        </Button>
      </Card>
      <Card
        className={`${masterThiefCard ? "answer-card" : "answer-card-closed"}`}
      >
        <Typography
          variant="h4"
          color="secondary"
          className="answer-card-description"
        >
          Having fulfilled four wishes, I dub you Master Thief. Go forth and complete your quest.
        </Typography>
        <Button
          onClick={() => setMasterThiefCard(false)}
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
  Thieves
);
