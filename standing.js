// Search/filter logic for the Team Standings page

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('teamSearch');
    const noResults = document.getElementById('noResults');

    searchInput.addEventListener('input', function () {
        const query = searchInput.value.trim().toLowerCase();

        // Only filter rows in the currently visible (active) tab pane
        const activePane = document.querySelector('.tab-pane.active');
        const rows = activePane.querySelectorAll('tbody tr');

        let visibleCount = 0;

        rows.forEach(function (row) {
            const teamName = row.querySelector('.team-col').textContent.toLowerCase();
            const matches = teamName.includes(query);

            row.classList.toggle('search-hidden', query.length > 0 && !matches);
            row.classList.toggle('search-match', query.length > 0 && matches);

            if (!row.classList.contains('search-hidden')) {
                visibleCount++;
            }
        });

        noResults.classList.toggle('d-none', visibleCount > 0);
    });

    // Reset search when switching between La Liga / Ligue 1 tabs
    const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');
    tabButtons.forEach(function (btn) {
        btn.addEventListener('shown.bs.tab', function () {
            searchInput.value = '';
            document.querySelectorAll('tbody tr').forEach(function (row) {
                row.classList.remove('search-hidden', 'search-match');
            });
            noResults.classList.add('d-none');
        });
    });
});
