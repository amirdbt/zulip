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
import { fetchMessages, fetchusers } from "../Query/Queries";
import { useQuery } from "react-query";
import { Settings, PersonAdd, Share } from "@material-ui/icons";
import DelChat from "./DelChat";
import moment from "moment";
import SendMessage from "./SendMessage";
import DelMessage from "./DelMessage";
import Conversation from "./Conversation";
import ScrollIntoView from "react-scroll-into-view";

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
  display: {
    marginLeft: 100,
    marginRight: 70,
    fontWeight: 200,
    color: "#9e9e9e",
    marginBottom: 30,
  },
  person: {
    display: "flex",
  },
  chatbody: {
    overflowY: "auto",
    height: "400px",
  },
  mesbody: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: -1,
  },
  icons: {
    display: "flex",
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

  window.scrollTo({
    top: document.body.scrollHeight,
    left: 0,
    behavior: "smooth",
  });
  const { id } = match.params;
  const { data, isSuccess, refetch } = useQuery(
    ["messages", { id: id }],
    fetchMessages
  );
  console.log(data);
  const { data: persons, status } = useQuery(["users"], fetchusers);
  return (
    <div className="content">
      {isSuccess && status === "success" && (
        <>
          <div className={classes.chatbody}>
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
                  <DelChat id={id} refetch={refetch} />{" "}
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
            <div>
              {data.data.message.map((d, i) => (
                <>
                  <div style={{ marginTop: 20 }}></div>
                  <div className={classes.display} key={i}>
                    <Typography style={{ fontWeight: 400 }}>
                      {moment(d.date).format("DD MMM, YYYY")}
                    </Typography>
                    <Divider />

                    <div className={classes.person}>
                      {persons.data.message.map((user, i) => {
                        if (user._id === d.user) {
                          return (
                            <Typography
                              style={{ fontWeight: 600, marginRight: 10 }}
                              key={i}
                            >
                              {user.firstname} {user.lastname}
                            </Typography>
                          );
                        }
                      })}
                      {moment(d.date).format("h:mm:ss a")}
                    </div>
                    <div className={classes.mesbody}>
                      <Typography>{d.msg}</Typography>
                      <div className={classes.icons}>
                        <Conversation
                          channel_id={id}
                          message_id={d._id}
                          refetch={refetch}
                          conversation_id={d.conversation_id}
                        />
                        <DelMessage refetch={refetch} message_id={d._id} />
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <ScrollIntoView selector="#msg"></ScrollIntoView>
            <div
              style={{
                float: "left",
                clear: "both",
              }}
              id="msg"
            ></div>
          </div>
        </>
      )}
      <SendMessage channel_id={id} refetch={refetch} />
    </div>
  );
};

export default Messagebox;
