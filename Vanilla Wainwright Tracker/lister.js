//create object data

const mountains = [
  {
    name: "Arnison Crag",
    image: [
      "./Images/arnison.jpg",
      "./Images/arnison 2.jpg",
      "./Images/arnison 3.jpg",
    ],
    imageNumber: 0,
    region: "Eastern",
    height: 1424,
    averagetime: "2 Hours",
    difficulty: "2 / 5",
    complete: "",
    climbers: "",
    starttime: "",
    ascenttime: "",
    summittime: "",
    views: "",
    descenttime: "",
    endtime: "",
  },
  {
    name: "Blencathra",
    image: [
      "./Images/blencathra.jpg",
      "./Images/blencathra 2.jpg",
      "./Images/blencathra 3.jpg",
    ],
    imageNumber: 0,
    region: "Northern",
    height: 2847,
    averagetime: "3-4 Hours",
    difficulty: "4.5 / 5",
    complete: "",
    climbers: "",
    starttime: "",
    ascenttime: "",
    summittime: "",
    views: "",
    descenttime: "",
    endtime: "",
  },
  {
    name: "Scafell Pike",
    image: [
      "./Images/scafell-pike.jpg",
      "./Images/scafell-pike 2.jpg",
      "./Images/scafell-pike 3.jpg",
    ],
    imageNumber: 0,
    region: "Southern",
    height: 3210,
    averagetime: "4-5 Hours",
    difficulty: "5 / 5",
    complete: "",
    climbers: "",
    starttime: "",
    ascenttime: "",
    summittime: "",
    views: "",
    descenttime: "",
    endtime: "",
  },
  {
    name: "Yewbarrow",
    image: [
      "./Images/yewbarrow.jpg",
      "./Images/yewbarrow 2.jpg",
      "./Images/yewbarrow 3.jpg",
    ],
    imageNumber: 0,
    region: "Western",
    height: 2058,
    averagetime: "2-3 Hours",
    difficulty: "3.5 / 5",
    complete: "",
    climbers: "",
    starttime: "",
    ascenttime: "",
    summittime: "",
    views: "",
    descenttime: "",
    endtime: "",
  },
];

//sticky top nav

const navHeader = document.querySelector(".nav-header");
const secondNav = document.querySelector(".second-nav");
const nav = document.querySelector(".nav");

window.addEventListener("scroll", function (e) {
  const scrollDepth = window.scrollY;
  const secondNavHeight = secondNav.getBoundingClientRect().height;
  // console.log(scrollDepth);
   
  this.oldScroll = this.scrollY;
  if (!nav.classList.contains("fixed-nav") && scrollDepth > secondNavHeight) {
    navHeader.classList.add("fixed-nav");
  } else {
    navHeader.classList.remove("fixed-nav");
  }
});

//open nav-toggle drawer

const navToggle = document.querySelector(".nav-toggle");
const filterContainer = document.querySelector(".filter-container");

navToggle.addEventListener("click", function () {
  filterContainer.classList.toggle("show-filter-container");

  //add grey background color when show-filter-container open
  const mainSection = document.querySelector(".main-section");
  if (filterContainer.classList.contains("show-filter-container")) {
    mainSection.classList.add("opaque-background");
  } else {
    mainSection.classList.remove("opaque-background");
  }
});

//close nav-toggle drawer if user clicks outside filters or scrolls - may need to be removed if a load of filters are introduced
const mainSection = document.querySelector(".main-section");
const handleFilter = () => {
  if (filterContainer.classList.contains("show-filter-container")) {
    filterContainer.classList.remove("show-filter-container");
  }
  if (mainSection.classList.contains("opaque-background")) {
    mainSection.classList.remove("opaque-background");
  }
};
mainSection.addEventListener("click", handleFilter);
window.addEventListener("scroll", handleFilter); //should this be applied against a div? if so, how as using mainsection doesnt work

//open and close filter group

const filterGroup = document.querySelectorAll(".filter-group");
const filterWrapper = document.querySelector(".filter-wrapper");
const filterOptions = document.querySelector(".filter-options");
const filterWrapperComplete = document.querySelector(
  ".filter-wrapper-complete"
);
const filterOptionsComplete = document.querySelector(
  ".filter-options-complete"
);

