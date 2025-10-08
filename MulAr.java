package Array_ArList;
import java.util.Arrays;
import java.util.Scanner;
public class MulAr {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int size;
        System.out.print("Declare the size of the rows and colums:-");
        size=in.nextInt();
        int[][] arr = new int[size][size];
        System.out.println("Enter the elements of the array:-");
        for(int i=0;i<size;i++){
            for(int j=0;j<size;j++)
            {
              arr[i][j] = in.nextInt();
            }
        }

        System.out.println("Printing the elements of the array:- ");
        for(int i=0;i<size;i++){
            for(int j=0;j<size;j++)
            {
                System.out.print(arr[i][j]+" ");
            }

            System.out.println(Arrays.toString(arr));
        }
    }
}