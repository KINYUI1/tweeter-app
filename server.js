const express = require('express')
require('dotenv').config();
const mongoose = require('mongoose')
const connectDB = require('./utils/connectDB')
const Tweet = require('./models/Tweets')
const manyTweets = require('./models/manyTweets')
const jsxEngine = require('jsx-view-engine')
const methodOverride = require('method-override');

// variables
const app = express()
const PORT = process.env.PORT || 3000;

// middleware

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.static('public'))

app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

// routes

/**
 * Roots
 */
app.get('/',(req,res)=>{
    res.redirect('/tweets')
})
/**
 * index 
 */
app.get('/tweets',async (req,res)=>{
    try {
        const tweets = await Tweet.find({})
        res.render('Index',{tweets})
    } catch (error) {
        console.log(error);
    }
})
/**
 * New
 */


app.get('/tweets/new',(req,res)=>{
    res.render('New')
})

/**
 * edit
 */
app.get('/tweet/:id/edit',async (req,res)=>{
    const {id} = req.params
   
    console.log(req.body);
    try {
        const tweet = await Tweet.findById(id)
        res.render('Edit',{tweet})
    } catch (error) {
        console.log(error);
    }
})

/**
 * show
 */

app.get('/tweets/:id',async (req,res)=>{
    const { id } = req.params
    try {
        const tweet = await Tweet.findById(id)
        res.render("Show",{tweet})
    } catch (error) {
        console.log(error);
    }
})




/**
 * api route
 */
app.post('/api/tweets',async (req,res)=>{
    console.log(req.body);
    const createTweet = await Tweet.create(req.body)
    res.send(createTweet)
})
/**
 * update
 */

app.put('/api/tweets/:id',async (req,res)=>{
    const {id} = req.params
    if(req.body.sponsored === 'on'){
        req.body.sponsored = true
    }else{
        req.body.sponsored = false
    }
    console.log(req.body.sponsored);
    try {
        const tweetToUpdate = await Tweet.findByIdAndUpdate(id, req.body, {new:true})
        res.redirect(`/tweets/${id}`);
    } catch (error) {
        console.log(error);
    }
})

// comments
app.put('/api/tweets/add-comment/:id', async (req,res)=>{
    const {id} = req.params;
    const tweet = await Tweet.findById(id)
    tweet.comments.push(req.body)
    const updatetdTweet = await Tweet.findByIdAndUpdate(id, tweet , {new:true})
    res.redirect(`/tweets/${id}`)


})

/**
 * increase like
 */

app.get('/api/tweets/add-like/:id',async (req,res)=>{
    const {id}=req.params
    const tweetToUpdate = await Tweet.findById(id)
    tweetToUpdate.likes++;
    const updatedTweet = await Tweet.findByIdAndUpdate(id, tweetToUpdate,{new:true})
    res.redirect('/tweets')
})
// delete

app.delete('/api/tweets/:id',async (req,res)=>{
    const { id }= req.params
    try {
        const deletedTweet = await Tweet.findByIdAndDelete(id)
        res.redirect('/tweets')
    } catch (error) {
        console.log(error);
    }
})

/**
 * seed route
 */
app.get('/api/tweets/seed',async (req,res)=>{
 const creaedTweets = await Tweet.insertMany(manyTweets);
 res.send(creaedTweets)
})

// connect to the database
connectDB();
app.listen(PORT,()=>{
    console.log(`LISTENNING AT PORT ${PORT}`);
})
