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
        const racetrack = req.query.racetrack;
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
        if (horse == '' && date == '' && jockey == '' && racetrack == '') {
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
            if (horse == '' && racetrack == '') {
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
            } else if (jockey == '' && racetrack == '') {
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
            } else if (horse == '' && jockey == '') {
                const Race = await pool.query(
                    `SELECT races.race_id, date, races.name FROM racetrack
                    JOIN races ON races.racetrack_id = racetrack.racetrack_id
                    JOIN participants ON races.race_id = participants.race_id
                    WHERE racetrack.racetrack_id = ${racetrack}
                    GROUP BY races.race_id, date, name
                    ORDER BY date DESC`
                )
                result = Race['rows']
            }
        }
        else if (horse == '' && jockey == '' && racetrack == '') {
            const Race = await pool.query(
                `SELECT races.race_id, name FROM races
                    JOIN participants ON participants.race_id = races.race_id
                    JOIN horses ON participants.horse_id = horses.horse_id
                    JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
                    WHERE races.date = '${date}'
                    GROUP BY races.race_id`
            )
            result = Race['rows']
        }
        else if (jockey == '') {
            if (horse == '') {
                const Race = await pool.query(
                    `SELECT races.race_id, name FROM races
                        JOIN participants ON participants.race_id = races.race_id
                        JOIN horses ON participants.horse_id = horses.horse_id
                        JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
                        JOIN racetrack ON racetrack.racetrack_id = races.racetrack_id
                        WHERE races.date = '${date}'
                        AND races.racetrack_id = ${racetrack}
                        GROUP BY races.race_id`
                )
                result = Race['rows']
            }
            else if (racetrack == '') {
                const Race = await pool.query(
                    `SELECT races.race_id, name FROM races
                        JOIN participants ON participants.race_id = races.race_id
                        JOIN horses ON participants.horse_id = horses.horse_id
                        JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
                        JOIN racetrack ON racetrack.racetrack_id = races.racetrack_id
                        WHERE races.date = '${date}'
                        AND horses.horse_name = '${horse}'
                        GROUP BY races.race_id`
                )
                result = Race['rows']
            }
            else if (date == '') {
                const Race = await pool.query(
                    `SELECT races.race_id, name FROM races
                        JOIN participants ON participants.race_id = races.race_id
                        JOIN horses ON participants.horse_id = horses.horse_id
                        JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
                        JOIN racetrack ON racetrack.racetrack_id = races.racetrack_id
                        WHERE horses.horse_name = '${horse}'
                        AND races.racetrack_id = ${racetrack}
                        GROUP BY races.race_id`
                )
                result = Race['rows']
            } else {
                const Race = await pool.query(
                    `SELECT races.race_id, name FROM races
                        JOIN participants ON participants.race_id = races.race_id
                        JOIN horses ON participants.horse_id = horses.horse_id
                        JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
                        JOIN racetrack ON racetrack.racetrack_id = races.racetrack_id
                        WHERE horses.horse_name = '${horse}'
                        AND races.racetrack_id = ${racetrack}
						AND races.date = '${date}' 
                        GROUP BY races.race_id`
                )
                result = Race['rows']
            }

        }
        else if (horse == '') {
            if (racetrack == '') {
                const Race = await pool.query(
                    `SELECT races.race_id, name FROM races
                        JOIN participants ON participants.race_id = races.race_id
                        JOIN horses ON participants.horse_id = horses.horse_id
                        JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
                        JOIN racetrack ON racetrack.racetrack_id = races.racetrack_id
                        WHERE races.date = '${date}'
                        AND jockeys.jockey_name = '${jockey}'
                        GROUP BY races.race_id`
                )
                result = Race['rows']
            }
            else if (date == '') {

                const Race = await pool.query(
                    `SELECT races.race_id, name FROM races
                            JOIN participants ON participants.race_id = races.race_id
                            JOIN horses ON participants.horse_id = horses.horse_id
                            JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
                            JOIN racetrack ON racetrack.racetrack_id = races.racetrack_id
                            WHERE jockeys.jockey_name = '${jockey}'
                            AND races.racetrack_id = ${racetrack}
                            GROUP BY races.race_id`
                )
                result = Race['rows']
            }
            else {
                const Race = await pool.query(
                    `SELECT races.race_id, name FROM races
                            JOIN participants ON participants.race_id = races.race_id
                            JOIN horses ON participants.horse_id = horses.horse_id
                            JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
                            JOIN racetrack ON racetrack.racetrack_id = races.racetrack_id
                            WHERE races.date = '${date}'
                            AND races.racetrack_id = ${racetrack}
                            AND jockeys.jockey_name = '${jockey}' 
                            GROUP BY races.race_id`
                )
                result = Race['rows']
            }

        }


        else if (date == '') {
            if (racetrack == '') {
                const Race = await pool.query(
                    `SELECT races.race_id, name FROM races
                        JOIN participants ON participants.race_id = races.race_id
                        JOIN horses ON participants.horse_id = horses.horse_id
                        JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
                        JOIN racetrack ON racetrack.racetrack_id = races.racetrack_id
                        WHERE horses.horse_name = '${horse}'
                        AND jockeys.jockey_name = '${jockey}'
                        GROUP BY races.race_id`
                )
                result = Race['rows']
            }
            else {
                const Race = await pool.query(
                    `SELECT races.race_id, name FROM races
                            JOIN participants ON participants.race_id = races.race_id
                            JOIN horses ON participants.horse_id = horses.horse_id
                            JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
                            JOIN racetrack ON racetrack.racetrack_id = races.racetrack_id
                            WHERE horses.horse_name = '${horse}'
                            AND races.racetrack_id = ${racetrack}
                            AND jockeys.jockey_name = '${jockey}' 
                            GROUP BY races.race_id`
                )
                result = Race['rows']
            }
        }

        else if (racetrack == '') {
            const Race = await pool.query(
                `SELECT races.race_id, name FROM races
                        JOIN participants ON participants.race_id = races.race_id
                        JOIN horses ON participants.horse_id = horses.horse_id
                        JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
                        JOIN racetrack ON racetrack.racetrack_id = races.racetrack_id
                        WHERE horses.horse_name = '${horse}'
                        AND races.date = ${date}
                        AND jockeys.jockey_name = '${jockey}' 
                        GROUP BY races.race_id`
            )
            result = Race['rows']
        }
        else {
            const Race = await pool.query(
                `SELECT races.race_id, name FROM races
                        JOIN participants ON participants.race_id = races.race_id
                        JOIN horses ON participants.horse_id = horses.horse_id
                        JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
                        JOIN racetrack ON racetrack.racetrack_id = races.racetrack_id
                        WHERE horses.horse_name = '${horse}'
                        AND races.date = '${date}'
                        AND jockeys.jockey_name = '${jockey}' 
						AND races.racetrack_id = ${racetrack}
                        GROUP BY races.race_id`
            )
            result = Race['rows']
        }
    }
    catch (err) {
    res.status(400).json({ message: "" });
    console.error(err)
};
});

/*


 ВЫВОДИТ ДЛЯ КАЖДОЙ ГОНКИ МИНИМАЛЬНОЕ ВРЕМЯ
ВЫВОДИТ ДЛЯ КАЖДОЙ ГОНКИ МИНИМАЛЬНОЕ ВРЕМЯ
SELECT races.race_id, MIN(time) AS "winner" FROM races
            JOIN participants ON participants.race_id = races.race_id
            JOIN horses ON participants.horse_id = horses.horse_id
            JOIN jockeys ON participants.jockey_id = jockeys.jockey_id
            GROUP BY races.race_id */