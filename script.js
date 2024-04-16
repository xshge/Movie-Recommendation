
let userInput = document.getElementById("userSign");

let signs;
let id;
userInput.addEventListener("keyup", function(){
    signs = this.value;
    
});

const instructions =[
    "Type in your zodiac sign.",
    "Let's see what movie that you will get."
]

const type = document.getElementById("instruc");
let sleepTime = 100;
let curIndex = 0;
const spellCheck = "Maybe check your spelling?"
let zodiacs = [
    {
        "taurus":["569094","10494","545611"]
    },
    {
        "scorpio":["13597","9495","361292"]
    },
    {
        "libras":["11176","4550","9426"]
    },
    {
        "leo":["350","161","393519"]
    },
    {
        "sagittarius":["22538","546554","274"]
    },
    {
        "aquarius":["9090","36685","9003"]
    },
    {
        "capricorn":["254320","531428","252171"]
    },
    {
        "cancer":["258480","530385","773"]
    },
    {
        "virgo":["424781","120467","391713"]
    },
    {
        "gemini":["680","38","458723"]
    },
    {
        "aries":["949423","2109","9470"]
    },
    {
        "pisces":["747188","555604","926899"]
    }
    
]

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmVlNjUwZjUyNGE4ODJmN2VkYmZkOTRjNjEzYzZiMCIsInN1YiI6IjY2MTgxYjEyMmIxYjQ0MDE2M2YzZTNiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iyQua93ws40wtFEUO17A_8q9TWjhbIFeGbn7bMfOoS8'
    }
  };
  
function selectSign(){
    let anchor = document.getElementById("skip");
    loop1:for(let i = 0; i< zodiacs.length; i++){
         var warn = document.getElementById("warning");
         for (var key in zodiacs[i]){
            //make sure it is case insensitive.  
            //make sure user have inputted something in the text box.
            if(signs == null){
                warn.style.opacity= "100%";
            }else{
    
                var compare = signs.localeCompare(key,undefined, { sensitivity: 'accent' });
                if(compare === 0){
               var numbers = zodiacs[i][key];
               var index = Math.floor(Math.random()*numbers.length);
                id = numbers[index];
                warn.style.opacity= "0%";
                anchor.href='#Result';
                fetchMovies();
                let animation = anime({
                    targets: ['.cloud1','.cloud2', '.cloud3'],
                    translateX: 1850,
                    duration: 8000,
                    easing: 'linear',
                    delay: anime.stagger(200)

                    });
                
                let leftCloud = anime({
                        targets: ['.cloud4', '.cloud5', '.cloud6'],
                        translateX: -1200,
                        duration: 8000,
                        easing:'linear',
                        delay: anime.stagger(100)
            
                    });

                    break loop1;
                }else {
                    // console.log("still here");
                anchor.href ="javascript:void(0)";
                warn.style.opacity= "100%";
                warn.innerText = spellCheck;
            }
            }
            //console.log(compare);
            
        }

    }
}
function fetchMovies(){
    console.log(id);
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US1`, options)
    .then(response => {
        if(!response.ok){
            throw new Error ('Network connection error');
        } return response.json();
    }
       )
    .then(response => {
        displayMovie(response);
    })
    .catch(err => console.error(err));
}
function displayMovie(choice){
    let movie = document.getElementById("Result");
    movie.innerHTML =`
        <h2>${choice.title}</h2>
        <img src="https://media.themoviedb.org/t/p/w300_and_h450_bestv2${choice.poster_path}"class="poster" />
        <h4>Genre: ${choice.genres[0].name}</h4>
        <p>${choice.overview}</p>
    `;

}
function sleep(ms){
    return new Promise((resolves) =>setTimeout(resolves, ms));
}
document.querySelector("a").addEventListener("click",selectSign);

// document.querySelector("a").addEventListener("click",fetchMovies);

document.addEventListener("DOMContentLoaded", function(){
    

        async function instructionLoop(){
            console.log("called");
            while(true){
                let curInstruc = instructions[curIndex];

                for (i = 0; i< curInstruc.length; i++){
                    type.innerText = curInstruc.substring(0, i +1);
                    await sleep(sleepTime);
                }

                await sleep(sleepTime * 10);

                for (let i = curInstruc.length; i > 0 ; i--){
                    type.innerText = curInstruc.substring(0, i - 1);
                    await sleep(sleepTime);
                }

                await sleep(sleepTime * 5);

                if(curIndex === instructions.length -1){
                    curIndex = 0;
                }else{
                    curIndex++;
                }
            }
        };
    instructionLoop();

   
});
