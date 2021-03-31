const Users = require("../../models/user");
exports.users_update = (req, res)=>{
  Users.User.update(req, res);
}