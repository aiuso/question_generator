function stockDilutionQuestion() {
    Scanner scan = new Scanner(System.in);

    // Constants for Random Value Ranges
    var VONE_LOWEST_VALUE = 10;
    var VONE_HIGHEST_VALUE = 500;
    var CONE_LOWEST_VALUE = 25;
    var CONE_HIGHEST_VALUE = 200;
    var CTWO_LOWEST_VALUE = 1;
    var CTWO_HIGHEST_VALUE = 5;
    var VTWO_LOWEST_VALUE = 1000;
    var VTWO_HIGHEST_VALUE = 10000;


    var cOne, vOne, cTwo, vTwo;
    var questionType = numGenerator(1, 1);
    var question;
    var questionWater;
    var userResponse;
    var userResponseWater;
    var water;
    var answerBeforeRound;
    var answer = 0;


    switch (questionType) {

        // Solve for vOn
        case 1:
            //Generate values for: cOne, cTwo, vTwo;
            cOne = numGenerator(CONE_LOWEST_VALUE, CONE_HIGHEST_VALUE);
            cTwo = numGenerator(CTWO_LOWEST_VALUE, CTWO_HIGHEST_VALUE);
            vTwo = numGenerator(VTWO_LOWEST_VALUE, VTWO_HIGHEST_VALUE);
            question = `You are trying to make ${vTwo}mL of a ${cTwo}x solution ` +
                    `from a ${cOne}x concentrated stock of TAE. \nWe'll need to determine ` +
                    `how much stock solution to add to a particular volume of water to make this solution. ` +
                    `\nFirst, how many mL of ${cOne}x TAE will we need? ` +
                    `\nRound your answer to the nearest integer`;
            System.out.println(question);
            userResponse = validateInput();
            answerBeforeRound = (float) (cTwo * vTwo) / cOne; //Prevent loss of precision due to int Division
            answer = Math.round(answerBeforeRound);
            checkAnswer(userResponse, answer, questionType);

            questionWater = `\nNow, how much water will we need to mix with ${answer}mL of ${cOne}x TAE?` +
                    `\nRound your answer to the nearest integer.`;
            System.out.println(questionWater);
            userResponseWater = validateInput();
            water = vTwo - answer;
            checkAnswer(userResponseWater, water, questionType);
            break;

        // Solve for cOne
        case 2:
            //Generate values for: vOne, cTwo, vTwo;
            vOne = numGenerator(VONE_LOWEST_VALUE, VONE_HIGHEST_VALUE);
            cTwo = numGenerator(CTWO_LOWEST_VALUE, CTWO_HIGHEST_VALUE);
            vTwo = numGenerator(VTWO_LOWEST_VALUE, VTWO_HIGHEST_VALUE);
            question = `The label on your stock TAE solution has been lost! \n` +
                    `You know that you just made ${vTwo}mL of ${cTwo}x TAE solution. You also know ` +
                    `that you added ${vOne}mL of the stock in making your solution. ` +
                    `\nCalculate the concentration of the stock solution so you can relabel it with the appropriate concentration.` +
                    `\n Round your answer to the nearest integer.`;
            console.log(question);
            userResponse = validateInput();
            answerBeforeRound = (float) (cTwo * vTwo) / vOne; //Prevent loss of precision due to Int Division
            answer = (Math.round(answerBeforeRound));
            checkAnswer(userResponse, answer, questionType);
            break;

        // Solve for vOne
        case 3:
            //Generate values for: cOne, vOne, water;
            vOne = numGenerator(VONE_LOWEST_VALUE, VONE_HIGHEST_VALUE);
            cOne = numGenerator(CONE_LOWEST_VALUE, CONE_HIGHEST_VALUE);
            water = numGenerator(CTWO_LOWEST_VALUE, CTWO_HIGHEST_VALUE);
            question = `You accidentally mixed some reagent and created a new solution1! ` +
                    `\nYou mixed ${vOne}mL of ${cOne}x TAE with ${water}mL of water. What is the concentration` +
                    `of you final solution? \nRound your answer to the nearest integer.`;
            console.log(question);
            userResponse = validateInput();

            vTwo = vOne + water;
            answerBeforeRound = (float) (cOne * vOne) / vTwo; //Prevent loss of precision due to var Division
            answer = (Math.round(answerBeforeRound));
            checkAnswer(userResponse, answer, questionType);
            break;
    }
}

function validateInput() {
    Scanner scan = new Scanner(System.in);
    var userResponse = 0;
    try {
        userResponse = scan.nextvar();
    } catch (e) {
        console.log("This is not a valid input");
        validateInput();
    }
    return userResponse;
}

function checkAnswer(userAttempt, answer, questionType) {
    var units = ["","mL", "x", "x"];
    if (userAttempt == answer)
        console.log(`Perfect - ${userAttempt}${units[questionType]} is Correct!`);
    else
        console.log(`Not quite - ${userAttempt}${units[questionType]} is Incorrect.`);
}
