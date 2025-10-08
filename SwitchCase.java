import java.util.Scanner;
public class SwitchCase {
    public static void main(String[] args) {
        int empId;
        String dept = new String();
        Scanner input = new Scanner(System.in);
        System.out.println("Enter the employeee id and the respective department");
        empId = input.nextInt();
        dept= input.next();
        switch (empId) {
            case 1: {
                System.out.println("Name of the employee is satish");
                switch(dept) {
                    case "IT":{
                        System.out.println("Assigned to IT department");
                        break;
                }
                    case "CSE":{
                        System.out.println("Assigned to CSE department");
                        break;
                    }
                }
                break;
            }

            case 2: {
                System.out.println("Name of the employee is riya");
                switch(dept) {
                    case "IT":{
                        System.out.println("Assigned to IT department");
                        break;
                    }
                    case "CSE":{
                        System.out.println("Assigned to CSE department");
                        break;
                    }
                }
                break;
            }
            default:
                System.out.println("Pls enter valid information");
        }
    }
}