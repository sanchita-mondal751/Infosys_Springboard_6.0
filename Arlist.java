package Array_ArList;
import java.util.ArrayList;
import java.util.Scanner;

public class Arlist {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        ArrayList<Integer> list = new ArrayList<>(5);
        int size;
        System.out.println("Enter the size of the list");
        size= in.nextInt();
        for(int i=0;i<size;i++){
            list.add(in.nextInt());
        }
        System.out.println(list);

        for(int i=0;i<size;i++){
            System.out.print("The element in index "+i +" is "+list.get(i));
            System.out.println();
        }
    }
}
