const express = require("express");
const app = express();
const newsRoute = require("./routes/newsRoute");
const { callSearchData } = require("./controller/search.controller");

const mongoose = require("mongoose");
const uri = "mongodb+srv://thakornn:2B855067mongodb@project-lot.2wejuj3.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to mongoDB");
    } catch (error) {
        // กรณีเกิดข้อผิดพลาดในการดึงข้อมูล
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
}

app.use(express.static("public"));
app.use(express.static("views"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/views/index.html", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/views/ncal.html", (req, res) => {
    res.sendFile(__dirname + "/views/ncal.html");
});

app.get("/views/nrunback.html", (req, res) => {
    res.sendFile(__dirname + "/views/nrunback.html");
});

app.get("/views/app.html", (req, res) => {
    res.sendFile(__dirname + "/views/app.html");
});

app.use("/news", newsRoute);

//2023-01
app.get("/search", (req, res) => {
    const { month, year } = req.query;
    callSearchData(month, year, (data) => {
        res.send(data);
        res.end();
    });
});

app.listen(4000, () => {
    console.log("เซิร์ฟเวอร์ทำงานที่พอร์ต 4000");
});
