import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;

public class Test {
    static final int n = 19;
    static final int allDir = 8;

    static int[] dx = {0,0,-1,1,-1,1,1,-1};
    static int[] dy = {-1,1,0,0,-1,1,-1,1};
    static int[][] map = new int[n][n];
    static int answerX, answerY;

    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        for(int i = 0 ; i< 19; i++){
            map[i] = Arrays.stream(reader.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        }

        boolean flag = false;
        for(int i = 0 ; i< n; i++){
            for(int j = 0 ; j< n; j++){
                if(map[i][j] != 0){

                    if(searchAllDir(i ,j , map[i][j])){
                        flag = true;
                        break;
                    }

                }
            }
            if(flag){
                break;
            }
        }

                System.out.println(flag ? map[answerX][answerY] + "\n" + (answerX+1) + " " + (answerY+1) : 0);
    }

    //8방향으로 같은게 어디까지인지 탐색
    static boolean searchAllDir(int x, int y, int target){
        int[] answer = new int[allDir];


        for(int i = 0 ; i< allDir; i++){
           int count = 0;
           while(true) {
               int moveX = x + (dx[i] * count);
               int moveY = y + (dy[i] * count);
               if (moveX < 0 || moveX >= n || moveY < 0 || moveY >= n) {
                    break;
               }
               if(map[moveX][moveY] == target){
                   answer[i] = ++count;
               }else{
                   break;
               }
           }
        }

        return calcCounterSum(x, y, answer);
    }

    static boolean calcCounterSum(int x, int y, int[] maxByDir){
        for(int i = 0; i< 4; i++){
            if(maxByDir[i*2] + maxByDir[i*2 +1] == 4){
                answerX = x + (dx[i] * maxByDir[i]);
                answerY = y + (dy[i] * maxByDir[i]);
                return true;
            }
        }
        return false;
    }



}