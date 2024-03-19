import java.util.Stack;

public class Test {
    public static void main(String[] args) throws Exception {
        Stack<Integer> myStack = new Stack<Integer>();

        myStack.push(1);
        myStack.push(2);
        myStack.push(3);

        System.out.println(myStack.pop()); // 3
        System.out.println(myStack.pop()); // 2
        System.out.println(myStack.pop()); // 1
    }
}
