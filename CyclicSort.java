import java.util.Arrays;
import java.util.Scanner;

public class CyclicSort {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        System.out.println("Enter the size of the array");
        int size = in.nextInt();
        int[] arr = new int[size];
        System.out.println("Enter the elements of the array (unsorted, in range 1 to n)");

        for (int i = 0; i < arr.length; i++) {
            arr[i] = in.nextInt();
        }

        cyclesort(arr);
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }

    public static void cyclesort(int[] arr) {
        int i = 0;
        while (i < arr.length) {
            int correctIndex = arr[i] - 1;
            if (arr[i] != arr[correctIndex]) {
                swap(arr, i, correctIndex);
            } else {
                i++;
            }
        }
    }

    public static void swap(int[] arr, int a, int b) {
        int temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }
}
