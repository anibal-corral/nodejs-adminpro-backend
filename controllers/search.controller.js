const { json } = require("express");
const User = require('../models/user.model');
const Doctor = require('../models/doctor.model')
const Hospital = require('../models/hospital.model')
const bcrypt = require('bcryptjs');


const search =  async (req, res)=>{
    const term =req.params.value|| '' ;
    const regex = new RegExp(term,'i');
    console.log('Searchig: '+ regex);

  

    //  const users = await User.find().skip(from).limit(3);
    //  const total = await User.count();

   const [users, hospitals, doctors ] =  await Promise.all([
        User.find({name:regex}),
        Doctor.find({name:regex}),
        Hospital.find({name:regex}),
     ])
    res.json({
        ok:true,
        term,
        users,
        doctors,
        hospitals
       
    })

    }

   const getCollectionDocument=  async (req, res)=>{

        const table =req.params.table|| '' ;
        const term = req.params.search|| '' ;
        const regex = new RegExp(term,'i');
        console.log('Searchig: COLLECTION ' + table + ' ' + term);
        let data =[];
        // console.log('Searchig: '+ regex);
    switch (table) {
        case 'doctors':
         data= await  Doctor.find({name:regex}).populate('user', 'name img').populate('hospital', 'name img');
         break;
        case 'hospitals':
            data=await Hospital.find({name:regex}).populate('user','name img');
            break;
        case 'users':
            data = await User.find({name:regex});
            break;
    
        default:
         return  res.status(400).json({
            ok:false,
            msg: 'Table is not valid'
           })
    }
        res.json({
            ok:true,
            result:data
           
        })
    
        }

    module.exports ={
    search,
    getCollectionDocument
    }