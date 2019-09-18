const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const scoreText = document.getElementById('scoreText');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];


const mostRecentScore = localStorage.getItem('mostRecentScore');
const maxScore = localStorage.getItem('maxscore')
scorePercentage = Math.floor(mostRecentScore / maxScore * 100);

if(scorePercentage >= 70){
    scoreText.innerHTML = "Excellent!!! You are a Machine"
    finalScore.innerText = scorePercentage + "%"
}
else if(scorePercentage >= 50 ){
    scoreText.innerHTML = "Good Job!!! You made above Average"
    finalScore.innerText = scorePercentage + "%"
}
else if(scorePercentage < 50){
    scoreText.innerHTML = "Awwww!!! You made below Average Try again"
    finalScore.innerText = scorePercentage + "%"
}




// username.addEventListener('keyup', () => {
//     saveScoreBtn.disabled = !username.value;
// });

// saveHighScore = (e) => {
//     e.preventDefault();
   
//     const score = {
//         score: Math.floor(Math.random() * 100),
//         name: username.value
//     }
    
//     highScores.push(score);
//     highScores.sort((a,b) => b.score - a.score)
//     highScores.splice(5);
//     localStorage.setItem('highScores', JSON.stringify(highScores));
//     window.location.assign('/')

// }

