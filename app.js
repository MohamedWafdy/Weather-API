const https = require("https");
const express = require("express");
const BodyParser = require("body-parser");
const { Script } = require("vm");

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
    const AutoComplete="https://maps.googleapis.com/maps/api/place/autocomplete/output?input="+city+"&key="+ApiKey+"";
        https.get(url, (response)=>{
            console.log("HTTP response status: "+response.statusCode);
            response.on("data", (data)=>{
            const WeatherData = JSON.parse(data);
            const temp = WeatherData.main.temp;
            const icon = WeatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"; 
            const des = WeatherData.weather[0].description;
            
            res.send("<style>h1{text-align:center; margin-top: 5em; color: #41484f} table{padding-top:2em; padding-left:1em; margin:auto;} span{font-size:1.5em; color:#41484f} body{background-color:#c5d9ed; font-family: 'Poppins', sans-serif;} span2{text-align: center;}</style>"+
            "<h1>The temperature in <em>"+city+"</em> is <em>"+temp+"</em> <sup>o</sup>c</h1>"+
            "<table><tr><th><img src = "+imgURL+" width=\"120\" height=\"120\"> "+"</th><th><span>"+des+"</span></th></tr></table>");
        })
    })
})

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});