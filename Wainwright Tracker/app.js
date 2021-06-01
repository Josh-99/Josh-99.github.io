//create object data 

const mountains = [{
        name: 'Arnison Crag',
        image: './Images/arnison.jpg',
        region: 'Eastern',
        height: 1424,
        averagetime: '2 Hours',
        difficulty: '2/5',
        complete: '',
        climbers: '',
        starttime: '',
        ascenttime: '',
        summittime: '',
        views: '',
        descenttime: '',
        endtime: '',
    },
    {
        name: 'Blencathra',
        image: './Images/blencathra.jpg',
        region: 'Northern',
        height: 2847,
        averagetime: '3-4 Hours',
        difficulty: '4.5/5',
        complete: '',
        climbers: '',
        starttime: '',
        ascenttime: '',
        summittime: '',
        views: '',
        descenttime: '',
        endtime: '',
    },
    {
        name: 'Scafell Pike',
        image: './Images/scafell-pike.jpg',
        region: 'Southern',
        height: 3210,
        averagetime: '4-5 Hours',
        difficulty: '5/5',
        complete: '',
        climbers: '',
        starttime: '',
        ascenttime: '',
        summittime: '',
        views: '',
        descenttime: '',
        endtime: '',
    },
    {
        name: 'Yewbarrow',
        image: './Images/yewbarrow.jpg',
        region: 'Western',
        height: 2058,
        averagetime: '2-3 Hours',
        difficulty: '3.5/5',
        complete: '',
        climbers: '',
        starttime: '',
        ascenttime: '',
        summittime: '',
        views: '',
        descenttime: '',
        endtime: '',
    }
];


//sticky top nav

const navHeader = document.querySelector('.nav-header');
const secondNav = document.querySelector('.second-nav');
const nav = document.querySelector('.nav');

window.addEventListener('scroll', function(e) {
    const scrollDepth = window.scrollY;
    const secondNavHeight = secondNav.getBoundingClientRect().height;
    // console.log(scrollDepth);
    if (this.oldScroll > this.scrollY && scrollDepth > 30) {
        nav.classList.add('fixed-nav')
    } else {
        nav.classList.remove('fixed-nav')
    }
    this.oldScroll = this.scrollY
    if (!nav.classList.contains('fixed-nav') && scrollDepth > secondNavHeight) {
        navHeader.classList.add('fixed-nav')
    } else {
        navHeader.classList.remove('fixed-nav');
    }
})

//open nav-toggle drawer

const navToggle = document.querySelector('.nav-toggle');
const filterContainer = document.querySelector('.filter-container');

navToggle.addEventListener('click', function() {
    filterContainer.classList.toggle('show-filter-container')

    //add grey background color when show-filter-container open
    const mainSection = document.querySelector('.main-section');
    if (filterContainer.classList.contains('show-filter-container')) {
        mainSection.classList.add('opaque-background')
    } else {
        mainSection.classList.remove('opaque-background')
    }
});

//close nav-toggle drawer if user clicks outside filters or scrolls - may need to be removed if a load of filters are introduced
const mainSection = document.querySelector('.main-section');
const handleFilter = () => {
    if (filterContainer.classList.contains('show-filter-container')) {
        filterContainer.classList.remove('show-filter-container')
    }
    if (mainSection.classList.contains('opaque-background')) {
        mainSection.classList.remove('opaque-background')
    }
};
mainSection.addEventListener('click', handleFilter);
window.addEventListener('scroll', handleFilter); //should this be applied against a div? if so, how as using mainsection doesnt work




//open and close filter group

const filterGroup = document.querySelectorAll('.filter-group');
const filterWrapper = document.querySelector('.filter-wrapper');
const filterOptions = document.querySelector('.filter-options');
const filterWrapperComplete = document.querySelector('.filter-wrapper-complete');
const filterOptionsComplete = document.querySelector('.filter-options-complete');


