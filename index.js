const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api" , require('./routes/houzingRoutes'))

const PORT = process.env.PORT || 5000

app.listen(PORT , () => console.log('server is running'))