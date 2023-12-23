document.addEventListener('DOMContentLoaded', (event) => {
    var itemElements = document.querySelectorAll('.randomItem');
    itemElements.forEach((itemElement) => {
        var items = JSON.parse(itemElement.getAttribute('data-items'));
        var randomIndex = Math.floor(Math.random() * items.length);
        var randomItem = items[randomIndex];
        itemElement.textContent = randomItem;
        itemElement.removeAttribute('data-items');
    });
});