const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../config/keys").secret;
const Relative = require("../../model/Relative");
const Joi = require('joi');
var authenticate = require("./authenticate");


router.post("/register", (req, res,next) => {

    const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    birth:Joi.string(),    
    mobile:Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
    time:Joi.string()
     .required(),
    main:Joi.string()
     .required(),
})

    let { name,birth,mobile,time,main } = req.body;

    let result=schema.validate({ name: name,birth:birth,mobile:mobile,time:time,main:main});

    if(result.error){
        //console.log(result.error)
       return res.status(400).json({
       	         success:false,
                msg:result.error.details[0].message,
            });
    }
    Relative.findOne({
        mobile: mobile,
    }).then((user) => {
        if (user) {
            return res.status(400).json({
            	success: false,
                msg:
                    "Already Registered QR code!",
                user:user    
            });
        }
        else{
           let newUser = new Relative({
        name,birth,mobile,time,main
    });

    newUser.save()
    .then((user) => {
                return res.status(200).json({
                    success: true,
                    msg: "QR Code  Generated Successfully!",
                    user:user
                });
            })
             .catch((err) => next(err));
        }
    },(err)=> next(err))
       .catch((err) => next(err));
});

router.get(
    "/find/:result",
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    function (req, res) {
        Relative.findById(req.params.result, function (err, User) {
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

router.delete(
    "/find/:id",
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    function (req, res,next) {
         Relative.findByIdAndRemove(req.params.id)
          .then((result) => {
       return res.status(200).json({
                        success: true,
                        msg: "Relative QR Deleted Successfully",
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

module.exports = router;
