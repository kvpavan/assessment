const Users = require("../../models/user");
const { check } = require('express-validator');
exports.users_login = (req, res)=>{
  Users.User.login(req, res);
}