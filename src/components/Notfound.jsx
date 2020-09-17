import React from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    flexDirection: "column",
  },
  img: {
    width: "50%",
    marginLeft: "300px",
  },
  btn: {
    // width: "50px",
  },
}));

const Notfound = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Typography variant="h2">404 - Page not found</Typography>
      <Typography variant="subtitle1">
        You either tried some shady route or came here by mistake
      </Typography>
      <img
        src="https://react-material-kit.devias.io/static/images/undraw_page_not_found_su7k.svg"
        alt="page not found"
        className={classes.img}
      />
      <Button
        className={classes.btn}
        variant="outlined"
        size="small"
        color="primary"
        href="/"
      >
        Back To Home
      </Button>
    </div>
  );
};

export default Notfound;
