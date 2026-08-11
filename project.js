document.addEventListener('DOMContentLoaded', () => { // Wait for all the HTML contents to be loaded before the JS content loads
    var filterButtons = document.querySelectorAll('.filter-btn'); // Get every single filterButtons class. 3 total.
    var projectItems = document.querySelectorAll('.project-item'); // Get every single projectItems class. 4 total.

    filterButtons.forEach(button => { // loop each button from the 3 buttons. Button is the button that is currently clicked.
        button.addEventListener('click', () => { // Whenever this button is clicked, the function will run
            // loop through each button again and removes the active class if the user clicked on another button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active'); // add the active class if the user clicked on that button

            // Filter the difficulty level of the projects based on its category
            var category = button.getAttribute('data-filter');

            // loop each projectItems. item is the current projectItems.
            projectItems.forEach(item => {
                var showAll = category === 'all'; // Display every cards if category is all.
                var hasCategory = item.classList.contains(category); // Checks if the individual content contains a class name matching category

                if (showAll || hasCategory) {
                    item.style.display = 'block'; // If user select all, contents will display
                } else {
                    item.style.display = 'none'; // else, no content will be displayed.
                }
            });
        });
    });
});