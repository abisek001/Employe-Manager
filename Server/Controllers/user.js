const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../Models/user');

//Function for SignIn
exports.user_Signup = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                res.status(409).json({
                    message: "Email ID already exists. Please enter the other email ID"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "Account created, please login",
                                    user_detail: result
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        }
        )
}

//function for Login
exports.user_Login = (req, res, next) => {
    User.findOne({ email: req.body.email }).exec()
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Mail not found, Authentication failed"
                });
            }
            bcrypt.compare(req.body.password, user.password, (error, result) => {
                if (error) {
                    return res.status(401).json({
                        message: "Password is incorrect, Please enter the correct password"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        _id: user._id
                    }, process.env.jwt_Key, { expiresIn: "1h" });
                    return res.status(200).json({
                        message: "Login Successfully",
                        userDeatil: user,
                        Token: token
                    });
                } else {
                    return res.status(401).json({
                        message: "Password is incorrect, Please enter the correct password"
                    });
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}


//function for delete
exports.user_delete = (req, res, next) => {
    User.deleteOne({ _id: req.params.userId }).exec()
        .then(result => {
            if (result.deletedCount > 0) {
                res.status(200).json({
                    message: "User deleted"
                });
            } else {
                res.status(404).json({
                    message: "User not found"
                });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}