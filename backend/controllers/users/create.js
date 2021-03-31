const Users = require("../../models/user");
var updateCheck = null;
exports.users_create = (req, res)=>{
  if(req.body.updateCheck){
    console.log('updatea'. req)
    Users.User.update(req, res);
  }
  else{
    console.log('create'. req)

    Users.User.create(req, res);
  }
  
}