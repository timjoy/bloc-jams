//var albumAtkinson = {
//   title: 'The Blunder',
//   artist: 'Rowan Atkinson',
//   label: 'HauteCouture',
//   year: '2001',
//   albumArtUrl: 'assets/images/album_covers/12.png',
//   songs: [
//        { title: 'UK Ramble', duration: '3:30' },
//        { title: 'Funeral Party', duration: '15:09' },
//    ]
//};

var createSongRow = function(songNumber, songName, songLength) {
  console.log(songNumber);
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

            if (currentlyPlayingSongNumber !== null) {
                // Revert to song number for currently playing song because user started playing new song.
                var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);

                currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
                currentlyPlayingCell.html(currentlyPlayingSongNumber);
            }

            if (currentlyPlayingSongNumber !== songNumber) {
                 // Switch from Play -> Pause button to indicate new song is playing.
                 setSong(songNumber);
                 currentSoundFile.play();
                 $(this).html(pauseButtonTemplate);
                 currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
                 updatePlayerBarSong();
            } else if (currentlyPlayingSongNumber === songNumber) {

                 if (currentSoundFile.isPaused()) {
                     $(this).html(pauseButtonTemplate);
                     $('.main-controls .play-pause').html(playerBarPauseButton);
                     currentSoundFile.play();
                 } else {
                     $(this).html(playButtonTemplate);
                     $('.main-controls .play-pause').html(playerBarPlayButton);
                     currentSoundFile.pause();
                 }

             }

         };

    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
              songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
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
       console.log($newRow);
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
var currentSoundFile = null;
var currentVolume = 80;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
  setCurrentAlbum(albumPicasso);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
//Create a variable to hold the $('.main-controls .play-pause') //selector and add a click() event to it in the $(document).ready() //block with togglePlayFromPlayerBar() as an event handler.
  var $playpauseButton = $('.main-controls .play-pause');
  $('.main-controls .play-pause').click(function togglePlayFromPlayerBar(){
//Write a function so that users can play and pause a song from the //bar, as shown in the demo above. The function should be named //togglePlayFromPlayerBar(), take no arguments, and have the following //Bbehavior:
//If a song is paused and the play button is clicked in the player //bar, it will
    if ($('.control-group main-controls').child === $('.ion-pause'))&&
//instead of "&&", use an if statement inside of the if statement?
    ($('.ion-play').click()){
//Change the song number cell from a play button to a pause button
      $('.ion-play') === $('.ion-pause');
//Change the HTML of the player bar's play button to a pause button
      playerBarPlayButton === playerBarPauseButton;
//Play the song
      currentSoundFile.play();
    }
//If the song is playing (so a current sound file exist), and the //pause button is clicked
//   else if $('.control-group main-con;trols').child === $('.ion-play'){
    else if ((currentSoundFile != null) && ($('.ion-pause').click)){
//Change the  song number cell from a pause button to a play button
//Change the HTML of the player bar's pause button to a play button
      playerBarPauseButton === playerBarPlayButton;
//Pause the song
      currentSoundFile.pause();
    }  
});



  var nextSong = function() {
      var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
      // Note that we're _incrementing_ the song here
      setSong(currentSongIndex + 1);
      currentSoundFile.play();

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

      var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
      var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

      $nextSongNumberCell.html(pauseButtonTemplate);
      $lastSongNumberCell.html(lastSongNumber);
  };

  var previousSong = function() {
      var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
      // Note that we're _decrementing_ the index here
      currentSongIndex--;
      setSong(currentSongIndex + 1);
      currentSoundFile.play();

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

      var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
      var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

      $previousSongNumberCell.html(pauseButtonTemplate);
      $lastSongNumberCell.html(lastSongNumber);
  };

// Create a setSong function that takes one argument:
//songNumber
var setSong = function(songNumber) {
    if (currentSoundFile) {
        currentSoundFile.stop();
    }

     currentlyPlayingSongNumber = parseInt(songNumber);
     currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
     // #1
     currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
         // #2
         formats: [ 'mp3' ],
         preload: true
     });

     setVolume(currentVolume);
};

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
}

var setVolume = function(volume) {
    if (currentSoundFile) {
        currentSoundFile.setVolume(volume);
    }
};

//and assigns currentlyPlayingSongNumber
//and currentSongFromAlbum a new value based on the new
//songNumber
//note: these variables are globally set to "null"

//vanilla JS version:
//currentlyPlayingSongNumber = currentSongIndex+1;
//currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
//jQuery version:
//$('currentlyPlayingSongNumber').empty();
//$('currentlyPlayingSongNumber').append('currentSongIndex'+1);
//$('currentSongFromAlbum').empty();
//$('currentSongFromAlbum').append(currentAlbum.songs[currentSongIndex]);
//note: I don't know if the preceding 4 lines are kosher,
//because I'm refactoring a VARIABLE from a js file, not
//a class or an html element.  Perhaps I should have used the
//".attr()" method.
// My jQuery version seems more verbose.

//Write a function named getSongNumberCell that
//takes one argument, number, and returns the song
//number element that corresponds to that song number.

// from line 70=>
// function getSongNumberCell(number){
//   var songNumber = parseInt(songNumberCell.attr('data-song-number'));
// }

// //Replace all instances where we use the selector
// //with a getSongNumberCell() call.
// getSongNumberCell(number);
