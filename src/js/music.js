document.addEventListener('DOMContentLoaded', function () {
  const audioPlayer = new Audio(); 
  let currentTrack = null;

  function loadMusicData() {
    fetch('../data/songs.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const tracksContainer = document.getElementById('tracks');
        data.tracks.forEach(track => {
          const trackDiv = document.createElement('div');
          trackDiv.classList.add('music-item');
          trackDiv.innerHTML = `
            <div>
              <h3>${track.title}</h3>
              <p>${track.artist} - ${track.genre}</p>
            </div>
            <div class="controls">
              <button class="play" data-audio="${track.audio}"><i class="material-icons">play_arrow</i></button>
              <button class="pause"><i class="material-icons">pause</i></button>
              <button class="skip"><i class="material-icons">skip_next</i></button>
            </div>
          `;
          tracksContainer.appendChild(trackDiv);
        });

        const playlistsContainer = document.getElementById('playlists');
        data.playlists.forEach(playlist => {
          const playlistDiv = document.createElement('div');
          playlistDiv.classList.add('playlist');
          playlistDiv.innerHTML = `<h3>${playlist.name}</h3>`;
          playlistsContainer.appendChild(playlistDiv);
        });

        const recommendationsContainer = document.getElementById('recommendations');
        data.recommendations.forEach(recommendation => {
          const recommendationDiv = document.createElement('div');
          recommendationDiv.classList.add('recommendation');
          recommendationDiv.innerHTML = `
            <h3>${recommendation.title}</h3>
            <p>${recommendation.reason}</p>
          `;
          recommendationsContainer.appendChild(recommendationDiv);
        });

        // Add event listeners for audio controls
        document.querySelectorAll('.play').forEach(button => {
          button.addEventListener('click', function () {
            const audioSrc = this.getAttribute('data-audio');
            if (currentTrack !== audioSrc) {
              audioPlayer.src = audioSrc;
              audioPlayer.play();
              currentTrack = audioSrc;
            } else {
              audioPlayer.play();
            }
          });
        });

        document.querySelectorAll('.pause').forEach(button => {
          button.addEventListener('click', function () {
            audioPlayer.pause();
          });
        });

        document.querySelectorAll('.skip').forEach(button => {
          button.addEventListener('click', function () {
            audioPlayer.pause();
            currentTrack = null;
          });
        });
      })
      .catch(error => {
        console.error('Error loading music data:', error);
        document.querySelector('.music-list').innerHTML = '<p>Error loading music data. Please try again later.</p>';
      });
  }

  // Load music data when the page loads
  loadMusicData();
});
