var Moment = require("moment");
var fs = require("fs");
var keyJS = require("./key.js");
var twitterKeys = keyJS.twitterKeys;

var nodeArr = process.argv;
var command = nodeArr[2];
var title = nodeArr[3];

// Starts log string that will be appended to log.txt
var logString = "---------------" + Moment().format("ddd. MMM DD, YYYY @ hh:mma.") + "---------------\n\n";

// Saves command to random.txt
if (command !== "do-what-it-says") {

	// Default titles
	if (command === "my-tweets") {
		title = "tweet-tweet";
	}

	else if (command === "spotify-this-song") {
		if(!title) {
			title = "The-Sign";
		}
	}

	else if (command === "movie-this") {
		if(!title) {
			title = "Mr.-Nobody";
		}
	}

	var textString = "," + command + "," + title;

		fs.appendFile("random.txt", textString , function(err) {
			if (err) {
				return console.log(err);
		}
	});
}

else {
	logString+=(command + "\n");
}

console.log("");
runCommand();

// Chooses which command to run from user input
function runCommand () {
	switch (command) {
		case "my-tweets":
			myTweets();
			break;

		case "spotify-this-song":
			spotifySong();
			break;

		case "movie-this":
			movieThis();
			break;

		case "do-what-it-says":
			randomCommand();
			break;

		default:
			console.log("There was an error");
	}	
}

// List tweets from a dummy twitter account
function myTweets() {

	logString+=(command + " " + title + "\n\n");

	var Twitter = require('twitter');
	var client = new Twitter(twitterKeys);

	// Sets parameters for the twitter search
	var params = {
		q: 'DreadDryBones', 
		count: 20
	};

	client.get('search/tweets', params, function(error, tweets, response) {

		// List information for each tweet found
		for (var i = 0; i < tweets.statuses.length; i++) {

			var timeStr = tweets.statuses[i].created_at;

			timeStr = Moment(timeStr,"ddd MMM DD HH:mm:ss Z YYYY").format("ddd. MMM DD, YYYY @ hh:mma ");

			var screenName = tweets.statuses[0].user.screen_name;

			logString+=(timeStr + "by @" + screenName + "\n");
			console.log(timeStr + "by @" + screenName);

			logString+=(tweets.statuses[i].text + "\n\n");
			console.log(tweets.statuses[i].text + "\n");
		}

		appendLog();

	});	

}

// List songs based on a song title
function spotifySong() {

	logString+=(command + " " + title + "\n\n");

	var Spotify = require("node-spotify-api");

	var spotify = new Spotify({
	  id: "b2d483a9dcb84668b5b102f93f21862c",
	  secret: "e5d69b6a90b84700a8439e3c1685c0a6"
	});
	 
	 // Retrieves songs and list the data for each song
	spotify.search({ type: 'track', query: title, limit: 5 }, function(err, data) {
		if (err) {
	    	return console.log('Error occurred: ' + err);
		}

		var songsData = data.tracks.items;

		for (var key in songsData) {

			var artists = songsData[key].artists;
			var artistsString = "";

			for (var key1 in artists) {
				artistsString+=(artists[key1].name + " ");
			}

			logString+=(artistsString+"\n");
			console.log(artistsString);

			var song = songsData[key].name;

			logString+=(song+"\n");
			console.log(song);

			var previewURL = songsData[key].preview_url;

			logString+=(previewURL+"\n");
			console.log(previewURL);

			var album = songsData[key].album.name;

			logString+=(album+"\n\n");
			console.log(album+"\n");
		}

		appendLog();

	});
}

// Gets a movie based on the title
function movieThis() {

	logString+=(command + " " + title + "\n\n");

	var queryURL = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json&apikey=40e9cece";

	// Retrieves the data for the movie
	var request = require("request");
	request(queryURL,function (error, response, body) {
		movieObj = JSON.parse(body);

		logString+=("Title: " + movieObj.Title + "\n");
		console.log("Title: " + movieObj.Title);

		logString+=("Year: " + movieObj.Year + "\n");
		console.log("Year: " + movieObj.Year);

		logString+=("IMDB: " + movieObj.imdbRating + "\n");
		console.log("IMDB: " + movieObj.imdbRating);

		var ratings = movieObj.Ratings
		for (var key in ratings) {
			if (ratings[key].Source === "Rotten Tomatoes") {
				logString+=("Rotten Tomatoes: " + ratings[key].Value + "\n");
				console.log("Rotten Tomatoes: " + ratings[key].Value);
			}
		}

		logString+=("Country: " + movieObj.Country + "\n");
		console.log("Country: " + movieObj.Country);

		logString+=("Language: " + movieObj.Language + "\n");
		console.log("Language: " + movieObj.Language);

		logString+=("Actors: " + movieObj.Actors + "\n");
		console.log("Actors: " + movieObj.Actors);

		logString+=(movieObj.Plot + "\n\n");
		console.log(movieObj.Plot);

		appendLog();

	});

}

// Runs random command based on past commands saved in random.txt
function randomCommand() {
	fs.readFile("random.txt","utf8",function(err,data) {
		if (err) {
			return console.log(err);
		}

		dataArr = data.split(",");

		var prevCommands = [];
		for(var i = 0; i<dataArr.length; i++) {
			prevCommands.push({
				command: dataArr[i],
				value: dataArr[i+1]
			})
			i++;
		}

		var rand = Math.floor(Math.random()*prevCommands.length);

		command = prevCommands[rand].command;
		title = prevCommands[rand].value;

		console.log(command + " " + title + "\n");

		runCommand();

	});
}

// Adds information to the log after the data retrival
function appendLog() {

	logString+="---------------------------------------------\n\n";

	fs.appendFile("log.txt",logString,function(err) {
		if(err) {
			return console.log(err);
		}
	});
}