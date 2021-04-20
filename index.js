const mysql = require('mysql');
const express = require('express');
var app= express();
const bodyparser =require('body-parser');
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"jagg",
    multipleStatements:true
});
mysqlConnection.connect((err) =>{
     if(!err)
     console.log('DB connection sucess');
     else
     console.log('DB connectio Fail:' + JSON.stringify(err,undefined,2));

});
app.listen(7000,()=>console.log('Express server running at port no :8000'));
//Get all student
app.get('/student',(req,res)=>{
    mysqlConnection.query('Select * from student',(err,rows,fields)=>{
      if(!err)
      res.send(rows);
      else
      console.log(err);
    })
});
//Get  a student
app.get('/student/:id',(req,res)=>{
    mysqlConnection.query('Select * from student where id=?',[req.params.id],(err,rows,fields)=>{
      if(!err)
      res.send(rows);
      else
      console.log(err);
    })
});
//Delete a student
app.delete('/student/:id',(req,res)=>{
    mysqlConnection.query('Delete from student where id=?',[req.params.id],(err,rows,fields)=>{
      if(!err)
      res.send('Deleted Suucess');
      else
      console.log(err);
    })
});

//Insert  a student
app.post('/student',(req,res)=>{
    let emp = req.body;
    var sql = "SET @id= ?;SET @name=?;SET @department=?; \
    CALL StudentAddOrDelete(@id,@name,@department);"
    mysqlConnection.query(sql,[emp.id,emp.name,emp.department],(err,rows,fields)=>{
      if(!err)
      rows.foreach(element =>{
        if(element.constructor == Array)
        res.send('Inserted student id',+element[0].id)
    });
      else
      console.log(err);
    })
});
//Update  a student
app.put('/student',(req,res)=>{
    let emp = req.body;
    var sql = "SET @id= ?;SET @name=?;SET @department=?; \
    CALL StudentAddOrDelete(@id,@name,@department);"
    mysqlConnection.query(sql,[emp.id,emp.name,emp.department],(err,rows,fields)=>{
      if(!err)
      rows.foreach(element =>{
        
        res.send('Update sucess');
    });
      else
      console.log(err);
    })
});