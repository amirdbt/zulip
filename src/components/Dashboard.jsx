import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Hidden,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import AddChannel from "./Chats/AddChat";
import { PowerSettingsNew } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import { useQuery } from "react-query";
import { fetchChannels } from "./Query/Queries";

const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#6a1b9a",
    color: "#fff",
  },
  header: {
    fontSize: "35px",
    textAlign: "center",
    lineHeight: "60px",
    userSelect: "none",
    fontWeight: 500,
    borderBottom: "5px solid #38006b",
    // backgroundColor: "#18227c",
  },
  listItems: {
    padding: "8px",
    transition: "all 0.2s ease",
    fontSize: "10px",
    "&:hover": {
      backgroundColor: "#38006b ",
      color: "#fff",
    },
  },
  iconColor: {
    // color: "#000",
    fontSize: "20px",
    marginLeft: "20px",
  },
  topBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: "#6a1b9a",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  search: {
    display: "flex",
    flexGrow: 1,
  },
  searchIcon: {
    marginRight: "10px",
  },
  appIcons: {
    display: "flex",
  },
  link: {
    color: "#1b1b1b",
    textDecoration: "none",
    fontSize: 30,
  },
  link1: {
    textDecoration: "none",
    color: "#000",
  },
  nested: {
    paddingLeft: theme.spacing(4),
    marginLeft: theme.spacing(5),
    color: "#000",
    "&:hover": {
      backgroundColor: "#38006b",
      color: "#000",
    },
  },
  powerIcon: {
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      color: "#000",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  title: {
    fontSize: 17,
  },
}));

const Dashboard = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [op, setOp] = useState(false);

  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery(
    "channels",
    fetchChannels
  );
  {
    isSuccess && console.log(data.data);
  }

  const open = Boolean(anchorEl);
  const classes = useStyles();
  let history = useHistory();

  const handleClick = () => {
    setOp(!op);
  };

  const logout = () => {
    localStorage.removeItem("token");

    history.push("/login");
  };

  // console.log(activate);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <div className={classes.toolbar} />
      <header className={classes.header}>
        Zulip
        <Typography style={{ color: "#9e9e9e" }} variant="subtitle2">
          amirdbt
        </Typography>
      </header>

      <Divider />
      <List>
        <ListItem>
          <Typography variant="h6">Channels</Typography>
          <AddChannel refetch={refetch} />
        </ListItem>
        <Divider />
        {isSuccess &&
          data.data.message.map((d) => (
            <Link
              className={classes.link}
              to={{ pathname: `/${d._id}`, state: d }}
            >
              <ListItem button className={classes.listItems}>
                <ListItemIcon className={classes.iconColor}>#</ListItemIcon>
                <Typography variant="h6" className={classes.title}>
                  {d.title}
                </Typography>
              </ListItem>
            </Link>
          ))}
      </List>
    </>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <div className={classes.root}>
      {isLoading && (
        <Backdrop
          className={classes.backdrop}
          open={isLoading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      <AppBar className={classes.topBar} color="default" elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.search}>
            <div className={classes.searchIcon}>{/* <Search /> */}</div>
            <InputBase />
          </div>
          <div />
          <div className={classes.appIcons}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleMenu}
            >
              <PowerSettingsNew className={classes.powerIcon} />
            </IconButton>
            <Menu
              open={open}
              onClose={handleClose}
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              elevation={0}
            >
              <Link to="/signin" className={classes.link1}>
                <MenuItem onClick={logout}>Log out</MenuItem>
              </Link>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <nav>
        <Hidden smUp implementation="css">
          <Drawer
            className={classes.drawer}
            container={container}
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default Dashboard;
