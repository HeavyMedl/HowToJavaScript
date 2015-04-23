document.addEventListener('DOMContentLoaded', init, false);

function init() {
    var d = document,
    getChuckQuote = function() {
        var request = new XMLHttpRequest();
        request.open('GET', 'http://api.icndb.com/jokes/random', true);
        
        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            if (data.type=='success') {
                var p = d.getElementById('chuck');
                p.innerHTML = data.value.joke;
            }
          } else {
            console.log('Error retrieving chuck quote');        
          }
        };
        
        request.onerror = function() {
            console.log('Error retrieving chuck quote');
        };
        request.send();
    };
    getChuckQuote();
}