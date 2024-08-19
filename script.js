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

<script language="javascript" type="text/javascript">
//Number of ads to offset the result
offset_14346 = 0;
//Request ads for a specific keyword
keyword_14346 = '';
//Request ads for a particular publisher subid
sid_14346='';
//Pass click through a secondary SEM URL; Substitution parameters are [url], [campaign_id], [unique_hash] and [cpc]
sem_14346='';
document.write("<script language='javascript' type='text/javascript' src='//servedby.studads.com/ads/ads.php?t=MjEwMTg7MTQzNDY7aG9yaXpvbnRhbC5iYW5uZXI=&o=" + offset_14346 + "&k=" + escape(keyword_14346)  + "&sid=" + escape(sid_14346) + "&sem=" + escape(sem_14346) + "'><\/sc" + "ript>");
</script>
