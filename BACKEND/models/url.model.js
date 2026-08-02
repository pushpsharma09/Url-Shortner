import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    originalUrl:{
        type : String,
        required : true,
    },
    shortId:{
        type  : String,
        required : true,
        unique : true,
    },
    clicks:{
        type : Number,
        default : 0,  // this is for checking that how many times this conversion is happened.
    },
},{
    timestamps : true
});

const urlModel = mongoose.model("Url",urlSchema);

export default urlModel;