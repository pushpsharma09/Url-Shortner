import Url from "../models/url.model.js";


const redirectUrl = async(req,res)=>{
    try{    
        const { shortId } = req.params;

        const url = await Url.findOneAndUpdate(
            { shortId },
            { $inc: { clicks : 1 } },   //yha pe finding k sath sath update b krrha h
            {returnDocument: 'after'} //previously this was used -> new:true

        )
        if(!url){
            return res.status(400).json({message:"short url not found"})
        }
        return res.redirect(url.originalUrl);

    }
    catch(error){
        console.error(error);
        return res.status(500).json({message:"Internal error"});

    }






}
export default redirectUrl;