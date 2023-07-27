require('dotenv').config();
const mongoose = require('mongoose');
const db = process.env.DATABASE

mongoose.connect(db).then(()=>{
    console.log('DATABASE connected')
}).catch(()=>{
    console.log('DATABASE failed to connect')
})
