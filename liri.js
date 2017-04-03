//packages
var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');


//Twitter function
var getMyTweets = function() {
var client = new Twitter(keys.twitterKeys);
var params = {screen_name: 'Noel_la'};
client.get('statuses/user_timeline', params, function(error, tweets, 
        response) {
    if (!error) {
        //console.log(tweets);
        for(var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].created_at);
            console.log('');
            console.log(tweets[i].text);
        }
    }
});

}

//Spotify function
var getArtistNames = function(artist) {
        return artist.name;
}
var getMeSpotify = function(songName) {

spotify.search({ type: 'track', query: songName }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log("artist: " + songs[i].artists.map[
                getArtistNames]);
            console.log("song name: " + songs[i].name);
            console.log("preview song: " + songs[i].preview_url);
            console.log("album: " + songs[i].album.name);
            console.log("---------------------------------------------");

        }
});
}
//movieThis function
var getMeMovie = function(movieName) {
        request("http://www.omdbapi.com/?t=" + movieName +  "&y=&plot=short&rwjson", function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred 
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
          console.log('body:', body); // Print the HTML for the Google homepage. 
        
        var jsonData = JSON.parse(body);

        console.log("Title: " + jsonData.Title);
        console.log("Year: " + jsonData.Year);
        console.log("Rated: " + jsonData.Rated);
        console.log("IMDB Rating: " + jsonData.imbdRating);
        console.log("Country: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);
        console.log("Rotten Tomatoes rating: " + jsonData.tomatoRating);
        console.log("Rotten tomatoes URL: " + jsonData.tomatoesURL);
        
        });
}

//read random text file function
var doWhatItSays = function() {
fs.readFile('random.txt', 'utf8', function (err, data){
    if (err) throw err;

    var dataArr = data.split(',');

    if (dataArr.length == 2)  {
        pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length == 1) {
        pick(dataArr[0]);
    }
    
});
}
//switch casees for user input
var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'my-tweets'  :
                getMyTweets();
                break;
        case 'spotify-this-song':
                getMeSpotify(functionData);
                break;
        case 'movie-this':
            getMeMovie(functionData);
        case 'do-what-it-says':
            doWhatItSays();
            break; 
        default:
        console.log('LIRI does not know that');

    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);