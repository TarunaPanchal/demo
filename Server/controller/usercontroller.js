var mongoose = require('mongoose');
const User = require('../Models/user');
const bcrypt = require('bcrypt');
class Usercontroller {

    login(req, res) {

        var em = { username: req.body.username };
        var pass = req.body.password;
        User.findOne(em).then((data) => {

            bcrypt.compare(pass, data.password).then((result) => {
                if (result) {
                    // const token = jwt.sign(em, 'abcdef', { expiresIn: '1h' });
                    res.send({ status: 200 ,id:data._id });
                }
                else {
                    res.send({ status: 400, message: "password is wrong" });
                }

            }).catch((err) => {
                res.send({ status: 400, message: "password is wrong" });
            });
        }).catch((err) => {
            res.send({ status: 400, message: "please email is not valid" });
        });

    }
    getData(req, res) {

        User.findOne({ _id: mongoose.Types.ObjectId(req.params.userId) }).then((data) => {
            res.send({ status: 200, data: data });
        }).catch((err) => {
            res.send({ status: 400, message: err.message });
        });
    }
findByIdAndUpdate(req, res) {

    var { firstName, lastName, username, password } = req.body;

    var userData = {
      
        firstName: firstName,
        lastName: lastName,
        username: username,
       
    };

    if (req.file.length > 0) {
        if (req.file.length == 1) {
            userData['image'] = req.file.path;
            
        }
        else {
            if (req.file.fieldname == "image") {
                userData['image'] = req.file.path;
            }
            
        }
    }
    else {
        // console.log("-el--->", req.files);
    }
    if (password) {
        userData['password'] = bcrypt.hashSync(password, 11);
    }
    else {
        console.log("Else----->", password);
    }
    User.findByIdAndUpdate({   _id: mongoose.Types.ObjectId(req.params.userId) }, { $set: userData }).then((data) => {
        res.send({ status: 200, data: data });
    }).catch((err) => {
        res.send({ status: 400, message: err.message });
    })
}
}

var user1 = new Usercontroller();

module.exports = user1;