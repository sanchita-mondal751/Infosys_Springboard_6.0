package Array_ArList;

import java.util.Scanner;

public class InfiniteBinsr {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int size, target;

        System.out.println("Enter the target element:");
        target = in.nextInt();

        System.out.print("Declare the size of the array: ");
        size = in.nextInt();

        int[] arr = new int[size];
        System.out.println("Enter the elements of the array (sorted):");
        for (int i = 0; i < size; i++) {
            arr[i] = in.nextInt();
        }

        int res = searchRange(arr, target);
        System.out.println("Target found at index: " + res);
    }


    public static int get(int[] arr, int index) {
        if (index >= arr.length) {
            return Integer.MAX_VALUE;
        }
        return arr[index];
    }

    public static int searchRange(int[] arr, int target) {
        int start = 0;
        int end = 1;

        while (get(arr, end) < target) {
            start = end + 1;
            end = start * 2 + 1;
        }

        return binsearch(arr, target, start, end);
    }

    public static int binsearch(int[] arr, int target, int start, int end) {
        while (start <= end) {
            int mid = start + (end - start) / 2;

            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] > target) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }
        return -1;
    }
}
