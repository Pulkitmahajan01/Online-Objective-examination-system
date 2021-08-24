var express = require('express')
  , router = express.Router()

router.get('/', function(req, res) {
  //  if (err) {
  //      res.send({
  //          message: err.message
  //      })
  //}
  res.json('welcome');
})

module.exports = router