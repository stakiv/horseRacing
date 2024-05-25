const Pool = require('pg').Pool
const express = require("express")

const pool = new Pool({
    user: 'postgres',
    password: 'mirandolina',
    host: 'localhost',
    port: 5432,
    database: 'horse_racing'
});

const app = express();

app.use((req, res, next) => {
    res.header('Access-control-Allow-Origin', '*');
    res.header('Access-control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-control-Allow-Headers', 'Content-Type, Authorization');
    next()
});

exports.find_races = app.get("", async(req, res) => {
    try {
        const Race = await pool.query(
            `SELECT date, races.race_id, name, horse_name, jockey_name, time FROM races
            JOIN participants ON participants.race_id = races.race_id
            JOIN horses ON participants.horse_id = horses.horse_id
            JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
            ORDER BY date DESC`
        )
        res.json(Race["rows"])
    }
    catch (err) {
        console.error(err)
        res.status(400).json({message: ""});
    }
});

/*заданная дата*/
exports.find_races_date = app.get("", async(req, res) => {
    try {
        const date = req.query.date;
        const Race = await pool.query(
            `SELECT races.race_id, name, horse_name, jockey_name, time FROM races
            JOIN participants ON participants.race_id = races.race_id
            JOIN horses ON participants.horse_id = horses.horse_id
            JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
            WHERE races.date = '${date}'
            GROUP BY races.race_id, name, horse_name, jockey_name, time`
        )
        res.json(Race["rows"])
    }
    catch (err) {
        console.error(err)
        res.status(400).json({message: ""});
    }
});

/*заданная лошадь*/
exports.find_races_horse = app.get("", async(req, res) => {
    try {
        const horse = req.query.horse;
        const Race = await pool.query(
            `SELECT date, races.name, jockey_name, time FROM horses
            JOIN participants ON horses.horse_id = participants.horse_id
            JOIN jockeys ON jockeys.jockey_id = participants.jockey_id
            JOIN races ON participants.race_id = races.race_id
            WHERE horse_name = '${horse}'
            ORDER BY date DESC`
        )
        res.json(Race["rows"])
    }
    catch (err) {
        res.status(400).json({message: ""});
    }
});

/*заданный жокей*/
exports.find_races_jockey = app.get("", async(req, res) => {
    try {
        const jockey = req.query.horse;
        const Race = await pool.query(
            `SELECT date, races.name, horse_name, time FROM jockeys
            JOIN participants ON jockeys.jockey_id = participants.jockey_id
            JOIN horses ON horses.horse_id = participants.horse_id
            JOIN races ON participants.race_id = races.race_id
            WHERE jockey_name = '${jockey}'
            ORDER BY date DESC`
        )
        res.json(Race["rows"])
    }
    catch (err) {
        res.status(400).json({message: ""});
    }
});


/* ВЫВОДИТ ДЛЯ КАЖДОЙ ГОНКИ МИНИМАЛЬНОЕ ВРЕМЯ
SELECT races.race_id, MIN(time) AS "winner" FROM races
            JOIN participants ON participants.race_id = races.race_id
            JOIN horses ON participants.horse_id = horses.horse_id
            JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
            GROUP BY races.race_id */