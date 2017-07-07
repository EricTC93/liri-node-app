var twitter = require("./key.js");

// console.log(twitter);

var command = process.argv[2];

console.log(" ");

switch (command) {
	case "my-tweets":
		
		break;

	case "spotify-this-song":
		spotifySong();
		break;

	case "movie-this":
		movieThis();
		break;

	case "do-what-it-says":
		
		break;

	default:
		console.log("There was an error");
}

function spotifySong() {
	var title = process.argv[3];

	if(!title) {
		title = "The-Sign";
	}

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

			console.log(artistsString);

			var song = songsData[key].name;

			console.log(song);

			var previewURL = songsData[key].preview_url;

			console.log(previewURL);

			var album = songsData[key].album.name;

			console.log(album);

			console.log(" ");
		}

	});
}

function movieThis() {
	var title = process.argv[3];

	if(!title) {
		title = "Mr.-Nobody";
	}

	var queryURL = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json&apikey=40e9cece";

	var request = require("request");
	request(queryURL,function (error, response, body) {
		movieObj = JSON.parse(body);

		console.log(movieObj.Title);

		console.log(movieObj.Year);

		console.log(movieObj.imdbRating);

		var ratings = movieObj.Ratings
		for (var key in ratings) {
			if (ratings[key].Source === "Rotten Tomatoes") {
				console.log(ratings[key].Value);
			}
		}
		// console.log(movieObj.Ratings);

		console.log(movieObj.Country);

		console.log(movieObj.Language);

		console.log(movieObj.Plot);

		console.log(movieObj.Actors);

	});

}