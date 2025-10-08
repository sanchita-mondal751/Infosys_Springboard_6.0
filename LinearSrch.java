package Array_ArList;

import java.util.Scanner;

public class LinearSrch {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int size;
        int target;
        System.out.println("Enter the target element");
        target=in.nextInt();
        System.out.print("Declare the size of the array:-");
        size=in.nextInt();
        int[] arr = new int[size];
        System.out.println("Enter the elements of the array:-");
        for(int i=0;i<size;i++){
            arr[i]= in.nextInt();
        }
        int result=search(arr,target);
        System.out.println("target found at index " +result);

    }
    public static int search(int[] arr,int target) {
        for(int i=0;i<arr.length;i++){
            if(arr[i]==target)
            return i;
        }
        return -1;
    }
}
