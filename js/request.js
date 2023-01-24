
import renderError from './app.js'
const URL ='https://api.dictionaryapi.dev/api/v2/entries/en/';

const requestDate = async function(word){
   try {
    const response = await fetch(`${URL}${word}`);

    if(!response.ok){
        throw new Error(response.statusText);
    }
    return await response.json(); 

   } catch (error) {
       renderError();
   }
    
}

export default requestDate;