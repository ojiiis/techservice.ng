const express = require("express");
const  {ojs} = require("ojs-loader");
const {seo} = require("./seo.js");

const app = express();
app.use(express.static('assets'));
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});
/*   get routes  */
app.get("/", (req, res) => {
    res.end(ojs.get("web/index.html", { location: "Nigeria",cities:"",hero:"" }));
});

app.get("/:location", (req, res) => { 
 
    let location = (seo.allNigeriaStates.includes(req.params.location))?req.params.location:"Nigeria";
    let cities = seo.nigeriaStateCities[location];
    let hero = seo.nigeriaStateCitiesHeroContent[location];
    location = location.charAt(0).toUpperCase() + location.slice(1).toLowerCase();
    
    res.end(ojs.get("web/index.html", { location,cities:" - "+cities.join(", "),hero:hero }));
});

app.get("/sample",(req,res)=>{
   res.end("");
});

app.listen(3000);
/*   get routes  */