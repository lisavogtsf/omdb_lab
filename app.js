var express = require('express'),
  ejs = require('ejs'),
  request = require('request'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  app = express();

// array with IDs of favorite films
// var favID = ["tt0151625", "tt0372784"];
var favObjects = [{
  Title: "Monty Python & the Quest for the Holy Grail",
  imdbID: "tt0151625"}
  // , 
  // {Title: "Batman Begins",
  // imdbID: "tt0372784"}
  ];

app.set("view engine", "ejs");

// some middleware for handlign parsing form data
app.use(bodyParser.urlencoded());
// add middleware to handle overriding POST requests
// for both pUT AND DELETE
app.use(methodOverride("_method"));


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

app.get('/favorites', function(req, res){
  // res.send("search page: " + query);
  res.render("favorites", {favList: favObjects});
});

app.post("/favorites", function(req, res){
  // newFavFilm = req.body;
  favObjects.push(req.body);
  console.log(favObjects);
  res.redirect("/favorites");
});


app.listen(3000);
