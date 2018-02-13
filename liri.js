require("dotenv").config();

// Requires

var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");

// Initialize Variables
var input = process.argv;
var action = input[2];
var value = input[3];
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
for (var i = 3; i === input.length; i++) {
    value = value + " " + input[i];
}

// Determine What LIRI is getting asked to do.
switch (action) {
    case "my-tweets":
        getTwitter(value);
        break;
    case "spotify-this-song":
        getSpotify(value);
        break;
    case "movie-this":
        getMovie(value);
        break;
    case "do-what-it-says":
        doit();
        break;
    case "help":
        help();
        break;
};

// Functions
// begin help()
function help() {
    console.log(
        // begin template string
        `
Help File
---------------------------------------------------------------------------------------------------
LIRI is similar to SIRI in the fact that it can find out information for you. You can check songs, 
movies, and check your twitter feed. Enjoy your experience with LIRI.

Here is how to use LIRI:
---------------------------------------------------------------------------------------------------

When you run the liri.js file using the console. You just have to type the following into the
terminal:

node liri.js <ACTION> <ARGUMENTS>

node liri.js my-tweets
node liri.js spotify-this-song <ARGUMENTS>
node liri.js movie-this <ARGUMENTS>
node liri.js do-what-it-says

IMPORTANT ---- If you pass in an any arguments that have multple words (eg. State of Love and Trust or The
Matrix) surround them with quotations (eg. "State of Love and Trust" or "The
Matrix"). Otherwise only the first word will be searched (eg. State or The)

The <ACTION> is what you need LIRI to do, and the <ARGUMENTS> are the parameters that you need to 
pass to LIRI to get what you are looking for.

Examples:

node liri.js get-tweets
  This will return the last 20 tweets that you have tweeted.

node liri.js spotify-this-song "Jeremy"
  This will return the song titled Jeremy by Pearl Jam and will also give the artist, album, and a URL that
  will give you a link to a 30 second preview of the song.

node liri.js movie-this "Casino"
  This will return the movie Casino and give you a quick synopsis of the movie and 
  a link where there to find out more information about the movie.
`); // end template string
} // end help()

function getTwitter(inputs) {
    var params = { screen_name: inputs, count: 20 };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log("Tweet: " + "'" + tweets[i].text + "'" + " Created At: " + tweets[i].created_at);
            }
        } else {
            console.log(error);
        }
    });

}

function getSpotify(inputs) {
    if (!value) {
        value = 'The Sign';
    }
    spotify.search({ type: 'track', query: value }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        var songInfo = data.tracks.items;
        console.log("Artist(s): " + songInfo[0].artists[0].name);
        console.log("Song Name: " + songInfo[0].name);
        console.log("Preview Link: " + songInfo[0].preview_url);
        console.log("Album: " + songInfo[0].album.name);
    });
}



function getMovie(inputs) {

    var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=40e9cece";

    request(queryUrl, function(error, response, body) {
        if (!inputs) {
            inputs = 'Mr Nobody';
        }
        if (!error && response.statusCode === 200) {

            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
};

function doit() {
    fs.readFile('random.txt', "utf8", function(error, data) {

        if (error) {
            return console.log(error);
        }

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // Each command is represented. Because of the format in the txt file, remove the quotes to run these commands. 
        if (dataArr[0] === "spotify-this-song") {
            var songcheck = dataArr[1].slice(1, -1);
            getSpotify(songcheck);
        } else if (dataArr[0] === "my-tweets") {
            var tweetname = dataArr[1].slice(1, -1);
            getTwitter(tweetname);
        } else if (dataArr[0] === "movie-this") {
            var movie_name = dataArr[1].slice(1, -1);
            getMovie(movie_name);
        }

    });

};