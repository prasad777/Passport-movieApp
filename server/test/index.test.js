let sinon = require('sinon');
let chai = require('chai');
let expect = chai.expect;
let should = chai.should();
let request = require('supertest');
let app = require('../index');

let User = require('../model/user');
let Movie = require('../model/movie');


// let address = request('http://localhost:3000');

let movieFind = sinon.stub(Movie, 'find');
let movieSave = sinon.stub(Movie.prototype, 'save');
let moviefindOne = sinon.stub(Movie,'findOne');
// testsuit 1
describe('Test movie api /movie/view', function(){
    beforeEach(function(done){
      movieFind.yields(null,[{
        "_id" : '5a0f350fe3438c1b6cee87f5',
        "title" : "Titanic",
        "poster" : "/kHXEpyfl6zqn8a6YuozZUujufXf.jpg",
        "releaseDate" : '1997-11-18T00:00:00.000Z',
        "__v" : 0
    }]);
    done();
    });

    it('Expect list of favorite movie list for the /movie/view', function(done){
      request(app)
        .get('/movie/view')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err,res){
          if (err) return done(err);
          expect(res.body.dataResult[0].title).to.be.equal('Titanic');
          done();
        });
    });
  });



//  testsuite 2
describe('Test movie api /movie/search/:serachText', function() {
  //  testcase
  //this.timeout(10000);
  it('Expect search api to return movie serach list', function(done) {
    request(app)
        .get('/movie/search/Bahubali')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          should.not.exist(err);
          res.body.success.should.be.equal(true);
          //console.log(res.body);
          //res.body.error.should.equal(false);
          res.body.dataResult[0].title.should.equal('Baahubali 2: The Conclusion');
          res.body.dataResult[1].title.should.equal('Baahubali: The Beginning');
          done();
        });
  });
 });


// test suit 4
describe('Test movie api /movie/add', function() {

  beforeEach(function(done){
    movieSave.yields(null,[{
      "_id" : '5a0f350fe3438c1b6cee87f5',
      "title" : "Titanic",
      "poster" : "/kHXEpyfl6zqn8a6YuozZUujufXf.jpg",
      "releaseDate" : '1997-11-18T00:00:00.000Z',
      "__v" : 0
  }]);
  done();
  });

  it('Expect api to  add movie to fav list',function(done){
      request(app)
        .post('/movie/add')
        .send({title:'Titanic',poster: 'xyz',releaseDate:'xyz'})
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.success.should.be.equal(true);
          done();
    }); 
  });
});


// test suit 5
describe('Test movie api /movie/:id to check movie exist', function() {
  
    beforeEach(function(done){
      movieFind.withArgs({'_id':'5a0f350fe3438c1b6cee87f5'}).yields(null,[{"_id" : '5a0f350fe3438c1b6cee87f5',
        "title" : "Titanic",
        "poster" : "/kHXEpyfl6zqn8a6YuozZUujufXf.jpg",
        "releaseDate" : '1997-11-18T00:00:00.000Z',
        "__v" : 0
    }]);

    done();
    });
    //test case
    //this.timeout(10000);
    it('expect to check movie exist',function(done){
        request(app)
          .get('/movie/5a0f350fe3438c1b6cee87f5')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            should.not.exist(err);
            res.body[0].title.should.be.equal('Titanic');
            done();
      }); 
    });
  });
