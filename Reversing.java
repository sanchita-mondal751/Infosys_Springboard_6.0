package Array_ArList;

import java.util.Arrays;
import java.util.Scanner;

public class Reversing {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int size;
        System.out.print("Declare the size of the array:-");
        size=in.nextInt();
        int[] arr = new int[size];
        System.out.println("Enter the elements of the array:-");
        for(int i=0;i<size;i++){
            arr[i]= in.nextInt();
        }
        revArr(arr);
        System.out.println(Arrays.toString(arr));
    }

     public static void revArr(int[] arr){
        int start=0;
        int end= arr.length-1;
         for(int i=start;i<end;i++){
             int temp=arr[start];
             arr[start]=arr[end];
             arr[end]=temp;
            start++;
            end--;
         }
     }


}
