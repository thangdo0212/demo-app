import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import dice1 from "../images/dice-1.png";
import dice2 from "../images/dice-2.png";
import dice3 from "../images/dice-3.png";
import dice4 from "../images/dice-4.png";
import dice5 from "../images/dice-5.png";
import dice6 from "../images/dice-6.png";

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  depositBtn: {
    backgroundColor: "#0984e3",
    color: "#fff",
    fontSize: 15,
    padding: "5px 50px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#74b9ff",
    },
  },
  rollDiceBtn: {
    backgroundColor: "#e17055",
    color: "#fff",
    fontSize: 15,
    padding: "5px 50px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#fab1a0",
    },
  },
  rollResult: {
    backgroundColor: "#6c5ce7",
    padding: 10,
    color: "#fff",
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
    borderRadius: 5,
  },
  address: {
    fontSize: 10,
  },
}));

function Player(props) {
  const {
    playerNumber,
    playerAddress,
    playRollResult,
    onDeposit,
    onRollDice,
  } = props;
  const classes = useStyles();

  React.useEffect(() => {
    if (playRollResult != 0) {
      handleShowDice();
    }
  }, [playRollResult]);

  const handleShowDice = () => {
    switch (playRollResult) {
      case 1:
        return dice1;
      case 2:
        return dice2;
      case 3:
        return dice3;
      case 4:
        return dice4;
      case 5:
        return dice5;
      case 6:
        return dice6;
      default:
        return "";
    }
  };

  return (
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item>
        <Typography className={classes.text}>
          Player <b>{playerNumber}</b>
        </Typography>
        <Typography className={classes.address}>{playerAddress}</Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.text}>
          You must pay{" "}
          <b>
            <u>0.001 ETH</u>
          </b>{" "}
          per game
        </Typography>
      </Grid>
      <Grid item>
        <Button className={classes.depositBtn} onClick={onDeposit}>
          Deposit
        </Button>
      </Grid>
      <Grid item>
        <Typography className={classes.text}>Roll Result</Typography>
        <div>
          <Typography className={classes.rollResult}>
            {playRollResult ? playRollResult : "0"}
          </Typography>
        </div>
      </Grid>
      <Grid item>
        <Button
          className={classes.rollDiceBtn}
          disabled={!playerAddress}
          onClick={onRollDice}
        >
          Roll Dice
        </Button>
      </Grid>
      <Grid item>
        <img src={handleShowDice()} />
      </Grid>
    </Grid>
  );
}

export default memo(Player);
