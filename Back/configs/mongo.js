'use strict'
//async/await | más reciente, más recomendable
const mongoose = require('mongoose');

exports.connect = async()=>{
    try{
        const uriMongo = 'mongodb://mongo:27017/ExampleAV';
/*         const uriMongo = 'mongodb://127.0.0.1:27017/ExampleAV'; */
        mongoose.set('strictQuery', false);
        await mongoose.connect(uriMongo);
        console.log('Connected to DB')
    }catch(err){
        console.error(err)
    }
}


// promise | recomendable para conexiones persistentes
/* const mongoose = require('mongoose');

exports.connect = ()=>{
    const uriMongo = 'mongodb://127.0.0.1:27017/ExampleAV';
    mongoose.Promise = global.Promise; //Mongoose utiliza una promesa global - resolución o rechazo

    mongoose.connect(uriMongo, {
        connectTimeoutMS: 2500,
        maxPoolSize: 50,
        useNewUrlParser: true
    }).then(()=>{ //resolve
        console.log('Connected to db');
    }).catch(err=> console.error(err)); //Reject
} */


//callbacks | las antiguas, menos recomendables y ensucial el código
/* const mongoose = require('mongoose'); //importación de una dependencia

exports.connect = ()=>{ //Auto-exportación
    const uriMongo = 'mongodb://127.0.0.1:27017/ExampleAV'
    mongoose.connect(uriMongo, (err, res)=>{
        if(res){
            console.log('Connected to DB')
        }else if(err){
            console.log(err)
        }else{
            console.log('ERROR')
        }
    })
} */