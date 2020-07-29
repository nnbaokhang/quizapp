var express = require('express');
var Physic = require('../db/physicSchema')
var router = express.Router();

/* GET home page. */

router.post('/', function(req, res, next) {
    var physic = new Physic({mul:req.body.mul,question: req.body.question,
        as: req.body.as, sa: req.body.sa}
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

    Physic.find(function(err,docs){
        if(err){
            res.status(500).send({success: false, msg: "Server error"})
        }
        else{
            console.log(docs)
            let docArray = Object.entries(docs)
            let index = Math.random()% docArray.length;
            if(index + 10 <= docArray.length && index - 10 >= 0){
                res.status(200).send({"subject": docArray.slice(index,10 + 1)})
            }
            //I can pick 10 and return here but for now let return all of it and display
            else {
                res.status(200).send({"subject": docArray.slice(0,10 + 1)})
            }
        }
    })

});




module.exports = router;
