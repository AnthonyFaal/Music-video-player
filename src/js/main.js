// main.js 


// Function to load content into the main-container
function loadContent(file) {
  fetch(`./${file}`)
    .then(response => response.text())
    .then(data => {
      document.getElementById('content').innerHTML = data;
      document.querySelector('.content-section').style.display = 'block';
    })
    .catch(error => {
      document.getElementById('content').innerHTML = 'Error loading content.';
      console.error('Error loading content:', error);
    });
}

// Event listener for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const file = this.getAttribute('data-section');
    loadContent(file);
  });
});



