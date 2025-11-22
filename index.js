const express = require("express");

const autoRes = (req,res) =>{
    
}
const app = express();

/*   get routes  */
app.get("/",(req,res)=>{
    res.end("");
});

app.get("/sample",(req,res)=>{
   res.end("");
});

app.listen(3000);
/*   get routes  */