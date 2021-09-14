//This is a small app that demonstrates usage of local storage, selectors, the spread operator, and CSS flex box.


const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

//change ticket price into a number by adding a plus sign
let ticketPrice = +movieSelect.value;


// Save selected movie index and price

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    //copy selected seats into an array
    //map through the array
    //return a new array of indexes
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat)); //spread operator

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;



}

//Get data from localStorage and populate UI
function populateUI () {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    console.log(selectedSeats);
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) =>  {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});


//Seat click event
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
    }

    updateSelectedCount();

})

//initial count and total set
updateSelectedCount();

