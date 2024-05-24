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
    next()
});


exports.find_horses = app.get("", async(req, res) => {
    try {
        const Horse = await pool.query(
            `SELECT horse_id, horse_name, suit, horse_age, owner_name FROM horses
            JOIN owners ON owners.owner_id = horses.owner_id`
        )
        res.json(Horse["rows"])
    }
    catch (err) {
        res.sendStatus(400);
    }
});