import doctorModel from "../models/doctorModels.js"
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";

const changeAvailablity = async (req, res) => {
    try {
      const { docId } = req.body;
  
      if (!mongoose.Types.ObjectId.isValid(docId)) {
        return res.json({ success: false, message: "Invalid doctor ID" });
      }
  
      const docData = await doctorModel.findById(docId);
  
      if (!docData) {
        return res.json({ success: false, message: "Doctor not found" });
      }
  
      await doctorModel.findByIdAndUpdate(docId, {available:!docData.available})
  
      res.json({ success: true, message: "Availability changed" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  

  const doctorList = async(req, res)=>{
    try {
      const doctors = await doctorModel.find({}).select(['-password','-email'])
      res.json({success:true , doctors})
    } catch (error) {
       console.log(error);
      res.json({ success: false, message: error.message });
    }
  }

  const loginDoctor = async (req , res)=>{
    try { 
      const {email , password } = req.body
      const doctor = await doctorModel.findOne({email})
      if (!doctor) {
        return res.json({success:false , message: "Invalid Credential"})
      }
      const isMatch = await bcrypt.compare(password , doctor.password)
      if (isMatch) {
        const token = jwt.sign({id:doctor._id}, process.env.JWT_SECRET)
        res.json({success:true ,  token})
      }else{
        return res.json({success:false , message: "Invalid Credential"})
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  }


  const appointmentsDoctor = async (req, res)=>{
    try {
      const {docId} = req
      const appointments = await appointmentModel.find({docId})
      res.json({success:true , appointments})
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  }

export {changeAvailablity , doctorList , loginDoctor , appointmentsDoctor}