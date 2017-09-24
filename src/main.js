import React from "react";
import ReactDOM from "react-dom";
import TimesApp from './TimesApp.js';

//This will spin up a react instance onto the server-side rendered TimesApp markup, provided it's been rendered to .times-app and the bootstrap matches.
const appBootstrap = window.initialState || {};
ReactDOM.render(<TimesApp bootstrap={appBootstrap} />, document.querySelector('.times-app'));
