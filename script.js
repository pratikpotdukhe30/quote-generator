const quoteContainer = document.getElementById('quote-container'),
      quoteText      = document.getElementById('quote'),
      authorText     = document.getElementById('author'),
      twitterBtn     = document.getElementById('twitter'),
      newQuoteBtn    = document.getElementById('new-quote'),
      loader         = document.getElementById('loader');

function showLoadingSpinner(){
     loader.hidden = false;
     quoteContainer.hidden = true;  
}

function removeLoadingSpinner(){
     if(!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden = false;  
     }
}

// Get Quote from API
async function getQuote(){
    showLoadingSpinner();
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try{
           
            const response = await fetch(proxyUrl + apiUrl);
            const data = await response.json();
            // console.log(data);
            //If author is blank add 'unknown'
            if(data.quoteAuthor === ''){
                authorText.innerText = "Unknown";    
            }else{
                authorText.innerText = data.quoteAuthor;
            }

            //long quote handle
            if(data.quoteText.length > 120){
                quoteText.classList.add('long-quote');
            }else{
                quoteText.classList.remove('long-quote');
            }
            quoteText.innerText = data.quoteText;
            removeLoadingSpinner();
    } catch(err){
        getQuote();
        console.log("Whoops, no quote", err);
    }        
}

// Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank'); 
}

//addEvent Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on load
getQuote();