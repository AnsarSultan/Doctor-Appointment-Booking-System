import jwt  from "jsonwebtoken";

const authAdmin = async (req , res , next)=>{
    try {
        const adminToken = req.headers['atoken']; 
        if(!adminToken){
            return res.json({success: false, message: "Not authorized please provide token"});
        }
        const token_decode = jwt.verify(adminToken,process.env.JWT_SECRET)
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success: false, message: "Not authorized Login again"});
        }
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}


// const authAdmin = async (req , res , next) => {
//     try {
//         const authHeader = req.headers.authorization;

//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return res.json({ success: false, message: "Not authorized, token missing or invalid" });
//         }

//         const token = authHeader.split(' ')[1]; // remove 'Bearer' from string

//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//         if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//             return res.json({ success: false, message: "Not authorized, login again" });
//         }

//         next();
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// }


export default authAdmin