const express=require("express");
const bodyParser=require("body-parser");
const fs=require("fs");

const PORT = process.env.PORT || 3000;

const app=express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended:true
}));

app.post("/fb", (req, res) => {
    let feedback="| "+req.body.feedback+"\n";
    fs.appendFile("public/feedback.txt", feedback, (err) => {
        if (err)
          console.log(err);
        else
          res.redirect("/");
      });
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin":"*"
    })
    return res.redirect("index.htm");

}).listen(PORT);
console.log("Listening on port "+PORT);



