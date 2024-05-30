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

exports.find_race_data = app.get("", async (req, res) => {
    try {
        const race_id = req.query.raceid;
        console.log(race_id);
        const Race = await pool.query(
            `SELECT date, horse_name, jockey_name, time FROM participants
            JOIN races ON races.race_id = participants.race_id
            JOIN horses ON participants.horse_id = horses.horse_id
            JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
            WHERE races.race_id = ${race_id}
            ORDER BY time ASC`
        )
        result = Race['rows']
        res.json(result)

    } catch (err) {
        res.status(400).json({ message: "" });
        console.error(err)
    }
});
