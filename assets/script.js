
let time = 90;
let timerId;
let currentQIndex;
let currentAIndex;
let currentWIndex1;
let currentWIndex2;
let asked=[];
let answered = 0;
let finished = false;
let correct = 0;
let incorrect = 0;
/* const questionsEl = document.getElementsByClassName('.que') */
var answersEl = document.getElementById("answers");

var questionEl = document.getElementById("question");
console.log(questionEl);

const correctEl = document.getElementById("correct");
const incorrectEl = document.getElementById("incorrect");

const timerEl = document.getElementById("time");
var startButton = document.getElementById("start");
console.log(startButton);

// startButton.onclick = console.log('click');/* setInterval(tick,1000); */
startButton.addEventListener('click', timerInit)

reStyle();





function timerInit(){
    if(!timerId)
    {    
        console.log('init');
        timerId = setInterval(tick, 1000);
        randomize(); //show first question and answers
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

function updateScore(){
    correctEl.innerHTML = correct.toString();
    incorrectEl.innerHTML = incorrect.toString();
    console.log('update');
}

function tick(){
    updateScore();
    //for loop while time is > 0
    if(time > 0){
        time--
        timerEl.textContent = time.toString();
        console.log('tick');
    }
    //if you finished all questions

    else  {
        gameOver();
    }
    if(answered==(Object.keys(questions).length/2)) 
    {
        finished = true;
    }
    if(finished == true){
        gameOver();
    }

    console.log(answered)
    
    //time up
}


//Add questions to this object and the size of the quiz will scale infinitely
const questions = {

    q1: 'Primary programming language of web development:',
    a1: 'Javascript',

    q2: 'Ubiquitous versioning control developed by the creator of Linux:',
    a2: 'Git',

    q3: 'Store multiple pieces of data in one indexed variable called a/an:',
    a3: 'Array',

    q4: 'Store multiple pieces of data accessible through keys in a/an:',
    a4: 'Object',

    q5:'Used to store text data:',
    a5: 'String',

    q6:'Stop the normal behavior of an event using:',
    a6: 'preventDefault()'
}


function appendAnswers(a,i){

        $('#answers').append('<li class="btn" id='+i+'>'+a+'<li>');
        $('#'+i).click(function() {

            console.log('click');
            console.log(currentAIndex);
            console.log(this.id);

            if(this.id == currentAIndex){
                console.log('correct');
                correct++
            }
            else{
                incorrect++
            }
            answered++
            
            if(!finished) randomize();

        });
}

function rng(){
    let i = Math.floor(Math.random()*(Object.keys(questions).length / 2)+1)

    return i;
}

function answerRng(){
    let i = Math.floor((Math.random()*3)+1);

    return i;
}

function shuffleAnswers(a,b,c,ia,ib,ic){
        console.log('shuffle');
        appendAnswers(a,ia);
        appendAnswers(b,ib);
        appendAnswers(c,ic);

    }

//Random new question logic
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




        //set some dynamic global variables to hold current correct indexes for comparison.
        currentAIndex = index;
        currentQIndex = index;
        currentWIndex1 = wrongIndex;
        currentWIndex2 = wrongIndex2;

        var answerOrder = answerRng();

        if(answerOrder == 1) 
        {
            shuffleAnswers(questions[aIndex],questions[aWrong1],questions[aWrong2],index,wrongIndex,wrongIndex2)
        }
        else if(answerOrder == 2) 
        {
            shuffleAnswers(questions[aWrong1],questions[aIndex],questions[aWrong2],wrongIndex,index,wrongIndex2)
        }
        else
        {
            shuffleAnswers(questions[aWrong1],questions[aWrong2],questions[aIndex],wrongIndex,wrongIndex2,index)
        }


        reStyle();
        // console.log(aIndex);
        // console.log(aWrong1);
        // console.log(aWrong2);
        console.log(currentAIndex);

        asked.push(index);
    }
}

function reStyle()
{
    $('#answers').css('list-style-type','none');
    $('.btn').css("margin-top","10px"); //some styling was lost, reapply spacing
}







//Random answer logic