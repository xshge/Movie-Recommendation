
let userInput = document.getElementById("userSign");

let signs;
let id;
userInput.addEventListener("keyup", function(){
    signs = this.value;
    
});

const instructions =[
    "Type in your zodiac sign.",
    "let's see what movie that you get."
]

const type = document.getElementById("instruc");
let sleepTime = 100;
let curIndex = 0;

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
    for(let i = 0; i< zodiacs.length; i++){
        for (var key in zodiacs[i]){
            //make sure it is case insensitive. 
            var compare = signs.localeCompare(key,undefined, { sensitivity: 'accent' });
            // console.log(compare);
            if(compare == 0){
               var numbers = zodiacs[i][key];
               var index = Math.floor(Math.random()*numbers.length);
                id = numbers[index];
                
            }
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
        <div class="poster">
        <img src="https://media.themoviedb.org/t/p/w300_and_h450_bestv2${choice.poster_path}" />
        <img src="asset/cloudframe.png" class="corner"/>
        </div>
        <h4>Genre: ${choice.genres[0].name}</h4>
        <p>${choice.overview}</p>
    `;

}
function sleep(ms){
    return new Promise((resolves) =>setTimeout(resolves, ms));
}
document.querySelector("a").addEventListener("click",selectSign);

document.querySelector("a").addEventListener("click",fetchMovies);

document.addEventListener("DOMContentLoaded", function(){
    document.querySelector("a").addEventListener("click",function(){
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
    });

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
