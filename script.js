var videoUrl = "";
var playCount = 0;
var loopCount = 0;
var videoId = "";
var players = []; 
var loopCounters = []; 

function createVideoPlayer() {
  var playerDiv = document.createElement("div");
  playerDiv.setAttribute("class", "player-card");
  document.getElementById("player").appendChild(playerDiv);

  var playerElementId = "player-" + Math.floor(Math.random() * 1000000); 
  playerDiv.setAttribute("id", playerElementId);

  var loopCounter = 0; 

  var player = new YT.Player(playerElementId, {
    videoId: videoId,
    playerVars: {
      autoplay: 1,
      controls: 0,
      mute: 1
    },
    events: {
      onReady: function() {
        player.playVideo();
      },
      onStateChange: function(event) {
        if (event.data === YT.PlayerState.ENDED) {
          loopCounter++;
          if (loopCounter < loopCount) {
            player.playVideo();
          }
        }
      }
    }
  });

  players.push(player); // Add player to the array
  loopCounters.push(loopCounter); // Add loop counter to the array
}

function onYouTubeIframeAPIReady() {
  var playForm = document.getElementById("play-form");
  var cardContainer = document.getElementById("card-container");

  playForm.addEventListener("submit", function(e) {
    e.preventDefault();

    videoUrl = document.getElementById("youtube_url").value;
    playCount = parseInt(document.getElementById("play_count").value);
    loopCount = parseInt(document.getElementById("loop_count").value);
    videoId = extractVideoId(videoUrl);

    if (videoUrl && playCount > 0) {
      for (var i = 0; i < playCount; i++) {
        createVideoPlayer();
      }

      cardContainer.classList.add("hidden");
    }
  });
}