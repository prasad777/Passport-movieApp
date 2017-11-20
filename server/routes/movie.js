const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const parserUrlencoded = bodyParser.urlencoded({extended:false});
const request = require('request');
const Movie = require('../model/movie')



var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  return next();
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport) {

router.get('/movie/view', isAuthenticated, function(req, res) {
  Movie.find(function(err, movie, count){
  res.json({success:true, dataResult:movie});
  });
}); // get favlist


// router.post('/movie/add',isAuthenticated, function(req,res){
//   Movie.findOne({'title': req.body.title},function(err,movie){

//     if( movie && !err){
//       res.json({success:false});
//     } else {

//       new Movie({
//         title: req.body.title,
//         poster: req.body.poster,
//         releaseDate: req.body.releaseDate 
//       }).save(function(err,movie,count){
//         if(err){
//           res.status(400).send('Error saving a new movie: ' + err);
//         } else {
//           res.json({success:true});
//         }
//       })
//     }
//   });
// });

// check movie already exist

router.get('/movie/:id',isAuthenticated, function(req,res){
  Movie.find({'_id': req.param.id},function(err,movie){
    if( movie && !err)
      res.json(movie);
    });
  });


// save movie in the fav list



router.post('/movie/add', isAuthenticated,function(req,res){
  new Movie({
    title: req.body.title,
    poster: req.body.poster,
    releaseDate: req.body.releaseDate 
  }).save(function(err,movie,count){
    if(err){
      res.status(400).send('Error saving a new movie: ' + err);
    } else {
      res.json({success:true});
    }
  })
});




// Get login page
router.get('/', function(req,res){
  // Display the login page with any flash messge , if any
  res.render('index', {message : req.flash('message')});
})

// Handle login post
router.post('/login', passport.authenticate('login',{
  successRedirect:'/movie',
  failureRedirect:'/',
  failureFlash : true
}));


// get registration page
router.get('/signup', function(req, res){
  res.render('register', {message: req.flash('message')});
});


// handle registration POST 
router.post('/signup', passport.authenticate('signup',{
  successRedirect:'/movie',
  failureRedirect:'/signup',
  failureFlash : true
}));



router.get('/movie/search/:searchText', isAuthenticated,function(req, res, next) {
  let movieName = req.params.searchText;
  request('https://api.themoviedb.org/3/search/movie?api_key=d0f65e77e4f540ed8914d7a321b9b6ff&query='+ movieName, function (error, response, body) {
   // console.log('error:', error); 
    //console.log('statusCode:', response && response.statusCode); 
    if ( !error && response.statusCode === 200){
      let results = JSON.parse(body).results;
      let trimResult = [];
      results.map(function(obj){
        tjson = {};
        tjson.title = obj.title;
        tjson.poster = obj.poster_path;
        tjson.releaseDate = obj.release_date;
        trimResult.push(tjson);
      });
       res.json({success:true, dataResult:trimResult});
    } else {
      res.json(error);
    }
  });
});



// router.route('/movie/:id')
// .all(isAuthenticated,function(req,res,next){
//     id = req.params.id;
//     movie = {};
//     Movie.findById(id,function(err, c){
//         movie = c;
//         next();
//     });
// })
router.delete('/movie/:id',isAuthenticated,function(req,res,next){
    Movie.remove({'_id': req.params.id},function(err,movie){
        if(err) {
            res.status(400).send('Erro removing movie:' + err);
        } else {
            res.json({success:true});
        }
    })
});

//get home page
router.get('/movie', isAuthenticated,function(req, res){
  res.render('movie',{title: 'Movie Inc',user: req.user});

});

module.exports = router;

router.get('/signout', function(req, res){
  req.logout();
  res.redirect('/');
});

	// /* Handle Simple Hello Route */
	// router.get('/hello', isAuthenticated, function(req, res) {
	// 	req.flash('message', 'Hello');
	// 	res.render('home', { user:req.user, message: req.flash('message') });
	// });
 return router;
}

