import Url from "../models/url.model.js";
import { nanoid } from "nanoid";


const urlShortner = async(req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({ message: "Enter url" });
        }

        try {                        //Validation (format verification)
            new URL(originalUrl);
        } catch (error) {
            return res.status(400).json({ message: "validation error" })
        }


        const existing = await Url.findOne({ originalUrl });
        if (existing) {
            return res.status(200).json({
                shortUrl: `${req.protocol}://${req.get("host")}/url/${existing.shortId}`,
                data: existing,   //in case if frontend wants extra info about links
            })
        }

        let shortId = nanoid(7);

        while (await Url.findOne({ shortId })) {
            shortId = nanoid(7);
        }

        const newUrl =await Url.create({      //a new document has created into the database.
            originalUrl,
            shortId,
            clicks: 0,
        })
        return res.status(200).json({
            shortUrl:`${req.protocol}://${req.get("host")}/url/${shortId}`,
            data:newUrl,
        })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json("something went wrong");
    }

}
export default urlShortner;