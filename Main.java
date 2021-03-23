import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);

        QuestionGenerator.punnettSquares();
/*
        Double x = .00000004544;
        String s = x.toString();

        int zeros = countZeros(x);

        BigDecimal bd = new BigDecimal(x);
        System.out.println(bd.setScale((zeros + 3), RoundingMode.HALF_UP));

    }
    public static int countZeros(Double number) {
        String string = number.toString();
        int count = 0;

        if (string.charAt(0) == '0' && string.charAt(1) == '.' && string.charAt(2) == '0' && string.charAt(3) == '0')
            count = 2;
        else {
            char integer = string.charAt(string.length() - 1);
            count = Character.getNumericValue(integer);
        }
        //char[] charArray = string.toCharArray();

            /*
        while (true) {
            int count = 0;
            for (char letter: string.toCharArray()){
                if (letter == '0' || letter == '.')
                    count++;
                else
                    break;
            }

            return count;
                        */
        }
    }