function clearQueryResults() {
    const results = document.getElementById('query-results');
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }
}

function checkSingleBox(checkbox) {
    const form = document.getElementsByTagName('form')[0];
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
    });
}