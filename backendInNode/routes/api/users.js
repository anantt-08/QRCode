const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../config/keys").secret;
const User = require("../../model/User");
var nodemailer = require("nodemailer");
const Joi = require('joi');
var authenticate = require("./authenticate");

router.post("/register", (req, res) => {

    const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),  
    house:Joi.string(),
    
    mobile:Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
    
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(3)
        .required()
        .max(20),

    password_confirmation: Joi.ref('password')                      ,
    occupation:Joi.string()
    .required()
    .regex(/^[a-zA-Z,. ]*$/),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    birth:Joi.string()

})

    let { name,house,mobile,occupation,birth, email, password, password_confirmation } = req.body;

    let result=schema.validate({ name: name,house:house,mobile:mobile,occupation:occupation,birth:birth,password:password,password_confirmation:password_confirmation,email:email});

    if(result.error){
        //console.log(result.error)
       return res.status(400).json({
                msg:result.error.details[0].message,
            });
    }
    User.findOne({
        email: email,
    }).then((user) => {
        if (user) {
            return res.status(400).json({
                msg:
                    "Email is already registred. Did you forgot your password.",
            });
        }
    });
    // The data is valid and new we can register the user
    let newUser = new User({
        name,house,mobile,occupation,birth,
        // username,
        password,
        email,
    });

    // Hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then((user) => {
                return res.status(200).json({
                    success: true,
                    msg: "Email Send to verification to ADMIN",
                });
            });
        });

    });
});

/**
 * @route POST api/users/login
 * @desc Signing in the User
 * @access Public
 */
router.post("/login", (req, res) => {
    User.findOne({
        email: req.body.email,
    }).then((user) => {
        if (!user) {
            return res.status(404).json({
                user: user,
                msg: "Username is not found.",
                success: false,
            });
        }
        if(!user.canLogin){
            return res.status(401).json({
                user: user,
                msg: "Not verified by admin",
                success: false
            })
        }
        // If there is user we are now going to compare the password
        bcrypt.compare(req.body.password, user.password).then((isMatch) => {
            if (isMatch) {
                // User's password is correct and we need to send the JSON Token for that user
                const payload = {
                    _id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                };
                jwt.sign(
                    payload,
                    key,
                    {
                        expiresIn: 604800,
                    },
                    (err, token) => {
                        res.status(200).json({
                            success: true,
                            token: `Bearer ${token}`,
                            user: user,
                            msg: "Hurry! You are now logged in.",
                        });
                    }
                );
            } else {
                return res.status(404).json({
                    msg: "Incorrect password.",
                    success: false,
                });
            }
        });
    });
});

/**
 * @route POST api/users/profile
 * @desc Return the User's Data
 * @access Private
 */
router.get("/profile", authenticate.verifyUser, (req, res) => {
    return res.json({
        user: req.user,
    });
});

router.get(
    "/find/:result",
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    function (req, res) {
        User.findById(req.params.result, function (err, User) {
            if (err) return  res.status(404).json({
                success: false,
                msg: "User Not Found",
            });     
            if(User == null) {
               return res.status(404).json({
                success: false,
                msg: "User Not Found",
            });     
            }
            else{
                return res.status(200).json({
                success: true,
                msg: "Listed",
                userlist: User,
            });
            }
        });
    }
);


