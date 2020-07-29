var express = require('express');
var Computer = require('../db/computerscienceSchema')
var router = express.Router();

/* GET home page. */

router.post('/', function(req, res, next) {
    var computer = new Computer({mul:req.body.mul,question: req.body.question,
        as: req.body.as, sa: req.body.sa}
    )
    computer.save(function(err, obj){
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
    Computer.find(function(err,docs){
        if(err){
            res.status(500).send({success: false, msg: "Server error"})
        }
        else{
            console.log(docs)
            //I can pick 10 and return here but for now let return all of it and display
            res.status(200).send({"subject":docs})
        }
    })

});




module.exports = router;
