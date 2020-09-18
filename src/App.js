import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Messagebox from "./components/Chats/MessageBox";
import Notfound from "./components/Notfound";
import { Switch, Route, withRouter } from "react-router-dom";
import AuthGuard from "./components/AuthGuard";
import Home from "./components/Home";

const Main = withRouter(({ location }) => {
  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <>
          <Dashboard />
        </>
      )}
      <Switch>
        <AuthGuard path="/" exact component={Home} />
        <Route path="/login" component={Signin} />
        <Route path="/register" component={Signup} />
        <AuthGuard path="/:id" component={Messagebox} />
        <Route component={Notfound} />
      </Switch>
    </>
  );
});

function App() {
  return (
    <React.Fragment>
      <Main />
    </React.Fragment>
  );
}

export default App;
