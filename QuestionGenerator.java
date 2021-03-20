import javax.swing.*;
import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Scanner;

public class QuestionGenerator {


    public static void stockDilutionQuestion() {
        Scanner scan = new Scanner(System.in);

        // Constants for Random Value Ranges
        final int VONE_LOWEST_VALUE = 10;
        final int VONE_HIGHEST_VALUE = 500;
        final int CONE_LOWEST_VALUE = 25;
        final int CONE_HIGHEST_VALUE = 200;
        final int CTWO_LOWEST_VALUE = 1;
        final int CTWO_HIGHEST_VALUE = 5;
        final int VTWO_LOWEST_VALUE = 1000;
        final int VTWO_HIGHEST_VALUE = 10000;


        int cOne, vOne, cTwo, vTwo;
        int questionType = numGenerator(1, 1);
        String question;
        String questionWater;
        int userResponse;
        int userResponseWater;
        int water;
        float answerBeforeRound;
        int answer = 0;


        switch (questionType) {

            // Solve for vOn
            case 1:
                cOne = numGenerator(CONE_LOWEST_VALUE, CONE_HIGHEST_VALUE);
                cTwo = numGenerator(CTWO_LOWEST_VALUE, CTWO_HIGHEST_VALUE);
                vTwo = numGenerator(VTWO_LOWEST_VALUE, VTWO_HIGHEST_VALUE);
                //double vOne = (cTwo * vTwo) / cOne;
                //vOne = Math.round(vOne
                question = String.format("You are trying to make %smL of a %sx solution " +
                        "from a %sx concentrated stock of TAE. \nWe'll need to determine " +
                        "how much stock solution to add to a particular volume of water to make this solution. " +
                        "\nFirst, how many mL of %sx TAE will we need? " +
                        "\nRound your answer to the nearest integer",
                        vTwo, cTwo, cOne, cOne);
                System.out.println(question);
                userResponse = validateInput();
                answerBeforeRound = (float) (cTwo * vTwo) / cOne; //Prevent loss of precision due to Int Division
                answer = Math.round(answerBeforeRound);
                checkAnswer(userResponse, answer, questionType);

                questionWater = String.format("\nNow, how much water will we need to mix with %smL of %sx TAE?" +
                        "\nRound your answer to the nearest integer.",
                        answer, cOne);
                System.out.println(questionWater);
                userResponseWater = validateInput();
                water = vTwo - answer;
                checkAnswer(userResponseWater, water, questionType);
                break;

            // Solve for cOne
            case 2:
                //int vOne, cTwo, vTwo;
                vOne = numGenerator(VONE_LOWEST_VALUE, VONE_HIGHEST_VALUE);
                cTwo = numGenerator(CTWO_LOWEST_VALUE, CTWO_HIGHEST_VALUE);
                vTwo = numGenerator(VTWO_LOWEST_VALUE, VTWO_HIGHEST_VALUE);
                question = String.format("The label on your stock TAE solution has been lost! \n" +
                        "You know that you just made %smL of %sx TAE solution. You also know " +
                        "that you added %smL of the stock in making your solution. " +
                        "\nCalculate the concentration of the stock " +
                        "solution so you can relabel it with the appropriate concentration." +
                        "\n Round your answer to the nearest integer.",
                        vTwo, cTwo, vOne);
                System.out.println(question);
                userResponse = validateInput();
                answerBeforeRound = (float) (cTwo * vTwo) / vOne; //Prevent loss of precision due to Int Division
                answer = (Math.round(answerBeforeRound));
                checkAnswer(userResponse, answer, questionType);
                break;

            // Solve for vOne
            case 3:
                //int cOne, vOne, cTwo, vTwo;
                vOne = numGenerator(VONE_LOWEST_VALUE, VONE_HIGHEST_VALUE);
                cOne = numGenerator(CONE_LOWEST_VALUE, CONE_HIGHEST_VALUE);
                water = numGenerator(CTWO_LOWEST_VALUE, CTWO_HIGHEST_VALUE);
                question = String.format("You accidentally mixed some reagent and created a solution. " +
                        "\nYou mixed %smL of %sx TAE with %smL of water. What is the concentration" +
                        "of you final solution? \nRound your answer to the nearest integer.",
                        vOne, cOne, water);
                System.out.println(question);
                userResponse = validateInput();

                vTwo = vOne + water;
                answerBeforeRound = (float) (cOne * vOne) / vTwo; //Prevent loss of precision due to Int Division
                answer = (Math.round(answerBeforeRound));
                checkAnswer(userResponse, answer, questionType);
                break;
        }
    }

    public static int validateInput() {
        Scanner scan = new Scanner(System.in);
        int userResponse = 0;



        try {
            userResponse = scan.nextInt();
        } catch (Exception e) {
            System.out.println("This is not a valid input");
            validateInput();
        }
        return userResponse;
    }

        private static void checkAnswer(int userAttempt, int answer, int questionType) {
            String[] units = {"","mL", "x", "x"};
            if (userAttempt == answer)
                System.out.printf("Perfect - %s%s is Correct!", userAttempt, units[questionType]);
            else
                System.out.printf("Not quite - %s%s is Incorrect.", userAttempt, units[questionType]);
        }


