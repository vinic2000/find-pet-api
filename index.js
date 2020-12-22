const express = require('express')
const app = express()
const port = 80
const bodyParser =  require('body-parser')


const controlerUser = require('./controler/controlerUser')


app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/user',controlerUser)

app.listen(port, () => {
    
    (async () => {
        const database = require('./databse/conection')
        try {
            const resultado = await database.sync({alter:true});
            console.log(resultado);
        } catch (error) {
            console.log(error);
        }
    })();
})