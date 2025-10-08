import java.util.Scanner;

public class Fibo {
    public static void main(String[] args) {
        System.out.println("Enter the number of range for which you want to check the fibonacci number");
        Scanner input = new Scanner(System.in);
        int n = input.nextInt();
        int a=0;
        int b=1;
        if(n==0)
            System.out.println(0);
        if(n==1)
            System.out.println(1);
        int sum=0;
        for(int i=0;i<=n-2;i++){
            sum=a+b;
            a=b;
            b=sum;
        }
        System.out.println("nth fibonacci number is => "+sum);;
    }
}
