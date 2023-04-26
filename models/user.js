import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const UserSchema = new Schema({

    firstName:{
            type: String
        },
        email:{
            type: String
        },
        password:{
            type: String
        },
       
        phone:{
            type: String
        },
        role:{
            type: String
        },
        //doctor's speciality
        speciality:{
            type: String
        },
        address:{
            type: String
        },
        nickName:{
            type: String
        }
        
       
        
    },
    {
        timestamp:true
    }
);

export default mongoose.model('user',UserSchema);