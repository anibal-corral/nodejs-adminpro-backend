const { json } = require("express");
const {v4: uuidv4} = require('uuid');

const bcrypt = require('bcryptjs');
const { updateImage } = require("../helpers/update-image");


const uploadFile =  async (req, res)=>{
  const {type, id } = req.params;

  //Validation types
const validTypes = ['hospitals', 'doctors', 'users'];

if(!validTypes.includes(type)){
    return res.json({
        ok:false,
        msg: "Type is not valid"
    })
}
// ------------------------------------------
// VALIDATION FILE
if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
        ok:false,
msg:'No files were uploaded.'
    })
  } 
// PROCESS IMAGE
const file = req.files.imagen;
const cutName = file.name.split('.');
const fileExtension = cutName[cutName.length-1];
const validExtensions=['png','jpg','jpeg','gif'];
if(!validExtensions.includes(fileExtension)){
    return res.json({
        ok:false,
        msg: "Extension is not valid"
    })
}
//Generating name of file.
const fileName= `${uuidv4()}.${fileExtension}`;
//PATH TO SAVE FILE
const path = `./uploads/${type}/${fileName}`;
file.mv(path, (err)=> {
    if (err)
      return res.status(500).json({
        ok:false,
        msg: "Error => " + err
      });
      updateImage(type, id, path, fileName);
     return res.json({
        ok:true,
        msg:'File uploaded successfully ',
        fileName
       
    })
  });




    }


    module.exports ={
    
    uploadFile
    }