const router=require("express").Router();

// const express=require("express");
const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/EmployeeDB");

const EmployeeSchema =new mongoose.Schema({
    emp_id:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    department:{
        type:String,
        enum:["HR","Sales","Finance","Engineer","Others"],
        required:true
    },
    job_title:{
        type:String,
        enum:["Employment Manager","Recruiter Manager","Executive","Analyst","Database Designer","Database Administrator"],
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    }
    
});

const Employee = mongoose.model("Employee",EmployeeSchema);

router.get("/",(req,res)=>{
    res.contentType("text/html");
    res.send("Welcome to Employee Database System");
})

router.get("/add",(req,res)=>{
    // res.render("add");
    res.contentType("text/html");
    res.send(`Add Student : Give details emp_id \n name \n gender \n department \n job title \n salary \n age \n email \n phone \n address`);
    //emp_ id , name , gender ,department , job title , salary , age , email , phone , address
})

router.post("/add",async (req,res)=>{
    const empobj=new Employee({
        emp_id:req.body.emp_id,
        name:req.body.name,
        gender:req.body.gender,
        department:req.body.department,
        job_title:req.body.job_title,
        salary:parseInt(req.body.salary),
        age:parseInt(req.body.age),
        email:req.body.email,
        phone:parseInt(req.body.phone),
        address:req.body.address
    })
    await empobj.save();
    res.contentType("text/html");
    res.send(`Employee with id ${req.body.emp_id} Added Successfully`);
})

router.get("/delete",(req,res)=>{
    res.contentType("text/html")
    res.send(`Delete Employee : Give emp_id to delete`);
})

router.delete("/delete",async(req,res)=>{
    const emp_id=req.body.emp_id;
    await Employee.deleteOne({emp_id:emp_id})
    try{
        res.send(`Employee with id:${emp_id} Deleted Successfully!`);    
    }
    catch(err){        
        res.status(500).send(err);
    }
})

module.exports=router;
