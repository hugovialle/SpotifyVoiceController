var player = 0;

window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'YourAccessToken';
    player = new Spotify.Player({
      name: 'SpotifyVoiceController',
      getOAuthToken: cb => { cb(token);
     }
    });

    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { document.getElementById("info").innerHTML = message+". Make sure you have a valid token.";});
    player.addListener('account_error', ({ message }) => { document.getElementById("info").innerHTML = message+". Sorry but you need a premium account."; });
    player.addListener('playback_error', ({ message }) => { document.getElementById("info").innerHTML = "Failed to performed playback"+message; });

    player.connect();

player.addListener('not_ready', ({device_id}) => {
  document.getElementById("info").style.color = "rgb(226, 45, 0);";
  document.getElementById("info").innerHTML = "Device ID is not ready for playback, may be due to no internet connexion.";
});

player.addListener('ready', ({ device_id }) => {
  document.getElementById("info").style.color = "rgb(116, 255, 51)";
  document.getElementById("info").innerHTML = "Connected with Spotify. In the app, select 'SpotifyVoiceController' in 'Devices Available'.";
  $('#info').fadeIn('normal', function(){
    $('#info').delay(10000).fadeOut();
});

});

function image(track, track_position){
  if(track_position === undefined){
    document.getElementById(track).style.opacity = 0;
  }
  else{
    document.getElementById(track).style.opacity = 1;
    document.getElementById(track).src = track_position.album.images[0].url;
  }
}

player.addListener('player_state_changed', ({
  position,
  duration,
  track_window: { current_track,
    previous_tracks: [previous_track2, previous_track1],
    next_tracks: [next_track1, next_track2] }
}) => {

  document.getElementById("name").innerHTML = current_track.name;
  document.getElementById("artist").innerHTML = current_track.artists[0].name;
  document.getElementById("name").style.opacity = 1;
  document.getElementById("artist").style.opacity = 1;

  image("track1",previous_track2);
  image("track2",previous_track1);
  image("track3",current_track);
  image('track4',next_track1);
  image("track5",next_track2);
});
};

$('#pause').on('click', function (){
  player.pause();
});

$('#play').on('click', function (){
  player.resume();
});

$('#next').on('click', function (){
  player.nextTrack();
});

$('#previous').on('click', function (){
  player.previousTrack();
});

$('#mute').on('click', function (){
  player.setVolume(0);
});

$('#upvolume').on('click', function (){
  player.getVolume().then(volume => {
    if(volume == 1){
      document.getElementById('#info').innerHTML = "Maximum volume!";
      $('#info').fadeIn('normal', function(){
        $('#info').delay(5000).fadeOut();
    });
    }
    else if(volume>0.8){
      player.setVolume(1);
    }
    else{
      player.setVolume(volume+0.2);
    }
  });
});

$('#downvolume').on('click', function (){
  player.getVolume().then(volume => {
    if(volume<0.2){
      player.setVolume(0);
    }
    else{
      player.setVolume(volume-0.2);
    }
  });
});