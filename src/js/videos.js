document.addEventListener('DOMContentLoaded', function () {
    const videoList = document.getElementById('videoList');
    const videoDetails = document.getElementById('videoDetails');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.getElementById('videoTitle');
    const searchInput = document.getElementById('searchInput');
    const recommendations = document.getElementById('recommendations');
    
    let videos = [];

    function fetchVideos() {
        fetch('../data/videos.json')
            .then(response => response.json())
            .then(data => {
                videos = data;
                displayVideos();
                displayRecommendations();
            })
            .catch(error => console.error('Error fetching videos:', error));
    }

    function displayVideos() {
        videoList.innerHTML = '';
        videos.forEach(video => {
            const videoElement = document.createElement('div');
            videoElement.classList.add('video-item');
            videoElement.innerHTML = `
                <img src="${video.thumbnail}" alt="${video.title}">
                <h3>${video.title}</h3>
            `;
            videoElement.addEventListener('click', () => {
                playVideo(video);
            });
            videoList.appendChild(videoElement);
        });
    }

    function playVideo(video) {
        videoTitle.textContent = video.title;
        videoPlayer.src = video.url;
        videoDetails.style.display = 'block';
        videoPlayer.play();
        videoList.style.display = 'none';
    }

    function displayRecommendations() {
        recommendations.innerHTML = '<h3>Recommended Videos</h3>';
        videos.slice(0, 5).forEach(video => {
            const recElement = document.createElement('div');
            recElement.classList.add('recommendation-item');
            recElement.innerHTML = `
                <h4>${video.title}</h4>
                <button data-id="${video.id}">Play</button>
            `;
            recElement.addEventListener('click', () => {
                playVideo(video);
            });
            recommendations.appendChild(recElement);
        });
    }

    function searchVideos() {
        const searchTerm = searchInput.value.toLowerCase();
        videoList.innerHTML = '';
        videos
            .filter(video => video.title.toLowerCase().includes(searchTerm) || video.genre.toLowerCase().includes(searchTerm))
            .forEach(video => {
                const videoElement = document.createElement('div');
                videoElement.classList.add('video-item');
                videoElement.innerHTML = `
                    <img src="${video.thumbnail}" alt="${video.title}">
                    <h3>${video.title}</h3>
                `;
                videoElement.addEventListener('click', () => {
                    playVideo(video);
                });
                videoList.appendChild(videoElement);
            });
    }

    searchInput.addEventListener('input', searchVideos);

    fetchVideos();
});
