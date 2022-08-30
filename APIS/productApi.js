//create a special route to handle product reqs
// const verifyToken=require("./middlewares/verifyToken")

const exp = require("express");
const productApp = exp.Router();

const expressAsyncHandler=require('express-async-handler');
const res = require("express/lib/response");
require("dotenv").config();

var cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const { response } = require("express");
//configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

//config cloudinary storage
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "prodbproducts",
      public_id: file.fieldname + "-" + Date.now(),
    };
  },
});

//configure multer
var upload = multer({ storage: cloudinaryStorage });

//to extract body of request object
productApp.use(exp.json());
productApp.use(exp.urlencoded());
//get all products
productApp.get("/getproducts",expressAsyncHandler(async(request,response)=>{

  //get productCollectionObject
  let productCollectionObject = request.app.get("productCollectionObject");
  //read all products
  let products=await productCollectionObject.find().toArray();
  //send response
  try {
    response.send({ message: "All products", payload: products })
  }
  catch (err) {
    response.send({ message: "Error in getting products", error: err })
  }
}));

// get product by productname
productApp.get("/getproduct/:productname",expressAsyncHandler(async(request,response)=>{
  // get product collection object
  let productCollectionObject= request.app.get("productCollectionObject")
  //get productname to be found
  let pname=request.params.productname
  // get product by product name
  let product=await productCollectionObject.findOne({productname:pname})
  // send response
  //if product not found it receives null
  if(product===null){
    response.send({message:"product does not exist"})
  }
  // else send product object as payload
  else{
    response.send({message:"found",payload:product})
  }

}))


//create product
productApp.post("/create-product",upload.single("photo"), expressAsyncHandler(async (request, response) => {
  
  //get productCollectionObject
  let productCollectionObject = request.app.get("productCollectionObject");
   //get userObj as string from client and convert into object
   let newProductObj = JSON.parse(request.body.productObj);
   //add profile image link to newUserObj
   newProductObj.productImg=request.file.path;
   //remove photo property
   delete newProductObj.photo;
  //insert productObj
  await productCollectionObject.insertOne(newProductObj);
  //send response
  response.send({ message: "Product created successfully" });
  
}));

//update product
productApp.put('/update-product',upload.single("photo"),expressAsyncHandler(async(request,response)=>{
  //get productCollectionObject
  let productCollectionObject = request.app.get("productCollectionObject");
  //get userObj as string from client and convert into object
  let modifiedProductObj = JSON.parse(request.body.productObj);
  //add profile image link to newUserObj
  modifiedProductObj.productImg=request.file.path;
  //remove photo property
  delete modifiedProductObj.photo;
  //update
  await productCollectionObject.updateOne({id:modifiedProductObj.id},{$set:{...modifiedProductObj}})
  //send response
  response.send({message:"Product modified"})
}))

//delete product by id
productApp.delete("/remove-product/:id",expressAsyncHandler(async(request,response)=>{

  //get productCollectionObject
  let productCollectionObject = request.app.get("productCollectionObject");
  //get to be deleted product obj id
  let pid=(request.params.id)

  //delete product by id
  let product=await productCollectionObject.deleteOne({id:pid});
  //if product not existed with given id
  if(product===null){
    response.send({message:'product not existed'})
  }
  // if product existed
  else{
  response.send({message:'product deleted'})
  }
}))

//export productApp
module.exports = productApp;