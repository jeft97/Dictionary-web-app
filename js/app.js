'use sctrict';
import requestDate from "./request.js";


const inputSearch = document.querySelector('.js-input-search');
const containerSelect = document.querySelector('.js-custom-select');
const containerOptions = document.querySelector('.js-options-container');
const selectedOption = document.querySelector('.js-selected-option');
const checkbox = document.querySelector('.js-change-scheme');
const containerGroupForm = document.querySelector('.j-group-form');
const icon = document.querySelector('.js-icon');
const form = document.querySelector('.form');
const containerApp = document.querySelector('.js-root');
let allItems = document.querySelectorAll('.js-list-item');


let linkSource;
let containerError;
let containerPlay;

let data;



const fontFamilyOptions = {
    'Sans Serif':'var(--ff-inter)',
    'Serif':'var(--ff-lora)',
    'Mono':'var(--ff-inconsolata)'
}


const addError = function(){
    containerGroupForm.classList.add('has-border-error');
    containerGroupForm.nextElementSibling.classList.add('has-error')
}
const removeError = function(){
    containerGroupForm.classList.remove('has-border-error');
    containerGroupForm.nextElementSibling.classList.remove('has-error')
}

const removeDarkMode = function(){
    document.body.classList.remove('dark');
    inputSearch.classList.remove('dark')
    containerGroupForm.classList.remove('dark');
    containerOptions.classList.remove('dark');
    allItems.forEach(item=> item.classList.remove('dark'));
    icon.classList.remove('dark');

    if(containerError){
        containerError.classList.remove('dark');
    }
    if(containerPlay){
        containerPlay.classList.remove('dark');
    }
    if(!linkSource)return;
    linkSource.classList.remove('dark');
} 
const addDarkMode = function(){
    
    document.body.classList.add('dark');
    inputSearch.classList.add('dark')
    containerGroupForm.classList.add('dark');
    containerOptions.classList.add('dark');
    allItems.forEach(item=> item.classList.add('dark'));
    icon.classList.add('dark');

    if(containerError ){
        containerError.classList.add('dark');
    }
    if(containerPlay){
        containerPlay.classList.add('dark');
    }
    if(!linkSource)return;
    linkSource.classList.add('dark');

}

const updateVarsDarkMode = function(){
    containerPlay =  document.querySelector('.icon--play').parentElement;
    allItems = document.querySelectorAll('.js-list-item');
    linkSource = document.querySelector('footer a');
}

const toogleDarkMode = function(){
    if(checkbox.checked){
        addDarkMode();
    }else{
        removeDarkMode();
    }
}

const renderError = function(){
    containerApp.innerHTML='';
    const mockup = `
        <div class="result__error js-error">
            <i class="emoji">😕</i>
            <h4 class="heading--4 u-mb-small">No Definitions Found</h4>
            <p>Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.</p>
        </div>
    `
    containerApp.insertAdjacentHTML('afterbegin', mockup);

    containerError = document.querySelector('.result__error .heading--4');
}

export default renderError;


const renderData = function(data){

    containerApp.innerHTML='';


    const dataObjc = {
        word: data[0].word,
        text: data[0].phonetics[0]?.text || '',
        audio: data[0].phonetics[0]?.audio || '',
        meanings: data[0].meanings,
        src: data[0].sourceUrls[0]|| '#'
    }
    const mockup = `
            <header class="result__header">
            <div class="box">
            <h1 class="result--word">${dataObjc.word}</h1>
            <span class="result--phonetics">
                ${dataObjc.text}
            </span>
            </div>
            <div class="box">
            <audio class="is-collapse js-audio">
                <source src="${dataObjc.audio}" type="audio/mpeg">
            </audio>
            <div class="circle-animated ${dataObjc.audio === '' ? '':'circle-animate'}">
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 75 75" class="icon--play ${dataObjc.audio === '' ? 'is-collapse':''}">
                    <g  fill-rule="evenodd">
                        <circle cx="37.5" cy="37.5" r="37.5" opacity=".25"/>
                        <path d="M29 27v21l21-10.5z"/>
                    </g>
                </svg>
            </div>
            </div>
        </header>
        <main class="u-mb-small">
            ${
            dataObjc.meanings.map(section => {
                    return `

                        <section class="section-noun u-mb-medium">
                            <div class="box">
                            <h2 class="heading--2 u-mb-medium">${section.partOfSpeech}</h2>
                            <div class="line">&nbsp;</div>
                            </div>
                            <h3 class="heading--3 u-mb-small">Meaning</h3>
                            <ul class="meaning__list u-mb-small">
                                ${section.definitions.map(df=> `<li class="meaning__list--item js-list-item">${df.definition}</li>`).join('')}
                            </ul>
                            <dl class="synonym">
                                <dt><h3 class="heading--3 ${section.synonyms.length === 0 ? 'is-collapse':''}">Synonyms</h3></dt>
                                ${section.synonyms.map(syms=> `<dd><p class="Synonyms">${ syms }</p></dd>`).join('')}
                            </dl>
                        </section>
                    `
            }).join('')}
        </main>
        <footer class="footer">
            <small>
            <span>Source</span> 
            <a href="${dataObjc.src}" target="_blank">
                
                <span>https://en.wiktionary.org/wiki/${dataObjc.word}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                <path fill="none" stroke="#838383" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"/>
                </svg>
            </a>
            </small>
        </footer>
            `
        containerApp.insertAdjacentHTML('afterbegin', mockup); 
        updateVarsDarkMode();

} 

inputSearch.addEventListener('focus', function(e){
    e.preventDefault();
    e.target.parentElement.style.borderColor = "var(--clr-primary)";
});
inputSearch.addEventListener('blur',function(e){
    e.preventDefault();
    e.target.parentElement.style.borderColor = "var(--clr-grey)"
});


containerSelect.addEventListener('click',function(e){
    if(e.target.classList.contains('js-options-container'))return;

    if(e.target.classList.contains('option')){
        selectedOption.textContent = e.target.textContent;
        selectedOption.setAttribute('aria-activedescendant',e.target.textContent);
        document.body.style.setProperty('font-family',fontFamilyOptions[e.target.textContent])
        
    }
    containerOptions.classList.toggle('is-collapse');
});

checkbox.addEventListener('change',function(e){
    
    e.preventDefault();

    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        checkbox.checked = true;
        return;
    }

    toogleDarkMode();

});


form.addEventListener('submit', async function(e){
    e.preventDefault();
    removeError();
    const word = inputSearch.value;
    if(!word){
        addError();
        return;
    }
    
    data = await requestDate(word.toLowerCase().trim());
    
    if(!data){
        return;
    }

    renderData(data);
    toogleDarkMode();

    inputSearch.value ='';
    inputSearch.blur();

});


containerApp.addEventListener('click', function(e){
    const clicked = e.target.closest('.icon--play');
    if(!clicked) return;
    const audio = this.querySelector('.js-audio');
    audio.play();
});

window.addEventListener('load', function(){

    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        checkbox.checked = true;
    }

});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    window.location.reload();
});