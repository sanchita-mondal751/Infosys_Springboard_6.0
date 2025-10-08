package Array_ArList;

import java.util.Arrays;
import java.util.Scanner;

public class LnrSrMulAr {
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
        int target;
        System.out.println("Enter the target element");
        target=in.nextInt();
        int[] newarr = search(arr,target);
        System.out.println("Element found in index"+(Arrays.toString(newarr)));
    }

    public static int[] search(int[][] arr,int target) {
        for(int i=0;i<arr.length;i++){
            for(int j=0;j<arr[i].length;j++)
            {
                if(arr[i][j]==target)
                {
                    int[] newarr = {i, j};
                    return newarr;
                }
            }
        }
        return new int[]{-1, -1};
    }
    }

