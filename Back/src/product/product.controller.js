'use strict'
const Product = require('./product.model');

const fs = require('fs')
const path = require('path')

exports.test = (req, res)=>{
    res.send({message: 'Test function is running'});
}

exports.addProduct = async(req, res)=>{
    try{
        //Obtener la información a agregar
        let data = req.body;

        //Guardar
        let product = new Product(data);
        await product.save();
        return res.send({message: 'Product saved sucessfully', product})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error creating product'});
    }
}

exports.getProducts = async(req, res)=>{
    try{
        //Buscar datos
        let products = await Product.find()
        return res.send({message: 'Products found', products});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting products'});
    }
}

exports.getProduct = async(req, res)=>{
    try{
        //Obtener el Id del producto a buscar
        let productId = req.params.id;
        //Buscarlo en BD
        let product = await Product.findOne({_id: productId})
        //Valido que exista el producto
        if(!product) return res.status(404).send({message: 'Product not found'});
        //Si existe lo devuelvo
        return res.send({message: 'Product found:', product});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting product'});
    }
}

exports.updateProduct = async(req, res)=>{
    try{
        //obtener el Id del producto
        let productId = req.params.id;
        //obtener la data a actualizar
        let data = req.body;
        //Validar que exista la categoría

        let updatedProduct = await Product.findOneAndUpdate(
            {_id: productId},
            data,
            {new: true}
        )
        if(!updatedProduct) return res.send({message: 'Product not found and not updated'});
        return res.send({message: 'Product updated:', updatedProduct});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updating product'});
    }
}

exports.deleteProduct = async(req, res)=>{
    try{
        let idProduct = req.params.id;
        let deletedProduct = await Product.findOneAndDelete({_id: idProduct});
        if(!deletedProduct) return res.status(404).send({message: 'Error removing product or already deleted'});
        return res.send({message: 'Product deleted sucessfully', deletedProduct});
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error removing product'})
    }
}

exports.addImage = async(req, res)=>{
    try{
        //obtener el id del producto al cual se va a vincular
        const productId = req.params.id; //si es un usuario, y está logeado se puede jalar del token
        const alreadyImage = await Product.findOne({_id: productId})
        let pathFile = './uploads/products/'
        if(alreadyImage.image) fs.unlinkSync(`${pathFile}${alreadyImage.image}`) //./uploads/products/nombreImage.png
        if(!req.files.image || !req.files.image.type) return res.status(400).send({message: 'Havent sent image'})
        //crear la ruta para guardar la imagen
        const filePath = req.files.image.path; // \uploads\products\productName.png
        //Separar en jerarqu´+ia la ruta de imagen (linux o MAC ('\'))
        const fileSplit = filePath.split('\\') //fileSplit = ['uploads', 'products', 'productName.png']
        const fileName = fileSplit[2];

        const extension = fileName.split('\.'); //extension = ['productName', 'png']
        const fileExt = extension[1] // fileExt = 'png'
        console.log(fileExt)
        if(
            fileExt == 'png' || 
            fileExt == 'jpg' || 
            fileExt == 'jpeg' || 
            fileExt == 'gif'
        ){
            const updatedProduct = await Product.findOneAndUpdate(
                {_id: productId}, 
                {image: fileName}, 
                {new: true}
            )
            if(!updatedProduct) return res.status(404).send({message: 'Product not found and not updated'});
            return res.send({message: 'Product updated', updatedProduct})
        }
        fs.unlinkSync(filePath)
        return res.status(404).send({message: 'File extension cannot admited'});
        

    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error adding image', err})
    }
}

exports.getImage = async(req, res)=>{
    try{
        const fileName = req.params.fileName;
        const pathFile = `./uploads/products/${fileName}`

        const image = fs.existsSync(pathFile);
        if(!image) return res.status(404).send({message: 'image not found'})
        return res.sendFile(path.resolve(pathFile))
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting image'});
    }
}