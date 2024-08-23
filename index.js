require("dotenv").config();
const key=process.env.API_KEY
const {Command}=require("commander")

let p=new Command("weather-cli")
p
.description("CLI to get weather with many options")
.version("0.0.1");

p
.command("getCity <city>")
.description("Gets the weather from the input city")
.option("-u, --unit <unit>","Defines unit","metric")
.option("-t, --temperature","Shows temperature")
.option("-w, --winds","Shows wind speeds")
.option("-d, --direction","Shows wind direction")
.option("-c, --coordinates","Shows coordinates")
.action(async (city,options)=>{
    city=String(city).toLowerCase();
    const {unit,temperature,winds,direction,coordinates}=options;
    const data=await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${unit}`)).json();
    if(data.cod==200){
        if(temperature){
            console.log(`Temperature in ${data.name} is ${data.main.temp}° ${(unit=="metric")?"Celsius":(unit=="imperial")?"Farenheit":"Kelvin"}`)
        }
        if(winds){
            console.log(`Wind speeds in ${data.name} is ${data.wind.speed} ${(unit=="metric")?"meters per second":(unit=="imperial")?"miles per hour":"knots"}`)
        }
        if(direction){
            console.log(`Wind direction in ${data.name} is ${data.wind.deg}°`)
        }
        if(coordinates){
            const {lon,lat}=data.coord;
            console.log(lon,lat);
        }
    }
    else{
        console.error("Invalid City");
    }
});
p.parse(process.argv)

