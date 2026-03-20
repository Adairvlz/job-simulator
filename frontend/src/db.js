import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

export async function waitForDB() {
    let retries = 10;
    while (retries) {
        try {
            await pool.query("SELECT 1");
            console.log("DB conectada");
            return;
        } catch {
            console.log("Esperando DB...");
            await new Promise(res => setTimeout(res, 2000));
            retries--;
        }
    }
    throw new Error("No se pudo conectar a la DB");
}