import express from "express";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.sendStatus(200);
    next();
});

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

async function waitForDB() {
    let retries = 10;
    while (retries) {
        try {
            await pool.query("SELECT 1");
            console.log("DB conectada");
            return;
        } catch (err) {
            console.log("Esperando DB...");
            await new Promise(res => setTimeout(res, 2000));
            retries--;
        }
    }
    throw new Error("No se pudo conectar a la DB");
}

app.get("/products", async (req, res) => {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
});

app.get("/products/:id", async (req, res) => {
    const result = await pool.query("SELECT * FROM products WHERE id=$1", [req.params.id]);
    res.json(result.rows[0]);
});

app.post("/products", async (req, res) => {
    const { campo1, campo2, campo3, campo4, campo5, campo6 } = req.body;

    const result = await pool.query(
        `INSERT INTO products (campo1, campo2, campo3, campo4, campo5, campo6)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
        [campo1, campo2, campo3, campo4, campo5, campo6]
    );

    res.status(201).json(result.rows[0]);
});

app.put("/products/:id", async (req, res) => {
    const { campo1, campo2, campo3, campo4, campo5, campo6 } = req.body;

    const result = await pool.query(
        `UPDATE products SET campo1=$1, campo2=$2, campo3=$3,
     campo4=$4, campo5=$5, campo6=$6 WHERE id=$7 RETURNING *`,
        [campo1, campo2, campo3, campo4, campo5, campo6, req.params.id]
    );

    res.json(result.rows[0]);
});


app.patch("/products/:id", async (req, res) => {
    const fields = Object.keys(req.body);

    if (fields.length === 0) {
        return res.status(400).json({ error: "No hay campos" });
    }

    const values = Object.values(req.body);

    const setQuery = fields.map((f, i) => `${f}=$${i + 1}`).join(", ");

    const result = await pool.query(
        `UPDATE products SET ${setQuery} WHERE id=$${fields.length + 1} RETURNING *`,
        [...values, req.params.id]
    );

    res.json(result.rows[0]);
});

app.delete("/products/:id", async (req, res) => {
    await pool.query("DELETE FROM products WHERE id=$1", [req.params.id]);
    res.sendStatus(204);
});

const PORT = process.env.APP_PORT || 3000;

waitForDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server running on", PORT);
    });
});