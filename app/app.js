//* --- Modules ---
const express = require("express");
const path = require('path');

//* --- App initialization ---
const app = express();

//* --- Public Folder ---
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

//* --- View Engine ---
app.set("view engine", "hbs");
app.set('views', path.join(__dirname, './views'));

//* --- Routes ---
const routes = require('./routes/routes');
app.use('/', routes);

//* --- Opening the server ---
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
