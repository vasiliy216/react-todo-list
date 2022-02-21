const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const { createServer } = require('http')

dotenv.config()

const app = express();
const http = createServer(app);
const PORT = process.env.PORT || 3003; 

app.use(express.static("./build"));

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


http.listen(PORT)