document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => { // Whenever a button is click, there will be certain type of event occuring with the command addEventListener()

            // Remove the 'active' highlight class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add 'active' class to the clicked button
            button.classList.add('active');

            // Get the target filter value (e.g., "all", "easy", or "intermediate")
            const selectedCategory = button.getAttribute('data-filter');

            // 3. Loop through each project and decide whether to show or hide it
            projectItems.forEach(item => {
                if (selectedCategory === 'all' || item.classList.contains(selectedCategory)) {
                    item.style.display = 'block'; // Show project
                } else {
                    item.style.display = 'none';  // Hide project
                }
            });
        })
    })
})