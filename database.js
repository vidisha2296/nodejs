const {
    createPool 
}= require('mysql');
const pool= createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"jagg",
    connectionLimit: 10
})
pool.query('select * from student',(err,result,fields)=>{
    if(err){
        return console.log(err);

    }
    return console.log(result);
})
module.exports = pool;