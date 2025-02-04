const Pool = require('pg').Pool
require('dotenv').config();
const express = require("express")

const pool = new Pool({
    user: 'postgres',
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    port: 5432,
    database: process.env.DB_NAME
});
const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-control-Allow-Headers', 'Content-Type, Authorization');
    next()
});

exports.find_horses = app.get("", async (req, res) => {
    let result;
    try {
        const sort = req.query.order;
        const filt = req.query.filter;
        const owner = req.query.owner;
        if (sort == '' && filt == '' && owner == '') {
            const Horse = await pool.query(
                `SELECT h.horse_id, h.horse_name, h.suit, h.horse_age, o.owner_name, COALESCE(w.wins, 0) AS wins
                FROM horses h
                JOIN owners o ON h.owner_id = o.owner_id
                FULL OUTER JOIN (
                    SELECT horse_id, COUNT(*) AS "wins" FROM winners
                    JOIN participants ON winners.participant_id = participants.participant_id
                    GROUP BY horse_id
                ) w ON h.horse_id = w.horse_id
                ORDER BY h.horse_name ASC;`
            )
            result = Horse["rows"]
        } else if (filt == '' && owner == '') {
            const Horse = await pool.query(
                `SELECT h.horse_id, h.horse_name, h.suit, h.horse_age, o.owner_name, COALESCE(w.wins, 0) AS wins
                FROM horses h
                JOIN owners o ON h.owner_id = o.owner_id
                FULL OUTER JOIN (
                    SELECT horse_id, COUNT(*) AS "wins" FROM winners
                    JOIN participants ON winners.participant_id = participants.participant_id
                    GROUP BY horse_id
                ) w ON h.horse_id = w.horse_id
                ORDER BY wins ${sort}, horse_name ASC;`
            )
            result = Horse["rows"]
        } else if (sort == '' && owner == '') {
            const Horse = await pool.query(
                `SELECT horse_id, horse_name, suit FROM horses
                ORDER BY horse_name ASC`
            )
            result = Horse["rows"]
        } else if (sort == '' && filt == '') { // для формы удаления и удаления лошади
            const Horse = await pool.query(
                `SELECT horse_id, horse_name FROM horses
                JOIN owners ON owners.owner_id = horses.owner_id
                WHERE horses.owner_id = ${owner}`
            )
            result = Horse["rows"]
        }

        res.json(result)
    }
    catch (err) {
        console.error(err)
        res.status(400).json({ message: "" });
    }
});

/*SELECT horses.horse_id, COUNT(*) FROM horses
JOIN participants ON participants.horse_id = horses.horse_id
JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
JOIN winners ON winners.participant_id = participants.participant_id
JOIN races ON races.race_id = participants.race_id
JOIN owners ON owners.owner_id = horses.owner_id
GROUP BY horses.horse_id*/
/*
`SELECT "winners".horse_id, horse_name, suit, horse_age, owner_name, "wins" FROM (
                    SELECT horse_id, COUNT(*) AS "wins" FROM winners
                    JOIN participants ON winners.participant_id = participants.participant_id
                    GROUP BY horse_id
                    ) AS "winners"
                    JOIN horses ON horses.horse_id = "winners".horse_id
                    JOIN owners ON horses.owner_id = owners.owner_id
                    ORDER BY horse_name ASC` */