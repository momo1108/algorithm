import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ10942 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, M;
    static int[] board;
    static int[][] Q;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        board = new int[N+1];

        for (int i = 1; i <= N; i++) {
            board[i] = fr.nextInt();
        }

        M = fr.nextInt();
        Q = new int[M][2];
        int S, E;

        for (int i = 0; i < M; i++) {
            S = fr.nextInt();
            E = fr.nextInt();

            Q[i][0] = S;
            Q[i][1] = E;
        }
    }

    static void dp(){
        boolean[][] Dy = new boolean[N+1][N+1];

        for (int i = 1; i <= N; i++) {
            Dy[i][i] = true;
            if(i < N) Dy[i][i+1] = board[i] == board[i + 1];
        }

        for (int len = 3; len <= N; len++) {
            int maxStart = N - len + 1;
            for (int start = 1; start <= maxStart; start++) {
                int end = start + len - 1;
                Dy[start][end] = (board[start] == board[end]) && Dy[start + 1][end - 1];
            }
        }

        StringBuilder sb = new StringBuilder();

        for (int[] q : Q) {
            sb.append(Dy[q[0]][q[1]]?1:0).append('\n');
        }

        System.out.println(sb);
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