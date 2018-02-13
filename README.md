# liri-node-app

---------------------------------------------------------------------------------------------------
LIRI is similar to SIRI in the fact that it can find out information for you. You can check songs, 
movies, and check your twitter feed. Enjoy your experience with LIRI.

Here is how to use LIRI:
---------------------------------------------------------------------------------------------------

When you run the liri.js file using the console. You just have to type the following into the
terminal:

node liri.js help

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