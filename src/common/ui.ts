import jump from 'jump.js';

//Hamburger menus
document.addEventListener('DOMContentLoaded', function() {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function($el) {
      $el.addEventListener('click', function() {
        // Get the target from the "data-target" attribute
        let target = $el.dataset.target,
          $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }

  /**
   * SmoothScroll script
   */

  const _links = Array.prototype.slice.call(document.querySelectorAll('.navbar-item'), 0);

  if (_links.length > 0) {
    _links.forEach(el => {
      el.addEventListener('click', () => {
        jump(`#${el.dataset.target}`);
      });
    });
  }

  /**
   * Init Button
   */
  const INIT_LINK = 'init_form';
  const ADDRESS_FROM = 'address_form';
  const initButton: HTMLElement = document.getElementById(INIT_LINK);

  if (initButton)
    initButton.addEventListener('click', () => {
      jump(`#${ADDRESS_FROM}`);
    });

  /**
   * Dismiss Alert button binding
   */
  const ALERT_DISMISS_ID = 'notification-alert-dismiss';
  const dissmissAlertButton = document.getElementById(ALERT_DISMISS_ID);
  if (!!dissmissAlertButton) {
    dissmissAlertButton.onclick = dissmissAlerNotification;
  }
});

function dissmissAlerNotification() {
  const ALERT_ID = 'notification-alert';
  const alertElement = document.getElementById(ALERT_ID);
  alertElement.className += ' hidden';
  // alertElement.style.top = '-100%';
}
