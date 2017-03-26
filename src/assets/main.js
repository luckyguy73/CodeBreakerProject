let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let message = document.getElementById('message');
let results = document.getElementById('results');
let code = document.getElementById('code');
let gd = document.getElementById('guessing-div');
let rd = document.getElementById('replay-div');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    answer.value ? false: setHiddenFields();
    if(!validateInput(input.value)) return false;
    attempt.value++;
    if(getResults(input.value)) {
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
        return;
    } 
    if (attempt.value >= 10) {
        setMessage('You Lose! :(');
        showAnswer(false);
        showReplay();
        return;     
    }
    setMessage('Incorrect, try again.');

}

//implement new functions here
function setHiddenFields() {
    attempt.value = 0;
    answer.value = Math.floor(Math.random()*(10000)).toString();
    while(answer.value.length < 4) {
        answer.value = '0' + answer.value;
    }
}

function setMessage(note) {
    message.innerHTML = note;
}

function validateInput(check) {
    if(check.length === 4) return true;
    setMessage("Guesses must be exactly 4 characters long.");
    return false;
}

function getResults(inputResults) {
    let begResult = '<div class="row"><span class="col-md-6">' + inputResults + '</span><div class="col-md-6">';
    let wrong = '<span class="glyphicon glyphicon-remove"></span>';
    let close = '<span class="glyphicon glyphicon-transfer"></span>';
    let yup = '<span class="glyphicon glyphicon-ok"></span>';
    let tally = 0;

    for (let x = 0; x < inputResults.length; x++) {
        if(answer.value.indexOf(inputResults[x]) === -1) {
            begResult += wrong;
        } else if (inputResults[x] == answer.value[x]) {
            begResult += yup;
            tally++;
        } else {
            begResult += close;
        }
    }
    results.innerHTML += begResult + '</div></div>';
    return tally === 4 ? true : false;
}

function showAnswer(uponWin) {
    code.innerHTML = answer.value;
    code.className += uponWin ? " success" : " failure";
}

function showReplay() {
    gd.style.display = 'none';
    rd.style.display = 'block';
}