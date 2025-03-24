import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   username:{
    type:String,
    required:true,
    unique:true,
   },
   email:{
    type:String,
    required:true,
    unique:true,
   },
   password:{
    type:String,
    required:true,
   },
   avatar:{
      type:String,
      default : "https://up.yimg.com/ib/th?id=OIP.OWHqt6GY5jrr7ETvJr8ZXwHaHa&pid=Api&rs=1&c=1&qlt=95&w=121&h=121"
   }
},
{timestamps:true}
);

const User = mongoose.model('User', userSchema);
export default User;
