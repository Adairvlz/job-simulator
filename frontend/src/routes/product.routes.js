import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
});

router.get("/:id", async (req, res) => {
    const result = await pool.query("SELECT * FROM products WHERE id=$1", [req.params.id]);
    res.json(result.rows[0]);
});

router.post("/", async (req, res) => {
    const { campo1, campo2, campo3, campo4, campo5, campo6 } = req.body;

    const result = await pool.query(
        `INSERT INTO products (campo1, campo2, campo3, campo4, campo5, campo6)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
        [campo1, campo2, campo3, campo4, campo5, campo6]
    );

    res.status(201).json(result.rows[0]);
});

router.put("/:id", async (req, res) => {
    const { campo1, campo2, campo3, campo4, campo5, campo6 } = req.body;

    const result = await pool.query(
        `UPDATE products
     SET campo1=$1, campo2=$2, campo3=$3, campo4=$4, campo5=$5, campo6=$6
     WHERE id=$7
     RETURNING *`,
        [campo1, campo2, campo3, campo4, campo5, campo6, req.params.id]
    );

    res.json(result.rows[0]);
});

router.patch("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
    await pool.query("DELETE FROM products WHERE id=$1", [req.params.id]);
    res.sendStatus(204);
});

export default router;