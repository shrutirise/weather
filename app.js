const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    
    res.sendFile(__dirname+"/index.html");

    
    });
app.post("/",function(req,res){
    
    const query=req.body.cityName;
    const apiKey="be7d0d0024cd7343c639d4be6e7fb889";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric";
    https.get(url,function(response){
    response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        const icon=weatherData.weather[0].icon;
        const imageUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
        console.log(temp);
        const weatherDes=weatherData.weather[0].description
        console.log(weatherDes);
        res.write("<p>The weather is currently "+weatherDes+"</p>");
        res.write("<h1>The temperature of "+query+ " is "+ temp+ "C</h1>");
        res.write("<img src="+imageUrl+">")
        res.send();
    
});
});
});
   








app.listen(3000,function(){
    console.log("server is successfully running on port 3000");
});
