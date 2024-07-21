document.addEventListener('DOMContentLoaded', function () {
    const gameList = document.getElementById('gameList');
    const gameDetails = document.getElementById('gameDetails');
    const gameTitle = document.getElementById('gameTitle');
    const gameContainer = document.getElementById('gameContainer');
    const gameProgress = document.getElementById('gameProgress');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    let games = [];
    let currentGame = null;

    function fetchGames() {
        // Example games data
        games = [
            {
                id: 1,
                title: "Simple Memory Game",
                category: "Puzzle",
                html: `<div id="memory-game"><p>Memory Game Placeholder</p></div>`,
                progress: "Your progress: 0% complete"
            },
            {
                id: 2,
                title: "Basic Quiz Game",
                category: "Quiz",
                html: `<div id="quiz-game"><p>Quiz Game Placeholder</p></div>`,
                progress: "Your progress: 0% complete"
            }
        ];
        displayGames();
    }

    function displayGames() {
        gameList.innerHTML = '';
        games.forEach(game => {
            const gameElement = document.createElement('div');
            gameElement.classList.add('game-item');
            gameElement.innerHTML = `
                <h3>${game.title}</h3>
                <button data-id="${game.id}">Play</button>
            `;
            gameList.appendChild(gameElement);
        });
    }

    function displayGameDetails(game) {
        gameTitle.textContent = game.title;
        gameContainer.innerHTML = game.html;
        gameProgress.textContent = game.progress;
        gameDetails.style.display = 'block';
        gameList.style.display = 'none';
    }

    function searchGames() {
        const searchTerm = searchInput.value.toLowerCase();
        gameList.innerHTML = '';
        games
            .filter(game => game.title.toLowerCase().includes(searchTerm) || game.category.toLowerCase().includes(searchTerm))
            .forEach(game => {
                const gameElement = document.createElement('div');
                gameElement.classList.add('game-item');
                gameElement.innerHTML = `
                    <h3>${game.title}</h3>
                    <button data-id="${game.id}">Play</button>
                `;
                gameList.appendChild(gameElement);
            });
    }

    searchButton.addEventListener('click', searchGames);
    searchInput.addEventListener('input', searchGames);

    gameList.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            const gameId = event.target.getAttribute('data-id');
            currentGame = games.find(game => game.id === parseInt(gameId));
            if (currentGame) {
                displayGameDetails(currentGame);
            }
        }
    });

    fetchGames();
});
