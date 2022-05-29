let currentDay = $('#currentDay'); // select element to display the current time
let saveBtn = $('.saveBtn');

function updateTime() {
    let timerInterval = setInterval(function() {
        let currentTime = moment().format('HH');
        currentDay.text(moment().format('MMM Do YYYY, h:mm:ss a'));

        timeTracker(currentTime);
    }, 1000);
}

function timeTracker(currentTime) { // update all the features before the timer to avoid 1 second lag time
    currentDay.text(moment().format('MMM Do YYYY, h:mm:ss a'));
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
        try {
            let content = JSON.parse(localStorage.getItem(i.toString()));

            for (key in content) {
                if (content.hasOwnProperty(key)) {
                    let value = content[key];
                    $(`#${i}`).children('textarea').text(value);
                }
            }
        } catch (err) {
            break;
        }
    }
}

loadData();
timeTracker(moment().format('HH'));
updateTime();

saveBtn.on('click', function() {
    let block = event.target.closest('div');
    let hour = block.id;
    let content = block.children[1].value;

    let scheduledEvent = JSON.parse(localStorage.getItem(hour));

    if (scheduledEvent !== null) {
        scheduledEvent[hour] = content;
        localStorage.setItem(hour, JSON.stringify(scheduledEvent));
        return;
    }

    let newContent = {}
    newContent[hour] = content;
    localStorage.setItem(hour, JSON.stringify(newContent));
});