package Array_ArList;

import java.util.Arrays;
import java.util.Scanner;

public class Swapping {
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
        swap(arr,0,size-2);
        System.out.println(Arrays.toString(arr));
    }

    public static void swap(int arr[],int a,int b){
        int temp=arr[a];
        arr[a]=arr[b];
        arr[b]=temp;
    }
}
