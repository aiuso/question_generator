var cOne, vOne, cTwo, vTwo;
var questionType;
var question;
var questionWater;
var userResponse;
var userResponseWater;
var water;
var answerBeforeRound;
var answer;
var count;
var waterQuestion; 

function generateStockDilutionQuestion() {
    resetPage();
    // Constants for Random Value Ranges
    var VONE_LOWEST_VALUE = 10;
    var VONE_HIGHEST_VALUE = 500;
    var CONE_LOWEST_VALUE = 25;
    var CONE_HIGHEST_VALUE = 200;
    var CTWO_LOWEST_VALUE = 1;
    var CTWO_HIGHEST_VALUE = 5;
    var VTWO_LOWEST_VALUE = 1000;
    var VTWO_HIGHEST_VALUE = 10000;

    //Randomly choose question type
    questionType = getRandomInt(1, 3);

    //Question types
    switch (questionType) {
        // Solve for vOne
        case 1:
            //Generate values for: cOne, cTwo, vTwo;
            cOne = getRandomInt(CONE_LOWEST_VALUE, CONE_HIGHEST_VALUE);
            cTwo = getRandomInt(CTWO_LOWEST_VALUE, CTWO_HIGHEST_VALUE);
            vTwo = getRandomInt(VTWO_LOWEST_VALUE, VTWO_HIGHEST_VALUE);
            //Question
            question = `You are trying to make ${vTwo}mL of a ${cTwo}x solution ` +
                    `from a ${cOne}x concentrated stock of TAE. \nWe'll need to determine ` +
                    `how much stock solution to add to a particular volume of water to make this solution. ` +
                    `\nFirst, how many mL of ${cOne}x TAE will we need? ` +
                    `\nRound your answer to the nearest integer`;

            printToPage(question, 'stockDilution-question');
            answer = Math.round((cTwo * vTwo) / cOne);
            break;

        // Solve for cOne
        case 2:
            //Generate values for: vOne, cTwo, vTwo;
            vOne = getRandomInt(VONE_LOWEST_VALUE, VONE_HIGHEST_VALUE);
            cTwo = getRandomInt(CTWO_LOWEST_VALUE, CTWO_HIGHEST_VALUE);
            vTwo = getRandomInt(VTWO_LOWEST_VALUE, VTWO_HIGHEST_VALUE);
            question = `The label on your stock TAE solution has been lost! \n` +
                    `You know that you just made ${vTwo}mL of ${cTwo}x TAE solution. You also know ` +
                    `that you added ${vOne}mL of the stock in making your solution. ` +
                    `\nCalculate the concentration of the stock solution so you can relabel it with the appropriate concentration.` +
                    `\n Round your answer to the nearest integer.`;

            printToPage(question, 'stockDilution-question')
            answer = Math.round((cTwo * vTwo) / vOne);
            break;

        // Solve for vOne
        case 3:
            //Generate values for: cOne, vOne, water;
            vOne = getRandomInt(VONE_LOWEST_VALUE, VONE_HIGHEST_VALUE);
            cOne = getRandomInt(CONE_LOWEST_VALUE, CONE_HIGHEST_VALUE);
            water = getRandomInt(VTWO_LOWEST_VALUE, VTWO_HIGHEST_VALUE);
            question = `You accidentally mixed some reagent and created a new solution! ` +
                    `\nYou mixed ${vOne}mL of ${cOne}x TAE with ${water}mL of water. What is the concentration` +
                    `of you final solution? \nRound your answer to the nearest integer.`;
            printToPage(question, 'stockDilution-question');

            vTwo = vOne + water;
            answer = Math.round((cOne * vOne) / vTwo);
            break;
    }
}

function mixtureQuestion() {
    questionWater = `\nNow, how much water will we need to mix with ${answer}mL of ${cOne}x TAE?` +
    `\nRound your answer to the nearest integer.`;
    printToPage(questionWater, 'mixture-question');
    document.getElementById('mixture-question').style.visibility = 'visible';
    answer = vTwo - answer;
}


function setUserInput(value) {
    document.getElementById('sd-input-box').value = " ";
    if (typeof question === 'undefined')
        alert("You need to generate a question first");
    else 
            validateInput(parseInt(value), answer, questionType);
}


function validateInput(value, answer, questionType) {
    if (value === parseInt(value, 10))
        checkAnswer(value, answer, questionType);
    else
        alert("Your answer must be an integer.");
}

function checkAnswer(userAttempt, answer, questionType) {
    var units = ["","mL", "x", "x"];
    var responseForCorrect = `Perfect - ${userAttempt}${units[questionType]} is Correct!`;
    var responseForIncorrect = `Not quite - ${userAttempt}${units[questionType]} is Incorrect.`;
    if (waterQuestion == true) {
        if (userAttempt == answer) 
            printToPage(responseForCorrect, 'mixture-answer');
        else
            printToPage(responseForIncorrect, 'mixture-answer');
    } else {
        if (userAttempt == answer) {
            printToPage(responseForCorrect, 'stockDilution-answer');
            if (questionType == 1) {
                mixtureQuestion();
                waterQuestion = true;
            }
        } else
            printToPage(responseForIncorrect, 'stockDilution-answer');
    }
}

// Max is inclusive
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


function printToPage(thingToPrint, whereToPrint) {
    document.getElementById(whereToPrint).innerHTML= thingToPrint;
}

function resetPage() {
        //Reset content on webpage
        waterQuestion = false;
        document.getElementById('stockDilution-textbox').style.visibility = 'visible';
        document.getElementById('stockDilution-answer').innerHTML = " ";
        document.getElementById('mixture-question').innerHTML = " ";
        document.getElementById('mixture-answer').innerHTML = " ";
}