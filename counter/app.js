// JM indvividual attempt

let count = 0;

const btns = document.querySelectorAll('.btn');
const value = document.getElementById('value');


btns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const styles = e.currentTarget.classList;
        if (styles.contains('increase')) {
            console.log('yeah');
            count++;
        } else if (styles.contains('decrease')) {
            count--;
        } else count = 0; {}
        if (count > 0) {
            value.style.color = 'green';
        } else if (count < 0) {
            value.style.color = 'red';
        } else value.style.color = 'black';
        value.textContent = count;
    })
});


// let count = 0; // set initialy count

// //select value and buttons
// const value = document.querySelector('#value');
// const btns = document.querySelectorAll('.btn');

// console.log(btns);

// btns.forEach(btn => {
//     btn.addEventListener('click', function(e) { //e = event to understand which button has been selected
//         const styles = e.currentTarget.classList;
//         if (styles.contains('decrease')) {
//             count--;
//         } else if (styles.contains('increase')) {
//             count++;
//         } else {
//             count = 0;
//         }
//         if (count > 0) {
//             value.style.color = 'green';
//         } else if (count < 0) {
//             value.style.color = 'red';
//         } else {
//             value.style.color = 'blue';
//         }
//         value.textContent = count;
//     });
// });