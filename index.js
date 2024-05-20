const express=require('express')
const app=express()
const mysql=require('mysql2')
const cors=require('cors')
app.use(cors())
app.use(express.json())
const sql=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"final"
})

app.get("/",(req,res)=>{
sql.execute("select * from zoz",(err,data)=>{
        if(err){
            res.json({message:"failed",err})
        }else{
            res.json({data})
        }
    })
})

app.get("/get",(req,res)=>{
    const{id}=req.body
    sql.execute(`select * from zoz where id ='${id}'`,(err,data)=>{
            if(err){
                res.json({message:"failed",err})
            }else{
                res.json({data})
            }
        })
    })

app.post("/add",(req,res)=>{
    const{name,email,age}=req.body
    sql.execute(`insert into zoz(name,email,age) values('${name}','${email}','${age}')`)
    res.json("data posted successfully")
})


app.delete("/del",(req,res)=>{
    const{id}=req.body
    sql.execute(`delete from zoz where id = ${id}`)
    res.json("data deleted successfully")
})

app.put("/update",(req,res)=>{
    const{id,name,email,age}=req.body
    sql.execute(`update zoz set name= '${name}',email='${email}',age='${age}' where id ='${id}' `)
    res.json("data updated successfully")
})


app.listen(6000,()=>{
console.log(`server running on port 6000`);
})