import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ9663 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N;
    static long answer = 0;
    static int[] cols;
    static int[][] location; // 퀸 번호, 위치(행, 열)

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        cols  = new int[N+1];
        location = new int[N+1][2];
    }

    static boolean check(int row1, int col1, int row2, int col2){
        if(row1 == row2 || col1 == col2) return true;
        if(row1 + col1 == row2 + col2) return true;
        if(row1 - col1 == row2 - col2) return true;
        return false;
    }

    static void rec(int row){
        if(row > N) answer++;
        else {
            boolean invalid;
            for(int col = 1; col <= N; col++){
                invalid = false;
                for(int before = 1; before < row; before++){
                    invalid = check(before, cols[before], row, col);
                    if(invalid) break;
                }
                if(invalid) continue;
                
                cols[row] = col;
                rec(row+1);
                cols[row] = 0;
            }
        }
    }

    public static void main(String[] args) throws Exception {
        input();
        rec(1);
        System.out.println(answer);
    }

    static class FastReader {
        BufferedReader br;
        StringTokenizer st;

        public FastReader() {
            br = new BufferedReader(new InputStreamReader(System.in));
        }

        public FastReader(String s) throws FileNotFoundException {
            br = new BufferedReader(new FileReader(new File(s)));
        }

        String next() {
            while (st == null || !st.hasMoreElements()) {
                try {
                    st = new StringTokenizer(br.readLine());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return st.nextToken();
        }

        int nextInt() {
            return Integer.parseInt(next());
        }

        long nextLong() {
            return Long.parseLong(next());
        }

        double nextDouble() {
            return Double.parseDouble(next());
        }

        String nextLine() {
            String str = "";
            try {
                str = br.readLine();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return str;
        }
    }
}