import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SendConversation from "./SendConversation";
import { ChatBubbleOutline, EcoOutlined } from "@material-ui/icons";
import { IconButton, Typography } from "@material-ui/core";
import { addConversation, fetchConversations } from "../Query/Queries";
import { useMutation, useQuery } from "react-query";

const useStyles = makeStyles({
  list: {
    width: 250,
    backgroundColor: "#242526",
    color: "#fff",
  },
  title: {
    fontSize: 13,
  },
  convo: {
    display: "flex",
    flexDirection: "column",
  },
});

const Conversation = ({ channel_id, message_id, conversation_id, refetch }) => {
  const classes = useStyles();

  const { data, isSuccess } = useQuery(
    ["conversations", { id: conversation_id }],
    fetchConversations
  );

  const [mutate, info] = useMutation(addConversation);

  const addConvo = async () => {
    await mutate({
      id: message_id,
    });
  };
  //   console.log(info);
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div className={classes.list} role="presentation">
      <List>
        <ListItem button>
          <div className={classes.convo}>
            <Typography variant="h6">Amirdbt</Typography>
            <Typography variant="caption" className={classes.title}>
              Hello
            </Typography>
          </div>
        </ListItem>
        <ListItem button>
          <div className={classes.convo}>
            <Typography variant="h6">Ameerdbt</Typography>
            <Typography variant="caption" className={classes.title}>
              Wow
            </Typography>
          </div>
        </ListItem>
        <ListItem button>
          <div className={classes.convo}>
            <Typography variant="h6">AmirHassan</Typography>
            <Typography variant="caption" className={classes.title}>
              Hala Madrid
            </Typography>
          </div>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <SendConversation channel_id={channel_id} refetch={refetch} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <IconButton onClick={addConvo}>
            <EcoOutlined />
          </IconButton> */}
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <ChatBubbleOutline />
          </IconButton>

          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};
export default Conversation;
