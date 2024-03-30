document.addEventListener("DOMContentLoaded", function () {
  // Create an audio element for the notification sound
  var notificationSound = new Audio("../sounds/notifications-sound-toast-play.mp3");

  // Create a toast instance
  var myToast = new bootstrap.Toast(document.querySelector(".toast")); // Ignore error: undeclared variable 'bootstrap'

  // Track whether the toast has been shown
  var toastShown = false;

  // Function to check if the user has scrolled to the footer
  function checkScroll() {
    var footer = document.querySelector("#toastfooter");
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

  // Function to play the notification sound
  function playNotificationSound() {
    // Play the notification sound
    notificationSound.play();
  }

  // Add 'shown.bs.toast' event listener to play sound once the toast is shown
  document.querySelector(".toast").addEventListener("shown.bs.toast", function () {
    playNotificationSound();
  });

  // Add scroll event listener
  window.addEventListener("scroll", checkScroll);
});
