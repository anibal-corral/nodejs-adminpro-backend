const { json } = require("express");
const bcrypt = require('bcryptjs');

const Doctor = require("../models/doctor.model");
const Hospital = require("../models/hospital.model");

const getDoctors =  async (req, res)=>{
    const doctors = await Doctor.find().populate('hospital').populate('user', 'name _id');
    res.json({
        ok:true,
        doctors
    })

    }
    const getDoctor =  async (req, res)=>{
        const id = req.params.id;
        try {
            const doctor =  await Doctor.findById(id).populate('hospital','_id name img').populate('user', '_id name');
            if(!doctor){
                return res.json({
                    ok:false,
                    msg: "Doctor doesn't exist"
                })
            }
             
            res.json({
                ok:true,
                doctor
             
            })     
        } catch (error) {
            return res.json({
                ok:false,
                msg: "Doctor doesn't exist"
            })
        }
       
    
        }

    const saveDoctor = async (req, res)=>{
        
        const uid = req.uid;
              console.log('saving doctor ', req.body)
        try {
            const doctor = new Doctor({user:uid,...req.body});
            await doctor.save();
            
            res.json({
                ok:true,
                doctor,
                // token
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ok:false, msg: "Check it out"})
        }

       
      
    
        }


const updateDoctor=async(req,res)=>{
    const id = req.params.id;
    const uid = req.uid;
    // console.log('UPDATIN doctor ', req.body)
    
    try {
        const doctorDB = await Doctor.findById(id);
        if(!doctorDB){
            return res.status(404).json({
                ok:false,
                msg: "Doctor doesn't exist"
            })
        }
        //Update
        const {name, hospital, img} = req.body;
        
        //Validate if hospital exist
        const hospitalDB = await Hospital.findById(hospital);
        if(!hospitalDB){
            return res.status(404).json({
                ok:false,
                msg: "Hospital doesn't exist"
            })
        }
        const doctorUpdated = await Doctor.findByIdAndUpdate(id, {name, hospital, user:uid, img}, {new: true});


        res.status(200).json({
            ok:true,
            doctor:doctorUpdated
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error"
        })
    }
}



 const deleteDoctor = async(req,res)=>{
    const id = req.params.id;
    try {
        const doctorDB = await Doctor.findById(id);
        if(!doctorDB){
            return res.status(404).json({
                ok:false,
                msg: "Doctor doesn't exist"
            })
        }
         await Doctor.findByIdAndDelete(id);
        // doctorDB.active=false;
        // await doctorDB.save();


        res.status(200).json({
            ok:true,
            msg:"Doctor deleted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error"
        })
    }
}

    module.exports ={
        getDoctors,
        getDoctor,
        saveDoctor,
        updateDoctor,
        deleteDoctor
    }