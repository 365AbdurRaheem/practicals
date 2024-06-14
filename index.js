const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}));

mongoose.connect("mongodb+srv://Raheem:remi1234@cluster0.wjyzzz0.mongodb.net/feedbackDB?retryWrites=true&w=majority&appName=Cluster0");
const db=mongoose.connection;

app.post("/feedback", (req, res) => {

    let feedback=req.body.feedback;
    if(feedback.trim().length != 0)
    {
    let data={
        "Feedback": feedback,
    }
   db.collection("feedbacks").insertOne(data, (err, collection) => {
        if (err)
          res.send("<h1> Error occured. 🥴</h1>");
        else
            res.send("<h1> Thanks for your feedback! 🤗</h1>");
    })
    }
    else
        res.send("<h1> Don't send empty feedback. 🥺</h1>");
});

app.get("/", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    return res.redirect("/public/index.htm");
}).listen(PORT);
console.log("Listening on port "+PORT)
