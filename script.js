const fileInput = document.getElementById('fileInput');
const categoryPopup = document.getElementById('categoryPopup');
const preview = document.getElementById('preview');
const wardrobeItems = document.getElementById('wardrobeItems');
const outfitPreview = document.getElementById('outfitPreview');

let currentFile;

fileInput.addEventListener('change', (event) => {
    currentFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        preview.src = e.target.result;
        categoryPopup.classList.remove('hidden');
    };
    reader.readAsDataURL(currentFile);
});

function saveItem(category) {
    const item = document.createElement('img');
    item.src = preview.src;
    item.alt = category;
    item.classList.add('wardrobeItem');
    wardrobeItems.appendChild(item);
    categoryPopup.classList.add('hidden');
}

document.getElementById('generateOutfit').addEventListener('click', () => {
    const categories = ['hat', 'top', 'bottom', 'shoes', 'jacket'];
    outfitPreview.innerHTML = '';

    categories.forEach(category => {
        const items = [...wardrobeItems.getElementsByTagName('img')].filter(item => item.alt === category);
        const itemDiv = document.createElement('div');
        if (items.length > 0) {
            itemDiv.appendChild(items[Math.floor(Math.random() * items.length)].cloneNode());
        } else {
            itemDiv.innerText = `no ${category}`;
        }
        outfitPreview.appendChild(itemDiv);
    });
});
