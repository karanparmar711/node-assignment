const express = require('express');
const app = express();
const port = process.env.port || 3003;
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');

mongoose.connect("mongodb://localhost:27017/myDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
    console.log(`connection successful`);
}).catch((e)=>{
    console.log(`connection failed`);
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use("/api/user", registerRoute);
app.use("/api/user",loginRoute); 



app.get('/',(req,res)=>{
    
     res.sendFile('index.html')
})




app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})