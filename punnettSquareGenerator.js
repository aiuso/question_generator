function generatePunnetQuestion() {
    // Initializing Punnett Square with Parent Alleles
    var femaleGenotypeValues = generateGenotype();
    var maleGenotypeValues = generateGenotype();

    punnettSquare[0][0] = "_"
    punnettSquare[0][1] = maleGenotypeValues[0];
    punnettSquare[0][2] = maleGenotypeValues[1];
    punnettSquare[1][0] = femaleGenotypeValues[0];
    punnettSquare[2][0] = femaleGenotypeValues[1];


    // Generating Punnett Square Values
    punnettSquare = calculatePunnettSqaure(punnettSquare);
    //printPunnettSquare(punnettSquare);

    childGenotype = genotypeStringArray[getRandomInt(0, 2)];


    // Scenario and Question for User
    var scenario = `You want to determine the possible genetic outcomes ` +
    `for a particular ${geneExpressionType[getRandomInt(0, 1)]} gene. \n` +
    `You know that the male parent has a genotype that is ${genotypeTerm(maleGenotypeValues)} ` +
    `and that the female parent has a genotype is ${genotypeTerm(femaleGenotypeValues)}.`;

    var questionGenotype = `What is the chance that these parents have ` +
            `a child who's genotype is ${childGenotype}.`;


    // Print Question
    document.getElementById('scenario').innerHTML= scenario;
    //window.document.write(scenario);
    document.getElementById('question').innerHTML= questionGenotype;
}


function checkPunnettAnswer() {
    var userInput = document.getElementById("userInput").value;
    // Completing Punnett Square - Genotype Answer Key
    var childResults = {"homozygous recessive": 0, 
    "heterozygous": 0,
    "homozygous dominant": 0};
    childResults = calculateChildOutcomes(punnettSquare, childResults);
    correctAnswer = (childResults[childGenotype] * PROBABILITY_MULTIPLIER);

    //
    responseForCorrect = `Perfect - ${userInput}% is Correct!`;
    responseForIncorrect = `Not quite - ${userInput}% is Incorrect.`;
    // Genotyping Percentage Calculation

    if (userInput == correctAnswer)
        document.getElementById('returnAnswer').innerHTML= responseForCorrect;
    else
        document.getElementById('returnAnswer').innerHTML= responseForIncorrect;

    // Answer Key for Punnet Square
    answerPunnetSquare = punnettSquareGenotype(punnettSquare, "B");
    document.getElementById('punnettSquareAnswer').innerHTML= printPunnettSquare(answerPunnetSquare);
}


function printPunnettSquare(matrix) {
    var table = "<table border=1>";
    for (var i = 0; i < matrix.length; i++) {
        table += "<tr>";
        // length returns number of rows
        for (var j = 0; j < matrix[i].length; j++) {
            table += "<td>"+matrix[i][j]+"</td>";
            //document.getElementById('punnettSquareAnswer').innerHTML= matrix[i][j] + "\t";
        }
        table += "</tr>";
    }
    table += "</table>"
    return table;
}


function punnettSquareGenotype(punnetSquare, letter) {
    var punnettAnswerKey = [[],[],[]];
    punnettAnswerKey[0][0] = "_";
    for (var i = 0, j = 1; j < punnetSquare.length; j++) {
            switch (punnetSquare[i][j]) {
                case 0:
                    punnettAnswerKey[i][j] = letter.toLowerCase();
                    break;
                case 1:
                    punnettAnswerKey[i][j] = letter.toUpperCase();
                    break;
            }
        }
    for (var i = 1, j = 0; i < punnetSquare.length; i++) {
        switch (punnetSquare[i][j]) {
            case 0:
                punnettAnswerKey[i][j] = letter.toLowerCase();
                break;
            case 1:
                punnettAnswerKey[i][j] = letter.toUpperCase();
                break;
        }
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

// Max Inclusive
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

//  Constant for Percentage Value of a Single Square of Punnett Square
var PROBABILITY_MULTIPLIER = 25;

// Determining Parent Genotypes
var answer;

var punnettSquare = [[],[],[]];

// Array String Reference Libraries
var geneExpressionType = ["dominant", "recessive"];
var genotypeStringArray = ["homozygous recessive", "heterozygous", "homozygous dominant"];

var childGenotype;
var answerPunnetSquare;




