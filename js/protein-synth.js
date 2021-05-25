// Constants  ###################
const CODON_LENGTH = 3;
const DNA_NUCLEOTIDES = ["A", "T", "C", "G"];
const RNA_NUCLEOTIDES = ["A", "U", "C", "G"];
const START_PEPTIDE = "Met"
const START_CODON = "AUG"
const STOP_CODON_LIST = ["UAA", "UAG", "UGA"]
const PEPTIDE_ARRAY = ["Ala", "Arg", "Asn", "Asp", "Cys", "Gln", "Glu", "Gly", "His", "Ile", "Leu", "Lys", "Met", "Phe", "Pro", "Ser", "Thr", "Trp", "Tyr", "Val"];
const CODON_DICTIONARY = {
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

const RNA_TO_DNA = {
    "A": "T",
    "U": "A",
    "G": "C",
    "C": "G"
}

// Multiscope Variables  #########

var dnaSequence;
var dnaSequenceLength;
var lengthOfPeptide = getRandomInt(4, 9);
var dna = "";
var rna = [];
var rnaAnswer;
var isRNACorrect = false;
var peptide = [];
var peptideAnswer;
var length;


// Question prompts  ###########

const RNA_QUESTION = "Given the following DNA template strand, what would be the sequence of " +
    " nucleotides for the transcribed mRNA.";
const PEPTIDE_QUESTION = "What is the amino acid sequence of the peptide " +
    "that would be made from this mRNA? Remember, all peptide sequences start at a " + 
    "start codon, and stop codons do not have an associated amino acid. " + 
    "For each amino acid, input your answer using the three letter code followed by '-'. <br/>" +
    "Example: Met-Try-Leu ";


// Main function  ##############

function generateTrascriptQuestion() {
    resetPage();
    createPeptide();
    createRNA();
    formatPeptideAnswer();
    formatRNAAnswer();
    createDNA();
    document.getElementById("prompt-rna-question").innerHTML = RNA_QUESTION;
    document.getElementById("prompt-dna-template").innerHTML = dna;
    document.getElementById('container-submit-rna').style.display = 'inline-block';
    }


// Generating Question Elements #####

function createPeptide() {
    peptide = [];
    for (let i = 0; i <= lengthOfPeptide; i++) {
        let random  = getRandomInt(0, PEPTIDE_ARRAY.length);
        let randomPeptide = PEPTIDE_ARRAY[random];
        peptide.push(randomPeptide);
    }
}

function createRNA() {
    rna = [];
    for (let i = 0; i < peptide.length; i++) {
        let aminoAcid = peptide[i];
        let max = CODON_DICTIONARY[aminoAcid].length;
        let randomCodon  = getRandomInt(0, max);
        rna.push(CODON_DICTIONARY[aminoAcid][randomCodon]);
    }
}

function createDNA() {
    dna = "";
    let rna = rnaAnswer.split("");
    rna.forEach(nucelotide => {
        dna += RNA_TO_DNA[nucelotide];
    });
}


// Formatting correct answer strings ##########

function formatPeptideAnswer() {
    peptideAnswer = "";
    peptideAnswer = START_PEPTIDE
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
    rnaAnswer = startWrapper + START_CODON;
    rnaAltHighlight += rnaAnswer
    for (let i = 0; i < peptide.length; i++) {
        rnaAnswer += rna[i];
        if ( i % 2 == 0)
            rnaAltHighlight += markTagOpen + rna[i] + markTagClose;
        else
            rnaAltHighlight+= rna[i]
    }

    let random = getRandomInt(0, STOP_CODON_LIST.length);
    let randomStopCodon = STOP_CODON_LIST[random];
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
            let randomNucleotide = getRandomInt(0, (RNA_NUCLEOTIDES.length-1)); //Dont want to risk random AUG; will only choose A,U, or C
            wrapper += RNA_NUCLEOTIDES[randomNucleotide];
        }
    return wrapper;
}


//  Checking User Input ####################

const CORRECT_ANSWER = "Perfect! The correct answer is: <br>";
const INCORRECT_ANSWER = "Try again!";
var userInput;

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
        document.getElementById('post-rna-response').innerHTML = `${CORRECT_ANSWER} <br /> <p class="answer">${rnaAnswer}<p>`;
        //document.getElementById('post-highlight-rna-answer').innerHTML = rnaAltHighlight ;
        document.getElementById('prompt-peptide-question').innerHTML = PEPTIDE_QUESTION;
        document.getElementById('container-submit-rna').style.display = "none";
        document.getElementById('container-submit-peptide').style.visibility = "visible";
    } else {
        let regex_nucleotides = /[^acgu]/gi.test(userInput)
        if (regex_nucleotides == true)
            document.getElementById('post-rna-response').innerHTML = `${INCORRECT_ANSWER} You may have submitted characters
                that don't represent RNA nucleotides.`;
        else
            document.getElementById('post-rna-response').innerHTML = `${userInput} is incorrect. ${INCORRECT_ANSWER}`;
    }
    document.getElementById('rna-textbox').value = " ";
}

function checkPeptide() {
    if (peptideAnswer.toUpperCase() == userInput) {
        document.getElementById('post-peptide-answer').innerHTML = `${CORRECT_ANSWER} <br /> <p class="answer"> ${peptideAnswer}</p> `;
        document.getElementById('peptide-textarea').value = " ";
        document.getElementById('container-submit-peptide').style.visibility = "hidden"
    } else {
        let regex_peptide = /[^a-z-]/gi.test(userInput)
        if(regex_peptide == true)
            document.getElementById('post-peptide-answer').innerHTML = `${INCORRECT_ANSWER} You may have submitted characters
            that aren't represented in peptides.`;
        else 
            document.getElementById('post-peptide-answer').innerHTML = INCORRECT_ANSWER;
    }
    document.getElementById('peptide-textarea').value = " ";
}


// General Functions ##################

//Max exclusive 
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  function resetPage() {
    isRNACorrect = false;
    rnaAltHighlight = ""
    document.getElementById('rna-textbox').value = " ";
    document.getElementById("prompt-dna-template").innerHTML = " ";
    document.getElementById("container-submit-rna").value = " ";
    document.getElementById('post-rna-transcript').innerHTML = " ";
    document.getElementById('post-rna-response').innerHTML = " ";
    document.getElementById('post-highlight-rna-answer').innerHTML = " ";
    document.getElementById('prompt-peptide-question').innerHTML = " ";
    document.getElementById('peptide-textarea').value = " ";
    document.getElementById('container-submit-peptide').style.visibility = "hidden";
    document.getElementById('post-peptide-answer').innerHTML = " ";
  }