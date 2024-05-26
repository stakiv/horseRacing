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


exports.find_jockeys = app.get("", async(req, res) => {
    try {
        const Jockey = await pool.query(
            `SELECT "winners".jockey_id, jockey_name, jockey_age, "wins" FROM (
                SELECT jockey_id, COUNT(*) AS "wins" FROM winners
                JOIN participants ON winners.participant_id = participants.participant_id
                GROUP BY jockey_id
                ) AS "winners"
                JOIN jockeys ON jockeys.jockey_id = "winners".jockey_id
				ORDER BY jockey_name ASC`
        )
        res.json(Jockey["rows"])
    }
    catch (err) {
        console.error(err)
        res.status(400).json({message: ""});
    }
});
exports.find_jockeys_filter = app.get("", async(req, res) => {
    try {
        const filter = req.query.filt;
        const Jockey = await pool.query(
            `SELECT "winners".jockey_id, jockey_name, jockey_age, "wins" FROM (
                SELECT jockey_id, COUNT(*) AS "wins" FROM winners
                JOIN participants ON winners.participant_id = participants.participant_id
                GROUP BY jockey_id
                ) AS "winners"
                JOIN jockeys ON jockeys.jockey_id = "winners".jockey_id
				WHERE jockey_name = '${filter}'`
        )
        res.json(Jockey["rows"])
    }
    catch (err) {
        res.status(400).json({message: ""});
        console.error(err)
    }
});

exports.find_jockeys_sort = app.get("", async(req, res) => {
    try {
        const sort = req.query.date;
        const Jockey = await pool.query(
            `SELECT "winners".jockey_id, jockey_name, jockey_age, "wins" FROM (
                SELECT jockey_id, COUNT(*) AS "wins" FROM winners
                JOIN participants ON winners.participant_id = participants.participant_id
                GROUP BY jockey_id
                ) AS "winners"
                JOIN jockeys ON jockeys.jockey_id = "winners".jockey_id
				ORDER BY "wins" ${sort}`
        )
        res.json(Jockey["rows"])
    }
    catch (err) {
        console.error(err)
        res.status(400).json({message: ""});
    }
});