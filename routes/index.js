var express = require('express');
var router = express.Router();
//The only reason "request" is availble is because we npm installed it
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {

	var student1 = "Sean";
	var fruits = ['apple', 'banana', 'orange', 'pear'];

  //first thing is the view you want to use ('index' in this case)
  res.render('index', { student: student1, fruitArray: fruits });
  // res.send("Hello from Express");//res.send works just like res.write/res.end but express is handling this for us
  // res.json({name: "Connie"});
});

//html has to come from "views"

//if you go to localhost:3000, this code will run. Translation: Go to 3000 and look for a file called 'canvasGame' inside 'views'
router.get('/canvas', function(req, res, next){
	var fakeDBData={
		name: "Connie",
		highScore: 23
	}
	res.render('canvasGame', {user: fakeDBData});
});

router.get('/weather', function(req,res,next){
	var apikey = 'e312dbeb8840e51f92334498a261ca1d';
    var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&APPID="+apikey;
    request.get(weatherUrl, (error, response, weatherData)=>{
    	// console.log(error);
    	// console.log(response);
    	//if you run console.log in index.js, it is running it in node. that is why you see the console.log info in the terminal now instead of in the browser.
    	console.log(weatherData);
    	//How to make this code run in browser? Go to localhost:3000/weather. 
    	// res.send("Done"); //as soon as you "send", the code is done. no more data can be sent. need to comment it out to make res.render run below.
    	weatherData = JSON.parse(weatherData);//we had to parse it because if we did console.log(typeof(weatherData)), it comes back as a string instead.
    	res.render('weather',{weatherObject: weatherData})
    })
});

module.exports = router;
