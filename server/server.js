const express = require('express');
const app = express();
const cors = require('cors');
app.use( express.json() , express.urlencoded({extended : true}) , cors());
require('./config/mongoose.config');
require('./routes/exam.routes')(app);


app.listen(8000 , () => console.log('working'));