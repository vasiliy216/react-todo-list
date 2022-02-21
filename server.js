import express from 'express'
import dotenv from 'dotenv'
import { createServer } from 'http'

dotenv.config()

const app = express();
const http = createServer(app);
const PORT = process.env.PORT || 3003; 

app.use(express.static("./build"));

http.listen(PORT)