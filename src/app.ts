import "reflect-metadata"
import express from "express";
import "express-async-errors";
import cors from "cors";
import * as dotenv from "dotenv";

import "./shared/container/index"
import { router } from "./shared/server/routes/index.routes";
import { errorMiddleware } from "./shared/server/middlewares/errorMiddleware";
import path from "path";

const app = express();

dotenv.config({ path: __dirname+'/.env' })

app.use(express.json());
app.use(cors());

app.use(router);

app.use(errorMiddleware);
app.use('/capa', express.static(path.join(__dirname, '../books')))

app.listen(4000, () => {
    console.log("O servidor está rodando na porta 4000");
});
