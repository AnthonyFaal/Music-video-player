document.addEventListener('DOMContentLoaded', function () {
    const cartoonList = document.getElementById('cartoonList');
    const cartoonDetails = document.getElementById('cartoonDetails');
    const cartoonPlayer = document.getElementById('cartoonPlayer');
    const cartoonTitle = document.getElementById('cartoonTitle');
    const searchInput = document.getElementById('searchInput');
    const recommendations = document.getElementById('recommendations');
    
    let cartoons = [];

    function fetchCartoons() {
        fetch('../data/cartoons.json')
            .then(response => response.json())
            .then(data => {
                cartoons = data;
                displayCartoons();
                displayRecommendations();
            })
            .catch(error => console.error('Error fetching cartoons:', error));
    }

    function displayCartoons() {
        cartoonList.innerHTML = '';
        cartoons.forEach(cartoon => {
            const cartoonElement = document.createElement('div');
            cartoonElement.classList.add('cartoon-item');
            cartoonElement.innerHTML = `
                <img src="${cartoon.thumbnail}" alt="${cartoon.title}">
                <h3>${cartoon.title}</h3>
            `;
            cartoonElement.addEventListener('click', () => {
                playCartoon(cartoon);
            });
            cartoonList.appendChild(cartoonElement);
        });
    }

    function playCartoon(cartoon) {
        cartoonTitle.textContent = cartoon.title;
        cartoonPlayer.src = cartoon.url;
        cartoonDetails.style.display = 'block';
        cartoonPlayer.play();
        cartoonList.style.display = 'none';
    }

    function displayRecommendations() {
        recommendations.innerHTML = '<h3>Recommended Cartoons</h3>';
        cartoons.slice(0, 5).forEach(cartoon => {
            const recElement = document.createElement('div');
            recElement.classList.add('recommendation-item');
            recElement.innerHTML = `
                <h4>${cartoon.title}</h4>
                <button data-id="${cartoon.id}">Play</button>
            `;
            recElement.addEventListener('click', () => {
                playCartoon(cartoon);
            });
            recommendations.appendChild(recElement);
        });
    }

    function searchCartoons() {
        const searchTerm = searchInput.value.toLowerCase();
        cartoonList.innerHTML = '';
        cartoons
            .filter(cartoon => cartoon.title.toLowerCase().includes(searchTerm) || cartoon.genre.toLowerCase().includes(searchTerm))
            .forEach(cartoon => {
                const cartoonElement = document.createElement('div');
                cartoonElement.classList.add('cartoon-item');
                cartoonElement.innerHTML = `
                    <img src="${cartoon.thumbnail}" alt="${cartoon.title}">
                    <h3>${cartoon.title}</h3>
                `;
                cartoonElement.addEventListener('click', () => {
                    playCartoon(cartoon);
                });
                cartoonList.appendChild(cartoonElement);
            });
    }

    searchInput.addEventListener('input', searchCartoons);

    fetchCartoons();
});
