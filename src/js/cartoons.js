document.addEventListener('DOMContentLoaded', function () {
    const cartoonList = document.getElementById('cartoonList');
    const cartoonDetails = document.getElementById('cartoonDetails');
    const searchInput = document.getElementById('searchInput');
    const cartoonTitle = document.getElementById('cartoonTitle');
    const cartoonPlayer = document.getElementById('cartoonPlayer');
    const submitCommentButton = document.getElementById('commentButton');
    const cartoonComments = document.getElementById('cartoonComments');
    const recommendations = document.getElementById('recommendations');

    let cartoons = [];
    let currentCartoon = null;

    function fetchCartoons() {
        fetch('../data/cartoons.json')
            .then(response => response.json())
            .then(data => {
                cartoons = data;
                displayCartoons();
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
                <button data-id="${cartoon.id}">Watch Now</button>
            `;
            cartoonList.appendChild(cartoonElement);
        });
    }

    function displayCartoonDetails(cartoon) {
        cartoonTitle.textContent = cartoon.title;
        cartoonPlayer.src = cartoon.url;
        cartoonPlayer.play();
        submitCommentButton.style.display = 'block';
        cartoonComments.innerHTML = ''; // Clear previous comments
        displayRecommendations(); // Assuming recommendations are displayed here
    }

    function displayRecommendations() {
        recommendations.innerHTML = '<h3>Recommended For You</h3>';
        // Example recommendations logic
        cartoons.forEach(cartoon => {
            if (cartoon.id !== currentCartoon.id) {
                const recommendationElement = document.createElement('div');
                recommendationElement.classList.add('cartoon-item');
                recommendationElement.innerHTML = `
                    <img src="${cartoon.thumbnail}" alt="${cartoon.title}">
                    <h3>${cartoon.title}</h3>
                    <button data-id="${cartoon.id}">Watch Now</button>
                `;
                recommendations.appendChild(recommendationElement);
            }
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
                    <button data-id="${cartoon.id}">Watch Now</button>
                `;
                cartoonList.appendChild(cartoonElement);
            });
    }

    searchInput.addEventListener('input', searchCartoons);

    cartoonList.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            const cartoonId = event.target.getAttribute('data-id');
            currentCartoon = cartoons.find(cartoon => cartoon.id === parseInt(cartoonId));
            if (currentCartoon) {
                displayCartoonDetails(currentCartoon);
                cartoonDetails.style.display = 'block';
                cartoonList.style.display = 'none';
            }
        }
    });

    submitCommentButton.addEventListener('click', function () {
        const comment = prompt("Enter your comment:");
        if (comment) {
            const commentElement = document.createElement('p');
            commentElement.textContent = comment;
            cartoonComments.appendChild(commentElement);
        }
    });

    fetchCartoons();
});
