import java.util.Scanner;

public class ReverseNum {
    public static void main(String[] args) {
        System.out.println("Enter the number");
        Scanner input = new Scanner(System.in);
        int n = input.nextInt();
        int revNum=0;
        int temp;
        while(n>0){
            temp=n%10;
            revNum=10*revNum+temp;
            n=n/10;
        }
        System.out.println(revNum);
    }
}
