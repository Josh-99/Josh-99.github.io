const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
// hex colors geneerated through # and a combination of the above
const color = document.querySelector('.color');
const btn = document.getElementById('btn');



const btn = document.getElementById('btn');
const color = document.querySelector('.color');

btn.addEventListener('click', function() {
    let hexColor = '#';
    for (let i = 0; i < 6; i++) {
        hexColor += hex[getRandomNumber()];
    }
    const randomNumber = getRandomNumber();
    color.textContent = hexColor;
    document.body.style.backgroundColor = hexColor;
    console.log(randomNumber);
});

const getRandomNumber = () => {
    return Math.floor(Math.random() * hex.length);
};