filterGroup.forEach((filter) => {
  filter.addEventListener("click", function (e) {
    // console.log('yeah');

    const wrapperHeight = filterWrapper.getBoundingClientRect().height;
    const filterOptionsHeight = filterOptions.getBoundingClientRect().height;
    const wrapperHeightComplete =
      filterWrapperComplete.getBoundingClientRect().height;
    const filterOptionsHeightComplete =
      filterOptionsComplete.getBoundingClientRect().height;
    const element = e.currentTarget.classList;

    if (element.contains("region") && wrapperHeight === 0) {
      filterWrapper.style.height = `${filterOptionsHeight}px`;
    } else if (element.contains("region") && filterWrapper.style.height != 0) {
      filterWrapper.style.height = 0;
    } else if (
      element.contains("completion-status") &&
      wrapperHeightComplete === 0
    ) {
      filterWrapperComplete.style.height = `${filterOptionsHeightComplete}px`;
    } else {
      filterWrapperComplete.style.height = 0;
    }
  });
});

//add / remove ticks in filters
const filter = document.querySelectorAll(".filter");
// const showTick = document.querySelectorAll('.fa-check');

filter.forEach((filterOption) => {
  filterOption.addEventListener("click", function (e) {
    filterOption.firstElementChild.classList.toggle("show-fa-check");
    console.log(e);
  });
});

//filter mountains based on ticks
const doneBtn = document.querySelector(".done-btn");
const filterArray = [];
//filter for ticks and close filter-container
filter.forEach((filter) => {
  filter.addEventListener("click", function () {
    const filterText = filter.innerText;
    if (filter.firstElementChild.classList.contains("show-fa-check")) {
      filterArray.push(filterText);
    } else {
      for (let i = 0; i < filterArray.length; i++) {
        if (filterArray[i] === filterText) {
          filterArray.splice(i, 1);
        }
      }
    }
    console.log(filterArray);
  });
});

doneBtn.addEventListener("click", function () {
  //filter mountains using what is populated in the array - combo of not complete and complete doesnt work
  const searchMountains = mountains.filter((mountain) => {
    if (filterArray.includes(mountain.region)) return mountain.region;
    else if (
      filterArray.includes("Not Complete") &&
      filterArray.includes("Complete")
    ) {
      return mountain;
    } else if (filterArray.includes("Complete")) {
      return mountain.complete === "Complete";
    } else if (filterArray.includes("Not Complete")) {
      console.log("cheese");
      return mountain.complete === "" && "Not Complete";
    }
  });
  displayMountainsFunction(searchMountains);

  //return all the mountains is the array is empty
  if (filterArray.length === 0) {
    displayMountainsFunction(mountains);
  }

  filterContainer.classList.remove("show-filter-container");
  mainSection.classList.remove("opaque-background");
});

//search bar functionality
const search = document.querySelector(".search");
search.addEventListener("keyup", function (e) {
  // console.log(e);
  const searchString = e.target.value.toLowerCase();
  // console.log(searchString);
  const searchMountains = mountains.filter((mountain) => {
    return mountain.name.toLowerCase().includes(searchString);
  });
  console.log(searchMountains);
  displayMountainsFunction(searchMountains);
});

//dynamically populate the mountains and info
// const mainSection = document.querySelector('.main-section');

//checked on HTML is a property which details whether the input is checked or not

