var express = require('express');
var router = express.Router();
var validator = require('validator');

var Urls = require('../models/urls.js');

router.get('/:url', function(req, res, next) {
    Urls.findOne({short : req.params.url},"long", function(err, url) {
       if(err) next();
       if( url != null) {
            res.redirect(url.long);
       } else {
           next();
       }
    });
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Get helloworld

router.get('/helloworld', function(req, res, next) {
    res.render('helloworld', {title: 'Hello, World!'});
});


//Get urls
router.get('/url',function(req, res, next) {
    Urls.find(function (err, urls) {
      if (err) return console.error(err);
       res.send(urls);
    });
});

router.get('/shorten/:url', function(req, res, next) {
    var myUrl = req.params.url;
    if (validator.isURL(myUrl)) {
            var re = new RegExp("^(http|https)://", "i");
            if(!re.test(myUrl)) {
                myUrl = "http://" + myUrl;
            }
        var url = new Urls ({long : myUrl});
        url.save(function(err, url) {
            if(err) throw err;
            res.send({message: "success", short : url.short, long : url.long})
        });
    } else {
        res.send({message: 'failure', entered : myUrl, details: "The URL you entered was not valid."});
    }
});

module.exports = router;
