document.addEventListener('DOMContentLoaded', function () {
    const quizList = document.getElementById('quizList');
    const quizDetails = document.getElementById('quizDetails');
    const searchInput = document.getElementById('searchInput');
    const quizTitle = document.getElementById('quizTitle');
    const questionsDiv = document.getElementById('questions');
    const submitQuizButton = document.getElementById('submitQuiz');
    const quizResult = document.getElementById('quizResult');
    const backButton = document.getElementById('backButton'); // Assuming backButton is defined in the HTML

    let quizzes = [];
    let currentQuiz = null;

    function fetchQuizzes() {
        fetch('../data/quizzes.json')
            .then(response => response.json())
            .then(data => {
                quizzes = data;
                displayQuizzes();
            })
            .catch(error => console.error('Error fetching quizzes:', error));
    }

    function displayQuizzes() {
        quizList.innerHTML = '';
        quizzes.forEach(quiz => {
            const quizElement = document.createElement('div');
            quizElement.classList.add('quiz');
            quizElement.innerHTML = `
                <h3>${quiz.title}</h3>
                <button data-id="${quiz.id}">Start Quiz</button>
            `;
            quizList.appendChild(quizElement);
        });
    }

    function displayQuizDetails(quiz) {
        quizTitle.textContent = quiz.title;
        questionsDiv.innerHTML = '';
        quiz.questions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.innerHTML = `
                <p>${index + 1}. ${question.question}</p>
                ${question.options.map((option, i) => `
                    <label>
                        <input type="radio" name="q${index}" value="${option}">
                        ${option}
                    </label>
                `).join('<br>')}
            `;
            questionsDiv.appendChild(questionElement);
        });
        submitQuizButton.style.display = 'block';
    }

    function calculateResults() {
        // Check if all questions are answered before calculating results
        const checkedRadios = document.querySelectorAll('input[type="radio"]:checked');
        if (checkedRadios.length !== currentQuiz.questions.length) {
            alert('Please answer all questions before submitting.');
            return;
        }

        let score = 0;
        const questions = currentQuiz.questions;
        questions.forEach((question, index) => {
            const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
            if (selectedOption && selectedOption.value === question.answer) {
                score++;
            }
        });

        // Determine result class based on score
        let resultClass = 'poor';
        if (score === questions.length) {
            resultClass = 'good';
        } else if (score >= questions.length / 2) {
            resultClass = 'average';
        }

        quizResult.innerHTML = `
            <p>Your score: ${score} / ${questions.length}</p>
            <h3>Explanations:</h3>
            ${questions.map(question => `
                <p><strong>${question.question}</strong> - ${question.explanation}</p>
            `).join('')}
            <h3>${getReassuringMessage(score, questions.length)}</h3>
        `;
        quizResult.className = resultClass; // Apply the result class
        quizResult.style.display = 'block';
    }

    function getReassuringMessage(score, total) {
        const percentage = (score / total) * 100;
        if (percentage === 100) {
            return "Excellent! You're a quiz master!";
        } else if (percentage >= 70) {
            return "Great job! You have a solid understanding!";
        } else if (percentage >= 50) {
            return "Good effort! Keep practicing to improve further.";
        } else {
            return "Don't worry! Keep trying, and you'll get better!";
        }
    }

    searchInput.addEventListener('input', searchQuizzes);

    quizList.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            const quizId = event.target.getAttribute('data-id');
            currentQuiz = quizzes.find(quiz => quiz.id === parseInt(quizId));
            if (currentQuiz) {
                displayQuizDetails(currentQuiz);
                quizDetails.style.display = 'block';
                quizList.style.display = 'none';
            }
        }
    });

    submitQuizButton.addEventListener('click', calculateResults);

    fetchQuizzes();

    function searchQuizzes() {
        const searchTerm = searchInput.value.toLowerCase();
        quizList.innerHTML = '';
        quizzes
            .filter(quiz => quiz.title.toLowerCase().includes(searchTerm) || quiz.topic.toLowerCase().includes(searchTerm))
            .forEach(quiz => {
                const quizElement = document.createElement('div');
                quizElement.classList.add('quiz');
                quizElement.innerHTML = `
                    <h3>${quiz.title}</h3>
                    <button data-id="${quiz.id}">Start Quiz</button>
                `;
                quizList.appendChild(quizElement);
            });
    }

    // Back button functionality
    backButton.addEventListener('click', function(){
        quizDetails.style.display = 'none';
        quizList.style.display = 'block';
        backButton.classList.remove('show');
    });

    quizList.addEventListener('click', function() {
        backButton.classList.add('show');
    });
});
