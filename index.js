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
let schema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "TechService.ng",
  "image": "https://techservice.ng/assets/favicon.png",
  "@id": "https://techservice.ng",
  "url": "https://techservice.ng/",
  "telephone": "+2349078708663",
  "email": "info@techservice.ng",
  "description": "Professional software development, IT services, web and mobile app development in STATE_NAME.",
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "STATE_NAME"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 9.0778,
    "longitude": 8.6775
  },
  "sameAs": [
    "https://facebook.com/techserviceng",
    "https://instagram.com/techservice.ng",
    "https://linkedin.com/company/techservice-ng"
  ],
  "openingHours": "Mo-Su 00:00-23:59"
}
</script>
`;
app.get("/", (req, res) => {
    res.end(ojs.get("web/index.html", {schema,canonical, location: "Nigeria",cities:"",hero:"" },false));
    return;
});

app.get("/:location", (req, res) => { 
 
    let location = (seo.allNigeriaStates.includes(req.params.location))?req.params.location:"Nigeria";
    let cities = seo.nigeriaStateCities[location] || [];
    let hero = seo.nigeriaStateCitiesHeroContent[location] || [];
    location = location.charAt(0).toUpperCase() + location.slice(1).toLowerCase();
     canonical = `<link rel="canonical" href="https://techservice.ng/${location.toLowerCase()}/">`;
   let loglat = seo.nigerialoglat[location.toLowerCase()];
   let schema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "TechService.ng",
  "image": "https://techservice.ng/assets/favicon.png",
  "@id": "https://techservice.ng",
  "url": "https://techservice.ng/",
  "telephone": "+2349078708663",
  "email": "info@techservice.ng",
  "description": "Professional software development, IT services, web and mobile app development in ${location}.",
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "${location.toUpperCase()}"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": ${loglat.lat},
    "longitude": ${loglat.log}
  },
  "sameAs": [
    "https://facebook.com/techserviceng",
    "https://instagram.com/techservice.ng",
    "https://linkedin.com/company/techservice-ng"
  ],
  "openingHours": "Mo-Su 00:00-23:59"
}
</script>
`;

    res.end(ojs.get("web/index.html", {schema, canonical,location,cities:" - "+cities?.join(", "),"hero":hero },false));
    return;
});

app.get("/sample",(req,res)=>{
   res.end("");
});
app.use((req, res) => {
  res.status(404).send(ojs.get("web/404.shtml"));
});
app.listen(3000);
/*   get routes  */