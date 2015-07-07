$(function() {

    //form to search spotify API
    var $spotifySearch = $('#spotify-search');

    //form input for track (song)
    var $track    = $('#track');

    //underscore function to compile the html template
    var songTemplate = _.template($('#songDisplay').html());

    //element to hold results from spotify API
    var $results = $('#results');


    // submit form to searchs spotify API
    $spotifySearch.on('submit', function(event) {
        event.preventDefault();
        console.log('form submit');

        $('#results').empty();

		var queryString = 'https://api.spotify.com/v1/search?type=track&q=' + $track.val(); 
		console.log(queryString) 
        
	    var songName; 
	    var songArtist;
	    var albumImage;
	    var songData;

        $.get(queryString, function(data) {
          	var itemsArray = data;
            // return itemsArray
			console.log(itemsArray);
           
	         _.each(itemsArray.tracks.items, function(items, i) {
	         	songName = itemsArray.tracks.items[i].name;
	         	songArtist = itemsArray.tracks.items[i].artists[0].name;
	         	albumImage = itemsArray.tracks.items[i].album.images[1].url;
	            songData = {name: songName, artist: songArtist, image: albumImage};
	            console.log(songData);


        		var songList = [];
				console.log(songList) 

				//store song name and artist
				songList.push(songData);
				console.log(songList);
				var index = songList.indexOf(songData);

				//append song name and artist to the page
				var $song = $(songTemplate(songData));
				$results.append($song);
	          	});
		   }
		);

        $spotifySearch[0].reset();
        $('#track').focus();

    });                                   
});



