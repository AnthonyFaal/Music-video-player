// Dummy notifications data
const notifications = [
  { message: 'New fun game added!', link: '#' },
  { message: 'Check out the latest music!', link: '#' },
  { message: 'Watch the newest cartoons!', link: '#' },
  { message: 'New quizzes available!', link: '#' },
  { message: 'Special event this weekend!', link: '#' }
];

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function loadPage(page) {
  const username = getQueryParam('username');
  const avatar = getQueryParam('avatar');
  const frame = document.getElementById('contentFrame');
  
  // Update the src attribute with query parameters
  frame.src = `./${page}?username=${username}&avatar=${avatar}`;

  // Close the sidebar when an item is clicked
  document.getElementById('sidebar').classList.remove('show');
}

// Set user data on page load
const username = getQueryParam('username');
const avatar = getQueryParam('avatar');
if (username && avatar) {
  document.getElementById('username').textContent = username;
  document.getElementById('sidebarUsername').textContent = username;
  document.getElementById('appAvatar').src = avatar;
  document.getElementById('sidebarAvatar').src = avatar;
}

// Toggle sidebar visibility and menu icon
document.getElementById('menuIcon').addEventListener('click', () => {
  document.getElementById('sidebar').classList.add('show');
});

document.getElementById('closeIcon').addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('show');
});

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', function() {
  sessionStorage.removeItem('loggedInUser');
  window.location.href = '../../login.html';  // Adjust the path according to your file structure
});

document.getElementById('logoutBtnSidebar').addEventListener('click', function() {
  sessionStorage.removeItem('loggedInUser');
  window.location.href = '../../index.html';  // Adjust the path according to your file structure
});

// Check if user is already logged in
window.addEventListener('DOMContentLoaded', function() {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    window.location.href = '../../index.html';  // Adjust the path according to your file structure
  }

  // Display notifications
  displayNotifications();
});

// Add event listeners to sidebar items
const sidebarItems = document.querySelectorAll('.sidebar ul li a');
sidebarItems.forEach(item => {
  item.addEventListener('click', function() {
    document.getElementById('sidebar').classList.remove('show');
  });
});

// Function to display notifications
function displayNotifications() {
  const notificationsList = document.getElementById('notificationsList');
  notifications.forEach(notification => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = notification.link;
    link.textContent = notification.message;
    listItem.appendChild(link);
    notificationsList.appendChild(listItem);
  });
}

// Show notifications dropdown
document.getElementById('notificationsIcon').addEventListener('click', () => {
  const dropdown = document.getElementById('notificationsDropdown');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// Hide notifications dropdown when clicking outside of it
document.addEventListener('click', function(event) {
  const dropdown = document.getElementById('notificationsDropdown');
  const notificationsIcon = document.getElementById('notificationsIcon');
  if (!dropdown.contains(event.target) && !notificationsIcon.contains(event.target)) {
    dropdown.style.display = 'none';
  }
});
