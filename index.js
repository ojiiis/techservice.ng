const express = require("express");
const  {ojs} = require("ojs-loader");


const allNigeriaStates = [
  "benue", "fct-abuja", "kogi", "kwara", "nasarawa", "niger", "plateau",
  "adamawa", "bauchi", "borno", "gombe", "taraba", "yobe",
  "kaduna", "kano", "katsina", "kebbi", "sokoto", "jigawa", "zamfara",
  "abia", "anambra", "ebonyi", "enugu", "imo",
  "akwa-ibom", "bayelsa", "cross-river", "delta", "edo", "rivers",
  "ekiti", "lagos", "ogun", "ondo", "osun", "oyo"
];
const app = express();

/*   get routes  */
app.get("/", (req, res) => {
    res.end(ojs.get("web/index.html", { location: "Nigeria" }));
});

app.get("/:location", (req, res) => {
    
    let location = (allNigeriaStates.includes(req.params.location))?req.params.location:"Nigeria";
    location = location.charAt(0).toUpperCase() + location.slice(1).toLowerCase();
    res.end(ojs.get("web/index.html", { location }));
});

app.get("/sample",(req,res)=>{
   res.end("");
});

app.listen(3000);
/*   get routes  */