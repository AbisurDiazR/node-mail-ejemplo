const { urlencoded } = require('express');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({extended: false})); //entiende los datos del formulario
//app.use(express.json); //el servidor tambien puede entender los objetos json

//importamos router
app.use(require('./routes/index'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server on port 3000');
});