const express = require("express");
const cors = require("cors");
require("dotenv").config();

const bookingHandler = require("./api/booking");

const app = express();

app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://letsboothit.vercel.app',
        'https://letsboothit-git-main-smt2.vercel.app',
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept'],
    credentials: true
}));

app.get("/", (req, res) => {
    res.send("Backend is working");
});

app.post("/api/booking", bookingHandler);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));