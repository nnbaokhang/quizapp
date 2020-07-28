var express = require('express');
var Physic = require('../db/physicSchema')
var router = express.Router();

/* GET home page. */

router.post('/', function(req, res, next) {
    var physic = new Physic({mul:req.body.mul,question: req.body.question, a1: req.body.a1,a2: req.body.a2,
        a3: req.body.a3, a4: req.body.a4 , sa: req.body.sa}
        )
    physic.save(function(err, obj){
        if(err){
            console.error(err);
            res.status(400).send({success: false, msg: "Error"})
        } else if(obj){
            res.status(200).send({success: true, msg: " New question is added to our database"})
        }
        else{
            res.status(200).send({success: false, msg: + "New question can't save"})
        }
    })
});
router.get('/', function(req, res, next) {
    //Somehow response back the list of subject item
    //[{
    // Physic
    // Image
    // rating
    // },
    // {
    // Computer Science,
    // Image,
    // rating,
    // }]
    Physic.find(function(err,docs){
        if(err){
            res.status(500).send({success: false, msg: "Server error"})
        }
        else{
            console.log(docs)
            //I can pick 10 and return here but for now let return all of it and display
            res.status(200).send({subject:docs})
        }
    })

});




module.exports = router;
