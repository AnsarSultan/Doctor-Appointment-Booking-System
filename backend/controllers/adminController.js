import validator from "validator"
import bycrypt from 'bcrypt'
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModels.js"
import  jwt  from "jsonwebtoken"
// api for adding doctor
const addDoctor = async (req , res)=>{
    try {

        const {name , email , password , speciality , degree , experience , about , fees , address } = req.body
        const imageFile = req.file
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address ){
            return res.json({success:false, message: "Missing Details"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false , message: "Please enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success:false , message: "Please enter a strong password"})
        }

        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password , salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"}) 
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        res.json({success:true , message: "Doctor added"})


        res.send("Data stored successfully")
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

const loginAdmin = async (req, res)=>{
    try {
        const {email , password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success:true , message: "Login successfully" , token})
        }else{
            res.json({success: false , message: "Invalid credential"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}


// api to get all dcotor list for admin panel

const allDoctors = async (req, res)=>{
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true , doctors})
    } catch (error) {
        console.log(error)
        res.json({success: false, message:error.message})
    }

}
export {addDoctor , loginAdmin , allDoctors}