const Pool = require('pg').Pool
const express = require("express")
const cors = require("cors");
require('dotenv').config();

const pool = new Pool({
    user: 'postgres',
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    port: 5432,
    database: process.env.DB_NAME
});
const app = express();
app.use((req, res, next) => {
    
    const origin = req.headers.origin;
    const allowedOrigins = ['http://localhost:3000'];
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-control-Allow-Headers', 'Content-Type, Authorization');
    }

    next()
});

exports.delete_jockey = app.delete("", async (req, res) => {
    try {
        const jockey = req.query.jockey;
        console.log(jockey);

        const Jockey = await pool.query(
            `DELETE FROM jockeys WHERE jockey_id = ${jockey}`
        )
        res.status(200).json({ message: "Жокей удален", data: Jockey.rows });
        //res.json(Horse["rows"]);
    }
    catch (err) {
        console.error("ошибка при удалении жокея", err);
        res.status(400);
    }
});
