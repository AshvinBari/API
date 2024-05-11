// import The Express
const express = require ('express');
// Import the mongoose 
const mongoose = require('mongoose');
const Product = require('./models/productModel');
// Create an instance of the app
const app= express()


app.use(express.json())
app.use(express.urlencoded({extended:false}))
// routes 
app.get('/',(req ,res)=>{
    res.send('Hello World!')
})

app.get('/Blog',(req ,res)=>{
    res.send('Hello Blog , My name is Ashvin')
}) 
// Fetch or Get Data From Database
app.get('/product',async(req,res)=>{
try {
  const products = await Product.find({});
  res.status(200).json(products)
} catch (error) {
  res.status(500).json({message:error.message})
}
})
// Fetch or Get Data From Database ID wise 
app.get('/product/:id',async(req,res)=>{
  try {
    const {id} = req.params;
    const product = await Product.findById(id);
  res.status(200).json(product)
    
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

app.post('/product',async(req , res)=>{
    // console.log(req.body);
    // res.send(req.body)
  try {
    const product= await Product.create(req.body)
    res.status(200).json(product)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
})
// Update or Edit Data in Database
// Update a product
app.put('/products/:id',async(req,res)=>{
  try {
    const {id}=req.params;
    const product=await Product.findByIdAndUpdate(id,req.body);
    // we cannot find any product in database 
    if(!product){
      return res.status(404).json({message: `cannot find any product with Id ${id} `})
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

// Delete a product
app.delete("/products/:id", async (req,res)=>{
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id)
    if(!product){
return res.status(404).json({message:`cannot find any product with Id ${id} `})
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})
mongoose.set("strictQuery",false)

mongoose.connect('mongodb+srv://RestAPI:R@restapi.y6uhwap.mongodb.net/?retryWrites=true&w=majority&appName=RESTAPI')
.then(()=> {

    app.listen(3000, ()=>{

        console.log('Node API app is running on port 3000')
    })
    console.log('connected to MongoDB')
}).catch((error)=>{
    console.log(error)
})