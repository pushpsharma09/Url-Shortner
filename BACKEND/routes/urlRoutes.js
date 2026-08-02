import redirectUrl  from "../controller/redirectUrl.controller.js";
import urlShortner  from "../controller/url.controller.js";
import express from "express";


const router = express.Router();

router.post('/shorten',urlShortner);
router.get('/:shortId',redirectUrl);

export default router;