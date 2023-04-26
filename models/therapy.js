import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const TherapySchema = new Schema({

        titre:{
            type: String
        },
        date:{
            type: String
        },
        address:{
            type: String
        },
        description:{
            type: String
        },
        capacity:{
            type: Number
        },
        dispo:{
            type:Boolean

        },
        image:{
            type: String
        },
      
        user: { type: Schema.Types.ObjectId, ref: 'user' },
       
        
    },
    {
        timestamp:true
    }
);

export default mongoose.model('therapy',TherapySchema);