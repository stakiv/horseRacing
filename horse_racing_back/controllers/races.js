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
    next();
});


exports.find_races = app.get("", async (req, res) => {
    try {
        const horse = req.query.horse;
        const date = req.query.date;
        const jockey = req.query.jockey;
        /*
        console.log(horse);
        console.log(date);
        console.log(jockey);
        console.log(typeof(horse));
        console.log(typeof(jockey));
        console.log(typeof(date));
        if (horse == '') {console.log("horse null")}
        if (jockey == '') {console.log("date null")}
        if (date == '') {console.log("jockey null")}*/
        let result;
        if (horse == '' && date == '' && jockey == '') {
            const Race = await pool.query(
                `SELECT races.race_id, date, races.name FROM races`
                /*
                `SELECT races.race_id, date, races.name, jockey_name, time FROM horses
                JOIN participants ON horses.horse_id = participants.horse_id
                JOIN jockeys ON jockeys.jockey_id = participants.jockey_id
                JOIN races ON participants.race_id = races.race_id
                ORDER BY date DESC`*/
            )
            result = Race['rows']
        }
        else if (date == '') {
            if (horse == '') {
                const Race = await pool.query(
                    `SELECT races.race_id, date, races.name FROM jockeys
                    JOIN participants ON jockeys.jockey_id = participants.jockey_id
                    JOIN races ON participants.race_id = races.race_id
                    WHERE jockey_name = '${jockey}'
                    ORDER BY date DESC`
                    /*
                    `SELECT races.race_id, date, races.name, horse_name, time FROM jockeys
                    JOIN participants ON jockeys.jockey_id = participants.jockey_id
                    JOIN horses ON horses.horse_id = participants.horse_id
                    JOIN races ON participants.race_id = races.race_id
                    WHERE jockey_name = '${jockey}'
                    ORDER BY date DESC`*/
                )
                result = Race['rows']
            } else if (jockey == '') {
                const Race = await pool.query(
                    `SELECT races.race_id, date, races.name FROM horses
                    JOIN participants ON horses.horse_id = participants.horse_id
                    JOIN races ON participants.race_id = races.race_id
                    WHERE horse_name = '${horse}'
                    ORDER BY date DESC`
                    /*
                    `SELECT races.race_id, date, races.name, jockey_name, time FROM horses
                    JOIN participants ON horses.horse_id = participants.horse_id
                    JOIN jockeys ON jockeys.jockey_id = participants.jockey_id
                    JOIN races ON participants.race_id = races.race_id
                    WHERE horse_name = '${horse}'
                    ORDER BY date DESC`*/
                )
                result = Race['rows']
            }
        }
        else if (horse == '' && jockey == '') {
            const Race = await pool.query(
                `SELECT races.race_id, name FROM races
                JOIN participants ON participants.race_id = races.race_id
                JOIN horses ON participants.horse_id = horses.horse_id
                JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
                WHERE races.date = '${date}'
                `
                /*
                `SELECT races.race_id, name, horse_name, jockey_name, time FROM races
                JOIN participants ON participants.race_id = races.race_id
                JOIN horses ON participants.horse_id = horses.horse_id
                JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
                WHERE races.date = '${date}'
                GROUP BY races.race_id, name, horse_name, jockey_name, time`*/
            )
            result = Race['rows']
        }
        else {
            if (date == '') {
                const Race = await pool.query(
                    `SELECT races.race_id, name, date FROM races
                    JOIN participants ON participants.race_id = races.race_id
                    JOIN horses ON participants.horse_id = horses.horse_id
                    JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
                    WHERE jockey_name = '${jockey}'
                    AND horse_name = '${horse}'`
                    /*
                    `SELECT races.race_id, name, horse_name, jockey_name, time FROM races
                    JOIN participants ON participants.race_id = races.race_id
                    JOIN horses ON participants.horse_id = horses.horse_id
                    JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
                    WHERE jockey_name = '${jockey}'
                    AND horse_name = '${horse}'`*/
                )
                result = Race['rows']
            }
            if (jockey == '') {
                const Race = await pool.query(
                    `SELECT races.race_id, name, date FROM races
                    JOIN participants ON participants.race_id = races.race_id
                    JOIN horses ON participants.horse_id = horses.horse_id
                    WHERE races.date = '${date}'
                    AND horse_name = '${horse}'`
                    /*
                    `SELECT races.race_id, name, horse_name, jockey_name, time FROM races
                    JOIN participants ON participants.race_id = races.race_id
                    JOIN horses ON participants.horse_id = horses.horse_id
                    JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
                    WHERE races.date = '${date}'
                    AND horse_name = '${horse}'`*/
                )
                result = Race['rows']
            }
            if (horse == '') {
                const Race = await pool.query(
                    `SELECT races.race_id, name, date FROM races
                    JOIN participants ON participants.race_id = races.race_id
                    JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
                    WHERE races.date = '${date}'
                    AND jockey_name = '${jockey}`
                    /*
                    `SELECT races.race_id, name, horse_name, jockey_name, time FROM races
                    JOIN participants ON participants.race_id = races.race_id
                    JOIN horses ON participants.horse_id = horses.horse_id
                    JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
                    WHERE races.date = '${date}'
                    AND jockey_name = '${jockey}`*/
                )
                result = Race['rows']
            }
        }

        res.json(result)

    }
    catch (err) {
        res.status(400).json({ message: "" });
        console.error(err)
    };
});


/*заданная лошадь*/
/*
exports.find_races_horse = app.get("", async(req, res) => {
    try {
        const horse = req.query.horse;
@@ -71,11 +140,12 @@ exports.find_races_horse = app.get("", async(req, res) => {
        res.json(Race["rows"])
    }
    catch (err) {
        console.error(err)
        res.status(400).json({message: ""});
    }
});


 ВЫВОДИТ ДЛЯ КАЖДОЙ ГОНКИ МИНИМАЛЬНОЕ ВРЕМЯ
ВЫВОДИТ ДЛЯ КАЖДОЙ ГОНКИ МИНИМАЛЬНОЕ ВРЕМЯ
SELECT races.race_id, MIN(time) AS "winner" FROM races
            JOIN participants ON participants.race_id = races.race_id
            JOIN horses ON participants.horse_id = horses.horse_id
            JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
            GROUP BY races.race_id */