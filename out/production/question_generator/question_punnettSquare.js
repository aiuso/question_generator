//  Constant for Percentage Value of a Single Square of Punnett Square
var PROBABILITY_MULTIPLIER = 25;

// Array String Reference Libraries
var punnettSquare = [[],[],[]];
var geneExpressionType = ["dominant", "recessive"];
var genotypeStringArray = ["homozygous recessive", "heterozygous", "homozygous dominant"];
var expressionType
var childGenotype;
var childResult;
var answerPunnetSquare;


function generatePunnettQuestion() {
    document.getElementById('returnGenotypeAnswer').innerHTML = " ";
    document.getElementById('punnettSquareAnswer').innerHTML = " ";
    document.getElementById('phenotype').style.display = 'none';
    document.getElementById('returnPhenotypeAnswer').innerHTML = " ";
    // Initializing Punnett Square with Parent Alleles
    expressionType = geneExpressionType[getRandomInt(0, 1)]
    var femaleGenotypeValues = generateGenotype();
    var maleGenotypeValues = generateGenotype();
    //Inializing Punnett Square
    punnettSquare[0][0] = "_"
    punnettSquare[0][1] = maleGenotypeValues[0];
    punnettSquare[0][2] = maleGenotypeValues[1];
    punnettSquare[1][0] = femaleGenotypeValues[0];
    punnettSquare[2][0] = femaleGenotypeValues[1];
    // Generating Punnett Square Values
    punnettSquare = calculatePunnettSqaure(punnettSquare);
    childGenotype = genotypeStringArray[getRandomInt(0, 2)];
    // Scenario and Question for User
    var scenario = `You want to determine the possible genetic outcomes ` +
    `for a particular ${expressionType} gene. \n` +
    `You know that the male parent has a genotype that is ${genotypeTerm(maleGenotypeValues)} ` +
    `and that the female parent has a genotype is ${genotypeTerm(femaleGenotypeValues)}.`;
    var genotypeQuestion = `What is the chance that these parents have ` +
            `a child who's genotype is ${childGenotype}.`;
    // Print Question
    document.getElementById('scenario').innerHTML= scenario;
    document.getElementById('genotypeQuestion').innerHTML= genotypeQuestion;
    document.getElementById('genotypeButtons').style.display = 'inline';
}

function completePunnettSquare() {
    childResults = {"homozygous recessive": 0, 
        "heterozygous": 0,
        "homozygous dominant": 0};
    childResults = calculateChildOutcomes(punnettSquare, childResults);
}   

function checkGenotypeAnswer(userInput) {
    // Completing Punnett Square - Genotype Answer Key

    //Answer calcuation
    completePunnettSquare();
    correctAnswer = (childResults[childGenotype] * PROBABILITY_MULTIPLIER);
    //Check answer and write output
    checkAnswerValue(userInput, correctAnswer, 'returnGenotypeAnswer');
}

function checkPhenotypeAnswer(userInput){
    //Calculate answer; dependent on whether gene is dominant or recessive.
    if (expressionType == "recessive")
        correctAnswer = childResults['homozygous recessive'] * PROBABILITY_MULTIPLIER;
    else
        correctAnswer = (childResults['homozygous dominant'] + childResults['heterozygous']) * PROBABILITY_MULTIPLIER;
    //Check answer and write output
    checkAnswerValue(userInput, correctAnswer, 'returnPhenotypeAnswer');
}

function checkAnswerValue(userInput, correctAnswer, writeLocation) {
    var responseForCorrect = `Perfect - ${userInput}% is Correct!`;
    var responseForIncorrect = `Not quite - ${userInput}% is Incorrect.`;
    if (userInput == correctAnswer) {
        document.getElementById(writeLocation).innerHTML= responseForCorrect;
        if (writeLocation = 'returnGenotypeAnswer')
            document.getElementById('phenotype').style.display = 'inline';
    } else 
        document.getElementById(writeLocation).innerHTML= responseForIncorrect;
}

function printPunnettSquare() {
    var answerPunnetSquare = punnettSquareGenotype(punnettSquare, "B");
    var table = "<table border=1>";
    for (var i = 0; i < answerPunnetSquare.length; i++) {
        table += "<tr>";
        // length returns number of rows
        for (var j = 0; j < answerPunnetSquare[i].length; j++) {
            table += "<td>"+answerPunnetSquare[i][j]+"</td>";
        }
        table += "</tr>";
    }
    table += "</table>"
    document.getElementById('punnettSquareAnswer').innerHTML= table;
}

function punnettSquareGenotype(punnetSquare, letter) {
    var punnettAnswerKey = [[],[],[]];
    punnettAnswerKey[0][0] = "_";
    for (var i = 0, j = 1; j < punnetSquare.length; j++) {
            if (punnetSquare[i][j] == 0) 
                    punnettAnswerKey[i][j] = letter.toLowerCase();
            else if (punnetSquare[i][j] == 1) 
                    punnettAnswerKey[i][j] = letter.toUpperCase();
    }
    for (var i = 1, j = 0; i < punnetSquare.length; i++) {
        if (punnetSquare[i][j] == 0)
            punnettAnswerKey[i][j] = letter.toLowerCase();
        else if (punnetSquare[i][j] == 1)
                punnettAnswerKey[i][j] = letter.toUpperCase();
    }
    for (var n = 1; n < punnetSquare.length; n++) {
        for (var m = 1; m < punnetSquare.length; m++)
            switch (punnetSquare[n][m]) {
                case 0:
                    punnettAnswerKey[n][m] = letter.toLowerCase() + letter.toLowerCase();
                    break;
                case 1:
                    punnettAnswerKey[n][m] = letter.toUpperCase() + letter.toLowerCase();
                    break;
                case 2:
                    punnettAnswerKey[n][m] = letter.toUpperCase() + letter.toUpperCase();
                    break;
            }
    }
    return punnettAnswerKey;
}


function calculateChildOutcomes(punnetSquare, results) {
    for (var i = 1; i < punnetSquare.length; i++) {
        for (var j = 1; j < punnetSquare.length; j++) {
            switch (punnetSquare[i][j]) {
                case 0:
                    results["homozygous recessive"] = results["homozygous recessive"] + 1;
                    break;
                case 1:
                    results["heterozygous"] = results["heterozygous"] + 1;
                    break;
                case 2:
                    results["homozygous dominant"] = results["homozygous dominant"] + 1;
                    break;
            }
        }
    }
    return results;
}


function genotypeTerm(parentGenotype) {
    var genotypeTerm;
    var genotypeValue = parentGenotype[0] + parentGenotype[1];
    switch (genotypeValue) {
        case 0:
            genotypeTerm = "homozygous recessive";
            break;
        case 1:
            genotypeTerm = "heterozygous";
            break;
        case 2:
            genotypeTerm = "homozygous dominant";
            break;
    }
    return genotypeTerm;
}


function calculatePunnettSqaure(matrix) {
    for (var i = 1; i < matrix.length; i++) {
        for (var j = 1; j < matrix.length; j++) {
            matrix[i][j] = matrix[i - i][j] + matrix[i][j - j];
        }
    }
    return matrix;
}


function generateGenotype() {
    var parent = [];
    var genotypeValue = getRandomInt(0, 2);
    switch (genotypeValue) {
        case 0:
            parent[0] = 0;
            parent[1] = 0;
            break;
        case 1:
            parent[0] = 1;
            parent[1] = 0;
            break;
        case 2:
            parent[0] = 1;
            parent[1] = 1;
            break;
    }
    return parent;
}

// Max is inclusive
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

