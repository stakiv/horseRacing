const express = require("express");
const horseRouter = require("./routers/horsesRouters");
const jockeyRouter = require("./routers/jockeysRouters");
const raceRouter = require("./routers/racesRouters");

const app = express();
app.use(express.json());
/*app.use(express.static('./public'));*/

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use("/api", horseRouter);
app.use("/api", jockeyRouter);
app.use("/api", raceRouter);

(async() => {
    try {
        app.listen(1337);
        console.log("Сервер ждет подключения");
    } catch(err) {
        return console.log(err);
    }
})();

process.on("SIGINT", async() => {
    console.log("Приложение завершило работу");
    process.exit();
});