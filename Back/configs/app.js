'use strict'


const productRoutes = require('../src/product/product.routes');
const express = require('express');
const app = express();
const port = process.env.PORT || 3200;
const cors = require('cors')

app.use(express.urlencoded({extended: false})); //codificación de la url (Caracteres y encriptación de la URL)
app.use(express.json());
app.use(cors())

        //Ruta global o pre-ruta
app.use('/product', productRoutes);

exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server http running in port ${port}`) //literal string
}