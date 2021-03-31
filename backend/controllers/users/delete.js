const Users = require("../../models/user");
exports.users_delete = (req, res)=>{
  Users.User.delete(req, res);
}