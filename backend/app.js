var http = require('http');
var request = require('request');
var express = require('express');
var bodyParser = require("body-parser");
var _ = require('underscore');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/helloworld', function(req, res){
	res.json("hi")
})

app.post('/getCount', function(req, res){
    var count = req.body.count;
    var toRemoveStopWords = req.body.toRemoveStopWords;
    console.log(count, toRemoveStopWords)

    request.get('http://terriblytinytales.com/test.txt', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var str = body;

            // Pre-processing
            str = str.replace(/(?:\r\n|\r|\n)/g, ' ');
            str = str.replace(/[0-9]/g, '');
            str = str.replace(/[^\w\s]/gi, '');
            str = str.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
            str = str.replace(/\t/g, ' ');
            str = str.toLowerCase();

            //Index creation
            var lstWord = str.split(" ");
            var hashmapWords = {};
            var stopWords = ["i","a", "an", "and", "are", "as", "at", "be", "but", "by","for", "if", "in", "into", "is", "it","no", "not", "of", "on", "or", "such","that", "the", "their", "then", "there", "these","they", "this", "to", "was", "will", "with"]

            if(toRemoveStopWords)
            {
                lstWord = _.difference(lstWord, stopWords);
            }

            _.each(lstWord, function(item){
                if(hashmapWords[item])
                    hashmapWords[item]++;
                else
                    hashmapWords[item] = 1;
            })

            var output = [], item;

            for (var type in hashmapWords) {
                item = {};
                item.type = type;
                item.name = hashmapWords[type];
                output.push(item);
            }

            output = _.sortBy(output, function(item){
                return -item.name;
            });

            console.log(output);
            
            res.json(output.splice(0, count));
        }
        else
        {
            res.statusCode = 401;
            res.send('None shall pass');
        }
    });
})

var httpServer = http.createServer(app);

httpServer.listen(8080);