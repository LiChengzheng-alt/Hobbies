// index.js
// Adds click-to-select interactivity to the "Benefits of playing soccer" and
// "Benefits of coding?" lists on index.html. Clicking a benefit toggles a
// "selected" state (with a checkmark), a live counter updates via the DOM to
// show how many are selected, and choices persist across visits using
// localStorage so returning users see their picks still marked.

document.addEventListener("DOMContentLoaded", () => {
    // Both benefit lists share the exact same behaviour, so one function
    // sets up whichever list id is passed in rather than duplicating logic.
    initBenefitsList("soccer-benefits", "soccer-benefits-counter");
    initBenefitsList("coding-benefits", "coding-benefits-counter");

    // Reset buttons are wired up separately since there are only two of them
    // and each needs to know which list it belongs to.
    document.querySelectorAll(".benefits-reset").forEach((button) => {
        button.addEventListener("click", () => {
            const listId = button.dataset.resetFor;
            resetBenefitsList(listId);
        });
    });
});

// Builds the localStorage key for a given list, e.g. "benefits-selected:soccer-benefits".
// Prefixing with "benefits-selected:" keeps this namespaced so it can't collide with
// any other localStorage keys the site might use elsewhere (e.g. LearnNow.js's
// "watched-<videoId>" keys).
function storageKey(listId) {
    return `benefits-selected:${listId}`;
}

// Reads this list's previously selected item indexes back out of localStorage
// (the external Web Storage API). Stored as a JSON array string, so it's parsed
// back into a real array here; an empty array is returned if nothing was saved yet.
function getSelectedIndexes(listId) {
    const raw = localStorage.getItem(storageKey(listId));
    return raw ? JSON.parse(raw) : [];
}

// Writes the current set of selected indexes back to localStorage as a JSON
// string, overwriting whatever was saved before. Called every time a benefit
// is toggled, so the saved state never falls out of sync with what's on screen.
function saveSelectedIndexes(listId, indexes) {
    localStorage.setItem(storageKey(listId), JSON.stringify(indexes));
}

function initBenefitsList(listId, counterId) {
    const list = document.getElementById(listId);
    const counter = document.getElementById(counterId);
    if (!list || !counter) return; // page doesn't have this list, skip safely

    const items = Array.from(list.querySelectorAll("li"));

    // Make each <li> behave like a toggle button: focusable, clickable,
    // and operable from the keyboard (Enter/Space), not just mouse-only.
    items.forEach((item, index) => {
        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");
        item.setAttribute("aria-pressed", "false");
        item.dataset.index = index;

        item.addEventListener("click", () => toggleBenefit(listId, item, counter, items));
        item.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleBenefit(listId, item, counter, items);
            }
        });
    });

    // Restore any previously selected benefits from localStorage so the
    // page reflects the user's earlier choices on repeat visits.
    const savedIndexes = getSelectedIndexes(listId);
    savedIndexes.forEach((index) => {
        const item = items[index];
        if (item) markSelected(item, true);
    });
    updateCounter(counter, items);
}

// Runs on every click/keypress on a benefit <li>: flips its selected state,
// refreshes the counter text, then re-reads every item's current state via
// aria-pressed to rebuild the full list of selected indexes and persist it.
function toggleBenefit(listId, item, counter, items) {
    const nowSelected = item.getAttribute("aria-pressed") !== "true";
    markSelected(item, nowSelected);
    updateCounter(counter, items);

    const selectedIndexes = items
        .filter((li) => li.getAttribute("aria-pressed") === "true")
        .map((li) => Number(li.dataset.index));
    saveSelectedIndexes(listId, selectedIndexes);
}

// Applies (or removes) the visual "selected" styling on one item and keeps its
// aria-pressed attribute in sync, since that attribute is what screen readers
// use to announce the toggle state and what toggleBenefit() reads back later.
function markSelected(item, selected) {
    item.classList.toggle("benefit-selected", selected);
    item.setAttribute("aria-pressed", selected ? "true" : "false");
}

// Updates the aria-live counter text (DOM manipulation) to reflect how many
// items in this list are currently selected, so the count is always visibly
// (and audibly, for screen readers) in sync with the checkmarks on screen.
function updateCounter(counter, items) {
    const selectedCount = items.filter(
        (li) => li.getAttribute("aria-pressed") === "true"
    ).length;

    if (selectedCount === 0) {
        counter.textContent = "Click a benefit you're interested in";
    } else {
        counter.textContent = `${selectedCount} of ${items.length} benefits selected`;
    }
}

// Clears every selection in one list: resets each item's visual/aria state,
// refreshes the counter back to its default text, and overwrites this list's
// localStorage entry with an empty array so the reset also survives a refresh.
function resetBenefitsList(listId) {
    const list = document.getElementById(listId);
    const counter = document.getElementById(`${listId}-counter`);
    if (!list || !counter) return;

    const items = Array.from(list.querySelectorAll("li"));
    items.forEach((item) => markSelected(item, false));
    updateCounter(counter, items);
    saveSelectedIndexes(listId, []);
}
