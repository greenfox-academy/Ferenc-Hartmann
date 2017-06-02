'use strict'

var Controller = (function() {

    function init() {
        FrontendServer.getPlaylists();
        FrontendServer.getCurrentTracks();
        Drawer.staticHtmlEventListeners();
        InnerProcessor.interval();
    }

    function playlistDataRouter(playlists) {
        Drawer.playlistDrawer(playlists);
    }

    function trackDataRouter(tracks) {
        this.tracks = tracks;
        Drawer.tracklistDrawer(this.tracks);
        trackChange('init');
    }

    function eventListenerRouter(element, action) {
        InnerProcessor.eventListenAdder(element, action);
    }

    function onChangeRouter(element, action) {
        InnerProcessor.onChangeAdder(element, action);
    }

    function timeRouter(duration) {
        return InnerProcessor.timeManagement(duration);
    }

    function intervalCaller() {
        Drawer.remainTimeDrawer();
        InnerProcessor.endChacker();
    }

    function trackChange(value) {
        InnerProcessor.trackSwitcher(value, Controller.tracks);
        Drawer.onesongHighlight();
        Drawer.totalLengthDrawer();
        Drawer.remainTimeDrawer();
    }

    function logoClicked() {

    }

    function newPlaylistClicked() {

    }

    function onelistClicked() {

    }

    function onesongClicked() {

    }

    function previousSongClicked() {

    }

    function playClicked() {
        Drawer.pauseButtonDisplay();
        InputHandler.playClicked();
    }

    function pauseClicked() {
        Drawer.playButtonDisplay();
        InputHandler.pauseClicked();
    }

    function nextSongClicked() {

    }

    function seekbarClicked() {

    }

    function shuffleClicked() {
// If active it must be blue
    }

    function volumeClicked() {

    }

    function volumebarClicked() {

    }

    function favoriteClicked() {
// The star is immediately turned to light blue
    }

    function addtoPlaylistClicked() {

    }

    function deletePlaylistClicked() {

    }

    function spaceKeyPressed() {

    }

    function nKeyPressed() {

    }

    function pKeyPressed() {

    }

    function escKeyPressed() {

    }

    return {
        init: init,
        playlistDataRouter: playlistDataRouter,
        trackDataRouter: trackDataRouter,
        eventListenerRouter: eventListenerRouter,
        onChangeRouter: onChangeRouter,
        timeRouter: timeRouter,
        playClicked: playClicked,
        pauseClicked: pauseClicked,
        trackChange: trackChange,
        tracks: {},
        intervalCaller: intervalCaller
    }

})();

Controller.init();
