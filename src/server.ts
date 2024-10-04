import express from "express";
import path from "path";
import router from "./routes";
import { logger } from "middleware/logger";
const dotenv = require("dotenv").config();

//
const app = express();

if (process.env.NODE_ENV !== "production") {
    const webpack = require("webpack");
    const webpackConfig = require("../webpack.client.js").map((config: any) => {
        config.output.path = config.output.path.replace("dist/dist/", "dist/");
        return config;
    });

    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpackHotMiddleware = require("webpack-hot-middleware");

    const compiler = webpack(webpackConfig);

    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: webpackConfig[0].output.publicPath,
        })
    );

    app.use(webpackHotMiddleware(compiler));
}
app.use(express.static(path.resolve(__dirname) + "/dist"));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: false }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5000"); // 특정 도메인 허용
    // res.header("Access-Control-Allow-Origin", "*"); // 전체 도메인 허용 - 보안에 매우 취약하므로 사용하지 않는 것을 추천
    res.header(
        "Access-Control-Allow-Headers",
        // "Content-Type"
        "Origin, X-Requested-With, Content-Type, Accept"
      );    
    next();
});

// routes
app.use(
    "/healthcheck",
    require("express-healthcheck")({
        healthy: () => {
            logger.info("healthy");
            return { uptime: process.uptime() };
        },
    })
);
app.use("/", router);
// port
app.set("port", process.env.PORT || 3001);
app.listen(app.get("port"), () =>
    logger.info("Server started " + `${app.get("port")}`)
);
