var albumAtkinson = {
   title: 'The Blunder',
   artist: 'Rowan Atkinson',
   label: 'HauteCouture',
   year: '2001',
   albumArtUrl: 'assets/images/album_covers/12.png',
   songs: [
        { title: 'UK Ramble', duration: '3:30' },
        { title: 'Funeral Party', duration: '15:09' },
    ]
};

var createSongRow = function(songNumber, songName, songLength) {
   var template =
        '<tr class="album-view-song-item">'
      +  '<td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      +  '<td class="song-item-title">' + songName + '</td>'
      +  '<td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
    ;

    var $row = $(template);
    var clickHandler = function() {
            var songNumber = parseInt($(this).attr('data-song-number'));

            if (currentlyPlayingSong !== null) {
                    // Revert to song number for currently playing song because user started playing new song.
                    var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
                    currentlyPlayingCell.html(currentlyPlayingSong);
            }
            if (currentlyPlayingSong !== songNumber) {
                    // Switch from Play -> Pause button to indicate new song is playing.
                    $(this).html(pauseButtonTemplate);
                    currentlyPlayingSongNumber = songNumber;
                    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
            } else if (currentlyPlayingSong === songNumber) {
                    // Switch from Pause -> Play button to pause currently playing song.
                    $(this).html(playButtonTemplate);
                    $('.main-controls .play-pause').html(playerBarPlayButton);
                    currentlyPlayingSongNumber = null;
                    currentSongFromAlbum = null;
            }
    };
    var onHover = function(event) {
    var songNumberCell = parseInt($(this).find('.song-item-number'));
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

    if (songNumber !== currentlyPlayingSong) {
          songNumberCell.html(playButtonTemplate);
    }

    var offHover = function(event) {
      var songNumberCell = parseInt($(this).find('.song-item-number'));
      var songNumber = parseInt(songNumberCell.attr('data-song-number'));

      if (songNumber !== currentlyPlayingSong) {
          songNumberCell.html(songNumber
      console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
      }
    };
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

var setCurrentAlbum = function(album) {
   // #1
   currentAlbum = album;
   var $albumTitle = $('.album-view-title');
   var $albumArtist = $('.album-view-artist');
   var $albumReleaseInfo = $('.album-view-release-info');
   var $albumImage = $('.album-cover-art');
   var $albumSongList = $('.album-view-song-list');

   // #2
   $albumTitle.text(album.title);
   $albumArtist.text(album.artist);
   $albumReleaseInfo.text(album.year + ' ' + album.label);
   $albumImage.attr('src', album.albumArtUrl);

   // #3
   $albumSongList.empty();

   // #4
   for (var i = 0; i < album.songs.length; i++) {
       var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
       $albumSongList.append($newRow);
   }
};

var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };
var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
  setCurrentAlbum(albumPicasso);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
});
  var albumImage = document.getElementsByClassName('album-cover-art')[0];
  var albums = [albumPicasso, albumMarconi, albumAtkinson];
  var index = 1;
  albumImage.addEventListener("click", function(event) {
    setCurrentAlbum(albums[index]);
    index++;
    if (index == albums.length) {
        index = 0;
    }
  });

  var currentParent = element.parentElement;  //    if event.target == parentElement

  var nextSong = function() {
      var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
      // Note that we're _incrementing_ the song here
      currentSongIndex++;

      if (currentSongIndex >= currentAlbum.songs.length) {
          currentSongIndex = 0;
      }

      // Save the last song number before changing it
      var lastSongNumber = parseInt(currentlyPlayingSongNumber);

      // Set a new current song
      currentlyPlayingSongNumber = currentSongIndex + 1;
      currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

      // Update the Player Bar information
      updatePlayerBarSong();

      var $nextSongNumberCell = parseInt($('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]'));
      var $lastSongNumberCell = parseInt($('.song-item-number[data-song-number="' + lastSongNumber + '"]'));

      $nextSongNumberCell.html(pauseButtonTemplate);
      $lastSongNumberCell.html(lastSongNumber);
  };

  var previousSong = function() {
      var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
      // Note that we're _decrementing_ the index here
      currentSongIndex--;

      if (currentSongIndex < 0) {
          currentSongIndex = currentAlbum.songs.length - 1;
      }

      // Save the last song number before changing it
      var lastSongNumber = parseInt(currentlyPlayingSongNumber);

      // Set a new current song
      currentlyPlayingSongNumber = currentSongIndex + 1;
      currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

      // Update the Player Bar information
      updatePlayerBarSong();

      $('.main-controls .play-pause').html(playerBarPauseButton);

      var $previousSongNumberCell = parseInt($('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]'));
      var $lastSongNumberCell = parseInt($('.song-item-number[data-song-number="' + lastSongNumber + '"]'));

      $previousSongNumberCell.html(pauseButtonTemplate);
      $lastSongNumberCell.html(lastSongNumber);
  };

// Create a setSong function that takes one argument:
//songNumber
function setSong(songNumber){
//and assigns currentlyPlayingSongNumber
//and currentSongFromAlbum a new value based on the new
//songNumber
//note: these variables are globally set to "null"

//vanilla JS version:
  currentlyPlayingSongNumber = currentSongIndex+1;
  currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
//jQuery version:
  $('currentlyPlayingSongNumber').empty();
  $('currentlyPlayingSongNumber').append('currentSongIndex'+1);
  $('currentSongFromAlbum').empty();
  $('currentSongFromAlbum').append(currentAlbum.songs[currentSongIndex]);
//note: I don't know if the preceding 4 lines are kosher,
//because I'm refactoring a VARIABLE from a js file, not
//a class or an html element.  Perhaps I should have used the
//".attr()" method.
// My jQuery version seems more verbose.
};

//Replace all instances where we manually assign values
//to these functions with a call to setSong().
setSong(songNumber){
};

//Write a function named getSongNumberCell that
//takes one argument, number, and returns the song
//number element that corresponds to that song number.
function getSongNumberCell(number){
  //???I'm in a bit over my head here.
}
//Replace all instances where we use the selector
//with a getSongNumberCell() call.
getSongNumberCell(number);