filterGroup.forEach(filter => {
    filter.addEventListener('click', function(e) {

        // console.log('yeah');


        const wrapperHeight = filterWrapper.getBoundingClientRect().height;
        const filterOptionsHeight = filterOptions.getBoundingClientRect().height;
        const wrapperHeightComplete = filterWrapperComplete.getBoundingClientRect().height;
        const filterOptionsHeightComplete = filterOptionsComplete.getBoundingClientRect().height;
        const element = e.currentTarget.classList;

        if (element.contains('region') && wrapperHeight === 0) {
            filterWrapper.style.height = `${filterOptionsHeight}px`;
        } else if (element.contains('region') && filterWrapper.style.height != 0) {
            filterWrapper.style.height = 0;
        } else if (element.contains('completion-status') && wrapperHeightComplete === 0) {
            filterWrapperComplete.style.height = `${filterOptionsHeightComplete}px`;
        } else {
            filterWrapperComplete.style.height = 0;
        }

    })
})

//add / remove ticks in filters
const filter = document.querySelectorAll('.filter');
// const showTick = document.querySelectorAll('.fa-check');

filter.forEach(filterOption => {
    filterOption.addEventListener('click', function(e) {
        filterOption.firstElementChild.classList.toggle('show-fa-check')
            // console.log(e);
    })
})


//filter mountains based on ticks
const doneBtn = document.querySelector('.done-btn');
const filterArray = [];
//filter for ticks and close filter-container 
filter.forEach(filter => {
    filter.addEventListener('click', function() {
        const filterText = filter.innerText;
        if (filter.firstElementChild.classList.contains('show-fa-check')) {
            filterArray.push(filterText);
        } else {
            for (let i = 0; i < filterArray.length; i++) {
                if (filterArray[i] === filterText) {
                    filterArray.splice(i, 1)
                }
            }
        }
        console.log(filterArray);
    })
})

doneBtn.addEventListener('click', function(e) {
    //filter mountains using what is populated in the array - Not complete doesn't work
    const searchMountains = mountains.filter(mountain => {
        if (filterArray.includes(mountain.region))
            return mountain.region;
        else if (filterArray.includes('Complete')) {
            return mountain.complete === 'Complete';
        } else if (filterArray.includes('Not Complete')) {
            return mountain.complete === '' || 'Not Complete';
        }
    })
    displayMountainsFunction(searchMountains);


    //return all the mountains is the array is empty
    if (filterArray.length === 0) {
        displayMountainsFunction(mountains);
    }

    filterContainer.classList.remove('show-filter-container');
    mainSection.classList.remove('opaque-background');
})



//search bar functionality
const search = document.querySelector('.search');
search.addEventListener('keyup', function(e) {
    // console.log(e);
    const searchString = e.target.value.toLowerCase();
    // console.log(searchString);
    const searchMountains = mountains.filter(mountain => {
        return mountain.name.toLowerCase().includes(searchString);

    })
    console.log(searchMountains);
    displayMountainsFunction(searchMountains);
})

//dynamically populate the mountains and info
// const mainSection = document.querySelector('.main-section');

const displayMountainsFunction = (searchMountains = mountains) => { //expecting searchMoutains but if it doesn't get seacrMontains it will default to mountains and show all within the array
    let displayMountains = searchMountains.map(mountain => { //map used to map info from array to HTML input
        //console.log(mountain);
        return `<section class='${mountain.name}'>
        <div class ='mountain-border'>
        <div class='name'>${mountain.name}</div>
        <img src=${mountain.image} class='mountain-image' alt=${mountain.name}>
        <div class='mountain-info'>
            <ul>
            <li class='mountain-region'>Region: ${mountain.region}</li>
            <li class='height'>Height (ft): ${mountain.height}</li>
            <li class='average-time'>Average Walk Time: ${mountain.averagetime}</li>
            <li class='difficulty stars'>Difficulty: <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>${mountain.difficulty}</li>
            <li><form class='completion-status'>
                <label class='complete'>Complete</label>
                <input class='${mountain.name} checkbox' type='checkbox' alt="mountain complete checkbox">
            </form>
            </li>
            </ul>
            <a href ='./pdp.html' class='more-info btn'>Add More Info</a>
        </div>
        </div>
        <br>
        <hr class='seperator'>
        <br>
    </section>`

    });
    displayMountains = displayMountains.join(''); //join in 1 string so we can import to main.section. use empty join so we don't seperate sections with commas
    mainSection.innerHTML = displayMountains;
};

