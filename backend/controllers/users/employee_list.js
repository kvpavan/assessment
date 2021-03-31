const Users = require("../../models/user");
exports.users_employee_list = (req, res)=>{
    Users.User.employee_list(req, res);
}