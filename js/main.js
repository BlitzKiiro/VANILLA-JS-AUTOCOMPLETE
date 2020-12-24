const search = document.querySelector('#search');
const matchList = document.querySelector('#match-list');
const toggleButton = document.querySelector('.toggle');


// get the word list data
initializeData = async () => { 
    result = await fetch('data/words_dictionary.json');
    data = await result.json();
    words_list = Object.entries(data);
}
initializeData();

// flesh up the UI with autocomplete matches 
const fleshUp = (matches) => {
    if ( matches.length > 0 ) {
        const html = matches.slice(0,3).map( match => 
                `
                <div class="col-sm">
                    <div class='card card-body py-2'>
                        <p class='result text-primary my-1 ' style='font-family:Monaco;cursor:pointer;'>${match[0]}</p>
                    </div>
                </div>
                `
            ).join('');
        matchList.innerHTML= `<div class='row'>${html}</div>`;
    } else { 
        matchList.innerHTML =  `
            <div class='card card-body mb-0'>
                <p class='text-primary my-auto' style='font-family:Monaco;'> </p>
            </div>
        `;
    }

}

// Search Words List and filter it
const searchWords = async (input) => {

    let searchText = input.trim().toLowerCase();
   
    //get matches to current text input
    const regex = new RegExp(`^${searchText}`)
    
    let matches = words_list.filter( word => {
        return word[0].match(regex);
    })

    if ( searchText.length === 0) matches = [];

    fleshUp(matches);
}

//gets last word of text input
const lastWord = ( input ) => {
    let words = input.split(' ');
    return words[words.length-1];
}

//replace input last word with selected match
const replaceLastWord = (e) => {
    if ( e.target.classList.contains('result')) {
       let words = search.value.split(' ');
       words[words.length-1] = e.target.innerText;
       search.value = words.join(' ')+' ';
       fleshUp([]);
       search.focus();
    }
}

//toggle theme color
let theme = 'light';
const toggleTheme = () => {
    if ( theme === 'light') {
        document.querySelector('.theme').href = '/css/dark.css';
        theme = 'dark';
    }
   else { 
        document.querySelector('.theme').href = '/css/light.css';
        theme = 'light';
   }
    
}

search.addEventListener('input',()=> searchWords(lastWord(search.value)));
matchList.addEventListener('click', e => replaceLastWord(e));
toggleButton.addEventListener('click', () => toggleTheme())

