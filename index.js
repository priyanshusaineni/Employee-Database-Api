const express=require("express");
const app=express();
const router=require("./router.js");
const bodyParser=require("body-parser");
app.use(bodyParser.json())
app.use(router);

app.listen(4000,()=>{
    console.log("server is running on port 4000");  
})