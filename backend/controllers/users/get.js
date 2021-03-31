const Users = require("../../models/user");
exports.users_get = (req, res)=>{
  Users.User.get(req, res);
}