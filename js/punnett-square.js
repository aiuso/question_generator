//  Constants ###################
const PROBABILITY_MULTIPLIER = 25;
const TRAIT_EXPRESSION_DOMINANCE = ["dominant", "recessive"];
const ZYGOSITY_LIST = ["homozygous recessive", "heterozygous", "homozygous dominant"];


// Multiplescope Variables #########
var punnettSquare = [[],[],[]];
var traitDominance;
var femaleAlleles;
var maleAlleles;
var childZygosity;
var offspringOutcomeTally;
var answerPunnetSquare;
var correctGenotypeAnswer;
var correctPhenotypeAnswer;



// Main #######################

function generatePunnettQuestion() {
    resetHTML();
    offspringOutcomeTally = {"homozygous recessive": 0, 
                                                    "heterozygous": 0,
                                                    "homozygous dominant": 0};
    // Initializing Parents and Child
    traitDominance = TRAIT_EXPRESSION_DOMINANCE[getRandomInt(0, 1)];
    femaleAlleles = assignAlleles();
    maleAlleles = assignAlleles();
    childZygosity = ZYGOSITY_LIST[getRandomInt(0, 2)];

    punnettSquare = generatePunnettSquare(punnettSquare, maleAlleles, femaleAlleles);
    offspringOutcomeTally = tallyPossibleOutcomes(punnettSquare, offspringOutcomeTally);
    correctGenotypeAnswer = (offspringOutcomeTally[childZygosity] * PROBABILITY_MULTIPLIER);
    createQuestion();
}


/*

##########  Generating the Scenario  ##########

assignAlleles() will  randomly generate an inclusive value between 0 and 2. This value will determine the zygosity
and allele composition for each parent.
        0 == homozygous recessive; the parent will have two allele values of 0. Both alleles are recessive.
        1 == heterzygous; the parent will have one allele value of 1 and one allele value of 0.
        2 == homozygous dominant; the parent will have two allele values of 1. Both alleles are dominant.

generatePunnettSquare() will transfer parent allele values to the Punnett square matrix and completeOffspringMatrix()
will use those values to calculate indexes of the matrix. These values indicate the possible zygosity outcomes for the offspring.
        0 == homozygous recessive
        1 == heterzygous
        2 == homozygous dominant

Example:
_________________
|_____|__1__|__0__|
|__1__|__2__|__1__|
|__0__|__1__|__0__|

*/

function assignAlleles() {
    let alleleArray = [];
    let value = getRandomInt(0, 2);
    switch (value) {
        case 0:
            alleleArray[0] = 0;
            alleleArray[1] = 0;
            break;
        case 1:
            alleleArray[0] = 1;
            alleleArray[1] = 0;
            break;
        case 2:
            alleleArray[0] = 1;
            alleleArray[1] = 1;
            break;
    }
    return alleleArray;
}

function generatePunnettSquare(pSquare, mAlleles, fAlleles) {
        // Set Parent Alleles
        pSquare[0][0] = "_";
        pSquare[0][1] = mAlleles[0];
        pSquare[0][2] = mAlleles[1];
        pSquare[1][0] = fAlleles[0];
        pSquare[2][0] = fAlleles[1];
        pSquare = completeOffspringMatrix(pSquare)
        return pSquare
}

function completeOffspringMatrix(matrix) {
    for (let i = 1; i < matrix.length; i++) {
        for (let j = 1; j < matrix.length; j++) {
            matrix[i][j] = matrix[i - i][j] + matrix[i][j - j];
        }
    }
    return matrix;
}


/* 
##########  Creating & Posting the Question  ##########

createQuestion() will initialize the genotype question and write it to HTML.
fetchZygosity() take values for parent alles and returns a string indiciating zygoisity.
*/ 

function createQuestion() {
    let scenario = `You want to determine the possible genetic outcomes ` +
    `for a particular ${traitDominance} trait. \n` +
    `You know that the male parent has a genotype that is ${fetchZygosity(maleAlleles)} ` +
    `and that the female parent has a genotype is ${fetchZygosity(femaleAlleles)}.`;
    let genotypeQuestion = `What is the chance that these parents have ` +
            `a child who's genotype is ${childZygosity}.`;

    // Post Question to HTML & Update Visibility
    document.getElementById('scenario').textContent= scenario;
    document.getElementById('genotypeQuestion').textContent= genotypeQuestion;
    document.getElementById('genotypeButtons').style.display = 'block';
    document.getElementById('showPunnetSquare').style.visibility = 'visible';
}

function fetchZygosity(allele) {
    let zygosity;
    let alleleValue = allele[0] + allele[1];
    if (alleleValue == 0)
            zygosity = "homozygous recessive";
    else if (alleleValue == 1)
            zygosity = "heterozygous";
    else if (alleleValue == 2)
            zygosity = "homozygous dominant";
    return zygosity;
}


/*
##########  Calculating Answers  ##########

tallyPossibleOutcomes() accepts a Punnett sqaure matrix and tallys the
the genotypes of each of the four possible outcomes into three types of
zygosity.
*/ 

