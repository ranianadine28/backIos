import user from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRATION } from "../authetifi/default.js";



//sign up
export async function signUp(req,res){
    const { firstName, nickName, email, password, phone, role, speciality, address } = req.body;

//   if (!firstName || !nickName || !email || !password || !phone ) {
//     // Return a 404 error if any required parameter is missing
//     return res.status(404).send({            statusCode: res.statusCode,
//         message: 'One or more required parameters are missing' });
//   }


    const verifUser = await user.findOne({ email: req.body.email });
    if (verifUser) {
        console.log("user already exists")
        res.status(403).send({ message: "User already exists !" });
    } else {
        console.log("Success")
       

      //salt = 10 random string to made the hash different 2^10
        const mdpEncrypted = await bcrypt.hash(req.body.password,10);
        const newUser = new user();
  
        
      

        newUser.firstName = req.body.firstName;
        newUser.nickName = req.body.nickName;

        newUser.email = req.body.email;
        newUser.password = mdpEncrypted;
        newUser.phone = req.body.phone;
        newUser.role = req.body.role;
        newUser.speciality = req.body.speciality;
        newUser.address = req.body.address;
        if(req.file){
            newUser.avatar=req.file.path
        }
      

        newUser.save();
        const payload = {
            _id: newUser._id,
            firstName: newUser.firstName,
            nickName: newUser.nickName,
            email: newUser.email,
            phone: newUser.phone,
            role: newUser.role,
            address: newUser.address,
            speciality: newUser.speciality,
            certificate: newUser.certificate
        };
    
        const token = jwt.sign({ payload }, JWT_SECRET, {
            expiresIn: JWT_EXPIRATION,
        });
    

        res.status(201).send({
            token: token,
           statusCode: res.statusCode,
           message: "Logged in with succes!"
           
        });
      
        
}

};


//signin


export async function login(req, res) {
    const userInfo = await user.findOne({ email: req.body.email })

    if (
        !userInfo ||
        userInfo.status === 0 ||
        !bcrypt.compareSync(req.body.password, userInfo.password)
    )
        return res.status(404).json({
            error: 'Invalid incredentials',
        })

        const payload = {
            id: user._id,
            fullname: user.fullName,
            email: user.email,
            phone: user.phone,
            role : user.role,
            address : user.address

          };

    res.status(200).json({
        // @ts-ignore
        token: jwt.sign({ payload }, JWT_SECRET, {
            expiresIn: JWT_EXPIRATION,
        }),
        userInfo
       
    })
}

//get all users 
export async function getAllUsers(req, res){
    const users = await user.find();

    if (users) {
        res.status(200).send({ users, message: "Success: All Users" });
    } else {
        res.status(403).send({ message: "Fail : No Users" });
    }
};

//delete one
export async function deleteOne(req,res){
    const verifUser = await user.findById(req.body.id).remove()
    res.status(200).send({ verifUser, message: "Success: User Deleted" });
}

//delete all
export async function deleteAll(req,res,err){
    user.deleteMany(function (err, user) {
        if (err) { 

            return handleError(res, err); 
        }

        return res.status(204).send({ message: "Fail : No element" });
    })
};


export async function updateUser(req,res){
    const verifUser = await user.findOneAndUpdate({id: req.body.id},
        {
        fullName : req.body.fullName,
        email : req.body.email,
        phone : req.body.phone,
        address : req.body.address
        }
    )
    return res.status(200).send({ verifUser, message: "Success: User Is Updated" });

};