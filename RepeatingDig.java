import java.util.Scanner;

public class RepeatingDig {
    public static void main(String[] args) {
        System.out.println("Enter the number");
        Scanner input = new Scanner(System.in);
        int n = input.nextInt();
        System.out.println("Enter the digit you want to check repeatation");
        int m= input.nextInt();
        int c=0;
        while(n>0){
            int temp=n%10;
            n=n/10;
            if(temp==m)
                c++;
        }
        if(c==0)
            System.out.println("The digit is not present in the number");
        System.out.println("The repeatation of " +m+ " => "+c);
    }
}
