var express = require('express');
var User = require('../db/userSchema')
var router = express.Router();

/* GET home page. */

router.post('/', function(req, res, next) {

    console.log(req.query.username)
    console.log(req.query.password)

    var user = new User({username:req.query.username, password: req.query.password})

    user.save(function(err, obj){
        if(err){
            console.error(err);
            res.status(400).send({success: false, msg: "Error"})
        } else if(obj){
            res.status(200).send({success: true, msg: " New user is added to our database"})
        }
        else{
            res.status(200).send({success: false, msg: + "New user can't save"})
        }
    })
});

router.post('/score', function(req, res, next) {

    User.findOne({username: req.query.username},function(err, obj) {
            if (err) {
                console.error(err);
                res.status(400).send({success: false, msg: "Error"})
            } else if (obj) {


                if (req.query.subject === "physic"){

                    let grade = parseInt(obj["score"]["physic"].grade) + parseInt(req.query.grade)
                    let question = parseInt(obj["score"]["physic"].question) + parseInt(req.query.question)
                    obj["score"]["physic"] = {
                        "grade": Number(grade),
                        "question": Number(question)
                    }

                }
                else if(req.query.subject === "computerscience"){
                    let grade = 0
                    let question = 0

                    grade = parseInt(obj["score"]["computerscience"]["grade"]) + parseInt(req.query.grade)
                    question = parseInt(obj["score"]["computerscience"]["question"]) + parseInt(req.query.question)

                    obj["score"]["computerscience"] = {
                        "grade": Number(grade),
                        "question": Number(question)
                    }
                }
                obj.save(function(err){
                    if(err) console.log(err)
                });
                res.status(200).send({success: true, msg: " Update score is added to our database"})
            } else {
                res.status(200).send({success: false, msg: +"Can't update score"})
            }
        })
});

router.get('/score', function(req, res, next) {


    User.findOne({username: req.query.username},function(err, obj){
        if(err){
            console.error(err);
            res.status(400).send({success: false, msg: "Error"})
        } else if(obj){
            res.status(200).send({score:obj.score})
        }
        else{
            res.status(200).send({success: false, msg: + "New user can't save"})
        }
    })
});

router.get('/', function(req, res, next) {

    User.findOne({username:req.query.username,password:req.query.password},function(err,docs){
        if(err){
            res.status(500).send({success: false, msg: "Server error"})
        }
        else{

            if(docs){
                res.status(200).send({success:true})
            }
            else{
                res.status(401).send({success:false})
            }

        }
    })

});




module.exports = router;
