document.getElementById('registerForm').addEventListener('register', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Basic validation
  if (!username || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match. Please try again.');
    return;
}

  // Send data to server (replace with your actual server-side script)
  fetch('/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert('Registration successful!');
          // Redirect to login page or other appropriate action
          window.location.href = 'login.html';
      } else {
          alert('Registration failed. Please try again.');
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
  });
});