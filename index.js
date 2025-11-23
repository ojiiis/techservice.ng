const express = require("express");
const  {ojs} = require("ojs-loader");
const {seo} = require("./seo.js");

const app = express();
app.use(express.static('public'));

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});
/*   get routes  */

app.get("/privacy-policy",(req,res)=>{
       res.end(ojs.get("web/privacy-policy.html"));
});
app.get("/terms-of-service",(req,res)=>{
       res.end(ojs.get("web/terms-of-service.html"));
});
let canonical = `<link rel="canonical" href="https://techservice.ng/">`;
app.get("/", (req, res) => {
    res.end(ojs.get("web/index.html", {canonical, location: "Nigeria",cities:"",hero:"" },false));
});

app.get("/:location", (req, res) => { 
 
    let location = (seo.allNigeriaStates.includes(req.params.location))?req.params.location:"Nigeria";
    let cities = seo.nigeriaStateCities[location] || [];
    let hero = seo.nigeriaStateCitiesHeroContent[location] || [];
    location = location.charAt(0).toUpperCase() + location.slice(1).toLowerCase();
     canonical = `<link rel="canonical" href="https://techservice.ng/${location}">`;
    res.end(ojs.get("web/index.html", { canonical,location,cities:" - "+cities?.join(", "),"hero":hero },false));
});

app.get("/sample",(req,res)=>{
   res.end("");
});
app.use((req, res) => {
  res.status(404).send(ojs.get("web/404.shtml"));
});
app.listen(3000);
/*   get routes  */