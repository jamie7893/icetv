import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory} from "react-router";

import Layout from "./components/Layout.js";
import Login from "./components/Login.js";
import Profile from "./components/Profile.js";
import Foursquare from "./components/Foursquare.js"
import Chatroom from "./components/Chatroom.js"

const app = document.getElementById('app');
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}/>
    <Route path="/login" component={Login}/>
    <Route path="/profile" component={Profile}/>
    <Route path="/checkin" component={Foursquare}/>
    <Route path="/chatroom" component={Chatroom}/>
  </Router>,
app);
