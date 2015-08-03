$( document ).ready(function() {
	$('.saved').hide();
	$('.name-error').hide();
	$('.phone-number-error').hide();
	isLocalStorageEmpty();

	function isLocalStorageEmpty() {
		if (localStorage.length === 0) {
			$(".delete-btn-container").hide();
		} else {
			var savedName = localStorage.getItem('name');
			var savedNumber = localStorage.getItem('number');
			$("#name").attr("value", savedName);
			$("#number").attr("value", savedNumber);
		}
	}

	var displayNameError = function() {
		$('.name-error').show();
	};

	var displayPhoneNumberError = function() {
		$('.phone-number-error').show();
	};

	var isValid = function(phoneNumber) {
	  var phoneRegEx = /[1-9]{1}\d{9}(?:\d{1})?/;
	  var digits = phoneNumber.replace(/\D/g, "");
	  return (digits.match(phoneRegEx) !== null);
	};

	var saveInput =function() {
		if (localStorage) {
			var name = $('#name').val();
		  var phoneNumber = $('#number').val();
			if (name.length === 0) {
				displayNameError();
			} else if (isValid(phoneNumber)) {
	      localStorage.setItem('number', phoneNumber);
		  	localStorage.setItem('name', name);
				$(".delete-btn-container").show();
		  	showSaved();
	    } else {
	      displayPhoneNumberError();
	    }
		}
	};

	var showSaved = function() {
		$('.user-info-form').hide();
		$('.saved').show();
		var savedName = localStorage.getItem('name');
		$('.saved-notification').html('Saved: '+ savedName + '\'s Number');
	};

	var clearStorage = function() { 
		localStorage.clear();
	};

	$('.save-btn').on('click', function(event) {
		event.preventDefault();
		saveInput();
	});

	$('.back').on('click', function(event) {
		event.preventDefault();
		$('.saved').hide();
		$('.user-info-form').show();
		isLocalStorageEmpty();
	});

	$('.delete-btn').on('click', function(event) {
		event.preventDefault();
		clearStorage();	
		isLocalStorageEmpty();
	});

}); 