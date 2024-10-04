import "reflect-metadata";
import ReactDOM from "react-dom";
import React from "react";
import { App } from "./App";

if (process.env.APP_TARGET === "wds") {
    // for client side rendering
    console.log("client");
    ReactDOM.render(<App />, document.getElementById("root"));
} else {
    // for server side rendering
    console.log("server");
    ReactDOM.hydrate(<App />, document.getElementById("root"));
}

/*
import { loadableReady } from "@loadable/component";

loadableReady(() => {
    const rootElement = document.getElementById("root");
    hydrate(<App />, rootElement);
});

if (module.hot) {
    module.hot.accept();
}
*/
