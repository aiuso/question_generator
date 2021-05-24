var CODON_LENGTH = 3;
var dnaSequence;
var dnaSequenceLength;
var lengthOfPeptide = getRandomInt(4, 9);

var dna = "";
var rna = [];
var rnaAnswer;
var isRNACorrect = false;
var peptide = [];
var peptideAnswer;

var dnaNucleotides = ["A", "T", "C", "G"];
var rnaNucleotides = ["A", "U", "C", "G"];

var startPeptide = "Met"
var startCodon = "AUG"
var stopCodonList = ["UAA", "UAG", "UGA"]

var length;
var peptideArray = ["Ala", "Arg", "Asn", "Asp", "Cys", "Gln", "Glu", "Gly", "His", "Ile", "Leu", "Lys", "Met", "Phe", "Pro", "Ser", "Thr", "Trp", "Tyr", "Val"];
var codonDictionary = {
    "Ala": ["GCU", "GCC", "GCA", "GCG"],
    "Arg": ["CGU", "CGC", "CGA", "CGG", "AGA", "AGG"],
    "Asn": ["AAU", "AAC"],
    "Asp": ["GAU", "GAC"],
    "Cys": ["UGU", "UGC"],
    "Gln": ["CAA", "CAG"],
    "Glu": ["GAA", "GAG"],
    "Gly": ["GGU", "GGC", "GGA", "GGG"],
    "His": ["CAU", "CAC"],
    "Ile": ["AUU", "AUC", "AUA"],
    "Leu": ["UUA", "UUG", "CUU", "CUC", "CUA", "CUG"],
    "Lys": ["AAA", "AAG"],
    "Met": ["AUG"],
    "Phe": ["UUU", "UUC"],
    "Pro": ["CCU", "CCC", "CCA", "CCG"],
    "Ser": ["UCU", "UCC", "UCA", "UCG", "AGU", "AGC"],
    "Thr": ["ACU", "ACC", "ACA", "ACG"],
    "Trp": ["UGG"],
    "Tyr": ["UAU", "UAC"],
    "Val": ["GUU", "GUC", "GUA", "GUG"]
}

var RNA_TO_DNA = {
    "A": "T",
    "U": "A",
    "G": "C",
    "C": "G"
}


// Question prompts  ----------------------------------------------------
var rnaQuestionPrompt = "Given the following DNA template strand, what would be the sequence of " +
    " nucleotides for the transcribed mRNA.";
var peptideQuestionPrompt = "What is the amino acid sequence of the peptide " +
    "that would be made from this mRNA? For each amino acid, input your answer using the three letter code followed by '-'. " +
    "For example: Met-Try-Leu. Note: stop codons do not have an associated amino acid.";


// Main function  ----------------------------------------------------
function generateTrascriptQuestion() {
    resetPage();
    createPeptide();
    createRNA();
    formatPeptideAnswer();
    formatRNAAnswer();
    createDNA();
    document.getElementById("prompt-rna-question").innerHTML = rnaQuestionPrompt;
    document.getElementById("prompt-dna-template").innerHTML = dna;
    document.getElementById('container-submit-rna').style.visibility = 'visible';
    }


// Creating the question elements  ----------------------------------------------------
function createPeptide() {
    peptide = [];
    for (let i = 0; i <= lengthOfPeptide; i++) {
        let random  = getRandomInt(0, peptideArray.length);
        let randomPeptide = peptideArray[random];
        peptide.push(randomPeptide);
    }
}

function createRNA() {
    rna = [];
    for (let i = 0; i < peptide.length; i++) {
        let aminoAcid = peptide[i];
        let max = codonDictionary[aminoAcid].length;
        let randomCodon  = getRandomInt(0, max);
        rna.push(codonDictionary[aminoAcid][randomCodon]);
    }
}

function createDNA() {
    dna = "";
    let rna = rnaAnswer.split("");
    rna.forEach(nucelotide => {
        dna += RNA_TO_DNA[nucelotide];
    });
}


