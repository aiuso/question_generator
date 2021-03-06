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
var stopCodon = ["UAA", "UAG", "UGA"]

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

var rnaQuestionPrompt = "Given the following DNA template strand, what would be the sequence of " +
    " nucleotide for the transcripted mRNA.";
var peptideQuestionPrompt = "What is the amino acide sequence of the peptide " +
    "that would be made from this mRNA? Input you answer as the three letter amino acid name follow by '-'. " +
    "For example: Met-Try-Leu";


function generateTrascriptQuestion() {
    resetPage();
    createPeptide();
    createRNA();
    formatPeptideAnswer();
    formatRNAAnswer();
    createDNA();
    document.getElementById("rna-question").innerHTML = rnaQuestionPrompt;
    document.getElementById("dna-template").innerHTML = dna;
    document.getElementById('transcription-translation-textbox').style.visibility = 'visible';
    }

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

function formatPeptideAnswer() {
    peptideAnswer = "";
    peptideAnswer = startPeptide
    for (let i = 0; i < peptide.length; i++) {
        peptideAnswer += "-" + peptide[i] ;
    }
}

function formatRNAAnswer() {
    rnaAnswer = "";
    rnaAnswer = nucleotideWrap() + startCodon;
    for (let i = 0; i < peptide.length; i++) {
        rnaAnswer += rna[i];
    }
    let randomStopCodon = getRandomInt(0, stopCodon.length);
    rnaAnswer += stopCodon[randomStopCodon] + nucleotideWrap(); 
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

function createDNA() {
    dna = "";
    let rna = rnaAnswer.split("");
    rna.forEach(nucelotide => {
        dna += RNA_TO_DNA[nucelotide];
    });
}

var userInput;
function setUserInput(value) {
    userInput = value.trim().toUpperCase();
    if (!isRNACorrect)
        checkRNA();
    else
        checkPeptide();
}

var correctAnswer = "Perfect!";
var incorrectAnswer = "Try again!";
function checkRNA() {
    if (rnaAnswer == userInput) {
        isRNACorrect = true;
        document.getElementById('rna-response').innerHTML = correctAnswer;
        document.getElementById('peptide-question').innerHTML = peptideQuestionPrompt;
        document.getElementById('rna-transcript').innerHTML = rnaAnswer;
        document.getElementById('rna-peptide-textbox').value = " ";
    } else
        document.getElementById('rna-response').innerHTML = incorrectAnswer;

}

function checkPeptide() {
    if (peptideAnswer.toUpperCase() == userInput) {
        document.getElementById('peptide-answer').innerHTML = correctAnswer + " " + peptideAnswer;
        document.getElementById('rna-peptide-textbox').value = " ";
    } else {
        document.getElementById('peptide-answer').innerHTML = incorrectAnswer;
    }
}

// Max is exclusive
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  function resetPage() {
    document.getElementById('rna-peptide-textbox').value = " ";
    document.getElementById("dna-template").innerHTML = " ";
    document.getElementById("transcription-translation-textbox").value = " ";
    document.getElementById('rna-transcript').innerHTML = " ";
    document.getElementById('rna-response').innerHTML = " ";
    document.getElementById('peptide-question').innerHTML = " ";
    document.getElementById('peptide-answer').innerHTML = " ";
  }