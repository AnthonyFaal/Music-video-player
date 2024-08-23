document.addEventListener('DOMContentLoaded', function () {
  const audioPlayer = new Audio();
  let currentTrack = null;
  let playlist = [];
  let playlists = [];
  let recommendations = [];
  let currentIndex = 0;
  let isLooping = false;

  function loadMusicData() {
    fetch('../data/songs.json')
        .then(response => response.json())
        .then(data => {
            playlist = data.tracks;
            playlists = data.playlists;
            recommendations = data.recommendations;
            renderTracks();
            renderPlaylists();
            renderRecommendations();
        })
        .catch(error => {
            console.error('Error loading music data:', error);
        });
  }

  function renderTracks() {
      const tracksContainer = document.getElementById('tracks');
      tracksContainer.innerHTML = '';
      playlist.forEach((track, index) => {
          const trackElement = document.createElement('div');
          trackElement.className = 'music-item';
          trackElement.innerHTML = `
              <span>${track.title} - ${track.artist}</span>
              <button class="play" data-audio="${track.audio}" data-index="${index}">Play</button>
          `;
          tracksContainer.appendChild(trackElement);

          trackElement.querySelector('.play').addEventListener('click', function () {
              loadTrack(track.audio, index);
          });
      });
  }

  function renderPlaylists() {
      const playlistsContainer = document.getElementById('playlists');
      playlistsContainer.innerHTML = '';
      playlists.forEach(playlist => {
          const playlistElement = document.createElement('div');
          playlistElement.className = 'playlist';
          playlistElement.innerHTML = `
              <span>${playlist.name}</span>
              <button class="play-playlist" data-playlist-id="${playlist.id}">Play Playlist</button>
          `;
          playlistsContainer.appendChild(playlistElement);

          playlistElement.querySelector('.play-playlist').addEventListener('click', function () {
              playPlaylist(playlist.id);
          });
      });
  }

  function renderRecommendations() {
      const recommendationsContainer = document.getElementById('recommendations');
      recommendationsContainer.innerHTML = '';
      recommendations.forEach(rec => {
          const recElement = document.createElement('div');
          recElement.className = 'recommendation';
          recElement.innerHTML = `<span>${rec.title}: ${rec.reason}</span>`;
          recommendationsContainer.appendChild(recElement);
      });
  }

  function loadTrack(src, index) {
      audioPlayer.src = src;
      audioPlayer.play();
      currentTrack = src;
      currentIndex = index;
      updateProgress();
      updatePlayPauseButton();
  }

  function playPlaylist(playlistId) {
      const playlistData = playlists.find(pl => pl.id === playlistId);
      if (playlistData) {
          playlist = playlistData.tracks.map(trackSrc => ({ audio: trackSrc }));
          currentIndex = 0;
          loadTrack(playlist[currentIndex].audio, currentIndex);
      }
  }

  function updatePlayPauseButton() {
      const playPauseButton = document.querySelector('.play-pause');
      playPauseButton.innerHTML = audioPlayer.paused
          ? '<i class="material-icons">play_arrow</i>'
          : '<i class="material-icons">pause</i>';
  }

  function togglePlayPause() {
      if (audioPlayer.paused) {
          audioPlayer.play();
      } else {
          audioPlayer.pause();
      }
      updatePlayPauseButton();
  }

  function playNextTrack() {
      currentIndex = (currentIndex + 1) % playlist.length;
      loadTrack(playlist[currentIndex].audio, currentIndex);
  }

  function updateProgress() {
      const progressBar = document.querySelector('.progress-bar');
      const currentTimeLabel = document.querySelector('.current-time');
      const durationLabel = document.querySelector('.duration');

      audioPlayer.addEventListener('timeupdate', function () {
          const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
          progressBar.value = progress || 0;
          currentTimeLabel.innerText = formatTime(audioPlayer.currentTime);
          durationLabel.innerText = formatTime(audioPlayer.duration);
      });

      progressBar.addEventListener('input', function () {
          audioPlayer.currentTime = (this.value / 100) * audioPlayer.duration;
      });
  }

  function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  audioPlayer.addEventListener('ended', function () {
      if (isLooping) {
          audioPlayer.currentTime = 0;
          audioPlayer.play();
      } else {
          playNextTrack();
      }
  });

  document.querySelector('.play-pause').addEventListener('click', togglePlayPause);
  document.querySelector('.next').addEventListener('click', playNextTrack);
  document.querySelector('.prev').addEventListener('click', function () {
      currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
      loadTrack(playlist[currentIndex].audio, currentIndex);
  });

  loadMusicData();
});
