import doctorModel from "../models/doctorModels.js"
import mongoose from "mongoose";


const changeAvailablity = async (req, res) => {
    try {
      const { docId } = req.body;
  
      // ✅ Validate ObjectId
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
export {changeAvailablity , doctorList}