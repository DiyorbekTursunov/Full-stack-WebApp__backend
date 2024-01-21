import express from "express"
import cors from 'cors'
import router from "./routes/index.js";
const PORT = process.env.PORT || 5000

const app = express();
app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use("/api" , router) 


app.listen(PORT , () => console.log(`server is running  url: http://localhost:${PORT}`))