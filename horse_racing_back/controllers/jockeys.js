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

exports.find_jockeys = app.get("", async (req, res) => {
    try {
        const sort = req.query.order;
        const filt = req.query.filter;
        if (sort == '' && filt == '') {
            const Jockey = await pool.query(
                `SELECT j.jockey_id, j.jockey_name, j.jockey_age, COALESCE(w.wins, 0) AS wins
                    FROM jockeys j
                    FULL OUTER JOIN (
                        SELECT jockey_id, COUNT(*) AS "wins" FROM winners
                        JOIN participants ON winners.participant_id = participants.participant_id
                        GROUP BY jockey_id
                    ) w ON j.jockey_id = w.jockey_id
                    ORDER BY j.jockey_name ASC;`
                    /*
                `SELECT "winners".jockey_id, jockey_name, jockey_age, "wins" FROM (
                    SELECT jockey_id, COUNT(*) AS "wins" FROM winners
                    JOIN participants ON winners.participant_id = participants.participant_id
                    GROUP BY jockey_id
                    ) AS "winners"
                    JOIN jockeys ON jockeys.jockey_id = "winners".jockey_id
                    ORDER BY jockey_name ASC`*/
            )
            result = Jockey['rows']
        } else if (filt == '') {
            const Jockey = await pool.query(
                `SELECT j.jockey_id, j.jockey_name, j.jockey_age, COALESCE(w.wins, 0) AS wins
                    FROM jockeys j
                    FULL OUTER JOIN (
                        SELECT jockey_id, COUNT(*) AS "wins" FROM winners
                        JOIN participants ON winners.participant_id = participants.participant_id
                        GROUP BY jockey_id
                    ) w ON j.jockey_id = w.jockey_id
                    ORDER BY "wins" ${sort}, j.jockey_name ASC;`
                /*
                `SELECT "winners".jockey_id, jockey_name, jockey_age, "wins" FROM (
                    SELECT jockey_id, COUNT(*) AS "wins" FROM winners
                    JOIN participants ON winners.participant_id = participants.participant_id
                    GROUP BY jockey_id
                    ) AS "winners"
                    JOIN jockeys ON jockeys.jockey_id = "winners".jockey_id
                    ORDER BY "wins" ${sort}`*/
            )
            result = Jockey['rows']
        } else if (sort == '') {
            const Jockey = await pool.query(
                `SELECT jockey_name FROM jockeys
                ORDER BY jockey_name ASC`
            )
            result = Jockey['rows']
        }
        /*
        const Jockey = await pool.query(
            `SELECT "winners".jockey_id, jockey_name, jockey_age, "wins" FROM (
                SELECT jockey_id, COUNT(*) AS "wins" FROM winners
                JOIN participants ON winners.participant_id = participants.participant_id
                GROUP BY jockey_id
                ) AS "winners"
                JOIN jockeys ON jockeys.jockey_id = "winners".jockey_id
                WHERE jockey_name = '${filter}'`
        )*/
        res.json(result)
    }
    catch (err) {
        res.status(400).json({ message: "" });
        console.error(err)
    }
});