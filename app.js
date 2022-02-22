var express = require ('express');
var mysql = require('mysql');

var app = express();

var cn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    pass:'',
    database:'articulosdb'
});


cn.connect( ( error ) => {
    if( error ){
        throw error;
    }else{
        console.log("Conexion exitosa")
    }
});


app.get('/', ( req, res)=>{
    res.send("Root");
});


const port = process.env.PUERTO || 3000;
app.listen( port, ()=>{
    console.log("Server Ok in: "+port);
});