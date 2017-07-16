var Moment = require("moment");
var keyJS = require("./key.js");

var twitterKeys = keyJS.twitterKeys;

// console.log(twitterKeys);

var nodeArr = process.argv;
var command = nodeArr[2];
var title = nodeArr[3];

var logString = "---------------" + Moment().format("ddd. MMM DD, YYYY @ hh:mma.") + "---------------\n";

// var inputLine = {
// 	command:nodeArr[2];
// 	value:nodeArr[3];
// }

// var nodeString = (nodeArr.splice(2)).join(",");
var fs = require("fs");

console.log("");

if (command !== "do-what-it-says") {

	if (command === "my-tweets") {
		title = "tweet-tweet";
	}

	var textString = "," + command + "," + title;

		fs.appendFile("random.txt", textString , function(err) {
			if (err) {
				return console.log(err);
		}
	});
}

runCommand();

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

function myTweets() {
	title = "tweet-tweet";

	logString+=(command + " " + title + "\n\n");

	// var textString = "," + command + "," + title;

	// fs.appendFile("random.txt", textString , function(err) {
	// 	if (err) {
	// 		return console.log(err);
	// 	}
	// });

	var Twitter = require('twitter');
	 
	// var client = new Twitter({
	//   consumer_key: twitterKeys.consumer_key,
	//   consumer_secret: twitterKeys.consumer_secret,
	//   access_token_key: twitterKeys.access_token_key,
	//   access_token_secret: twitterKeys.access_token_secret
	// });

	var client = new Twitter(twitterKeys);

	// var params = {
	// 	screen_name: 'DreadDryBones', 
	// 	count: 20
	// };

	var params = {
		q: 'DreadDryBones', 
		count: 20
	};

	// var params = {
	// 	q: 'rtx2017', 
	// 	count: 20
	// };

	client.get('search/tweets', params, function(error, tweets, response) {
		// console.dir(tweets.statuses[0].user.screen_name);

		for (var i = 0; i < tweets.statuses.length; i++) {

			var timeStr = tweets.statuses[i].created_at;

			timeStr = Moment(timeStr,"ddd MMM DD HH:mm:ss Z YYYY").format("ddd. MMM DD, YYYY @ hh:mma ");

			var screenName = tweets.statuses[0].user.screen_name;

			logString+=(timeStr + "by @" + screenName + "\n");
			console.log(timeStr + "by @" + screenName);

			logString+=(tweets.statuses[i].text + "\n\n");
			console.log(tweets.statuses[i].text + "\n");
		}

		// console.log("logString: " + logString);

		logString+="---------------------------------------------\n\n";

		fs.appendFile("log.txt",logString,function(err) {
			if(err) {
				return console.log(err);
			}
		});
	});	

}

function spotifySong() {
	// var title = nodeArr[3];

	if(!title) {
		title = "The-Sign";
	}

	logString+=(command + " " + title + "\n\n");

	// var textString = "," + command + "," + title;

	// fs.appendFile("random.txt", textString , function(err) {
	// 	if (err) {
	// 		return console.log(err);
	// 	}
	// });

	var Spotify = require("node-spotify-api");

	var spotify = new Spotify({
	  id: "b2d483a9dcb84668b5b102f93f21862c",
	  secret: "e5d69b6a90b84700a8439e3c1685c0a6"
	});
	 
	spotify.search({ type: 'track', query: title, limit: 5 }, function(err, data) {
		if (err) {
	    	return console.log('Error occurred: ' + err);
		}
	 
		// console.log(data);

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

		logString+="---------------------------------------------\n\n";

		fs.appendFile("log.txt",logString,function(err) {
			if(err) {
				return console.log(err);
			}
		});

	});
}

function movieThis() {
	// var title = nodeArr[3];

	if(!title) {
		title = "Mr.-Nobody";
	}

	logString+=(command + " " + title + "\n\n");

	// var textString = "," + command + "," + title;

	// fs.appendFile("random.txt", textString , function(err) {
	// 	if (err) {
	// 		return console.log(err);
	// 	}
	// });

	var queryURL = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json&apikey=40e9cece";

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
		// console.log("" + movieObj.Ratings);

		logString+=("Country: " + movieObj.Country + "\n");
		console.log("Country: " + movieObj.Country);

		logString+=("Language: " + movieObj.Language + "\n");
		console.log("Language: " + movieObj.Language);

		logString+=("Actors: " + movieObj.Actors + "\n");
		console.log("Actors: " + movieObj.Actors);

		logString+=(movieObj.Plot + "\n");
		console.log(movieObj.Plot);

		logString+="---------------------------------------------\n\n";

		fs.appendFile("log.txt",logString,function(err) {
			if(err) {
				return console.log(err);
			}
		});

	});

}

function randomCommand() {
	fs.readFile("random.txt","utf8",function(err,data) {
		if (err) {
			return console.log(err);
		}

		// console.log(data);
		dataArr = data.split(",");
		// console.log(dataArr);

		var prevCommands = [];
		for(var i = 0; i<dataArr.length; i++) {
			prevCommands.push({
				command: dataArr[i],
				value: dataArr[i+1]
			})
			i++;
		}
		// console.log(prevCommands);

		var rand = Math.floor(Math.random()*prevCommands.length);

		command = prevCommands[rand].command;
		title = prevCommands[rand].value;

		console.log(command + " " + title + "\n");

		runCommand();

	});
}