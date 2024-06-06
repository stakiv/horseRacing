const Pool = require('pg').Pool
const express = require("express")
const cors = require("cors");

const pool = new Pool({
    user: 'postgres',
    password: 'mirandolina',
    host: 'localhost',
    port: 5432,
    database: 'horse_racing'
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

exports.delete_horse = app.delete("", async (req, res) => {
    try {
        const { horse} = req.body;

        console.log(owner);
        console.log(horse);
        console.log(suit);
        console.log(age);

        const Horse = await pool.query(
            `DELETE FROM horses WHERE horse_id = ${horse}`
        )
        res.status(200).json({ message: "Лошадь удалена", data: Horse.rows });
        //res.json(Horse["rows"]);
    }
    catch (err) {
        console.error("ошибка при удалении лошади", err);
        res.status(400);
        //res.status(500).json({ message: "Произошла ошибка при добавлении лошади" });
    }
});
