var express = require('express'),
  ejs = require('ejs'),
  request = require('request'),
  bodyParser = require('body-parser');

var app = express();

app.set("view engine", "ejs");

app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/search', function(req, res){
  // res.send("search page: " + query);
  var searchRequest = req.query.searchTerm;
  var searchURL = "http://www.omdbapi.com/?s=" + searchRequest;
  request(searchURL, function(error, response, body){
    if (!error){
      var data = JSON.parse(body); 
      res.render("results.ejs", {movieList: data.Search || []});

    }
  });
});

app.get('/movie/:id', function(req, res){
  // need to catch id and redirect to new page
  var selectedID = req.params.id;
  // res.render("details", {movieID: selectedID});
  var searchURL = "http://www.omdbapi.com/?i=" + selectedID;
  request(searchURL, function(error, response, body){
    if (!error){
      var data = JSON.parse(body); 
      res.render("details", {movieDetails: data || []});
    }
  });
});


// var omdbQuery = function(searchTerm){
//   var searchRequest = req.query.searchTerm;
//   var searchURL = "http://www.omdbapi.com/?s=" + searchRequest;
//   request(searchURL, function(error, response, body){
//     if (!error){
//       var data = JSON.parse(body); 
//       res.render("results.ejs", {movieList: data.Search || []});

//     }
//   });  
// }

app.listen(3000);
