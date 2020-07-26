var express = require('express');
var Subject = require('../db/subjectSchema')
var router = express.Router();

/* GET home page. */

router.post('/', function(req, res, next) {

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
  console.log(req.body.name,req.body.image,req.body.rating)
  var newSubject = new Subject({name: req.body.name,image: req.body.image, rating: req.body.rating})
  newSubject.save(function(err, obj){
    if(err){
      console.error(err);
      res.status(400).send({success: false, msg: "Error"})
    } else if(obj){
      res.status(200).send({success: true, msg: req.body.name + " is added to our database"})
    }
    else{
      res.status(200).send({success: false, msg: req.body.name + "can't save"})
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
  Subject.find(function(err,docs){
    if(err){
      res.status(500).send({success: false, msg: "Server error"})
    }
    else{
      console.log(docs)

      res.status(200).send({subject:docs})
    }
  })

});

router.get('/subject?q={Physic}', function(req, res, next) {
  //Response with one subject and many topics
  //Example:
  //   [{
  //    50 most ask physic question,
  //    image
  //    },
  //    {
  //    }
  //    50 least ask physic question,
  //    image
  //    ]
  res.status(200).send("Main index")
});

router.get('/subject/package?q={50 most ask physical question}', function(req, res, next) {
  //Response with a list of question, multiple choice and answer
  //Example:
  // [{"question":"Which continent America are in","answer":"Artact","A":"Artact","B":"Asia","C":"Europe"},
  //
  // ]
  res.status(200).send("Main index")
});



module.exports = router;
