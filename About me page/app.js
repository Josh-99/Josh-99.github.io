//toggle open close links on mobile 
const navtoggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');


navtoggle.addEventListener('click', function() {
    const linksHeight = links.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    //console.log('yeah');
    if (containerHeight === 0) {
        linksContainer.style.height = `${linksHeight}px`;
    } else {
        linksContainer.style.height = 0;
    }

});

//fixed nav and topLink
const nav = document.querySelector('.nav');
const topLink = document.querySelector('.top-link');
//why did having these outside of the
//function not work - I thought these would be global - needs to be inside the scroll callback function 


window.addEventListener('scroll', function() {

    const scrollDepth = window.pageYOffset;
    //console.log(scrollDepth);
    const navHeight = nav.getBoundingClientRect().height;
    //make top nav sticky at a certain scroll depth
    if (scrollDepth > navHeight) {
        nav.classList.add('fixed-nav');
    } else {
        nav.classList.remove('fixed-nav');
    }

    //show topLink at certain scroll depth
    if (scrollDepth > 350) {
        topLink.classList.add('show-link');
    } else {
        topLink.classList.remove('show-link');
    }

});

//scroll to correct location on the page 
const link = document.querySelectorAll('.link');
link.forEach(l => {
    l.addEventListener('click', function(e) {
        e.preventDefault(); // removed default functionality of HTML

        // navigate to specific height
        const id = e.currentTarget.getAttribute('href').slice(1); //in order to hook up with the id the id needs to be within a section in html
        //console.log(id); 
        const element = document.getElementById(id);
        //console.log(element.offsetTop);

        //calc the heights
        const navHeight = nav.getBoundingClientRect().height;
        const fixedNav = nav.classList.contains('fixed-nav');
        const containerHeight = linksContainer.getBoundingClientRect().height;

        let position = element.offsetTop - navHeight; //cater for when fixed nav is populated

        if (!fixedNav) { //sections have different heights if the nav is fixed or not. When nav bar is fixed we take out the height of the nav bar from the flow of the doc because the position is fixed
            position = position - navHeight;
        }

        if (navHeight > 82) { //82 is setup for top of navbar. > 82 we'd opened the container. We were previously calculating the position based on the height of the container
            position = position + containerHeight;
        }

        window.scrollTo({
                left: 0,
                top: position,
            })
            //close toggle when selected
        linksContainer.style.height = 0;
    })
});

//show link when button clicked

const formContainer = document.querySelector('.form-container');
//const form = document.querySelector('.form');
const openForm = document.querySelector('.form-button');


openForm.addEventListener('click', function() {
    //console.log('yeah');
    formContainer.classList.toggle('show-form')
});


////gather user contact details 

const getInTouchInfo = [];

function handleClick(e) {
    e.preventDefault();
    console.log(e);
    let addUserInfo = {
        id: Date.now(),
        name: document.querySelector('.name').value,
        number: document.querySelector('.number').value,
        email: document.querySelector('.email').value,
        message: document.querySelector('.message').value
    }
    getInTouchInfo.push(addUserInfo);
    document.querySelector('form').reset();
    console.log(getInTouchInfo);

    //save to local storage
    localStorage.setItem('MyUserInfo', JSON.stringify(getInTouchInfo)); //everything in local storage has to be a string so we need to use JSON.stringify; 
};

//set up the button for form
const submit = document.querySelector('.submit');

submit.addEventListener('click', handleClick);




////insert dynamic date into webpage
date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();