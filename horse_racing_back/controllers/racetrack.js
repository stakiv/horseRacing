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

exports.find_racetrack_data = app.get("", async (req, res) => {
    try {
        
        const RaceTrack = await pool.query(
            `SELECT racetrack_id, racetrack_name FROM racetrack`
        )
        result = RaceTrack['rows']
        res.json(result)

    } catch (err) {
        res.status(400).json({ message: "" });
        console.error(err)
    }
});
