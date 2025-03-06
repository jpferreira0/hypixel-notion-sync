const express = require("express");
const path = require('path');
const { getData } = require('./controllers/backupController');

const app = express();

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.set("view engine", "hbs");
app.set("views", "app/views");

app.get("/", (req, res) => {
    res.render("index");
});

app.get('/api/data', getData);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
