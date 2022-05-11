function clearQueryResults() {
    const results = document.getElementById('query-results');
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }
}

/* 
 * @param {HTMLElement}  checkbox   input that is currently selected  
 */
function checkSingleBox(checkbox) {
    // 'query selection' form will always be first on the queries page
    const form = document.getElementsByTagName('form')[0];
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
    });
}