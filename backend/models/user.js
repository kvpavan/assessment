const pool = require("../mysql_connect");
const crypto = require("crypto");
const Cryptr = require('cryptr');
const { encrypt, decrypt } = new Cryptr(process.env.crypto_secret);

const nodemailer = require("nodemailer");

exports.User = {
    create: function (req, res) {
        req.body.name = req.body.name || req.body.email.split('@')[0];
        req.body.type = req.body.type || Math.floor(Math.random() * (5 - 3) ) + 3;
        req.body.age = req.body.age || Math.floor(Math.random() * (50 - 23) ) + 23;
        req.body.salary = req.body.salary || Math.floor(Math.random() * (50000 - 3000) ) + 3000;
        req.body.parent_id = req.body.parent_id || '';

        this.queryRun("insert into users (uuid, name, email, password, type, parent_id, age, salary, status, added_on) values (uuid(), '"+req.body.name+"', '"+req.body.email+"', '"+req.body.password+"', '"+req.body.type+"', '"+req.body.parent_id+"', '"+req.body.age+"', '"+req.body.salary+"', '3', now())")
        .then(data=>{
            res.json({status: "success", "message": "User created successfully!!!"})
        })
        .catch(function(error){
            //console.error(error);
            res.json(error)
        });
    },
    update: function (req, res) {
        var pw = '';
        var token = crypto.randomBytes(20).toString('hex');
        
        token = encrypt(token);

        if(req.body.password != 'gsrdgsgdgfgxdfg'){
            req.body.pw = encrypt(req.body.pw);
            pw = " , password='"+req.body.password+"' ";
        }
        this.queryRun("UPDATE users SET name = '"+req.body.name+"', email = '"+req.body.email+"', parent_id = '"+req.body.parent_id+"', type = '"+req.body.type+"', age = '"+req.body.age+"', salary = '"+req.body.salary+"' " + pw + ", token='"+token+"', status = 3 where uuid = '"+req.body.id+"'")
        .then(data=>{
            res.json({status: "success", "message": "User updated successfully!!!"})
        })
        .catch(function(error){
            //console.error(error);
            res.status(500).json(error)
        });
    },
    get: function (req, res) {
        this.queryRun("select id, uuid, name, email, phone, added_on, last_login, type, status, department, age, salary, parent_id, token, CASE type WHEN 3 THEN 'Manager' WHEN 4 THEN 'Designer' WHEN 5 THEN 'Developer' ELSE 'null' END AS 'type_name' from users where uuid='"+req.body.id+"'")
        .then(data=>{
            res.json(data[0])
        })
        .catch(function(error){
            res.json(error)
        });
    },
    login: function (req, res) {
        this.queryRun("select * from users where email='"+req.body.email+"' and status=3")
        .then(data=>{
            if(data.length === 0 ){                
                res.json({status: "error", "message": "Email not exists!!!"})
            }
            if(data.length > 1 ){                
                res.json({status: "error", "message": "Problem with email contact admin!!!"})
            }
            var UserData = data[0];
            //console.log(data);
            
            UserData.password = decrypt(UserData.password)
            //console.log(UserData.password, req.body.password)
            if(UserData.password == req.body.password){
                var token = crypto.randomBytes(20).toString('hex');        
                token = encrypt(token);
        
                this.queryRun("UPDATE users SET last_login = now(), token='"+token+"' where uuid = '"+UserData.uuid+"'")
                .then(data=>{
                    UserData.token = token;
                    res.json(UserData)
                })
                .catch(function(error){
                    //console.error(error);
                    res.json({status: "error", "message": "Unable to login!!!"})
                });
            }
            else{
                res.json({status: "error", "message": "Invalid login!!!"})
            }
            
        })
        .catch(function(error){
            res.json(error)
        });
    },
    list: async function (req, res) {  
        
        var age = req.query.age || false;
        var type = req.query.Type || false;
        var min = req.query.min || 0;
        var max = req.query.max || 100;
        var where = '';
        var limit = ' limit '+min+','+max;
        if(type.length > 0){
            where = type ? " and type <= '"+type+"'" : "";    
        }
        if(age.length > 0){
            where = age ? " and age like '%"+age+"%'" : "";    
        }
        this.queryRun("select * from  users where status = 3"+where+limit)
        .then(data=>res.json(data))
        .catch(function(error){
            //console.error(error);
            res.json(error)
        });
    },
    reset: async function (req, res) {
        var d_token = Buffer.from(req.body.token, 'base64').toString('ascii').split(':');
        //console.log(d_token);
        if(d_token.length != 3){
            res.json({error: "Invalid token"});
            return false;
        }
        if(d_token[0]+86400 < Math.floor(new Date().getTime() / 1000)){
            res.json({error: "token expired"});
            return false;            
        }
        this.findByEmail(d_token[1]).then(user => { 
            if(user.token !== d_token[2]){                
                res.json({error: "link expired. resend token"});
                return false;
            }
            
            var token = crypto.randomBytes(20).toString('hex');            
            token = encrypt(token);

            req.body.pw = encrypt(req.body.pw);
            var pw = " password='"+req.body.password+"' ";
            //console.log("UPDATE users SET " + pw + ", token='"+token+"', last_login=now(), status = 3 where uuid = '"+user[0].uuid+"'")
            this.queryRun("UPDATE users SET " + pw + ", token='"+token+"', last_login=now(), status = 3 where uuid = '"+user[0].uuid+"'")
            .then(data=>{
                res.json({status: "success", "message": "User password updated successfully!!!"})
            })
            .catch(function(error){
                //console.error(error);
                res.status(500).json(error)
            });
        })

    },
    forgot: async function (req, res) {
        this.findByEmail(req.body.email).then(user => { 
            
            var token = Buffer.from(Math.floor(new Date().getTime() / 1000)+':'+user[0].email+':'+user[0].token).toString('base64')
            var link = 'http://'+process.env.react_host+'/reset?token='+token;  
            let transporter = nodemailer.createTransport({
                host: "smtp.sendgrid.net",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: 'apikey', // generated ethereal user
                  pass: process.env.sendgrid_key, // generated ethereal password
                },
                tls: {
                    rejectUnauthorized: false
                }
              });
              let info = transporter.sendMail({
                from: 'pavan@pavan1.com', // sender address
                to: user[0].email, // list of receivers
                subject: "Reset Link", // Subject line
                html: "<b>Reset your password by <a href='"+link+"'>click here</a> or copy paste this link in browser "+link+" </b>", // html body
              });
            
              //console.log("Message sent: %s", info.messageId);
              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            
              // Preview only available when sending through an Ethereal account
              //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
              res.json({status: "success", "message": "Email sent with a link!! Check your email!!!"})

        })

    },
    delete: function (req, res) {
        this.queryRun("UPDATE users SET status = 0 where uuid='"+req.body.id+"'")
        .then(data=>{
            res.json({status: "success", "message": "User deleted successfully!!!"})
        })
        .catch(function(error){
            res.json(error)
        });
    },
    findByEmail: function (email, id=null) {           
        var where = (id) ? " and uuid != '"+id+"'" : "";
        return this.queryRun("select * from users where email='"+email+"'" + where)
        .then(data=>{
            if(data.length > 0){
                return data;
            }
            else{
                return false
            }
        })
        .catch(function(error){
            throw error;
        });
    },
    validateToken: function (token) {          
                
        return this.queryRun("select * from users where status=3 and token='"+token+"' and date(last_login) = current_date()")
        .then(data=>{
            if(data.length === 1){
                return data;
            }
            else{
                return false
            }
        })
        .catch(function(error){
            throw error;
        });
    },
    queryRun: function (sql) {
        return new Promise((resolve, reject) => {
            
            pool.getConnection(function(err, connection) {
                if (err){
                    console.log(err)
                    reject({status: "error", "message": "Connection pool failed!!!", "message":err});
                }
                connection.query(sql, function (err, result) {                
                    if (err){
                    // console.log(err)
                        
                        //console.log(pool._freeConnections.indexOf(connection)); // -1

                        connection.release();

                        //console.log(pool._freeConnections.indexOf(connection)); // 0
                        reject({status: "error", "message": "Connection failed!!!", "message":err});
                    } 
                    else{                    
                        //console.log(err, result)
                        //console.log(pool._freeConnections.indexOf(connection)); // -1

                        connection.release();

                        //console.log(pool._freeConnections.indexOf(connection)); // 0
                        var string=JSON.stringify(result);
                        var json =  JSON.parse(string);
                        //connection.end();
                        resolve(json);
                    }
                });
            });
        })
        
    }

}