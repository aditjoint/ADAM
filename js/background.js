// background.js

// Run this script on page load to add a class like 'day1', 'day2', .... 'day31' to <body>
document.addEventListener('DOMContentLoaded', function () {
    const today = new Date();
    let day = today.getDate(); // 1 - 31

    // Sanity check: ensure day is between 1 and 31
    if (day < 1 || day > 31) {
        day = 1;
    }

    // Construct class name
    const dayClass = 'day' + day;

    // Add class to body
    document.body.classList.add(dayClass);
});
