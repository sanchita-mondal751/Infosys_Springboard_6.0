package Array_ArList;

import java.util.Scanner;

public class MaxEle {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int size;
        System.out.print("Declare the size of the array:-");
        size=in.nextInt();
        int[] arr = new int[size];
        int max;
        System.out.println("Enter the elements of the array:-");
        for(int i=0;i<size;i++){
            arr[i]= in.nextInt();
        }
        max=arr[0];
        for(int i=1;i<size;i++){
            if(arr[i]>max){
                max=arr[i];
            }
        }
        System.out.println("The max element is:- "+max);
    }
}
