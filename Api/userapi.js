const router = require('express').Router();
const bcrypt = require('bcryptjs')
const keys = require('../keys')
const path=require('path');
var multer = require('multer');
const User = require('../models/User')
const { registerValidation, loginValidation } = require('../authorization/validation');
const jwt = require('jsonwebtoken');


const pathLocation='/home/swapnil/Desktop/'

const fileName=pathLocation+'build.xml';

const uploadPath=path.join(pathLocation+'/uploads')

var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, uploadPath);
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+'.'+file.originalname);
    }
});

//var upload = multer({storage:store}).single('file');
var upload = multer({storage:store}).array("files", 10);


router.post('/upload', async(req, res) => {
        await upload(req,res,function(err){
        if(err){
            console.log(err);
            return res.status(501).json({error:err});
        }
        //do all database record saving activity
        console.log(req.files.length);
        console.log(req.body);
        return res.status(200).send({status:'success',message:"email trigger successfull",file :req.files.length}); 
        // return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
});


});


router.post('/download', function(req,res,next){
    filepath = path.join(fileName);
    console.log(filepath);
    res.sendFile(filepath);
});


router.post('/register', async (req, res) => {

    console.log("input request ", req.body);
    console.log("input request ", req.body.email);


    //validate user details
    const { error } = registerValidation(req.body);
    if (error) {
        console.log(error)
        return res.status(400).send({ "registerError": "Register error message  ," + error.details[0].message });
    }
    //check duplicate email
    const checkEmail = await User.findOne({ email: req.body.email });

    if (checkEmail) {
        return res.status(400).send({ "registerError": 'Email already exist ' + req.body.email });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);


    //create user 
    const newUser = new User({
        userName: req.body.fullName,
        email: req.body.email,
        password: hashPassword,
        phone: req.body.phone
    });
    try {
        const savedUser = await newUser.save();
        //res.send({user : savedUser._id});
        res.status(200).json({
            'User': 'User added successfully ',
            'userId': savedUser._id
        });

    } catch (err) {
        res.status(400).send("unable to register user in the database", err);
    }

});

router.post('/login', async (req, res) => {
    //console.log(req.body);

    const { error } = loginValidation(req.body)
    if (error) {
        console.log(error)
        return res.status(400).send({ "loginError": error.details[0].message });
    }


    //check duplicate email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        //        return res.status(400).send('Email doestnt exist');
        return res.status(400).send({ "loginError": "Email doestnt exist " });


    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
        //        return res.status(400).send('Password doesnt exist');
        return res.status(400).send({ "loginError": "Invalid Password" });

    }

    const signatureToken = jwt.sign({ _id: user._id }, keys.Secret_Token);

    res.header({
        'auth-token': signatureToken,
        expiresIn: 3600
    }).send({ email:user.email,name:user.fullName,status: "success", message: "login successful", authToken: signatureToken, expiresIn: 3600 });
});

module.exports = router;
