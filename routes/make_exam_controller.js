var express = require('express')
  , router = express.Router()
  , Exam = require('../models/exam')
  , Course = require('../models/student')
  , Faculty = require('../models/faculty')

router.get('/new', function(req, res) {
	var default_exam = {
	  exam_name: "Exam Name",
	  exam_code: "Exam Code",
	  duration_hours:1,
	  duration_minutes:0,
	  course_code: "Course Code",
	  faculty_username:"Faculty User Name"
	};
});


router.post('/create', function(req, res) {
	var exam = {
	  exam_name: req.body.exam_name,
	  exam_code: req.body.exam_code,
	  duration_hours: req.body.duration_hours,
	  duration_minutes: req.body.duration_minutes,
	  course_code: req.body.course_code,
	  faculty_username: req.body.username
	};

	Exam.create(exam, function (err, doc) {
		if (err)
			res.send("Some error occured");
		else { res.json(exam) };

	})
});

router.get('/question_list', function(req, res) {
    Exam.getByExamCode(req.body.exam_code, function(err,docs){
		if (err)
			res.send("some error occured");
		else
			res.json(docs);
    });
});



router.post('/create_question', function(req, res) {
   
    var question_full = {
	  question: req.body.question,
	  optionA: req.body.optionA,
	  optionB: req.body.optionB,
	  optionC: req.body.optionC,
	  optionD: req.body.optionD,
	  key: req.body.key
	};
    
    var exam_code = req.body.exam_code;
    
    Exam.addQuestion(exam_code, question_full, function(err,docs){
        if(err)
        res.send("some error occured");
        else
        {
        	Exam.getByExamCode(exam_code, function(err,docs){
        	if(err)
        	res.send("some error occured");
			else
				res.json(docs);
    		});	}
    });
});


router.get('/submit', function(req, res) {
   res.send("exam successfully created"); 
});

router.get('/list', function(req, res) {
    Exam.getByExamCode(req.query.exam_code, function(err,docs){
        if(err)
        res.send("some error occured");
        else
        res.json(docs);
    });
});



module.exports = router;