router.post("/reset", function (req, res) {
    User.findOne({ email: req.body.email }, function (error, userData) {
        if (userData == null) {
            return res.status(404).json({
                success: false,
                msg: "Email is not register",
            });
        }

        var transporter = nodemailer.createTransport({
            service: "gmail",
            secure: false, // true for 465, false for other ports
            auth: {
                user: "rambaghcolonyy@gmail.com", // generated ethereal user
                pass: "Rambagh@123", // generated ethereal password
            },
             tls:{
        rejectUnauthorized:false
    }
        });
        // var transporter = nodemailer.createTransport({
        //    service: 'gmail',
        //smtp.gmail.com  //in place of service use host...
        // auth: {
        //       user: "",
        //      pass: ""
        //  }

        //        });

        var currentDateTime = new Date();
        var mailOptions = {
            from: "rambaghcolonyy@gmail.com",
            to: req.body.email,
            subject: "Password Reset",
            // text: 'That was easy!',
            html:
                "<h1>Welcome To Security Password RESET ! </h1><p>\
            <h3>Hello " +
                userData.name +
                "</h3>\
            If You are requested to reset your password then click on below link<br/>\
            <a href='http://localhost:3000/change-password/" +
                currentDateTime +
                "+++" +
                userData.email +
                "'>Click On This Link</a>\
            </p>",
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
                User.updateOne(
                    { email: userData.email },
                    {
                        token: currentDateTime,
                    },
                    { multi: true },
                    function (err, affected, resp) {
                        return res.status(200).json({
                            success: false,
                            msg: info.response,
                            userlist: resp,
                        });
                    }
                );
            }
        });
    });
});
router.put(
    "/allowLogin/:id",
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    function (req, res) {
        User.findByIdAndUpdate(
            req.params.id,
            {
                canLogin: true,
            },
            { new: true },
            function (err, result) {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        msg: "Something went wrong",
                    });
                }
            var transporter = nodemailer.createTransport({
            service: "gmail",
            secure: false, // true for 465, false for other ports
            auth: {
                user: "rambaghcolonyy@gmail.com", // generated ethereal user
                pass: "Rambagh@123", // generated ethereal password
            },
             tls:{
        rejectUnauthorized:false
    }
        });
        var mailOptions = {
            from: "rambaghcolonyy@gmail.com",
            to: result.email,
            subject: "UserID Confirmed ",
            // text: 'That was easy!',
            html:
                "<h1>You are now verified residence of this colony</h1><p>\
            <h3>Hello " +
                result.name +
                "</h3>\
                YOU can Now Log In<br/>\
            </p>",
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
           });
         return res.status(200).json({
                        success: true,
                        msg: "QR CODE Generated!",
                        user: result,
                    }); 
    }    
            
        );
    }
);

router.delete(
    "/allowLogin/:id",
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    function (req, res,next) {
         User.findByIdAndRemove(req.params.id)
          .then((result) => {
       return res.status(200).json({
                        success: true,
                        msg: "User Deleted Successfully",
                        user: result,
                    });
    }, (err) => next(err))
    .catch((err) => {
         return res.status(400).json({
                        success: false,
                        msg: "Something went wrong",
                    });

    });
    }
);

router.get(
    "/userlistt",
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    function (req, res) {
        User.find({ admin: false,canLogin:true }, function (err, User) {
            if (err) return console.error(err);
            return res.status(200).json({
                success: true,
                msg: "Listed",
                userlist: User,
            });
        });
    }
);

