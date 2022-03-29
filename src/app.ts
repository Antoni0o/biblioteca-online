import "reflect-metadata"
import "express-async-errors";
import express from "express";
import cors from "cors";

import "./shared/container/index"
import { router } from "./shared/server/routes/index.routes";
import { errorMiddleware } from "./shared/server/middlewares/errorMiddleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use(errorMiddleware);

app.listen(4000, () => {
    console.log("O servidor está rodando na porta 4000");
});