const displayMountainsFunction = (searchMountains = mountains) => {
  //expecting searchMoutains but if it doesn't get seacrMontains it will default to mountains and show all within the array
  let displayMountains = searchMountains.map((mountain) => {
    //map used to map info from array to HTML input
    //console.log(mountain);
    // let displayMountains = searchMountains.map(({name, complete, image, height, region,averagetime, difficulty}) => { this is the destructure version. The mountain.name, mountain.height would be reduced to name, height etc
    //stars section <span class='stars-outer'></span> <span class='stars-inner'></span>
    return `<section id='${mountain.name}' class='${mountain.name}'>
        <div class ='mountain-border ${
          mountain.complete === "Complete" ? "show-mountain-border" : ""
        }'>
        <div class='name'>${mountain.name}</div>
        <div class='image-container'>
            <i id='${mountain.name}-left'class="fas fa-angle-left"></i>
            <img src=${mountain.image[0]} id='${
      mountain.name
    }-image' class='mountain-image' alt=${mountain.name}>
            <i id='${mountain.name}-right' class="fas fa-angle-right"></i>
        </div>
        <div class='mountain-info'>
            <ul>
            <li class='mountain-region'>Region: ${mountain.region}</li>
            <li class='height'>Height (ft): ${mountain.height}</li>
            <li class='average-time'>Average Walk Time: ${
              mountain.averagetime
            }</li>
            <li class='difficulty stars'>Difficulty:
                ${mountain.difficulty}</li>
            <li><form class='completion-status'>
                <label class='complete'>Complete</label>
                ${
                  mountain.complete === "Complete"
                    ? `<input class='${mountain.name} checkbox' type='checkbox' alt='mountain complete checkbox' checked >  `
                    : `<input class='${mountain.name} checkbox' type='checkbox' alt='mountain complete checkbox' > `
                }
            </form>
            </li>
            </ul>
            <a href ='./pdp.html' class='more-info btn'>Add More Info</a>
        </div>
        </div>
        <br>
        <hr class='seperator'>
        <br>
    </section>`;
  });
  displayMountains = displayMountains.join(""); //join in 1 string so we can import to main.section. use empty join so we don't seperate sections with commas
  mainSection.innerHTML = displayMountains;
};
window.addEventListener("DOMContentLoaded", displayMountainsFunction()); //do something when the dom has loaded

//sort functions

const sort = document.querySelector(".sort");

sort.addEventListener("change", function (e) {
  console.log(e.target.value); //look at adding classLists to options in dynamic HTML above
  //console.log(this.value); //why does this return undefined but e.target.value works?

  const sortAToZ = mountains.sort((a, b) => {
    if (e.target.value === "A - Z" && a.name > b.name) {
      //console.log('yeah');
      return 1;
    } else {
      return -1;
    }
  });

  const sortZToA = mountains.sort((a, b) => {
    //this does not make sense
    if (e.target.value === "Z - A" && a.name > b.name) {
      //console.log('yeah');
      return 1;
    } else {
      return -1;
    }
  });

  const sortLowToHigh = mountains.sort((a, b) => {
    if (e.target.value === "Low - High" && a.height > b.height) {
      //console.log('yeah');
      return 1;
    } else {
      return -1;
    }
  });

  const sortHighToLow = mountains.sort((a, b) => {
    if (e.target.value === "High - Low" && a.height > b.height) {
      //console.log('yeah');
      return -1;
    } else {
      return 1;
    }
  });
  //how to get this to sort by what's been filtered?

  const sortMostDifficult = mountains.sort((a, b) => {
    if (
      e.target.value === "Difficulty: High to Low" &&
      a.difficulty > b.difficulty
    ) {
      return -1;
    } else {
      return 1;
    }
  });

  const sortLeastDifficult = mountains.sort((a, b) => {
    if (
      e.target.value === "Difficulty: Low to High" &&
      a.difficulty < b.difficulty
    ) {
      return -1;
    } else {
      return 1;
    }
  });
  displayMountainsFunction();
});

//image carousel
//const img = document.querySelector('.mountain-image')

const clickLeft = document.querySelectorAll(".fa-angle-left");
const clickRight = document.querySelectorAll(".fa-angle-right");

clickRight.forEach((click) => {
  click.addEventListener("click", function (e) {
    const rightClickName = e.target.id;
    const mountainName = rightClickName.split("-")[0]; //split will split a string based on the character that's input
    console.log({ rightClickName, mountainName }); //gives us an object of what's being console.logged

    //return the images for the specific mountains clicked
    const findMountainImage = mountains.find((mountain) => {
      console.log(mountain.name, mountainName);
      if (mountain.name === mountainName) {
        return mountain;
      }
    }).image; //get the images of the mountain

    //return the specific image number for the specific mountain. ensures all mountain images start at 0.
    let findMountainImageNumber = mountains.find((mountain) => {
      console.log(mountain.name, mountainName);
      if (
        mountain.name === mountainName &&
        mountain.imageNumber >= findMountainImage.length - 1
      ) {
        mountain.imageNumber = 0;
        return mountain;
      } else if (mountain.name === mountainName) {
        mountain.imageNumber++;
        return mountain;
      }
    }).imageNumber;
    console.log(findMountainImageNumber);

    //show the image on the page
    const image = document.getElementById(`${mountainName}-image`);
    image.src = findMountainImage[findMountainImageNumber];
    //image.src = findMountainImage[currentItem];
    console.log(findMountainImage);
    console.log(image.src);
  });
});

