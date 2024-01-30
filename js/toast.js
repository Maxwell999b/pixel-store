document.addEventListener('DOMContentLoaded', function() {
  var myToast = new bootstrap.Toast(document.querySelector('.toast'));

  // Track whether the toast has been shown
  var toastShown = false;

  // Function to check if the user has scrolled to the footer
  function checkScroll() {
      var footer = document.querySelector('#toastfooter'); 
      var footerOffset = footer.offsetTop;
      var scrollTop = window.scrollY;
      var windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Check if the user has scrolled to the footer
      if (scrollTop + windowHeight >= footerOffset && !toastShown) {
          // Show the toast
          myToast.show();
          toastShown = true;
      }
  }

  // Add scroll event listener
  window.addEventListener('scroll', checkScroll);
});