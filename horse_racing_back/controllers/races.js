const Pool = require('pg').Pool
const express = require("express")
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
    res.header('Access-control-Allow-Origin', '*');
    res.header('Access-control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
exports.find_races = app.get("", async (req, res) => {
    try {
        const racetrack = req.query.racetrack;
        const horse = req.query.horse;
        const date = req.query.date;
        const jockey = req.query.jockey;
        let izm = 0;

        let query = `SELECT races.race_id, name FROM races
        JOIN participants ON participants.race_id = races.race_id
                    JOIN horses ON participants.horse_id = horses.horse_id
                    JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
                    JOIN racetrack ON racetrack.racetrack_id = races.racetrack_id`;
        let params = [];

        if (racetrack != '') {
            if (izm == 0) {
                query += ` WHERE racetrack.racetrack_name = $${params.length + 1}`;
                izm = 1;
            }
            else {
                query += ` AND racetrack.racetrack_name = $${params.length + 1}`;
            }
            params.push(racetrack);
        }
        if (date != '') {
            if (izm == 0) {
                query += ` WHERE races.date = $${params.length + 1}`;
                izm = 1;
            }
            else {
                query += ` AND races.date = $${params.length + 1}`;
            }
            params.push(date);
        }
        if (horse != '') {
            if (izm == 0) {
                query += ` WHERE horses.horse_name = $${params.length + 1}`;
                izm = 1;
            }
            else {
                query += ` AND horses.horse_name = $${params.length + 1}`;
            }
            params.push(horse);
        }
        if (jockey != '') {
            if (izm == 0) {
                query += ` WHERE jockeys.jockey_name = $${params.length + 1}`;
                izm = 1;
            }
            else {
                query += ` AND jockeys.jockey_name = $${params.length + 1}`;
            }
            params.push(jockey);
        }

        query += ` GROUP BY races.race_id`;

        const Race = await pool.query(query, params);
        result = Race['rows']
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: "" });
        console.error(err);
    }
});
