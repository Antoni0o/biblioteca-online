import "express-async-errors";

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(4000, () => {
    console.log("O servidor está rodando na porta 4000");
});
