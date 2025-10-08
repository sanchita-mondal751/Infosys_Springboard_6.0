package Array_ArList;
import java.util.Arrays;
import java.util.Scanner;
public class StrArr {
    public static void main(String[] args)  {

        Scanner in = new Scanner(System.in);
        System.out.println("Enter the string");
        String str = in.nextLine();
        System.out.println(str.toCharArray());
        System.out.println(Arrays.toString(str.toCharArray()));
        char target;
        System.out.println("Enter the character to find");
        target = in.next().charAt(0);
        boolean res = search(str,target);
        System.out.println("Is character found?"+res);
    }

    public static boolean search(String str,char target){
       for(int i=0;i<str.length();i++){
           if(target==str.charAt(i)){
               return true;
           }
       }
    return false;
    }
}