router.get(
    "/userlist",
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    function (req, res) {
        User.find({ admin: false }, function (err, User) {
            if (err) return console.error(err);
            return res.status(200).json({
                success: true,
                msg: "Listed",
                userlist: User,
            });
        });
    }
);
router.put("/update", function (req, res) {
    User.findById(req.body._id, function (err, userData) {
        bcrypt
            .compare(req.body.currentPassword, userData.password)
            .then((isMatch) => {
                if (isMatch) {
                    if (req.body.password) {
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(
                                req.body.password,
                                salt,
                                (err, hash) => {
                                    if (err) throw err;
                                    hasedPassword = hash;
                                    let condition = { _id: req.body._id };
                                    let dataForUpdate = {
                                        name: req.body.name,
                                        email: req.body.email,
                                        mobile:req.body.mobile,
                                        occupation:req.body.occupation,
                                        password: hasedPassword,
                                        updatedDate: new Date(),
                                    };
                                    User.findOneAndUpdate(
                                        condition,
                                        dataForUpdate,
                                        { new: true },
                                        function (err, updatedUser) {
                                            if (err) {
                                                if (
                                                    err.name === "MongoError" &&
                                                    err.code === 11000
                                                ) {
                                                    res.status(409).send(
                                                        new MyError(
                                                            "Mongo Db Error ",
                                                            [err.message]
                                                        )
                                                    );
                                                }

                                                res.status(500).send(
                                                    new MyError(
                                                        "Unknown Server Error",
                                                        [
                                                            "Unknow server error when updating User",
                                                        ]
                                                    )
                                                );
                                            }
                                            if (!updatedUser) {
                                                return res.status(404).json({
                                                    msg: "User Not Found.",
                                                    success: false,
                                                });
                                            }
                                            return res.status(200).json({
                                                success: true,
                                                msg:
                                                    "User Successfully Updated",
                                                updatedData: updatedUser,
                                            });
                                        }
                                    );
                                }
                            );
                        });
                    } else {
                        let condition = { _id: req.body._id };
                        let dataForUpdate = {
                            name: req.body.name,
                            email: req.body.email,
                               mobile:req.body.mobile,
                                        occupation:req.body.occupation,
                            updatedDate: new Date(),
                        };
                        User.findOneAndUpdate(
                            condition,
                            dataForUpdate,
                            { new: true },
                            function (err, updatedUser) {
                                if (err) {
                                    if (
                                        err.name === "MongoError" &&
                                        err.code === 11000
                                    ) {
                                        return res
                                            .status(409)
                                            .send(
                                                new MyError("Mongo Db Error ", [
                                                    err.message,
                                                ])
                                            );
                                    }

                                    return res
                                        .status(500)
                                        .send(
                                            new MyError(
                                                "Unknown Server Error",
                                                [
                                                    "Unknow server error when updating User",
                                                ]
                                            )
                                        );
                                }
                                if (!updatedUser) {
                                    return res.status(404).json({
                                        msg: "User Not Found.",
                                        success: false,
                                    });
                                }
                                return res.status(200).json({
                                    success: true,
                                    msg: "User Successfully Updated",
                                    updatedData: updatedUser,
                                });
                            }
                        );
                    }
                } else {
                    return res.status(401).json({
                        msg: "Incorrect password.",
                        success: false,
                    });
                }
            });
    });
});
router.post("/updatePassword", function (req, res) {
    User.findOne({ email: req.body.email }, function (errorFind, userData) {
        if (
            userData.token == req.body.linkDate &&
            req.body.password == req.body.confirm_password
        ) {
            bcrypt.genSalt(10, (errB, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) throw err;
                    let newPassword = hash;
                    let condition = { _id: userData._id };
                    let dataForUpdate = {
                        password: newPassword,
                        updatedDate: new Date(),
                    };
                    User.findOneAndUpdate(
                        condition,
                        dataForUpdate,
                        { new: true },
                        function (error, updatedUser) {
                            if (error) {
                                if (
                                    err.name === "MongoError" &&
                                    error.code === 11000
                                ) {
                                    return res
                                        .status(500)
                                        .json({
                                            msg: "Mongo Db Error",
                                            error: error.message,
                                        });
                                } else {
                                    return res
                                        .status(500)
                                        .json({
                                            msg: "Unknown Server Error",
                                            error:
                                                "Unknow server error when updating User",
                                        });
                                }
                            } else {
                                if (!updatedUser) {
                                    return res.status(404).json({
                                        msg: "User Not Found.",
                                        success: false,
                                    });
                                } else {
                                    return res.status(200).json({
                                        success: true,
                                        msg:
                                            "Your password are Successfully Updated",
                                        updatedData: updatedUser,
                                    });
                                }
                            }
                        }
                    );
                });
            });
        }
        if (errorFind) {
            return res.status(401).json({
                msg: "Something Went Wrong",
                success: false,
            });
        }
    });
});
module.exports = router;
