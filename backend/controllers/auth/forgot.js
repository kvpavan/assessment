const Users = require("../../models/user");
exports.users_forgot = (req, res)=>{
  Users.User.forgot(req, res);
}