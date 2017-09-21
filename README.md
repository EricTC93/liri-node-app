# liri-node-app
Language Interpretation and Recognition Interface.

This node application takes user input and displays information accordingly. The 4 commands are "my-tweets", "spotify-this-song", "movie-this" and "do-what-it-says".

"my-tweets" uses the twitter api module and display 10 most recent tweets from a defined users. Later I will have it search by a twitter handle difined by the user.

![Tweets](/assets/images/LIRI-tweets.PNG)


"movie-this" uses request module and omdapi api tho retrieve movie information using user input for the user name.

![Movie](/assets/images/LIRI-movie.PNG)


"spotify-this-song" uses the spotify api module that displays the 5 most relevant song based on the song title the user inputed.

![Spotify](/assets/images/LIRI-spotify.PNG)


"do-what-it-says" selects a random command that is stored from previous commands that were made before.

![Random](/assets/images/LIRI-random.PNG)


Sends console output to log.txt

![Log](/assets/images/LIRI-log.PNG)
