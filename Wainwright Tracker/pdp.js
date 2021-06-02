// import { mountains } from './lister.js';

//const mountainsArray = JSON.parse(mountains);
// mountains = JSON.parse(mountains);
// console.log(mountains);


const climbDate = document.querySelector('.climb-date');

// const uppercase

//fill in times when info is input
//summit time based on start time and ascent duration
const startTime = document.querySelector('.start-time');
const ascentDuration = document.querySelector('.ascent-duration');
const summitTime = document.querySelector('.summit-time');
const descentDuration = document.querySelector('.descent-duration');
const finishTime = document.querySelector('.finish-time');
const totalWalkTime = document.querySelector('.total-time');

ascentDuration.addEventListener('change', function () {
    const newStartTime = startTime.value;
    const newAscentDuration = ascentDuration.value;

    if (newStartTime !== null && newAscentDuration !== null) {

        function convertNST(newStartTime) {
            const arr = newStartTime.split(":");
            const seconds = arr[0] * 3600 + arr[1] * 60;
            return seconds;
        }
        //console.log(convertNST(newStartTime));

        function convertAD(newAscentDuration) {
            const arr = newAscentDuration.split(":");
            const seconds = arr[0] * 3600 + arr[1] * 60;
            return seconds;
        }
        //console.log(convertAD(newAscentDuration));

        const summitTimeCalc = (convertNST(newStartTime)) + convertAD(newAscentDuration);
        //console.log(summitTime);

        var measuredTime = new Date(null);
        measuredTime.setSeconds(summitTimeCalc); // specify value of SECONDS
        var summitTimeString = measuredTime.toISOString().substr(11, 8);
        //console.log(summitTimeString);

    }
    summitTime.value = summitTimeString;
})

descentDuration.addEventListener('change', function () {
    const newSummitTime = summitTime.value;
    const newDescentDuration = descentDuration.value;

    //get summit time
    if (newSummitTime !== null && newDescentDuration !== null) {
        
        function convertNST(newSummitTime) {
            const arr = newSummitTime.split(":");
            const seconds = arr[0] * 3600 + arr[1] * 60;
            return seconds;
        }
        //console.log(convertNST(newSummitTime));

        function convertDD(newDescentDuration) {
            const arr = newDescentDuration.split(":");
            const seconds = arr[0] * 3600 + arr[1] * 60;
            return seconds;
        }
        //console.log(convertDD(newDescentDuration));

        // const newFinishTime = finishTime.value;
        const finishTimeCalc = convertNST(newSummitTime) + convertDD(newDescentDuration);
        //console.log(finishTime);

        var measuredTime = new Date(null);
        measuredTime.setSeconds(finishTimeCalc); // specify value of SECONDS
        var finishTimeString = measuredTime.toISOString().substr(11, 8);
        //console.log(finishTimeString);

    }
    finishTime.value = finishTimeString;

    //get total walk time
    const newAscentDuration = ascentDuration.value;
    //const newDescentDuration = descentDuration.value;
    // const totalWalkTime = document.querySelector('.total-time')

    if (newAscentDuration !== null && newDescentDuration !== null) {

    function convertAD(newAscentDuration) {
        const arr = newAscentDuration.split(':'); 
        const seconds = arr[0] * 3600 + arr[1] * 60; 
        return seconds; 
    }    

    function convertDD(newDescentDuration) {
        const arr = newDescentDuration.split(':'); 
        const seconds = arr[0] * 3600 + arr[1] * 60; 
        return seconds; 
    }    

    const totalWalkTimeCalc = convertAD(newAscentDuration) + convertDD(newDescentDuration); 

    var measuredTime = new Date(null);
        measuredTime.setSeconds(totalWalkTimeCalc); // specify value of SECONDS
        var totalWalkTimeString = measuredTime.toISOString().substr(11, 8);

    }
    totalWalkTime.value = totalWalkTimeString; 
})

finishTime.addEventListener('change', function () {
    const newAscentDuration = ascentDuration.value;
    const newDescentDuration = descentDuration.value;

    if (newSummitTime !== null && newDescentDuration !== null) {
        
        function convertNST(newSummitTime) {
            const arr = newSummitTime.split(":");
            const seconds = arr[0] * 3600 + arr[1] * 60;
            return seconds;
        }
        //console.log(convertNST(newSummitTime));

        function convertDD(newDescentDuration) {
            const arr = newDescentDuration.split(":");
            const seconds = arr[0] * 3600 + arr[1] * 60;
            return seconds;
        }
        //console.log(convertDD(newDescentDuration));

        // const newFinishTime = finishTime.value;
        const finishTime = convertNST(newSummitTime) + convertDD(newDescentDuration);
        //console.log(finishTime);

        var measuredTime = new Date(null);
        measuredTime.setSeconds(finishTime); // specify value of SECONDS
        var finishTimeString = measuredTime.toISOString().substr(11, 8);
        //console.log(finishTimeString);

    }
    finishTime.value = finishTimeString;
})

//dynamically add the date 
const date = document.querySelector('.date');
date.innerHTML = new Date().getFullYear();
