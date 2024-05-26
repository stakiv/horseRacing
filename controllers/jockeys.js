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
        const sort = req.query.filt;
        if (sort == '') {
            const Jockey = await pool.query(
                `SELECT "winners".jockey_id, jockey_name, jockey_age, "wins" FROM (
                    SELECT jockey_id, COUNT(*) AS "wins" FROM winners
                    JOIN participants ON winners.participant_id = participants.participant_id
                    GROUP BY jockey_id
                    ) AS "winners"
                    JOIN jockeys ON jockeys.jockey_id = "winners".jockey_id
                    ORDER BY jockey_name ASC`
            )
            result = Jockey['rows']
        } else {
            const Jockey = await pool.query(
                `SELECT "winners".jockey_id, jockey_name, jockey_age, "wins" FROM (
                    SELECT jockey_id, COUNT(*) AS "wins" FROM winners
                    JOIN participants ON winners.participant_id = participants.participant_id
                    GROUP BY jockey_id
                    ) AS "winners"
                    JOIN jockeys ON jockeys.jockey_id = "winners".jockey_id
                    ORDER BY "wins" ${sort}`
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
        res.status(400).json({message: ""});
        console.error(err)
    }
});
