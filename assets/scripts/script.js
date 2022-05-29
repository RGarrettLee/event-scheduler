let currentDay = $('#currentDay'); // select element to display the current time
let saveBtn = $('.saveBtn'); // select save button element

function updateTime() { // start a timer to constantly update the time on the site
    let timerInterval = setInterval(function() {
        let currentTime = moment().format('HH'); // get the current hour
        currentDay.text(moment().format('MMM Do YYYY, h:mm:ss a')); // update header timer text with current date and time

        timeTracker(currentTime); // pass current hour into the time tracker
    }, 1000);
}

function timeTracker(currentTime) { // update all the features before the timer to avoid 1 second lag time
    currentDay.text(moment().format('MMM Do YYYY, h:mm:ss a')); // update header timer text with current date and time
    $(`#${currentTime}`).children('textarea').addClass('present'); // set current time to present

    for (let i = 1; i < currentTime; i++) { // set all previous hours to show as having past
        $(`#${i}`).children('textarea').addClass('past');
    }

    for (let i = parseInt(currentTime) + 1; i <= 24; i++) { // set all future hours to show as upcoming
        $(`#${i}`).children('textarea').addClass('future');
    }
}

function loadData() { // load previous schedulings
    for (let i = 1; i <= 24; i++) {
        try { // attempt to fill out time block with saved info
            let content = JSON.parse(localStorage.getItem(i.toString())); // get stored data for current hour

            for (key in content) { // retrieve the value out of the saved object
                if (content.hasOwnProperty(key)) {
                    let value = content[key]; // assign value to variable
                    $(`#${i}`).children('textarea').text(value); // fill textarea in current hour with saved content
                }
            }
        } catch (err) { // if there is no saved info, skip to next time block
            break;
        }
    }
}

loadData(); // on site load/refresh load previously stored data
timeTracker(moment().format('HH')); // update time tracking before entering timer
updateTime(); // run a constant check to update the time

saveBtn.on('click', function() { // on save button press
    let block = event.target.closest('div'); // select the div element the button belongs to
    let hour = block.id; // grab the id of the div element
    let content = block.children[1].value; // grab the value inside the textarea in the div element

    let scheduledEvent = JSON.parse(localStorage.getItem(hour)); // load saved data

    if (scheduledEvent !== null) { // if there is saved data
        scheduledEvent[hour] = content; // update stored data with new data
        localStorage.setItem(hour, JSON.stringify(scheduledEvent)); // save new data
        return; // exit function
    }

    // if there was no previously stored data
    let newContent = {} // create empty object
    newContent[hour] = content; // fill with information to save
    localStorage.setItem(hour, JSON.stringify(newContent)); // save new information
});