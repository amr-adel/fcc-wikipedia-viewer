const searchBox = document.getElementById('search');
const results = document.getElementById('results');
const footer = document.getElementById('footer');


function loadJSON(searchTerm, callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch='+ searchTerm +'&srlimit=12&srprop=snippet&origin=*', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}


function searchWiki(searchTerm) {
    loadJSON(searchTerm, function (response) {
        var quotesArr = JSON.parse(response);
        quotesArr.query.search.forEach(function (el) {
            results.insertAdjacentHTML('beforeend', '<li class="entry"><a href="https://en.wikipedia.org/?curid=' + el.pageid + '" class="entry__link" target="_blank"><h3 class="entry__title">' + el.title + '</h3><p class="entry__snippet">' + el.snippet + '</p></a></li>');
        });
        results.insertAdjacentHTML('beforeend', footer.outerHTML);
        footer.outerHTML = "";
    });
};



searchBox.addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
        document.getElementById('container').className = 'container results';
        results.innerHTML = '';
        searchWiki(searchBox.value);
        document.getElementById('term').innerHTML = searchBox.value;
        searchBox.value = "";
        searchBox.blur();
    }
});