// Formatting the correct answer elements  -------------------------------------------
function formatPeptideAnswer() {
    peptideAnswer = "";
    peptideAnswer = startPeptide
    for (let i = 0; i < peptide.length; i++) {
        peptideAnswer += "-" + peptide[i] ;
    }
}

var rnaAltHighlight = ""
var markTagOpen = "<mark>"
var markTagClose = "</mark>"

function formatRNAAnswer() {
    let startWrapper = nucleotideWrap();
    let endWrapper = nucleotideWrap();
    rnaAnswer = "";
    rnaAnswer = startWrapper + startCodon;
    rnaAltHighlight += rnaAnswer
    for (let i = 0; i < peptide.length; i++) {
        rnaAnswer += rna[i];
        if ( i % 2 == 0)
            rnaAltHighlight += markTagOpen + rna[i] + markTagClose;
        else
            rnaAltHighlight+= rna[i]
    }
    let random = getRandomInt(0, stopCodonList.length);
    let randomStopCodon = stopCodonList[random];
    rnaAnswer += randomStopCodon + endWrapper; 
    if (rna.length % 2 == 0)
        rnaAltHighlight += markTagOpen + randomStopCodon + markTagClose + endWrapper
    else
        rnaAltHighlight += randomStopCodon + endWrapper
}

function nucleotideWrap() {
    let wrapper = "";
    let numberOfRandomNucleotides = getRandomInt(0, 7);
        for (let i = 0; i < numberOfRandomNucleotides; i++) {
            let randomNucleotide = getRandomInt(0, (rnaNucleotides.length-1)); //Dont want to risk random AUG
            wrapper += rnaNucleotides[randomNucleotide];
        }
    return wrapper;
}


//  User input declaration and validation  -------------------------------------------------
var userInput;
var correctAnswer = "Perfect!";
var incorrectAnswer = "Try again!";

function setUserInput(value) {
    userInput = value.trim().toUpperCase();
    if (!isRNACorrect)
        checkRNA();
    else
        checkPeptide();
}

function checkRNA() {
    if (rnaAnswer == userInput) {
        isRNACorrect = true;
        document.getElementById('post-rna-response').innerHTML = correctAnswer;
        document.getElementById('post-rna-transcript').innerHTML = rnaAnswer;
        document.getElementById('post-highlight-rna-answer').innerHTML = rnaAltHighlight;
        document.getElementById('prompt-peptide-question').innerHTML = peptideQuestionPrompt;
        document.getElementById('rna-peptide-textbox').value = " ";
        document.getElementById('container-submit-rna').style.visibility = "hidden";
        document.getElementById('container-submit-peptide').style.visibility = "visible";
        
        
    } else
        document.getElementById('post-rna-response').innerHTML = incorrectAnswer;
}

function checkPeptide() {
    if (peptideAnswer.toUpperCase() == userInput) {
        document.getElementById('post-peptide-answer').innerHTML = `${correctAnswer} ${peptideAnswer} 
                    is correct!`;
        document.getElementById('peptide-sequence').value = " ";
        document.getElementById('container-submit-peptide').style.visibility = "hidden"
    } else {
        document.getElementById('post-peptide-answer').innerHTML = incorrectAnswer;
    }
}


// Randon number generator with max exclusive -------------------------------------
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Reset HTML elements for new questions -----------------------------------------
  function resetPage() {
    isRNACorrect = false;
    rnaAltHighlight = ""

    document.getElementById('rna-peptide-textbox').value = " ";
    document.getElementById("prompt-dna-template").innerHTML = " ";
    document.getElementById("container-submit-rna").value = " ";
    document.getElementById('post-rna-transcript').innerHTML = " ";
    document.getElementById('post-rna-response').innerHTML = " ";
    document.getElementById('post-highlight-rna-answer').innerHTML = " ";
    document.getElementById('prompt-peptide-question').innerHTML = " ";
    document.getElementById('peptide-textbox').value = " ";
    document.getElementById('container-submit-peptide').style.visibility = "hidden";
    document.getElementById('post-peptide-answer').innerHTML = " ";
  }