import React from "react";
import {
  Typography,
  makeStyles,
  IconButton,
  Button,
  Divider,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { fetchMessages } from "../Query/Queries";
import { useQuery } from "react-query";
import { Settings, PersonAdd, Share } from "@material-ui/icons";
import DelChat from "./DelChat";

const useStyles = makeStyles((theme) => ({
  details: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: 200,
    color: "#9e9e9e",
    fontSize: 38,
  },
  subtitle: {
    marginTop: 15,
  },
  desc: {
    fontWeight: 200,
    color: "#9e9e9e",
  },
  btn: {
    color: "#6a1b9a",
    fontWeight: 200,
    fontSize: 10,
  },
}));

const Messagebox = ({ match }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { id } = match.params;
  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery(
    ["messages", { id: id }],
    fetchMessages
  );
  console.log(data);
  return (
    <div className="content">
      {isSuccess && (
        <>
          <div className={classes.details}>
            <Typography className={classes.title} variant="h3">
              # {data.data.title}
            </Typography>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Settings />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                {" "}
                <DelChat id={id} />{" "}
              </MenuItem>
            </Menu>
          </div>
          <div className={classes.subtitle}>
            <Typography className={classes.desc}>
              {" "}
              @{data.data.user[0].firstname} created this channel.
            </Typography>
          </div>

          <div className={classes.subtitle}>
            <Button className={classes.btn}>
              <PersonAdd style={{ marginRight: 5 }} /> Add people
            </Button>
            <Button className={classes.btn}>
              <Share style={{ marginRight: 5 }} /> Share channel
            </Button>
          </div>
          <Divider className={classes.subtitle} />
        </>
      )}
    </div>
  );
};

export default Messagebox;
