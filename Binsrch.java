package Array_ArList;
import java.util.Scanner;

public class Binsrch {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        System.out.println("Enter the size of the array");
        int size = in.nextInt();
        int[] arr = new int[size];

        System.out.println("Enter the elements of the array (sorted)");
        for (int i = 0; i < arr.length; i++) {
            arr[i] = in.nextInt();
        }

        System.out.println("Enter the target element");
        int target = in.nextInt();

        int res = binsearch(arr, target);

        if (res == -1) {
            System.out.println("Element not found");
        } else {
            System.out.println("Element found at index: " + res);
        }
    }

    public static int binsearch(int[] arr, int target) {
        int start = 0;
        int end = arr.length - 1;

        // Check if array is sorted in ascending or descending order
        boolean isAsc = arr[start] < arr[end];

        while (start <= end) {
            int mid = start + (end - start) / 2;

            if (arr[mid] == target)
                return mid;

            if (isAsc) {
                if (target < arr[mid]) {
                    end = mid - 1;
                } else {
                    start = mid + 1;
                }
            } else { // descending
                if (target > arr[mid]) {
                    end = mid - 1;
                } else {
                    start = mid + 1;
                }
            }
        }

        return -1; // element not found
    }
}
