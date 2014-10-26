/*
 Signup Form Script
 This script will load the state select list and validate the form before submission
 */

document.addEventListener('DOMContentLoaded', function () {
    var form = document.forms['signup'];
    var stateList = form.state;
    for (var idx = 0; idx < usStates.length; idx++) {
        var state = usStates[idx];
        var option = document.createElement("OPTION");
        option.value = state.code;
        option.text = state.name;
        stateList.appendChild(option);
    }

    var occupation = form.occupation;
    form.occupation.addEventListener('change', function() {
        var occupationElement = occupation.value;
        if(occupationElement == "other") {
            form.occupationOther.style.display = "block";
        } else {
            form.occupationOther.style.display = "none";
            form.occupationOther.value = '';
        }
    });

    form.cancelButton.addEventListener('click', function() {
        if(window.confirm("You sure you want to leave?")) {
            window.location = "https://www.google.com";
        }
    });

    function onSubmit(eventObject) {
        var firstName = form.firstName.value;
        var lastName = form.lastName.value;
        var address1 = form.address1.value;
        var city = form.city.value;
        var state = form.state.value;
        var zip = form.zip.value;
        var currentOccupation = form.occupation.value;

        var validateForm = true;

        if(firstName.trim().length == 0) {
            validateForm = false;
            form.firstName.className = 'form-control invalid';
        } else {
            form.firstName.className = 'form-control';
        }

        if(lastName.trim().length == 0) {
            validateForm = false;
            form.lastName.className = 'form-control invalid';
        } else {
            form.lastName.className = 'form-control';
        }

        if(address1.trim().length == 0) {
            validateForm = false;
            form.address1.className = 'form-control invalid';
        } else {
            form.address1.className = 'form-control';
        }

        if(city.trim().length == 0) {
            validateForm = false;
            form.city.className = 'form-control invalid';
        } else {
            form.city.className = 'form-control';
        }

        var testZipCode = new RegExp('^\\d{5}$');
        if(!testZipCode.test(zip)) {
            validateForm = false;
            form.zip.className = 'form-control invalid';
        } else {
            form.zip.className = 'form-control';
        }

        if(!currentOccupation) {
            validateForm = false;
            form.occupation.className = 'form-control invalid';
        } else {
            form.occupation.className = 'form-control';
        }

        if (currentOccupation == "other") {
            var currentOccupationOther = form.occupationOther.value;
            if(currentOccupationOther.trim().length == 0) {
                validateForm = false;
                form.occupationOther.className = 'form-control invalid';
            } else {
                form.occupationOther.className = 'form-control';
            }
        }

        if(!state) {
            validateForm = false;
            form.state.className = 'form-control invalid';
        } else {
            form.state.className = 'form-control';
        }

        if(form.birthdate.value) {
            var age = form.birthdate.value;
            if(calculateAge(age) >= 13) {
                form.birthdate.className = 'form-control';
                document.getElementById('birthdateMessage').innerHTML = "";
            } else {
                form.birthdate.className = 'form-control invalid';
                validateForm = false;
                document.getElementById('birthdateMessage').innerHTML = "You are not 13 years old.";
            }
        } else {
            form.birthdate.className = 'form-control invalid';
            validateForm = false;
        }

        if(!validateForm) {
            eventObject.preventDefault();
            eventObject.returnValue = false;
            return false;
        }
    }
    form.addEventListener('submit', onSubmit);

    function calculateAge (dob) {
        dob = new Date(dob);
        var today = new Date();

        var yearsDiff = today.getFullYear() - dob.getFullYear();
        var daysDiff = today.getDate() - dob.getUTCDate();
        var monthsDiff = today.getMonth() - dob.getUTCMonth();

        if (monthsDiff < 0 || (monthsDiff == 0 && daysDiff < 0)) {
            yearsDiff--;
        }
        return yearsDiff;
    }
});