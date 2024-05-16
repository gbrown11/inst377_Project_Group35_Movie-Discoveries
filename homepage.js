//This code is used on the homescreen to dynamically change the words to what you selected in the genres. 
document.getElementById('genre').addEventListener('change', function() {
    var selectedGenre = document.getElementById('genre').value;
    document.getElementById('selectedGenre').textContent = selectedGenre;
});