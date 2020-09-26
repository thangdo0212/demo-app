import React from "react";
import web3 from "./web3";
import dice from "./dice";

import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";

import Player from "./components/player";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    height: 800,
    backgroundColor: "#ffeaa7",
    margin: "0 auto",
    marginTop: 50,
    borderRadius: 20,
  },
  player: {
    backgroundColor: "#fdcb6e",
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    paddingTop: 20,
    paddingBottom: 20,
  },
  depositWrapper: {
    backgroundColor: "#ff7675",
    height: 80,
    paddingTop: 18,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  completedBtn: {
    backgroundColor: "#ff7675",
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
    "&:hover": {
      backgroundColor: "#e74c3c",
    },
  },
}));

function App() {
  const classes = useStyles();

  const [manager, setManager] = React.useState("");
  const [players, setPlayers] = React.useState([]);
  const [balance, setBalance] = React.useState("");
  const [player1Res, setPlayer1Res] = React.useState(0);
  const [player2Res, setPlayer2Res] = React.useState(0);
  const [disableCompleted, setDisableCompleted] = React.useState(true);
  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    if (
      player1Res !== 0 &&
      player2Res !== 0 &&
      Number(player1Res) !== Number(player2Res)
    ) {
      setDisableCompleted(false);
      if (player1Res > player2Res) {
        alert("Player One Won!");
      } else {
        alert("Player Two Won!");
      }
    } else {
      setDisableCompleted(true);
    }
  }, [player1Res, player2Res]);

  const fetchData = async () => {
    const manager = await dice.methods.manager().call();
    const players = await dice.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(dice.options.address);

    setManager(manager);
    setPlayers(players);
    setBalance(balance);
  };

  const handleDeposit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await dice.methods.deposit().send({
      from: accounts[0],
      value: web3.utils.toWei(".001", "ether"),
    });

    fetchData();
  };

  const handlePlayer1RollDice = () => {
    const number = Math.floor(Math.random() * 6) + 1;
    setPlayer1Res(number);
  };

  const handlePalyer2RollDice = () => {
    const number = Math.floor(Math.random() * 6) + 1;
    setPlayer2Res(number);
  };

  const handleCompleteGame = async (event) => {
    event.preventDefault();
    const index = player1Res > player2Res ? 0 : 1;
    console.log("index", index);
    console.log("players", players);
    const accounts = await web3.eth.getAccounts();
    await dice.methods.completeGame(index).send({
      from: accounts[0],
    });
    setPlayer1Res(0);
    setPlayer2Res(0);
    fetchData();
  };

  return (
    <div className={classes.root}>
      <Grid container alignItems="center">
        <Grid item xs className={classes.player}>
          <Player
            playerNumber="One"
            playerAddress={players.length > 0 ? players[0] : ""}
            onDeposit={handleDeposit}
            onRollDice={handlePlayer1RollDice}
            playRollResult={player1Res}
          />
        </Grid>
        <Grid item xs={2}>
          <div className={classes.depositWrapper}>
            <Typography className={classes.text}>Total Deposit</Typography>
            <Typography className={classes.text}>
              <b>{web3.utils.fromWei(balance, "ether")}</b> ETH
            </Typography>
          </div>
          <Button
            fullWidth
            className={classes.completedBtn}
            disabled={disableCompleted}
            onClick={handleCompleteGame}
          >
            Completed
          </Button>
        </Grid>
        <Grid item xs className={classes.player}>
          <Player
            playerNumber="Two"
            playerAddress={players.length > 1 ? players[1] : ""}
            playRollResult={player2Res}
            onDeposit={handleDeposit}
            onRollDice={handlePalyer2RollDice}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
