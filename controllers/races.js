const Pool = require('pg').Pool
const express = require("express")

const pool = new Pool({
    user: 'postgres',
    password: 'mirandolina',
    host: 'localhost',
    port: 5432,
    database: 'horseRacing'
});

const app = express();

app.use((req, res, next) => {
    res.header('Access-control-Allow-Origin', '*');
    res.header('Access-control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-control-Allow-Headers', 'Content-Type, Authorization');
});

exports.find_races = app.get("", async(req, res) => {
    try {
        const date = req.query.date;
        const Race = await pool.query(
            ''
        )
        res.json(Race["rows"])
    }
    catch (err) {
        res.sendStatus(400);
    }
});