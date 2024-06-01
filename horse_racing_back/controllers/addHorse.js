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
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-control-Allow-Headers', 'Content-Type, Authorization');
    next()
});

exports.add_horse = app.post("http://localhost:1337/api/addhorse", async (req, res) => {
    try {
        const {owner, horse_name, suit, age }= req.body;
        
        console.log(horse_name);
        console.log(suit);
        console.log(age);
        console.log(owner);

        const Horse = await pool.query(
            `INSERT INTO horses (horse_name, suit, horse_age, owner_id) VALUES ('${horse_name}', '${suit}', ${age}, ${owner})`
        )
        res.status(200).json({message: "Лошадь добавлена"})
    }
    catch (err) {
        console.error("ошибка при добавлении лошади", err);
        res.status(500).json({ message: "" });
    }
});
