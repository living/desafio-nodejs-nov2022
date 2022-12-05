import express from "express";
import { db } from "./config/mongoConfig.js";
import { appConfig } from "./routes/index.js";

db
    .on("error", (err) => console.log(err))
    .once("open", () => {
        console.log("banco de dados conectado com sucesso!")
    })

const app = express();

appConfig(app);

export { app }