import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ1509_timeout {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N;
    static String S;
    static boolean[][] check;

    // 입력 함수
    static void input(){
        S = ' ' + fr.next();
        N = S.length() - 1;
        check = new boolean[N + 1][N + 1];

        for (int i = 1; i <= N; i++) {
            check[i][i] = true;
            if(i < N) check[i][i+1] = S.charAt(i) == S.charAt(i + 1);
        }

        for (int len = 3; len <= N; len++) {
            int maxStart = N - len + 1;
            for (int start = 1; start <= maxStart; start++) {
                int end = start + len - 1;
                check[start][end] = (S.charAt(start) == S.charAt(end)) && check[start + 1][end - 1];
            }
        }
    }

    static void dp(){
        int[][] Dy = new int[N + 1][N + 1];
        for (int i = 1; i <= N; i++) {
            for (int j = 1; j <= N; j++) {
                Dy[i][j] = check[i][j]? 1 : Integer.MAX_VALUE;
            }
        }

        for (int len = 2; len <= N; len++) {
            int maxStart = N - len + 1;
            for (int start = 1; start <= maxStart; start++) {
                int end = start + len - 1;
                if(check[start][end]) continue;
                for (int partitionEnd = start; partitionEnd < end; partitionEnd++) {
                    Dy[start][end] = Math.min(Dy[start][partitionEnd] + Dy[partitionEnd + 1][end], Dy[start][end]);
                }
            }
        }

        System.out.println(Dy[1][N]);
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