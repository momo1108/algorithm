import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ11049 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N;
    static int[][] matrix;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        matrix = new int[N][2];
        for (int i = 0; i < N; i++) {
            matrix[i][0] = fr.nextInt();
            matrix[i][1] = fr.nextInt();
        }
    }

    static void dp(){
        int[][] Dy = new int[N][N];

        for (int len = 2; len <= N; len++) {
            for(int start = 0; start <= N - len; start++){
                int end = start + len - 1;
                Dy[start][end] = Integer.MAX_VALUE;
                for(int p_end = start; p_end < end; p_end++){
                    Dy[start][end] = Math.min(
                        Dy[start][end], 
                        Dy[start][p_end] + 
                        Dy[p_end + 1][end] + 
                        (matrix[start][0] * matrix[p_end][1] * matrix[end][1]));
                }
            }
        }

        System.out.println(Dy[0][N - 1]);
    }

    public static void main(String[] args) throws Exception {
        input();
        dp();
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