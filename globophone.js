$( document ).ready(function() {
	$('.saved').hide();
	$('.name-error').hide();
	$('.phone-number-error').hide();

	if (localStorage.length === 0) {
		$(".delete-btn").hide();
	}

	var displayNameError = function() {
		$('.name-error').show();
	}

	var displayPhoneNumberError = function() {
		$('.phone-number-error').show();
	}

	var isValid = function(phoneNumber) {
	  var phoneRegEx = /[1-9]{1}\d{9}(?:\d{1})?/;
	  var digits = phoneNumber.replace(/\D/g, "");
	  return (digits.match(phoneRegEx) !== null);
	}

	var saveInput =function() {
		if (localStorage) {
			var name = $('#name').val();
		  var phoneNumber = $('#number').val();
			if (name.length === 0) {
				displayNameError();
			} else if (isValid(phoneNumber)) {
	      localStorage.setItem('number', phoneNumber);
		  	localStorage.setItem('name', name);
				$(".delete-btn").show();
		  	showSaved();
	    } else {
	      displayPhoneNumberError();
	    }
		}
	}

	var showSaved = function() {
		$('.user-info-form').hide();
		$('.saved').show();
		var savedName = localStorage.getItem('name');
		$('.saved-notification').html('Saved: '+ savedName + '\'s Number');
	}

	var clearStorage = function() { 
		localStorage.clear();
		$('.delete-btn').hide();
	}

	$('.save-btn').on('click', function(event) {
		event.preventDefault();
		saveInput();
	});

	$('.back').on('click', function() {
		$('.saved').hide();
		$('.user-info-form').show();
	});

	$('.delete-btn').on('click', clearStorage());


}); 