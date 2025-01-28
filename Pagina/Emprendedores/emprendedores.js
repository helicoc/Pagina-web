document.getElementById('searchBar').addEventListener('keyup', function() {
    var input = this.value.toLowerCase();
    var cards = document.querySelectorAll('.card');

    cards.forEach(function(card) {
        var name = card.querySelector('h2').textContent.toLowerCase();
        if (name.includes(input)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
});