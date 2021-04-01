const Users = require("../../models/user");
exports.users_reset = (req, res)=>{
  Users.User.reset(req, res);
}