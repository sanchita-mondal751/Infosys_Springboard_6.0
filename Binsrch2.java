package Array_ArList;
import java.util.Scanner;
//ceeling of a number
public class Binsrch2 {
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

            System.out.println("Element found at index : " + res);

    }

    public static int binsearch(int[] arr, int target) {
        int start = 0;
        int end = arr.length - 1;

        while (start <= end) {
            int mid = start + (end - start) / 2;

            if (arr[mid] == target)
                return arr[mid];

            if (target < arr[mid]) {
                    end = mid - 1;
            }

            else {
                    start = mid + 1;
            }
        }

        return start;
    }
}
