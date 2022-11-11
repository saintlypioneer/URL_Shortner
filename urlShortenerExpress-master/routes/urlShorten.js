
const express = require('express');
const router = express.Router();
const urlSchema = require('../models/urlShortenModel');
const randomString = require('../generateRandomString');

// router.get('/', async(req, res)=>{
//     try{
//         const urls = await urlSchema.find();
//         res.json(urls);
//     } catch(error){
//         res.send("Error"+error);
//     }
// });

// unshorten links
router.get('/:link', async(req, res)=>{
    // res.set('Access-Control-Allow-Origin', '*');
    try{
        const urls = await urlSchema.find({shortUrl: req.params.link});
        res.json({longUrl: urls[0].longUrl});
    } catch(error){
        res.send("Error"+error);
    }
});

router.post('/', async(req, res)=>{
    // res.set('Access-Control-Allow-Origin', '*');
    const newUrl = new urlSchema({
        longUrl: req.body.lurl,
        shortUrl: randomString()
    });
    try{
        const u = await newUrl.save();
        res.json({shortCode: u.shortUrl});
    } catch(error){
        res.send("Error");
    }
});

module.exports = router;