var express = require('express')
  , router = express.Router()
  , Course = require('../models/course');

var default_courseid = "CourseID";

var default_course = {
	  courseid: "CourseID",
	  coursename: "coursename"
	};
	

router.post('/create',function(req, res) {
	var course = {
	  courseid: req.body.courseid,
	  coursename: req.body.coursename
	};

		Course.create(course, function(err, doc) {
			if(err)
				res.send("Some error occured");
			else
				res.json(course)
		})
});



router.get('/course', function(req,res) {
	var courseid = req.query.courseid;
    Course.getBycourseid(courseid, function(err,doc) {
		if(err)
			res.send("Some error occured");
		else
		{
			res.json(doc);
		}
	});
});

router.post('/update', function(req, res) {
	var course = {
	  courseid: req.body.courseid,
	  coursename: req.body.coursename
	};
	var prevcourseid = req.body.prevcourseid;
	Course.update(prevcourseid, course, function(err, doc) {
		if (err)
			res.json("some error occured");
			else
				res.json("Course updated Successfully");
		});
});



router.post('/delete', function(req, res) {
	var courseid = req.body.courseid;
	Course.getBycourseid(courseid, function(err,doc) {
	if(err)
		res.send("Some error occured");
	else if(doc)
	{
	Course.remove(courseid, function(err, doc2) {
		if (err)
			res.send("Some error occured");
		else
			res.json("course deleted!!");
	})}
	})
});

module.exports = router;
