const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('lds-hourglass');
const game = document.getElementById('game');
const passMessage = document.getElementById('passMessage');
const failMessage = document.getElementById('failMessage');
const subject = localStorage.getItem('subject')

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
let possibleQuestions
let answerToQuestion;
let smileyPass = "&#128526;"
let smileyFail = "&#128533;"
let newNumber;

if(subject){
    newSubject = subject.toLocaleLowerCase();
}else{
    newSubject = "chemistry"
}

console.log(newSubject)

fetch(`https://questions.aloc.ng/api/q/7?subject=${newSubject}`
)
.then(res => {
    return res.json();
})
.then(loadedQuestions => {
    possibleQuestions = loadedQuestions.data

    questions = loadedQuestions.data.map(loadedQuestion => {
        const formattedQuestion = {
            question: loadedQuestion.question
        };

        
        const answerChoices = Object.values(loadedQuestion.option);
        formattedQuestion.answer = loadedQuestion.answer;
       
        
        answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index + 1)] = choice
            
        })

        // console.log(formattedQuestion)
        return formattedQuestion;
    });
   
   
    startGame();
})
.catch(err => {
    console.log(err)
})



const CORRECT_BONUS = 10;
const MAX_QUESTION = 7;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden')
    loader.style.display = 'none';
}

//get question function

getNewQuestion = () => {

    //if there are no question left in the array/ we have used up all the quwestions
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTION){
        localStorage.setItem('mostRecentScore', score)
        localStorage.setItem('maxscore', MAX_QUESTION*10)
        //go to the end of the page
        return window.location.assign('/end.html')
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTION}`;
   
   

    //Update progress Bar in %
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTION) * 100}%`; //to get percentage

    const questionIndex =  Math.floor(Math.random() * availableQuestions.length)
   
    currentQuestion = availableQuestions[questionIndex];
    
   
    
    question.innerText = currentQuestion.question;
    // console.log(currentQuestion)
    if(currentQuestion.answer == "a"){
        newNumber = 1
    }else if(currentQuestion.answer == "b"){
        newNumber = 2
    }else if(currentQuestion.answer == "c"){
        newNumber = 3
    }else if(currentQuestion.answer == "d"){
        newNumber = 4
    }
    //loop through the choices and display each in the choices segment
    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number]
    });

    //splice the currently viewed question
    availableQuestions.splice(questionIndex, 1)
    
    acceptingAnswers = true
}



//event listener for each selected choice of answer
choices.forEach(choice => {
    choice.addEventListener('click', (e) => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset["number"];

        // console.log(newNumber)
        const classToApply = selectedAnswer == newNumber ? 'correct' : 'incorrect';
        if(classToApply === 'correct'){
            incrementScore(CORRECT_BONUS)
            passMessage.innerText = `Correct!!!! nice try that was awesome `;
        }else{
            possibleQuestions.forEach((q) => {
                if(q.question === currentQuestion.question){
                    answerToQuestion = q.answer
                    console.log(answerToQuestion)
                }
            })
            failMessage.innerText = `Oops!!! wrong answer correct answer is ${answerToQuestion}`;    
        }

        selectedChoice.parentElement.classList.add(classToApply);

        //remove classToApply and empty success/failure message
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            passMessage.innerText = ''
            failMessage.innerText = ''
            getNewQuestion();
        }, 2000)

        
    });
});



incrementScore = num => {
    score += num;
    scoreText.innerText = score
};

