const mongoose = require('mongoose')

const commentschema = new mongoose.Schema({
    body:{type: String, required: true},
    author:{type: String, required: true}
},{timestamps: true})

const tweetsSchema = new mongoose.Schema({
title: {type: String,
    required: true,
    minLength: 1,
    maxLength: 100

},
body: {type:String,
    required: true,
    minLength: 1,
    maxLength: 255

},
author:{
    type:String,
    required: true,
},
likes:{
    type: Number,
    default: 0
},
sponsored: {
    type: Boolean,
    default: false
},
comments:[commentschema]
}, {timestamps: true})

const Tweet = mongoose.model('Tweet', tweetsSchema)

module.exports = Tweet;