const mongoose = require('mongoose')
const {ObjectId}=mongoose.Schema

const patient = new mongoose.Schema({

    suspectedPrimarycontacts: {
        type:Array,
        default: [],
        
    },

})