const mongoose = require('mongoose')

const conString = "mongodb://localhost:27017/pruebaDB";


mongoose.connect(conString, {useNewUrlParser: true})
    .then(() => {

    console.log("Conexión con la base de datos creada");

    })
    .catch(error => console.log(error));

const personaSchema = mongoose.Schema({

    _id : mongoose.Schema.Types.ObjectId,
    Nombre: {
        type: String,
        required: true
    },

    Edad: {
        type: Number,
        required: true
    },

    Sexo: String

},
{
    versionKey: false
}

)

const Persona = mongoose.model("Persona", personaSchema);

function añadirPersona(req, res){

    const {Nombre, Edad, Sexo} = req.body;

    const nuevaPersona = new Persona({
        _id: new mongoose.Types.ObjectId(),
        Nombre,
        Edad,
        Sexo
    });

    nuevaPersona.save(error => {

        if(error) throw error;

        res.send("Nueva persona añadida");

        console.log("Nueva persona añadida");
    })
}

function listarPersonas(res){
    Persona.find({}, (error, res) => {
            if(error) console.log(error);
        
            res.toJSON;
        })
        .exec((error, personas)=>{

            if(error) throw error;

            res.send(personas);

        })    
}

function borrarPersona(id, res = {}){
    
    Persona.findOneAndDelete({_id: id}, (error, res) => {
        if(error) throw error;
        console.log(res)
    })
    .exec(error => {
        if(error) throw error;
        
        console.log("Persona borrada")
    })
    
    res.send("Persona borrada");
}

function actualizarPersona(req, res){

    Persona.findByIdAndUpdate(req.body._id, { Nombre: req.body.Nombre, Edad: req.body.Edad, Sexo: req.body.Sexo}, (err, res) => {


        if(err) throw err;
    
        console.log(`Updated user : ${req.body.Nombre}` );
    
    })

    res.send(`Updated user : ${req.body.Nombre}`);

}

exports.añadirPersona = añadirPersona;
exports.listarPersonas = listarPersonas;
exports.actualizarPersona = actualizarPersona;
exports.borrarPersona = borrarPersona;