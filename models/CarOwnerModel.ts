import mongoose from 'mongoose'

const carOwnerSchema = new mongoose.Schema({
  
 first_name :{
     type:String
 },
 last_name: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  car_model: {
    type: String,
  },
  car_model_year: {
    type: String,
  },
  car_color: {
    type: String,
  },
  gender: {
    type: String,
  },
  job_title: {
    type: String,
  },
  bio: {
    type: Array,
  },
  created: {
    type: String,
  },
}, { timestamps: true, minimize: false });

export default mongoose.model('car_owner', carOwnerSchema);
