import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);

        int x = 2;
        int y = 5;
        System.out.println(x);
        System.out.println(y);
        int z = ++x + ++y;
        System.out.println(z);
        System.out.println(x);
        System.out.println(y);
        }
    }