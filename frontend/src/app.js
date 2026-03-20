import express from "express";
import productsRouter from "./routes/products.routes.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.sendStatus(200);
    next();
});

app.use("/products", productsRouter);

export default app;