    // -----------------------------------------------------------------------------
    public static void punnettSquares() {

        //  Constant for Percentage Value of a Single Square of Punnett Square
        final int PROBABILITY_MULTIPLIER = 25;

        // Determining Parent Genotypes
        int answer;
        int[] femaleGenotypeValues = generateGenotype();
        int[] maleGenotypeValues = generateGenotype();
        int[][] punnettSquare = new int[3][3];

        // Array String Reference Libraries
        String[] geneExpressionType = {"dominant", "recessive"};
        String[] genotypeStringArray = {"homozygous recessive", "heterozygous", "homozygous dominant"};

        String childGenotype = "";
        String[][] answerPunnetSquare;

        String scenario = String.format("You want to determine the possible genetic outcomes " +
                "for a particular %s gene. \n" +
                "You know that the male parent has a genotype that is %s " +
                "and that the female parent has a genotype is %s. \n",
                geneExpressionType[numGenerator(0,1)],
                genotypeTerm(maleGenotypeValues),
                genotypeTerm(femaleGenotypeValues));
        String questionGenotype = String.format("What is the chance that these parents have " +
                        "a child who's genotype is %s?",
                childGenotype);


        // Initializing Punnett Square with Parent Alleles
        punnettSquare[0][1] = maleGenotypeValues[0];
        punnettSquare[0][2] = maleGenotypeValues[1];
        punnettSquare[1][0] = femaleGenotypeValues[0];
        punnettSquare[2][0] = femaleGenotypeValues[1];


        // Generating Punnett Square Values
        punnettSquare = calculatePunnettSqaure(punnettSquare);
        printPunnettSquare(punnettSquare);


        // Completing Punnett Square - Genotype Answer Key
        HashMap<String, Integer> childResults = new HashMap();
        childResults.put("homozygous recessive", 0);
        childResults.put("heterozygous", 0);
        childResults.put("homozygous dominant", 0);
        childResults = calculateChildOutcomes(punnettSquare, childResults);

        // Genotyping Percentage Calculation
        childGenotype = genotypeStringArray[numGenerator(0, 2)];
        answer = (childResults.get(childGenotype) * PROBABILITY_MULTIPLIER);


        // Scenario and Question for User
        System.out.println(scenario);
        System.out.println(questionGenotype);
        System.out.println(answer);

        // Answer Key for Punnet Square
        answerPunnetSquare = punnettSquareGenotype(punnettSquare, "B");
        printPunnettSquare(answerPunnetSquare);
        System.out.println("test");


        }

    private static String[][] punnettSquareGenotype(int[][] punnetSquare, String letter) {
        String[][] punnettAnswerKey = new String[3][3];
        punnettAnswerKey[0][0] = "_";

        // Character Output for Parent Alleles
        for (int i = 0, j = 2, n = 0; n < 4; n++) {
            if (j <= 0)
                i++;

            if (punnetSquare[i][j] == 0)
                punnettAnswerKey[i][j] = letter.toLowerCase();
            else
                punnettAnswerKey[i][j] = letter.toUpperCase();

            if (j != 0)
                j--;
            }

        // Character Output for Possible Child Genotypes
        for (int n = 1; n < punnetSquare.length; n++) {
            for (int m = 1; m < punnetSquare.length; m++)
                switch (punnetSquare[n][m]) {
                    case 0:
                        punnettAnswerKey[n][m] =
                                letter.toLowerCase() + letter.toLowerCase();
                        break;
                    case 1:
                        punnettAnswerKey[n][m] =
                                letter.toUpperCase() + letter.toLowerCase();
                        break;
                    case 2:
                        punnettAnswerKey[n][m] =
                                letter.toUpperCase() + letter.toUpperCase();
                        break;
                }
        }
        return punnettAnswerKey;
    }


    private static HashMap<String, Integer> calculateChildOutcomes(int[][] punnetSquare, HashMap<String, Integer> results) {
        for (int i = 1; i < punnetSquare.length; i++) {
            for (int j = 1; j < punnetSquare.length; j++) {
                switch (punnetSquare[i][j]) {
                    case 0:
                        results.put("homozygous recessive", (results.get("homozygous recessive") + 1));
                        break;
                    case 1:
                        results.put("heterozygous", (results.get("heterozygous") + 1));
                        break;
                    case 2:
                        results.put("homozygous dominant", (results.get("homozygous dominant") + 1));
                        break;
                }
            }
        }
        return results;
    }


    private static String genotypeTerm(int[] parentGenotype) {
        String genotypeTerm = new String();
        int genotypeValue = parentGenotype[0] + parentGenotype[1];

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


    private static int[][] calculatePunnettSqaure(int[][] matrix) {
        for (int i = 1; i < matrix.length; i++) {
            for (int j = 1; j < matrix.length; j++) {
                matrix[i][j] = matrix[i - i][j] + matrix[i][j - j];
            }
        }
        return matrix;
    }


    private static void printPunnettSquare(int[][] matrix) {
        for (int i = 0; i < matrix.length; i++) {
            // length returns number of rows
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + "\t");
            }
            System.out.println();
        }
    }

    private static void printPunnettSquare(String[][] matrix) {
        for (int i = 0; i < matrix.length; i++) {
            // length returns number of rows
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + "\t");
            }
            System.out.println();
        }
    }


    private static int[] generateGenotype() {
        int[] parent = new int[2];
        int genotypeValue = numGenerator(0, 2);
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



    private static int numGenerator(int min, int max){
        int randomInt = (int)(Math.random()*(max-min+1)+min);
        return randomInt;
    }
}
