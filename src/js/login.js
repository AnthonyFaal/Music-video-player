const users = [
    {
      id: 1,
      username: "Faal",
      email: "faal@gmail.com",
      password: "123456",
      avatar: "https://th.bing.com/th/id/OIP.OYbzbbyzogwtriubL2pP0AHaHa?w=200&h=200&c=7&r=0&o=5&pid=1.7"
    },
    {
      id: 2,
      username: "user2",
      email: "user2@example.com",
      password: "password456",
      avatar: "https://th.bing.com/th/id/OIP.OYbzbbyzogwtriubL2pP0AHaHa?w=200&h=200&c=7&r=0&o=5&pid=1.7"
    }
  ];

  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      // Store user data in session storage
      sessionStorage.setItem('loggedInUser', JSON.stringify(user));
      
      // Redirect to main.html with user data as URL parameters
      window.location.href = `src/pages/main.html?username=${encodeURIComponent(user.username)}&avatar=${encodeURIComponent(user.avatar)}`;
    } else {
      alert('Invalid email or password.');
    }
  });

  // Check if user is already logged in (for "keep me logged in")
  window.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      window.location.href = `src/pages/main.html?username=${encodeURIComponent(user.username)}&avatar=${encodeURIComponent(user.avatar)}`;
    }
  });

  // Prevent caching of the login page after logout or direct access
  window.addEventListener('pageshow', function(event) {
    var historyTraversal = event.persisted || 
                           (typeof window.performance != 'undefined' && 
                                window.performance.navigation.type === 2);
    if (historyTraversal) {
      // Handle back or forward button
      window.location.reload();
    }
  });