function tallyPossibleOutcomes(matrix, runningTotal) {
    for (let i = 1; i < matrix.length; i++) {
        for (let j = 1; j < matrix.length; j++) {
            if (matrix[i][j] == 0)
                    runningTotal["homozygous recessive"] = runningTotal["homozygous recessive"] + 1;
            else if (matrix[i][j] == 1) 
                    runningTotal["heterozygous"] = runningTotal["heterozygous"] + 1;
            else if (matrix[i][j] == 2) 
                    runningTotal["homozygous dominant"] = runningTotal["homozygous dominant"] + 1;
            }
        }
    return runningTotal;
    }



/* 
##########  Validate Input & Check for Correctness  ##########

Both checkGenotypeAnswer() and checkPhenotypeAnswer() will accept user input.
An HTML button will call these functions onclick and pass their button values. 
Phenotypes depend on the dominance of the trait and
will acess that information first.

Both functions will use checkAnswer() for the comparions of these values
with expected values. Results will be written to the location indicated by the
parameter passed to the function.
*/

function checkGenotypeAnswer(userInput) {
    checkAnswer(userInput, correctGenotypeAnswer, 'returnGenotypeAnswer');
}

function checkPhenotypeAnswer(userInput){
    if (traitDominance == "recessive")
        correctPhenotypeAnswer = offspringOutcomeTally['homozygous recessive'] * PROBABILITY_MULTIPLIER;
    else if (traitDominance == "dominant")
        correctPhenotypeAnswer = (offspringOutcomeTally['homozygous dominant'] + offspringOutcomeTally['heterozygous']) * PROBABILITY_MULTIPLIER;
    checkAnswer(userInput, correctPhenotypeAnswer, 'returnPhenotypeAnswer');
}

function checkAnswer(userInput, correctAnswer, writeLocation) {
    let correctResponse = `Perfect - ${userInput}% is Correct!`;
    let incorrectResponse = `Not quite - ${userInput}% is Incorrect.`;

    if (userInput == correctAnswer) {
        document.getElementById(writeLocation).textContent = correctResponse;
        if (writeLocation == 'returnGenotypeAnswer')
            document.getElementById('phenotype').style.visibility = 'visible';
    } else {
        document.getElementById(writeLocation).textContent= incorrectResponse;
        if (writeLocation == 'returnGenotypeAnswer')
            document.getElementById('phenotype').style.visibility = 'hidden';
    }
}


/* 
##########  Punnett Square Table for HTML  ##########

punnettWithLetters() will take values and replace them with the proper letter notation.
printPunnettSquare will arrange the aforementioned into an HTML table.
*/

function printPunnettSquare() {
    let psWithLetters = punnettWithLetters(punnettSquare, "B");
    let table = "<table border=1>";
    for (let i = 0; i < psWithLetters.length; i++) {
        table += "<tr>";
        // length returns number of rows
        for (let j = 0; j < psWithLetters[i].length; j++) {
            table += "<td>"+psWithLetters[i][j]+"</td>";
        }
        table += "</tr>";
    }
    table += "</table>"
    document.getElementById('punnettSquareAnswer').innerHTML= table;
}

function punnettWithLetters(punnetSquare, letter) {
    var punnettAnswerKey = [[],[],[]];
    punnettAnswerKey[0][0] = "_";
    for (let i = 0, j = 1; j < punnetSquare.length; j++) {
            if (punnetSquare[i][j] == 0) 
                    punnettAnswerKey[i][j] = letter.toLowerCase();
            else if (punnetSquare[i][j] == 1) 
                    punnettAnswerKey[i][j] = letter.toUpperCase();
    }
    for (let i = 1, j = 0; i < punnetSquare.length; i++) {
        if (punnetSquare[i][j] == 0)
            punnettAnswerKey[i][j] = letter.toLowerCase();
        else if (punnetSquare[i][j] == 1)
                punnettAnswerKey[i][j] = letter.toUpperCase();
    }
    for (let n = 1; n < punnetSquare.length; n++) {
        for (var m = 1; m < punnetSquare.length; m++)
            if (punnetSquare[n][m] == 0) 
                    punnettAnswerKey[n][m] = letter.toLowerCase() + letter.toLowerCase();
            else if (punnetSquare[n][m] == 1) 
                    punnettAnswerKey[n][m] = letter.toUpperCase() + letter.toLowerCase();
            else if (punnetSquare[n][m] == 2) 
                    punnettAnswerKey[n][m] = letter.toUpperCase() + letter.toUpperCase();
            }
    return punnettAnswerKey;
    }


// General Functions ##########

function getRandomInt(min, max) {
    // Max inclusive
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

function resetHTML() {
    document.getElementById('returnGenotypeAnswer').textContent = " ";
    document.getElementById('punnettSquareAnswer').textContent = " ";
    document.getElementById('phenotype').style.visibility = 'hidden';
    document.getElementById('returnPhenotypeAnswer').textContent = " ";
}