clickLeft.forEach((click) => {
  click.addEventListener("click", function (e) {
    const leftClickName = e.target.id;
    // console.log(leftClickName);
    const mountainName = leftClickName.split("-")[0];
    console.log(mountainName);

    const findMountainImage = mountains.find((mountain) => {
      if (mountain.name === mountainName) {
      }
      return mountain;
    }).image;
    console.log(findMountainImage.length);

    const findMountainImageNumber = mountains.find((mountain) => {
      if (mountain.name === mountainName && mountain.imageNumber < 1) {
        mountain.imageNumber = findMountainImage.length - 1;
        return mountain;
      } else if (mountain.name === mountainName) {
        mountain.imageNumber--;
        return mountain;
      }
    }).imageNumber;
    console.log(findMountainImage);

    const image = document.getElementById(`${mountainName}-image`);
    image.src = findMountainImage[findMountainImageNumber];
  });
});

const ratings = {
  name: "Yewbarrow",
  image: "./Images/yewbarrow.jpg",
  region: "Western",
  height: 2058,
  averagetime: "2-3 Hours",
  difficulty: "3.5/5",
  complete: "",
  climbers: "",
  starttime: "",
  ascenttime: "",
  summittime: "",
  views: "",
  descenttime: "",
  endtime: "",
};
//populate stars based on difficulty
//total stars
const starsTotal = 5;
//const mountainDifficulty = document.querySelector('.difficulty')
const stars = document.querySelectorAll(".fa-star");

const getRatings = () => {
  // for (let rating in ratings)
  //     console.log(rating);
  mountains.forEach((mountain) => {
    const starPercentage = (mountain.difficulty / starsTotal) * 100;
    console.log(starPercentage);

    //round to nearest 10
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    console.log(starPercentageRounded);

    //set width of stars inner-to percentage
    //document.querySelector(`${mountain.difficulty}`);
    // console.log(mountain.difficulty.style.width);
    //console.log(mountain.difficulty.style.width);
  });
};

document.addEventListener("DOMContentLoaded", getRatings);

//add green border if mountain complete
const checkboxes = document.querySelectorAll(".checkbox");
const mountainBorder = document.querySelectorAll(".mountain-border");
const sections = document.querySelectorAll("section");

// ----- very hacky and won't work for Scafell
//unless I concatentate the classlist e.g. scafell-pike. I've used the dynamic mountain.name for both classlists
//originally it was just applied against the section

//Also, how to keep this info ticked as a user filters / sorts etc? Checkbox no longer ticks and border missing

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", function (e) {
    // console.log(e);
    sections.forEach((section) => {
      console.log(checkboxes[0].classList[0]);
      console.log(section.classList[0]);
      const checkboxMountainName = checkbox.classList[0];
      const sectionMountainName = section.classList[0];
      if (checkboxMountainName !== sectionMountainName) {
        return; //do nothing if they don't match
      }
      //showing border //the above filters out when they are not equal so the below only includes passes
      section.firstElementChild.classList.toggle("show-mountain-border");

      //below will gather the correct mountain checkbox

      const currentMountain = mountains.find((mountain) => {
        const mountainName = mountain.name;
        console.log(section.id);
        if (mountainName === section.id) {
          return mountain; //return mountain which meets criteria - find brings back the first match
        }
        return; // this is effectively your else.
      });

      //alternative - const currentMountain = mountains.find(mountain => mountain.name === section.id)
      //alternative - const currentMountain = mountains.find(({name}) => name === section.id) //destructuring version. useful for bigger use cases

      //marking object as 'complete' / 'not complete'
      if (e.target.checked === true) {
        currentMountain.complete = "Complete";
      } else {
        currentMountain.complete = "Not Complete";
      }

      //currentMountain.complete = e.target.checked ? 'Complete' : 'Not Complete'
    });
  });
});

//dynamically add the date
const date = document.querySelector(".date");
date.innerHTML = new Date().getFullYear();
