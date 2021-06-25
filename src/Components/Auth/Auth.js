import React, { useState } from "react";
import axios from "axios"
import { connect } from "react-redux"
import { loginUser, registerUser } from "../../redux/userReducer"
import { withRouter } from "react-router-dom"
import "./Auth.scss";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PersonIcon from "@material-ui/icons/Person";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";

function Auth(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [account, setAccount] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState("");
    const passwordsMatch = true;

    const login = (event) => {
      
      axios
        .post("/api/login", { username, password })
        .then((res) => {
          props.loginUser(res.data);
          props.history.push("/Dashboard");
        })
        .catch((err) => {
          alert("Username or password incorrect");
        });

      event.preventDefault();
    };

    function toggleAccount(event) {
      event.preventDefault();
      setAccount(!account);
    }

  const register = (event) => {
      
      axios
        .post("/api/register", { newUsername, newPassword})
        .then((res) => {
          console.log(res.data)
          props.registerUser(res.data);
          props.history.push("/Dashboard");
        })
        .catch((err) => {
          alert("Could not register");
        });

      event.preventDefault();
    };

  return (
    <div className="auth-main">
      <Typography variant="h2" align="center" className="auth-title">
        Melvin's Quest
      </Typography>
      <div className={`${account ? "login-card" : "login-card-closed"}`}>
        <Card variant="outlined" className="auth-card">
          <Typography variant="h4">Continue Game</Typography>
          <form onSubmit={login} className="login-form">
            <FormControl>
              <InputLabel htmlFor="username">Name</InputLabel>
              <Input
                required
                value={username}
                id="username"
                placeholder="Enter name"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                required
                value={password}
                placeholder="Enter password"
                id="password"
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                }
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </FormControl>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
          <Typography variant="h6">
            Haven't started a game?{" "}
            <Link href="#" onClick={toggleAccount}>
              Start one here.
            </Link>
          </Typography>
        </Card>
      </div>
      <div className={`${account ? "register-card-closed" : "register-card"}`}>
        <Card variant="outlined" className="auth-card">
          <Typography variant="h4">Start new game</Typography>
          <form onSubmit={register} className="register-form">
            <FormControl>
              <InputLabel htmlFor="newUsername">Name</InputLabel>
              <Input
                required
                value={newUsername}
                id="newUsername"
                placeholder="Enter name"
                startAdornment={
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                }
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </FormControl>
            
            <FormControl error={!passwordsMatch}>
              <InputLabel htmlFor="newPassword">Password</InputLabel>
              <Input
                required
                value={newPassword}
                aria-describedby="new-password-helper-text"
                id="newPassword"
                placeholder="Enter password"
                error={!passwordsMatch}
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                }
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
              />
              {!passwordsMatch && (
                <FormHelperText id="new-password-helper-text">
                  Passwords Do Not Match
                </FormHelperText>
              )}
            </FormControl>
            <FormControl error={!passwordsMatch}>
              <InputLabel htmlFor="confirmPassword">
                Confirm Password
              </InputLabel>
              <Input
                required
                value={confirmPassword}
                aria-describedby="confirm-password-helper-text"
                id="confirm"
                placeholder="Confirm password"
                error={!passwordsMatch}
                startAdornment={
                  <InputAdornment position="start">
                    <VpnKeyIcon />
                  </InputAdornment>
                }
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
              />
              {!passwordsMatch && (
                <FormHelperText id="confirm-password-helper-text">
                  Passwords Do Not Match
                </FormHelperText>
              )}
            </FormControl>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
          <Typography variant="h6" className="register-text">
            Already started a game?{" "}
            <Link href="#" onClick={toggleAccount}>
              Continue Here
            </Link>
          </Typography>
        </Card>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;

const mapDispatchToProps = { loginUser, registerUser };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));