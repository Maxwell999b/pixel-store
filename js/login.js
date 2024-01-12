    // Function to save login data to localStorage
    function saveLoginData() {
        var username = document.getElementById('usrinputholder').value;
        var password = document.getElementById('pwdinputholder').value;
  
        // Check if both fields are filled
        if (username && password) {
          // Save data to localStorage
          localStorage.setItem('usrinputholder', username);
          localStorage.setItem('pwdinputholder', password);
  
          alert('Login data saved successfully!');
        } else {
          alert('Please fill in both username and password fields.');
        }
      }
  
      // Check if there is saved login data
      window.onload = function() {
        var savedUsername = localStorage.getItem('usrinputholder');
        var savedPassword = localStorage.getItem('pwdinputholder');
  
        // Check if both savedUsername and savedPassword are not null or undefined
        if (savedUsername && savedPassword) {
          // Auto-fill the login form
          document.getElementById('usrinputholder').value = savedUsername;
          document.getElementById('pwdinputholder').value = savedPassword;
  
          alert('Login data loaded!');
        }
      }