
let time = 90;
let timerId;

let asked=[];
let finished;
/* const questionsEl = document.getElementsByClassName('.que') */
var answersEl = document.getElementById("answers");

var questionEl = document.getElementById("question");
console.log(questionEl);

const timerEl = document.getElementById("time");
var startButton = document.getElementById("start");
console.log(startButton);

// startButton.onclick = console.log('click');/* setInterval(tick,1000); */
startButton.addEventListener('click', timerInit)





function timerInit(){
    if(!timerId)
    {    
        console.log('init');
        timerId = setInterval(tick, 1000);
    }
}

function gameOver(){
    console.log('game-Over')
    clearInterval(timerId);
    timerId = null;
    if(!finished) questionEl.textContent = 'Game Over!';

    else{
        questionEl.textContent = "You're all done!"
    }
}


function tick(){
    //for loop while time is > 0
    if(time > 0){
        time--
        timerEl.textContent = time.toString();
        console.log('tick');
    }

    else  {
        gameOver();
    }
    
    //time up
}



const questions = {

    q1: 'Primary programming language of web development:',
    a1: 'Javascript',

    q2: 'Ubiquitous versioning control developed by the creator of Linux:',
    a2: 'Git',

    q3: 'Store multiple pieces of data in one indexed variable called a/an:',
    a3: 'Array',

    q4: 'Store multiple strings accessible through keys in a/an:',
    a4: 'Object',

    q5:'Used to store text data:',
    a5: 'String',

    q6:'Stop the normal behavior of an event using:',
    a6: 'preventDefault()'
}


function appendAnswers(a){
    //randomize insert at beginning or end
    let shuffle = Math.floor(Math.random()*2);
    
    if(shuffle = 1){
        $('#answers').append('<li class="btn">'+a+'<li>');
    }

    else{
        $('#answers').prepend('<li class="btn">'+a+'<li>');
    }
    //add answer variable
    

}

function rng(){
    let i = Math.floor(Math.random()*(Object.keys(questions).length / 2)+1)

    return i;
}

function answerRng(){
    let i = Math.floor((Math.random()*3)+1);

    return i;
}

function shuffleAnswers(a,b,c){
        console.log('shuffle');
        appendAnswers(a);
        appendAnswers(b);
        appendAnswers(c);
    }

//Random question logic
function randomize()
{
    if(asked.length < (Object.keys(questions).length/2))// if all questions havent been asked, execute logic.
      {  
        var index = rng();


        while(asked.includes(index))
        {//if the question has already been asked, reselect random index
            index = rng();
        }


        var wrongIndex = rng();
        var wrongIndex2 = rng();
    

        while(wrongIndex === index || wrongIndex === wrongIndex2 || index === wrongIndex2){
            console.log('same')
            wrongIndex = rng();
            wrongIndex2 = rng();
        }

        var qIndex = "q"+index.toString(); //question key
        var aIndex = "a"+index.toString(); //correct Answer key
        var aWrong1 = "a"+wrongIndex.toString();
        var aWrong2 = "a"+wrongIndex2.toString();

        questionEl.textContent = questions[qIndex];
        
        $('#answers').empty();
        $('#answers').css('list-style-type','none');

        var answerOrder = answerRng();

        if(answerOrder == 1) 
        {
            shuffleAnswers(questions[aIndex],questions[aWrong1],questions[aWrong2])
        }
        else if(answerOrder == 2) 
        {
            shuffleAnswers(questions[aWrong1],questions[aIndex],questions[aWrong2])
        }
        else
        {
            shuffleAnswers(questions[aWrong1],questions[aWrong2],questions[aIndex])
        }

        $('.btn').css("margin-top","10px"); //some styling was lost, reapply spacing
        // console.log(aIndex);
        // console.log(aWrong1);
        // console.log(aWrong2);
        console.log(answerOrder);

        asked.push(index);
    }
    else{
        finished = true;
    }
}


randomize();

randomize();




//Random answer logic