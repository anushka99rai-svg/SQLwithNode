const express=require("express");
const app=express();
const port=8080;
const mysql=require("mysql2");
const {faker} = require("@faker-js/faker");
const path=require("path");
const methodOverride=require("method-override");
const {v4:uuid} = require("uuid");

app.set("views engine","ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views",path.join(__dirname,"views"));
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));

const connection =  mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'apna_college',
  password:'mysql@123'
});

let user=()=> {
  return [
     faker.string.uuid(),
     faker.internet.username(),
     faker.internet.email(),
     faker.internet.password()
  ];
}

let q='Select count(*) from user'

app.get("/",(req,res)=>{
  try{
   connection.query(q,(err,result)=>{
    if(err) throw(err);
    let count=result[0]["count(*)"];
    res.render("home.ejs",{count});
})
}catch(err){
    console.log(err);
    res.send("Some error occured");
}
})

let show='Select * from user';
app.get("/show",(req,res)=>{
  try{
   connection.query(show,(err,result)=>{
    if(err) throw(err);
    let users=result;
    res.render("show.ejs",{users});
})
}catch(err){
    console.log(err);
    res.send("Some error occured");
}
})

app.get("/user",(req,res)=>{
  res.render("new.ejs");
})

app.post("/user",(req,res)=>{
  let {username,email,password}=req.body;
  let id=uuid();
  let q='insert into user (id, username,email,password) values(?,?,?,?)';
   connection.query(q,[id,username,email,password],(err,result)=>{
    if(err){
      console.log(err);
      return res.send("Some error occured");
    }
    res.redirect("/show");
})
})

app.get("/show/:id/edit" ,(req,res)=>{
  let {id}=req.params;
  let q='select * from user where id=?';
  try{
   connection.query(q,[id],(err,result)=>{
    if(err) throw(err);
    console.log(result);
    let user=result;
    res.render("edit.ejs",{user});
})
}catch(err){
    console.log(err);
    res.send("Some error occured in DB");
}
})

app.patch("/show/:id",(req,res)=>{
  let {id}=req.params;
  let newName=req.body.username;
  let password=req.body.password;
  let q='select * from user where id=?';
  try{
   connection.query(q,[id],(err,result)=>{
    if(err) throw(err);
    console.log(result);
    let user=result[0];
    if(password !=user.password){
      res.send("Wrong password")
    }else{
      let update='update  user set username=? where id=? ';
      connection.query(update,[newName,id],(err,result)=>{
      if(err) throw(err);
      res.redirect("/show");
    })
  }
})
}catch(err){
    console.log(err);
    res.send("Some error occured in DB");
}
})

app.delete("/user/:id",(req,res)=>{
  let {id} =req.params;
  let q='delete from user where id=?';
  connection.query(q,[id],(err,result)=>{
    if(err){
      console.log(err);
      return res.send("Problem in DB");
    }
    res.redirect("/show");
  })
})

app.listen(port,()=>{
    console.log(`App is listening at port ${port}`);
})

