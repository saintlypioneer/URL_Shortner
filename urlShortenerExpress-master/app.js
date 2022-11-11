const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')


const app = express();

mongoose.connect("<DB_URL>", {useNewUrlParser: true});

const con = mongoose.connection;

con.on('open', function(){
    console.log('connected to DB');
});

app.use(cors({
    origin: '*'
}));

const urlShortenRouter = require('./routes/urlShorten');
app.use(express.json());
app.use('/urlShorterner', urlShortenRouter);

// unshorten links
const urlSchema = require('./models/urlShortenModel');
app.get('/:link', async(req, res)=>{
    // res.set('Access-Control-Allow-Origin', '*');
    try{
        const urls = await urlSchema.find({shortUrl: req.params.link});
        // res.json({longUrl: urls[0].longUrl});
        res.redirect(urls[0].longUrl);
    } catch(error){
        res.send("Error! Please Enter a valid URL"+error);
    }
});

//unShorten links done


app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server started");
})