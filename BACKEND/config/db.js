import mongoose from "mongoose";



const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongodb connected");

    }catch(error){
        console.log("error comes while connecting to db");
    }

}
export default connectDB;