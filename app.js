const https = require("https");
const express = require("express");
const BodyParser = require("body-parser");

const app = express();
app.use(BodyParser.urlencoded({extended:true}));
const port = 9000; 

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/index.html");

})
app.post("/", (req, res)=>{
    const ApiKey = "0ad6b976bb25e59b90f7263ad9ad23c2";
    const city = req.body.CityName;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+unit+"&appid="+ApiKey+"";
        https.get(url, (response)=>{
            console.log("HTTP response status: "+response.statusCode);
            response.on("data", (data)=>{
            const WeatherData = JSON.parse(data);
            const name = WeatherData.name
            const temp = WeatherData.main.temp;
            const icon = WeatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"; 
            const des = WeatherData.weather[0].description;
            
            res.send("<style>h2, table{padding-top:2em; padding-left:1em;} span{font-size:1.5em}</style>"+
            "<h2>The temperature in "+city+" is "+temp+"</h2>"+
            "<table><tr><th><img src = "+imgURL+" width=\"120\" height=\"120\"> "+"</th><th><span>"+des+"</span></th></tr></table>");
        })
    })
})

app.listen(port,()=>{
    console.log("server is listening on port "+port);
});