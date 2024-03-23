const express=require("express");
const bodyParser=require("body-parser");
const fs=require("fs");

const PORT = process.env.PORT || 3000;

const app=express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}));

app.post("/fb", (req, res) => {
    // let feedback="| "+req.body.feedback+"\n";
    // fs.appendFile("public/feedback.txt", feedback, (err) => {
    //     if (err)
    //       console.log("Find error RaR"+err);
    //     else
    //         return res.redirect("/public/index.htm");
    //   });
    try{
    res.send("its working")
    }
    catch(err) => console.log("Error to ha"+err);
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin":"*"
    })
    return res.redirect("public/index.htm");
}).listen(PORT);
console.log("Listening on port "+PORT);



