const course = require('../models/course');
const faculty = require('../models/faculty');

var express = require('express')
    , router = express.Router()
    , Faculty = require('../models/faculty')
    , Course = require('../models/course');

var default_faculty = {
    username: "Your LDAP ID",
    password: "Password",
    name: "Name"
};

var default_username = "User Name";

var default_courseid = "Course Code";


router.post('/create', function (req, res) {
    var faculty = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name
    };
    var username = req.body.username;

    Faculty.getByUserName(username, function (err, doc) {
        if (err)
            res.send("Some error occured");
        else if (doc)
            res.redirect('/faculties/new');
        else {
            Faculty.create(faculty, function (err, doc) {
                if (err)
                    res.send("Some error occured");
                else
                    res.json(faculty);
            })
        }
    })
});

router.get('/faculty', function (req, res) {
    //Failure renders edit if update is incorrect
    var username = req.query.username;
    Faculty.getByUserName(username, function (err, doc) {
        if (err)
            res.send("Some error occured");
        else {
            res.json(doc);
        }
    });
});

router.patch('/update', function (req, res) {
    var faculty = {
        password: req.body.password,
    };
    var id = req.query.id;
    Faculty.getByUserId(id, function (e, re) {
        if (e) {

        }
        else {
            var prevpassword = re.password;
            re.password = faculty.password;
            Faculty.update(prevpassword, re, function (r, r2) {
                if (r) {

                } else {
                    res.json("updated successfully!!")

                }
            })
        }
    })
    //Faculty.update(id, faculty, function (err, doc) {
    //    if (err)
    //        res.json("some error occured!!");
    //    else
    //        res.json("Updated successfully!");
    //});
});


router.post('/delete', function (req, res) {
    var username = req.body.username;

    Faculty.getByUserName(username, function (err, doc) {
        if (err)
            res.send("Some error occured");
        else if (doc) {
            Faculty.remove(username, function (err, doc2) {
                if (err)
                    res.send("Some error occured");
                else
                    res.send("User deleted successfully");
            })
        }
   
    })
});



router.post('/assign', function (req, res) {
    var username = req.body.username;
    var course_code = req.body.courseid;

    Faculty.getByUserName(username, function (err, doc) {
        if (err)
            res.send("Some error occured");
        else if (doc) {
            Course.getBycourseid(course_code, function (err, doc) {


                if (err)
                    res.send("Some error occured");
                else {
                    Faculty.assign(username, course_code, function (err, doc) {
                        if (err)
                            res.send("Some error occured");
                        else
                            res.json("course successfully assigned!");

                    })
                }



            })
        }
 
    })
});


router.post('/unassign', function (req, res) {
    var username = req.body.username;
    var course_code = req.body.courseid;

    Faculty.getByUserName(username, function (err, doc) {
        if (err)
            res.send("Some error occured");
        else if (doc) {
            Course.getBycourseid(course_code, function (err, doc2) {
                if (err)
                    res.send("Some error occured");
                else if (doc2) {
                    Faculty.getBycourseid(username, course_code, function (err, doc3) {
                        if (err)
                            res.send("Some error occured");
                        else if (doc3) {
                            Faculty.unassign(username, course_code, function (err, doc4) {
                                if (err)
                                    res.send("Some error occured");
                                else
                                    res.send("unassigned the teacher");
                            })
                        }

                    })
                }
            })
        }
    })
});

module.exports = router;

