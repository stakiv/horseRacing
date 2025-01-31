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
    /*
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    headers: ['Content-Type', 'Authorization']*/
    
    const origin = req.headers.origin;
    const allowedOrigins = ['http://localhost:3000'];
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-control-Allow-Headers', 'Content-Type, Authorization');
    }

    next()
});

exports.add_jockey = app.post("", async (req, res) => {
    try {
        const { jockey, age } = req.body;

        console.log(jockey);
        console.log(age);

        const Jockey = await pool.query(
            `INSERT INTO jockeys (jockey_name, jockey_age) VALUES ('${jockey}', ${age})`
        )
        res.status(200).json({ message: "Жокей добавлен", data: Jockey.rows });
        //res.json(Horse["rows"]);
    }
    catch (err) {
        console.error("ошибка при добавлении жокея", err);
        res.status(400);
        //res.status(500).json({ message: "Произошла ошибка при добавлении лошади" });
    }
});
