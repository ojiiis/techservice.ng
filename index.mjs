import express from "express";
import { ojs } from "ojs-loader";
import { seo } from "./seo.mjs";

const app = express();
app.use(express.static("public"));

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

/* ACME challenge */
app.get(
  "/.well-known/acme-challenge/b9X_jqJDg2eCCCOkG1kzMWudr9sdWyYitU9mksDB4JU",
  (req, res) => {
    res.end(
      "b9X_jqJDg2eCCCOkG1kzMWudr9sdWyYitU9mksDB4JU.GuKmeagYoksnjYlQkZxceSZ8mu6vh9NKLkrDf8WdeE8"
    );
  }
);

app.get("/:state/map", (req, res) => {
  const state = req.params.state;
  const coords = seo.nigerialoglat[state];
  if (!coords) {
    res.status(404).end("State not found");
    return;
  }
  const data = `
  <iframe width="100%" height="99%" style="outline:0;border:none" src="https://map.techservice.ng/frame.html?lat=${coords.lat}&lon=${coords.log}"></iframe>
  `;
  res.end(data);
});

app.get("/privacy-policy", (req, res) => {
  res.end(ojs.get("web/privacy-policy.html"));
});

app.get("/terms-of-service", (req, res) => {
  res.end(ojs.get("web/terms-of-service.html"));
});

function buildSchema({ locationSlug, displayName, lat, log, isHome }) {
  const url = isHome
    ? "https://techservice.ng/"
    : `https://techservice.ng/${locationSlug}/`;
  const areaName = isHome ? "Nigeria" : displayName;
  const description = isHome
    ? "Professional software development, IT services, web and mobile app development across Nigeria."
    : `Professional software development, IT services, web and mobile app development in ${displayName}, Nigeria. Local expertise for businesses in ${displayName}.`;

  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "TechService.ng${isHome ? "" : " – " + displayName}",
  "image": "https://techservice.ng/assets/images/favicon.png",
  "@id": "${url}",
  "url": "${url}",
  "telephone": "+2347045733867",
  "email": "info@techservice.ng",
  "description": "${description}",
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "${areaName}"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": ${lat},
    "longitude": ${log}
  },
  "sameAs": [
    "https://facebook.com/techserviceng",
    "https://instagram.com/techservice.ng",
    "https://linkedin.com/company/techservice-ng"
  ],
  "openingHours": "Mo-Su 00:00-23:59",
  "priceRange": "$$"
}
</script>`;
}

app.get("/", (req, res) => {
  const canonical = `<link rel="canonical" href="https://techservice.ng/">`;
  const schema = buildSchema({
    locationSlug: "",
    displayName: "Nigeria",
    lat: 9.0778,
    log: 8.6775,
    isHome: true
  });

  res.end(
    ojs.get(
      "web/index.html",
      {
        schema,
        canonical,
        location: "Nigeria",
        locationSlug: "",
        cities: "",
        citiesList: "",
        hero: "",
        localContent: "",
        metaFocus: "software development, web design, mobile apps & IT solutions nationwide",
        pageTitle: "Expert Software Development & IT Solutions in Nigeria | TechService.ng",
        metaDescription:
          "TechService.ng delivers custom software development, web design, mobile apps, cloud & DevOps, and IT strategy across all 36 states and the FCT. Powering Nigerian businesses digitally."
      },
      false
    )
  );
});

app.get("/:location", (req, res) => {
  const slug = (req.params.location || "").toLowerCase();
  const isValid = seo.allNigeriaStates.includes(slug);
  const locationSlug = isValid ? slug : "";
  const displayName = isValid
    ? seo.stateDisplayNames[slug] || slug
    : "Nigeria";
  const citiesArr = isValid ? seo.nigeriaStateCities[slug] || [] : [];
  const citiesFormatted = citiesArr
    .map((c) => c.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()))
    .join(", ");
  const hero = isValid ? seo.nigeriaStateCitiesHeroContent[slug] || "" : "";
  const localContent = isValid ? seo.nigeriaStateLocalContent[slug] || "" : "";
  const metaFocus = isValid
    ? seo.nigeriaStateMetaFocus[slug] || "software development & IT solutions"
    : "software development, web design, mobile apps & IT solutions nationwide";

  const coords = isValid
    ? seo.nigerialoglat[slug]
    : { lat: 9.0778, log: 8.6775 };

  const canonical = isValid
    ? `<link rel="canonical" href="https://techservice.ng/${locationSlug}/">`
    : `<link rel="canonical" href="https://techservice.ng/">`;

  const schema = buildSchema({
    locationSlug,
    displayName,
    lat: coords.lat,
    log: coords.log,
    isHome: !isValid
  });

  const pageTitle = isValid
    ? `Software Development & IT Solutions in ${displayName} | TechService.ng`
    : "Expert Software Development & IT Solutions in Nigeria | TechService.ng";

  const metaDescription = isValid
    ? `TechService.ng offers ${metaFocus} in ${displayName}. Serving ${citiesFormatted}. Custom software, web & mobile apps, cloud and IT strategy for local businesses.`
    : "TechService.ng delivers custom software development, web design, mobile apps, cloud & DevOps, and IT strategy across all 36 states and the FCT. Powering Nigerian businesses digitally.";

  res.end(
    ojs.get(
      "web/index.html",
      {
        schema,
        canonical,
        location: displayName,
        locationSlug,
        cities: citiesFormatted ? ` — ${citiesFormatted}` : "",
        citiesList: citiesFormatted,
        hero,
        localContent,
        metaFocus,
        pageTitle,
        metaDescription
      },
      false
    )
  );
});

app.get("/sample", (req, res) => {
  res.end("");
});

app.use((req, res) => {
  res.status(404).send(ojs.get("web/404.shtml"));
});

app.listen(3000);
