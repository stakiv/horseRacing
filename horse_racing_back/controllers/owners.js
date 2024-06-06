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

exports.find_owners = app.get("", async (req, res) => {
    
    try {
        const owner_d = req.query.del;
        if (owner_d == '') {
            const Owner = await pool.query(
                `SELECT owner_id, owner_name FROM owners
                ORDER BY owner_name`
            )
            result = Owner['rows']
        }
        else {
            const Owner = await pool.query(
                `SELECT owners.owner_id, owner_name FROM owners
                JOIN horses ON horses.owner_id = owners.owner_id
                GROUP BY owners.owner_id, owner_name
                ORDER BY owner_name ASC`
            )
            result = Owner['rows']
        }
        
        
        res.json(result)
    }
    catch (err) {
        res.status(400).json({ message: "" });
        console.error(err)
    }
});