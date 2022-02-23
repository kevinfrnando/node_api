var express = require ('express');
var mysql = require('mysql');

var app = express();
app.use(express.json());

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

app.get('/api/articulos', ( req, res) =>{
    cn.query('select * from articulos', ( error, filas)=>{
        if( error ){
            throw error;
        }else{
            res.send( filas )
        }
    })
});

app.get('/api/articulos/:id', ( req, res) =>{
    cn.query('select * from articulos where id = ?', [ req.params.id ], ( error, fila )=>{
        if( error ){
            throw error;
        }else{
            res.send( fila )
        }
    })
});


app.post('/api/articulos', ( req, res )=>{
    let data = {
        descripcion : req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock 
    };
    
    let query = "insert into articulos set ?";
    cn.query( query, data, ( error, record ) =>{
        if( error ){
            throw error;
        }else{
            res.send( record )
        }
    } )
})


app.put('/api/edit/:id', ( req, res )=>{
    let id = req.params.id;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    let stock = req.body.stock ;

    
    let query = "update articulos set descripcion= ?, precio = ?, stock = ? where id = ?";

    cn.query( query, [descripcion, precio, stock, id], (error, result)=>{
        if( error ){
            throw error;
        }else{
            res.send( result );
        }
    })
})



app.delete('/api/delete/:id', ( req, res )=>{
    let id = req.params.id;
    let query = "delete from articulos where id = ?";

    cn.query( query, [ id ], ( error, result )=>{
        if( error ){
            throw error;
        }else{
            res.send( result );
        }
        
    })
})

const port = process.env.PUERTO || 3000;
app.listen( port, ()=>{
    console.log("Server Ok in: "+port);
});