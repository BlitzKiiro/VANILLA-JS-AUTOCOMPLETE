const search = document.querySelector('#search');
const matchList = document.querySelector('#match-list');


// flesh up the UI with autocomplete matches 
const fleshUp = (matches) => {
    if ( matches.length > 0 ) {
        const html = '<h6 class="m-1">Top 10 matches</h6>' + matches.slice(1,10).map( match => 
                `
                    <div class='card card-body mb-2'>
                        <p class='result text-primary my-auto' style='font-family:Monaco;cursor: pointer;'>${match[0]}</p>
                    </div>
                `
            ).join('');
        matchList.innerHTML=html;
    } else { 
        matchList.innerHTML =  `
            <div class='card card-body mb-1'>
                <p class='text-primary my-auto' style='font-family:Monaco;'> </p>
            </div>
        `;
    }

}

// Search Words List and filter it
const searchWords = async (input) => {
    let searchText = input.trim().toLowerCase();
    const result = await fetch('data/words_dictionary.json');
    const data = await result.json();
    const words_list = Object.entries(data);
   
    //get matches to current text input
    const regex = new RegExp(`^${searchText}`)
    
    let matches = words_list.filter( word => {
        return word[0].match(regex);
    })

    if ( searchText.length === 0) matches = [];

    fleshUp(matches);
}


search.addEventListener('input',()=> searchWords(search.value))

matchList.addEventListener('click', e => {
    if ( e.target.classList.contains('result')) {
        search.value = e.target.innerText;
        fleshUp([]);
    }
})