    function validateEmail(email) {
      // Regular expression for a valid email address
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    function validateFullname(fullname) {
      // Regular expression for a valid full name (assuming it contains only letters and spaces)
      var fullnameRegex = /^[A-Za-z\s]+$/;
      return fullnameRegex.test(fullname);
    }

    function validateMessage(message) {
      // Check if the message has at least 15 characters
      return message.length >= 15;
    }

    function sendMessage() {
      var fullnameInput = document.getElementById('fullnameInput');
      var emailInput = document.getElementById('emailInput');
      var messageTextarea = document.getElementById('messageTextarea');
      var validationAlert = document.getElementById('validationAlert');
      var validationErrors = document.getElementById('validationErrors');
      var successModal = new bootstrap.Modal(document.getElementById('successModal'));
    
      // Reset previous validation errors
      validationErrors.innerHTML = '';
    
      var errors = [];
    
      // Check and display validation errors
      if (!validateFullname(fullnameInput.value)) {
        errors.push('Fullname is invalid');
      }
    
      if (!validateEmail(emailInput.value)) {
        errors.push('Email is invalid');
      }
    
      if (!validateMessage(messageTextarea.value)) {
        errors.push('Message should be at least 15 characters long');
      }
    
      if (errors.length > 0) {
        // Show the validation alert with specific error messages
        validationAlert.classList.remove('d-none');
        errors.forEach(function(error) {
          var errorItem = document.createElement('li');
          errorItem.textContent = error;
          validationErrors.appendChild(errorItem);
        });
      } else {
        // Process the form submission or take further action
        validationAlert.classList.add('d-none'); // Hide the validation alert
        
        // Show the success modal
        successModal.show();
        
        // Clear the input fields and textarea
        fullnameInput.value = '';
        emailInput.value = '';
        messageTextarea.value = '';
      }
    }
    
// JavaScript function to clear the fields and hide the alert
function clearFields() {
  var fullnameInput = document.getElementById('fullnameInput');
  var emailInput = document.getElementById('emailInput');
  var messageTextarea = document.getElementById('messageTextarea');
  var validationAlert = document.getElementById('validationAlert');
  var validationErrors = document.getElementById('validationErrors');

  // Clear input fields
  fullnameInput.value = '';
  emailInput.value = '';
  messageTextarea.value = '';

  // Hide the validation alert
  validationAlert.classList.add('d-none');

  // Clear previous validation errors
  validationErrors.innerHTML = '';
}

