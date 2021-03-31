const Users = require("../../models/user");
exports.users_list = (req, res)=>{
    Users.User.list(req, res);
}