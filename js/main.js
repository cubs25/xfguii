

jQuery(document).ready(function($){
	// browser window scroll (in pixels) after which the "menu" link is shown
	var offset = 300;

	var navigationContainer = $('#cd-nav'),
		mainNavigation = navigationContainer.find('#cd-main-nav ul');

	//hide or show the "menu" link
	checkMenu();
	$(window).scroll(function(){
		checkMenu();
	});

	//open or close the menu clicking on the bottom "menu" link
	$('.cd-nav-trigger').on('click', function(){
		$(this).toggleClass('menu-is-open');
		//we need to remove the transitionEnd event handler (we add it when scolling up with the menu open)
		mainNavigation.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend').toggleClass('is-visible');

	});

	function checkMenu() {
		if( $(window).scrollTop() > offset && !navigationContainer.hasClass('is-fixed')) {
			navigationContainer.addClass('is-fixed').find('.cd-nav-trigger').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
				mainNavigation.addClass('has-transitions');
			});
		} else if ($(window).scrollTop() <= offset) {
			//check if the menu is open when scrolling up
			if( mainNavigation.hasClass('is-visible')  && !$('html').hasClass('no-csstransitions') ) {
				//close the menu with animation
				mainNavigation.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					//wait for the menu to be closed and do the rest
					mainNavigation.removeClass('is-visible is-hidden has-transitions');
					navigationContainer.removeClass('is-fixed');
					$('.cd-nav-trigger').removeClass('menu-is-open');
				});
			//check if the menu is open when scrolling up - fallback if transitions are not supported
			} else if( mainNavigation.hasClass('is-visible')  && $('html').hasClass('no-csstransitions') ) {
					mainNavigation.removeClass('is-visible has-transitions');
					navigationContainer.removeClass('is-fixed');
					$('.cd-nav-trigger').removeClass('menu-is-open');
			//scrolling up with menu closed
			} else {
				navigationContainer.removeClass('is-fixed');
				mainNavigation.removeClass('has-transitions');
			}
		} 
	}
});




function saveToggleState(state) {
  localStorage.setItem('toggleState', state);
}
function getToggleState() {
  return localStorage.getItem('toggleState');
}
try {
  var toggleState = getToggleState() || 'off'; // Obtener el estado guardado del toggle
  Typekit.load({
    async: true,
    active: function() {
      // Activar o desactivar el toggle en consecuencia
      if (toggleState === 'on') {
        document.documentElement.classList.add('typekit-loaded');
      } else {
        document.documentElement.classList.remove('typekit-loaded');
      }
    }
  });
} catch (e) {}



//TOGGLE//

const toggle = document.getElementById('toggle');
const image = document.querySelector("#image");

toggle.addEventListener('change', () => {
  document.body.classList.toggle('night');
  
  if (toggle.checked) {
    image.src = "images/logo-cubs25-swap.jpg";
    image.alt = "Night Image";
    image2.src = "images/logo-obmf-swap.jpg";
    image2.alt = "Night Image";
  } else {
    image.src = "images/logo-cubs25.jpg";
    image.alt = "Day Image";
     image2.src = "images/logo-obmf.jpg";
    image2.alt = "Day Image";
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.toggle-wrapper').classList.add('show');
});




// obtiene la fecha y hora actual
const currentDate = new Date();

// establece la hora de activación del modo nocturno a las 14:22 horas
const nightActivationTime = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate(),
  01,
  36,
  0
);

// calcula la cantidad de tiempo hasta la hora de activación del modo nocturno
const nightTimeUntilActivation = nightActivationTime - currentDate;

// espera hasta que sea la hora de activación y luego activa el modo nocturno
setTimeout(() => {
  toggle.checked = true;
  toggle.dispatchEvent(new Event('change'));

  // establece la hora de activación del modo día a las 14:32 horas
  const dayActivationTime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    07,
    01,
    0
  );

  // calcula la cantidad de tiempo hasta la hora de activación del modo día
  const dayTimeUntilActivation = dayActivationTime - currentDate;

  // espera hasta que sea la hora de activación del modo día y luego activa el modo día
  setTimeout(() => {
    toggle.checked = false;
    toggle.dispatchEvent(new Event('change'));
  }, dayTimeUntilActivation);
}, nightTimeUntilActivation);












