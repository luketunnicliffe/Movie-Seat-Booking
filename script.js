//This is a small app that demonstrates usage of local storage, selectors, and CSS flex box.


const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
//change ticket price into a number by adding a plus sign
let ticketPrice = +movieSelect.value;

//Update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    updateSelectedCount();
});


//Seat click event
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
    }

    updateSelectedCount();

})

