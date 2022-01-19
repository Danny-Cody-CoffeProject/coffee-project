"use strict"



let coffees = function () {
    if (window.localStorage.getItem("coffees") === null) {
        return [
            {id: 1, name: 'Light City', roast: 'Americano', image:" assets/coffe-americano.jpeg"},
            {id: 2, name: 'Half City', roast: 'Americano', image:" assets/coffe-americano.jpeg"},
            {id: 3, name: 'Cinnamon', roast: 'Americano', image:" assets/coffe-americano.jpeg"},
            {id: 4, name: 'City', roast: 'Iced', image:" assets/coffee-iced.jpeg"},
            {id: 5, name: 'American', roast: 'Iced', image:" assets/coffee-iced.jpeg"},
            {id: 6, name: 'Breakfast', roast: 'Iced', image:" assets/coffee-iced.jpeg"},
            {id: 7, name: 'High', roast: 'Iced', image:" assets/coffee-iced.jpeg"},
            {id: 8, name: 'Continental', roast: 'Iced', image:" assets/coffee-iced.jpeg"},
            {id: 9, name: 'New Orleans', roast: 'Mocha', image:" assets/coffee-mocha.jpeg"},
            {id: 10, name: 'European', roast: 'Mocha', image:" assets/coffee-mocha.jpeg"},
            {id: 11, name: 'Espresso', roast: 'Mocha', image:" assets/coffee-mocha.jpeg"},
            {id: 12, name: 'Viennese', roast: 'Mocha', image:" assets/coffee-mocha.jpeg"},
            {id: 13, name: 'Italian', roast: 'Mocha', image:" assets/coffee-mocha.jpeg"},
            {id: 14, name: 'French', roast: 'Mocha', image:" assets/coffee-mocha.jpeg"}
        ]
    } else {
        return JSON.parse(window.localStorage.getItem("coffees"));
    }
}();




// RENDER HTML FOR COFFEES
function renderCoffee(coffee) {
    var html = '<div class="col-3 mx-3 mb-5 p-0" id=card><h2>' +   coffee.name  +  '</h2><hr><img src="' + coffee.image + '"><hr><p>' + '-' +   coffee.roast  + '-' + '</p></div>';
    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(var i = 0;i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}



// SELECT BY STYLE
function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];

    if (selectedRoast === 'All') {
        tbody.innerHTML = renderCoffees(coffees);
    } else {
        coffees.forEach(function (coffee) {
            if (coffee.roast === selectedRoast) {
                filteredCoffees.push(coffee);
            }
        });
        tbody.innerHTML = renderCoffees(filteredCoffees);
    }
}




// LIVE SEARCH FUNCTION
function searchCoffee() {
    let desiredCoffee = document.getElementById('searched-coffee').value.toLowerCase();
    let coffeeChoice = [];

    coffees.forEach(function (coffee) {
        if (coffee.name.toLowerCase().replace(/\s+/g, '').includes(desiredCoffee)) {
            coffeeChoice.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(coffeeChoice);
}


// ADD A COFFEE FUNCTION
// FOOTER FUNCTION STARTS HERE
function newCoffee(e) {
    e.preventDefault();
    let newCoffeeSubmission = {};
    let newSubmissionName = (newCoffeeName.value).toLowerCase();
    let newSubmissionRoast = newCoffeeRoast.value;
    newCoffeeSubmission.id = coffees.length + 1;
    newCoffeeSubmission.name = newSubmissionName;
    newCoffeeSubmission.roast = newSubmissionRoast;

// HAVE TO ENTER NAME
    if (newSubmissionName === '') {
        dupeAlert.innerHTML = "Please Enter A Coffee Name"
        return;
    }

// HAVE TO ENTER ROAST
    if (newSubmissionRoast === ''){
        dupeAlert.innerHTML = "What Kind Of Coffee Is It ?"
        return;
    }

// CANT BE DUPLICATE COFFEE
    for (let i = 0; i < coffees.length; i++) {
        if (newCoffeeName.value.toLowerCase().replace(/\s+/g, '') === coffees[i].name.toLowerCase().replace(/\s+/g, '')) {
            dupeAlert.innerHTML = "Someone Beat You To That One, Try Again ! ";
            return;
            // THIS ADDS IMAGE TO THE NEW COFFEE
        } else {
            newCoffeeSubmission.name = newSubmissionName;
            newCoffeeSubmission.roast = newSubmissionRoast;
            dupeAlert.innerHTML = '';
            if (newSubmissionRoast === 'Americano') {
                newCoffeeSubmission.image = " assets/coffe-americano.jpeg";
            } else if (newSubmissionRoast === 'Iced') {
                newCoffeeSubmission.image = ' assets/coffee-iced.jpeg'
            } else (newSubmissionRoast === 'Mocha')
            newCoffeeSubmission.image = ' assets/coffee-mocha.jpeg';
        }
    }
    coffees.push(newCoffeeSubmission);
    console.log(coffees);
    tbody.innerHTML = renderCoffees(coffees);
    window.localStorage.setItem('coffees', JSON.stringify(coffees));
    location.reload();
}




// SHOWS SEARCHED COFFEES WITH EXACT NAME ENTERED
// DONT NEED AFTER LIVESEARCH WAS IMPLEMENTED
// function searchCoffee(e) {
//     e.preventDefault();
//     let desiredCoffee = document.getElementById('searched-coffee').value;
//     let coffeeChoice = [];
//
//     coffees.forEach(function (coffee) {
//         if (coffee.name == desiredCoffee) {
//             coffeeChoice.push(coffee);
//         }
//     });
//     tbody.innerHTML = renderCoffees(coffeeChoice);
// }





// BOTTOM OF JS

// DONT NEED AFTER LIVESEARCH WAS IMPLEMENTED
// var search = document.querySelector('#searched-btn')
// search.addEventListener('click', searchCoffee);



// CREATES COFFEE CARDS IN DIV.ROW
var tbody = document.querySelector('#cards');

// ADD NEW COFFEE VALUES
let submitCoffee = document.querySelector('#contribute-coffee')
let newCoffeeName = document.querySelector('#added-coffee-name');
let newCoffeeRoast = document.querySelector('#added-coffee-roast');

// SHOWS ALERT FOR DUPLICATE/NOT EXISTANT
let dupeAlert = document.querySelector('#duplicate-coffee');

// SELECT BY ROAST
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
submitButton.addEventListener('click', updateCoffees);

// ADD NEW COFFEE BUTTON
submitCoffee.addEventListener('click', newCoffee)

// CREATES COFFEE CARDS
tbody.innerHTML = renderCoffees(coffees);