window.addEventListener('DOMContentLoaded', displayMountainsFunction()); //do something when the dom has loaded

//sort functions 

const sort = document.querySelector('.sort');

sort.addEventListener('change', function(e) {
    console.log(e.target.value); //look at adding classLists to options in dynamic HTML above
    //console.log(this.value); //why does this return undefined but e.target.value works?

    const sortAToZ = mountains.sort((a, b) => {
        if (e.target.value === 'A - Z' && a.name > b.name) {
            //console.log('yeah');
            return 1;
        } else {
            return -1;
        }
    })

    displayMountainsFunction();

    const sortZToA = mountains.sort((a, b) => { //this does not make sense
        if (e.target.value === 'Z - A' && a.name > b.name) {
            //console.log('yeah');
            return 1;
        } else {
            return -1;
        }

    });

    displayMountainsFunction();

    const sortLowToHigh = mountains.sort((a, b) => {
        if (e.target.value === 'Low - High' && a.height > b.height) {
            //console.log('yeah');
            return 1;
        } else {
            return -1;
        }
    })

    displayMountainsFunction();

    const sortHighToLow = mountains.sort((a, b) => {
            if (e.target.value === 'High - Low' && a.height > b.height) {
                //console.log('yeah');
                return -1;
            } else {
                return 1;
            }
        })
        //how to get this to sort by what's been filtered?
    displayMountainsFunction();


})


//populate stars based on difficulty 
// const starsTotal = 5;
// const mountainDifficulty = document.querySelector('.difficulty')


// const getRatings = () => {
//     for (let mountains.difficulty)
//         const starPercentage = (mountains.difficulty / starsTotal) * 100;
//     console.log(starPercentage);

// }

// mountainDifficulty.addEventListener('DOMContentLoaded', getRatings);

//add green border if mountain complete
const checkboxes = document.querySelectorAll('.checkbox');
const mountainBorder = document.querySelectorAll('.mountain-border');
const sections = document.querySelectorAll('section');

//what is a better way of doing this? I've gathered all the section elements and all the checkbox elements
//i'm listening to an event on the checkbox and if the first part of the classlist for the checkbox
//is identical to the first class within the section then I'm using applying the 'show mountain border'
//to the first element of section which is the mountain border ----- very hacky and won't work for Scafell
//unless I concatentate the classlist e.g. scafell-pike. I've used the dynamic mountain.name for both classlists
//originally it was just applied against the section

//Also, how to keep this info ticked as a user filters / sorts etc? Checkbox no longer ticks and border missing

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', function(e) {
        // console.log(e);
        sections.forEach(section => {
                if (checkbox.classList[0] === section.classList[0]) {
                    section.firstElementChild.classList.toggle('show-mountain-border');

                }
                //how do I link it up with the correct mountain??
                if (e.target.checked === true) {
                    mountains[0].complete = 'Complete'
                } else {
                    mountains[0].complete = 'Not Complete'

                }
            })
            //the below applied it against the same mountain border
            // mountainBorder.classList.toggle('show-mountain-border')

        //the below applied it against all mountain borders
        // mountainBorder.forEach(mountainBorder => {
        //     mountainBorder.classList.toggle('show-mountain-border')

        //the below was an alternative to applying it against the same    
        // using e.target.checked below does the same thing
        // if (e.target.checked === true) {
        //     mountainBorder.classList.add('show-mountain-border')
        // } else {
        //     mountainBorder.classList.remove('show-mountain-border')
        // }
    })
})



//dynamically add the date 
const date = document.querySelector('.date');
date.innerHTML = new Date().getFullYear();