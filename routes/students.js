const { deregister } = require('../models/student');

var express = require('express')
  , router = express.Router()
  , Student = require('../models/student')
  , Course = require('../models/course');

var default_username = "User Name";

var default_student = {
	  username: "Your LDAP ID",
	  password: "Password",
	  name: "Name",
	rollno: "Roll Number",
	  course_code:"Course code"
	};

var default_username = "User Name"; 

var default_courseid = "Course Code";


router.get('/home', function(req, res) {
	
	res.json("Hello default_user");
});

	
router.get('/new',  function(req, res) {
	
	res.json("Add new Student");

});


router.post('/create',  function(req, res) {
	// TO DO: Ensure that the student and course exists
	// TO DO: Add failure cases
	console.log("Create")
	var student = {
	username: req.body.username,
	password: req.body.password,
	name: req.body.name,
	rollno: req.body.rollno
	};
	var username = req.body.username;

	Student.getByUserName(username, function(err,doc) {
	if(err)
		res.send("Some error occured");
	else if(doc)
		res.redirect('/students/new');
		else{
		Student.create(student, function(err, doc) {
			if (err)
				res.send("Some error occured");
			else
				res.json(student);
		})	}
	})
});


router.get('/get_student',  function(req,res) {
	var username = req.query.username;
    Student.getByUserName(username, function(err,doc) {
		if(err)
			res.send("Some error occured");
		else
		{
			res.json(doc);
		}
	});
});

router.patch('/update-password',  function(req, res) {
	// TO DO: Ensure that the student and course exists
	// TO DO: Add failure cases
	var student = {
		password: req.body.password
	};
	var id = req.query.id;
	Student.getByUserId(id, function (e, re) {
		var prevpassword = re.password;
		re.password = student.password;
		Student.update(prevpassword, re, function (err, doc) {
			res.json(re);
		});
	});
	
});


router.post('/delete',  function(req, res) {
	// TO DO: Ensure that the student and course exists
	// TO DO: Add failure cases
	var username = req.body.username;
	

	Student.getByUserName(username, function (err, doc) {
		Student.remove(username, function (err, doc) {
			if (err)
				res.send("Some error occured");
			else {
				res.json("student deleted successfully!");
            }
		})
	})
});


router.post('/register',  function(req, res) {
	var username = req.body.username;
	var course_code = req.body.courseid;

	Student.getByUserName(username, function(err,doc) 
	{
		if(err)
			res.send("Some error occured");
		else if(doc)
		{
			Course.getBycourseid(course_code, function(err,doc)
			{
				if(err)
					res.send("Some error occured");
				else if(doc)
				{
					Student.getBycourseid(username, course_code, function(err, doc1) 
					{
						if(err)
							res.send("Some error occured");
						else
						{
							Student.register(username, course_code, function(err, doc2)
							{
								if (err)
									res.send("Some error occured");
								else if (doc2)
									
									res.json("student registered successfully!");
							})	
						}						
					})
				}
					
			})
		}
		
	})
});



router.post('/deregister',  function(req, res) {
	// TO DO: Ensure that the student and course exists
	// TO DO: Add failure cases
	var username = req.body.username;
	var course_code = req.body.courseid;

	Student.getByUserName(username, function(err,doc) 
	{
		if(err)
			res.send("Some error occured");
		else if(doc)
		{
			Course.getBycourseid(course_code, function(err,doc)
			{
				if(err)
					res.send("Some error occured");
				else if(doc)
				{
					Student.getBycourseid(username, course_code, function(err, doc) 
					{
						if(err)
							res.send("Some error occured");
						else if(doc)
						{
							Student.deregister(username, course_code, function(err, doc)
							{
								if(err)
									res.send("Some error occured");
								else if(doc)
									res.json("student deregistered successfully!");
							})
						}
					})
				}
				
			})
		}
	})
});

module.exports = router;