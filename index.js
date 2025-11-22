const express = require("express");
const  {ojs} = require("ojs-loader");


const allNigeriaStates = [
  "Benue", "FCT Abuja", "Kogi", "Kwara", "Nasarawa", "Niger", "Plateau",
  "Adamawa", "Bauchi", "Borno", "Gombe", "Taraba", "Yobe",
  "Kaduna", "Kano", "Katsina", "Kebbi", "Sokoto", "Jigawa", "Zamfara",
  "Abia", "Anambra", "Ebonyi", "Enugu", "Imo",
  "Akwa Ibom", "Bayelsa", "Cross River", "Delta", "Edo", "Rivers",
  "Ekiti", "Lagos", "Ogun", "Ondo", "Osun", "Oyo"
];
const app = express();

/*   get routes  */
app.get("/",(req,res)=>{
    res.end(ojs.get('web/index.html',{location:"Nigeria"}));
});

app.get("/sample",(req,res)=>{
   res.end("");
});

app.listen(3000);
/*   get routes  */