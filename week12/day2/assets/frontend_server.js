'use strict'

var frontendServer = (function() {

    function getPlaylists() {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function() {
            if (http.readyState === 4 && http.status === 200) {
                var playlists = JSON.parse(http.response);
                console.log(playlists);
            }
        }
        http.open('GET', 'http://localhost:3000/playlists');
        http.send();
    }

    // function postPlaylists () {
    //
    // }

    function getCurrentTracks() {
        var getTrack = new XMLHttpRequest();
        getTrack.onreadystatechange = function() {
            if (getTrack.readyState === 4 && getTrack.status === 200) {
                var tracks = JSON.parse(getTrack.response);
                console.log(tracks);
            }
        }
        getTrack.open('GET', 'http://localhost:3000/tracks');
        getTrack.send();

    }

    function favoriteClicked(title) {
        var http = new XMLHttpRequest();
        var data = {
            'title': title,
        }
        http.open('PUT', 'http://localhost:3000/tracksfavplus');
        http.setRequestHeader('Content-Type', 'application/json');
        http.send(JSON.stringify(data));
    }

    function favoriteUnclicked(title) {
        var http = new XMLHttpRequest();
        var data = {
            'title': title,
        }
        http.open('PUT', 'http://localhost:3000/tracksfavminus');
        http.setRequestHeader('Content-Type', 'application/json');
        http.send(JSON.stringify(data));
    }

    return {
        getPlaylists: getPlaylists,
        getCurrentTracks: getCurrentTracks,
        favoriteClicked: favoriteClicked,
        favoriteUnclicked: favoriteUnclicked
    }

})();
