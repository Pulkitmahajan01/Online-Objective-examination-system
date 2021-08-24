var express = require('express')
    , router = express.Router()
    , Exam = require('../models/exam')
    , Student = require('../models/student')



router.post('/exam', function (req, res) {
    var exam_code = req.body.exam_code;
    var username = req.body.username;
    console.log(exam_code);
    console.log(username);
    Exam.getByExamCode(exam_code, function (err, doc1) {
        if (err)
            res.send("Some error occured");
        else if (doc1) {
            Student.getBycourseid(username, doc1.course_code, function (err, doc) {
                if (err)
                    res.send("Some error occured");
                else if (doc) {
                    Exam.checkResponse(username, exam_code, function (err, doc1) {
                        if (err)
                            res.send("Some error occured");
                        else {
                            
                            res.json(doc1);
                        }
                    })
                }

            })
        }
      
    })
});

router.get('/list', function (req, res) {

    Exam.getByExamCode(req.query.exam_code, function (err, docs) {
        if (err)
            res.send("some error occured");
        else
            res.json(docs);
    });
});


router.post('/submit', function (req, res) {

    var username = req.body.username;
    var exam_code = req.body.exam_code;

    var object = req.body
    var response = [];

    for (var key in object) {
        response.push(object[key]);
    }
    response.pop();
    response.pop();

    Exam.addResponses(username, exam_code, response, function (err, docs) {
        if (err)
            res.send("some error occured");
        else
            res.json(docs);
    });

});



router.post('/performance_view', function (req, res) {

    var username = req.body.username;
    var exam_code = req.body.exam_code;

    Exam.checkResponse(username, exam_code, function (err, doc) {
        if (err)
            res.send("Some error occured");
        else if (doc) {


            Exam.getByExamCode(exam_code, function (err, docs) {
                if (err)
                    res.send("some error occured");
                else {
                    var exam_obj = docs.question_list;

                    Exam.getResponseByExamCode(exam_code, username, function (err, docs1) {
                        if (err)
                            res.send("some error occured");
                        else {
                            var response_obj = docs1.response;
                            var total_questions = 0;
                            var attempted = 0;
                            var correct = 0;

                            for (var temp in exam_obj) {

                                if (response_obj[total_questions] != ' ')
                                    attempted++;
                                if (exam_obj[total_questions].key == response_obj[total_questions])
                                    correct++;
                                total_questions++;
                            }

                            var result = {
                                total_questions: total_questions,
                                attempted: attempted,
                                correct: correct
                            };

                            res.json(result);
                        }
                    });
                }
            })
        }
    })
});

module.exports = router;