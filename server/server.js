const express = require("express");
const app = express();
const port = 8000;
const cors = require('cors')
require("./config/mongoose.config")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: 'http://localhost:5173' }))
const routineRoutes = require('./routes/routine.routes');
routineRoutes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));