//require the express module
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./routes/router");
var cors = require('cors');

app.use(cors());
//require the http module
const http = require("http").Server(app);


const port = 3002;

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//middleware token validation 
app.use('/api/notifications/list', function (req, res, next) {
  
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");

  var token = req.get('Token');
  if(token){
    const Users = require("./models/user");
    Users.User.validateToken(token).then(user => {
      if (user) {
        next();
      }
      else{
        res.json({"status":"error", "message":"Token mismatch failed!!!"})
      }
    });  
  }
  else{    
    next();
  }
  
});


//routes
app.use("/api", router);


process.on('unhandledRejection', (reason, p) => {
  console.log('Track Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

http.listen(port, () => {
  console.log("Running on Port: " + port);
});
