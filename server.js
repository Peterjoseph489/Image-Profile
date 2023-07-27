require('./config/configDB');
const express = require('express');
PORT = process.env.PORT || 8383
const route = require('./routes/imageRouter');


const app = express();
app.use(express.json());
app.use('/api', route);

app.listen(PORT, ()=>{
    console.log('Server is listening on Port: '+PORT)
})