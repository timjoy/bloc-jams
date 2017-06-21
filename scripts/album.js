var albumPicasso = {
   title: 'The Colors',
   artist: 'Pablo Picasso',
   label: 'Cubism',
   year: '1881',
   albumArtUrl: 'assets/images/album_covers/01.png',
   songs: [
       { title: 'Blue', duration: '4:26' },
       { title: 'Green', duration: '3:14' },
       { title: 'Red', duration: '5:01' },
       { title: 'Pink', duration: '3:21'},
       { title: 'Magenta', duration: '2:15'}
   ]
};


var albumMarconi = {
   title: 'The Telephone',
   artist: 'Guglielmo Marconi',
   label: 'EM',
   year: '1909',
   albumArtUrl: 'assets/images/album_covers/20.png',
   songs: [
       { title: 'Hello, Operator?', duration: '1:01' },
       { title: 'Ring, ring, ring', duration: '5:01' },
       { title: 'Fits in your pocket', duration: '3:21'},
       { title: 'Can you hear me now?', duration: '3:14' },
       { title: 'Wrong phone number', duration: '2:15'}
   ]
};

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

   return $(template);
};

var setCurrentAlbum = function(album) {
   // #1
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

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var currentlyPlayingSong = null;

window.onload = function() {
  setCurrentAlbum(albumPicasso);

  songListContainer.addEventListener('mouseover', function(event) {
    if (event.target.parentElement.className === 'album-view-song-item') {
      // Change the content from the number to the play button's HTML
      event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
    }
  });

  for (var i = 0; i < songRows.length; i++) {
    songRows[i].addEventListener('mouseleave', function(event) {
        this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
        var songItem = getSongItem(event.target);
        var songItemNumber = songItem.getAttribute('data-song-number');

             // #2
        if (songItemNumber !== currentlyPlayingSong) {
            songItem.innerHTML = songItemNumber;
        }
    });

    songRows[i].addEventListener('click', function(event) {
      console.log(event.target);
        // Event handler call
      clickHandler(event.target);
    });
  }
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
  // element1 => a parentElement of the .song-item-number
  // element2 => a childElement of the .song-item-number
  // element3 => a different child of the parentElement of .song-item-number
  // element4 => the .song-item-number itself
  //
  // element1.addEventListener('click', doSomething2, false)
  // element2.addEventListener('click', doSomething, true)
  // element3.addEventListener('click', doSomething, false)
  // element4.addEventListener('click', doSomething, false)
  //
  // fucntion doSomething2{...}
  // function doSomething{...}

  // function findParentByClassName(){
    //document.getElementsByClassName('song-item-number').addEventListener('click', function (event), true){
    //    console.log(event.target);
  var currentParent = element.parentElement;  //    if event.target == parentElement
  var findParentByClassName = function(element, targetClass) {
    if (element) {
        var currentParent = element.parentElement;
        while (currentParent.className !== targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }
    else if {
      element.parentElement === null
      }
      console.log("No parent found.");
    else if {
      currentParent != currentParent.className
      }
      console.log("No parent found with that class name.");
  };
  // song-item-number
  // song-item-duration
  // song-item-title
  // album-view-song-item
  // ion-play
  // ion-play

  var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }
};
var clickHandler = function(targetElement) {

  var songItem = getSongItem(targetElement);

  if (currentlyPlayingSong === null) {
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
  }
  } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
      songItem.innerHTML = playButtonTemplate;
      currentlyPlayingSong = null;
  }
  } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
       var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
       currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
       songItem.innerHTML = pauseButtonTemplate;
       currentlyPlayingSong = songItem.getAttribute('data-song-number');
  }
};
