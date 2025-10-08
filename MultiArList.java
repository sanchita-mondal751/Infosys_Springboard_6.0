package Array_ArList;

import java.util.ArrayList;
import java.util.Scanner;

public class MultiArList {
    public static void main(String[] args) {
        ArrayList<ArrayList<Integer>> list = new ArrayList<>();

        Scanner in = new Scanner(System.in);
        int size;
        System.out.println("Enter the size of the list");
        size= in.nextInt();

        for(int i=0;i<size;i++){
           list.add(new ArrayList<>());
        }

        for(int i=0;i<size;i++){
            for(int j=0;j<size;j++){
                list.get(i).add(in.nextInt());
                list.get(i).set(0,2);
            }
        }
        System.out.println(list);

        list.get(0).add(8);

        for(int i=0;i<2;i++) {
            list.get(i).set(1,9);
            System.out.println(list.get(i));
        }
    }
}
