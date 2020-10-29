const express = require("express");
const bodyParser = require("body-parser");
const crud = require("./database");

// Libreria para cambiar el font color en la consola
const chalk = require('chalk');

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

app.get("/",(req,res) => {

    res.send("Frontend y backend");

})

// CRUD

app.get("/api/listPersonas", (req, res) => {
    crud.listarPersonas(res);
})

app.post("/api/addPersona", (req, res) =>{

    crud.añadirPersona(req, res);
})

app.put("/api/updatePersona", (req, res) => { 

    crud.actualizarPersona(req, res);

})

app.delete("/api/deletePersona", (req, res) => {

    crud.borrarPersona(req.body._id, res);

})

try{

    app.listen(app.get("port"), () => console.log(chalk.green(`Servidor corriendo en el puerto: ${chalk.blue(app.get("port"))}`)));
}
catch(error)
{
    console.log(chalk.red(error));
}