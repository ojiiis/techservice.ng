const express = require("express");
const  {ojs} = require("ojs-loader");


const autoRes = (req,res) =>{
    
}
const app = express();

/*   get routes  */
app.get("/",(req,res)=>{
    res.end(ojs.get('web/index.html'));
});

app.get("/sample",(req,res)=>{
   res.end("");
});

app.listen(3000);
/*   get routes  */